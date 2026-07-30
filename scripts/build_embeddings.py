#!/usr/bin/env python
"""Precompute the embedding datasets for session 5: the 2D term map and the RAG
retrieval rankings.

Runs offline. Nothing model-related ships to the browser — only the resulting
JSON: 2D coordinates, neighbor lists and per-question rankings.

Uses transformers directly (mean pooling + L2 normalization, which is exactly
what sentence-transformers does for this model) and numpy for PCA, so it needs
no extra dependency beyond a torch install:

    ~/Projects/research/jspace-qwen/.venv/bin/python scripts/build_embeddings.py
"""

from __future__ import annotations

import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(__file__))
from _meta import write_json

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')

# E5 over the older multilingual MiniLM: MiniLM matched on surface form
# ("derrame de hidrocarburo" landed next to "regalías hidrocarburíferas") and
# got only half the retrieval questions right. E5 is trained for asymmetric
# retrieval and needs the "query:" / "passage:" prefixes to work as intended.
MODELO = 'intfloat/multilingual-e5-large'


# ---------------------------------------------------------------------------
# Terms for the 2D map. Six families of oilfield vocabulary, plus a group of
# jargon words that mean something ordinary in everyday Spanish. Those are the
# point of the exercise: the model learned general language, so it puts them
# next to furniture and animals instead of next to wellheads.
# ---------------------------------------------------------------------------

TERMINOS: dict[str, list[str]] = {
    'geología': [
        'reservorio', 'permeabilidad', 'porosidad', 'arenisca', 'lutita',
        'roca madre', 'trampa estructural', 'falla geológica', 'saturación de agua',
        'formación productiva',
    ],
    'perforación': [
        'trépano', 'lodo de perforación', 'cementación', 'torre de perforación',
        'tubería de revestimiento', 'profundidad medida', 'testigo corona',
        'pozo desviado', 'presión de formación',
    ],
    'producción': [
        'caudal de gas', 'curva de declinación', 'presión de boca de pozo',
        'bombeo mecánico', 'relación gas-petróleo', 'corte de agua',
        'punzado', 'terminación de pozo', 'intervención de pozo',
    ],
    'superficie': [
        'separador trifásico', 'planta compresora', 'gasoducto', 'oleoducto',
        'tanque de almacenamiento', 'válvula de seguridad', 'medidor de caudal',
        'planta deshidratadora', 'batería de recolección',
    ],
    'seguridad': [
        'permiso de trabajo', 'análisis de riesgo', 'derrame de hidrocarburo',
        'emisión fugitiva', 'equipo de protección personal', 'bloqueo y etiquetado',
        'simulacro de emergencia', 'gas sulfhídrico',
    ],
    'comercial': [
        'contrato de suministro', 'precio del gas natural', 'regalías hidrocarburíferas',
        'reservas probadas', 'punto de entrega', 'auditoría de reservas',
        'capacidad de transporte firme',
    ],
    'jerga': [
        'árbol de navidad', 'pescado', 'camisa', 'araña', 'gato', 'burro',
    ],
}

# What each jargon word actually means in the field, revealed after clicking.
GLOSARIO_JERGA = {
    'árbol de navidad': 'El conjunto de válvulas montado en la boca del pozo para controlar el flujo.',
    'pescado': 'Una herramienta o un tramo de tubería que quedó suelto adentro del pozo y hay que recuperar.',
    'camisa': 'Un tubo interior que se corre dentro de otro, para aislar o reparar un tramo.',
    'araña': 'La cuña que sostiene la tubería mientras se enrosca o desenrosca.',
    'gato': 'El dispositivo hidráulico que levanta carga en el equipo.',
    'burro': 'La unidad de bombeo mecánico, por la forma en que cabecea.',
}


# ---------------------------------------------------------------------------
# RAG corpus. Written for the course on purpose: session 5 is about the model
# NOT knowing your internal documents, and any real public manual is something
# the model may well have read during training. A synthetic internal manual is
# the honest way to demo retrieval — and it is labeled as such.
# ---------------------------------------------------------------------------

CORPUS = [
    ('OP-01', 'Manual de operaciones', 'Separación',
     'El separador trifásico opera a una presión de 45 bar y separa la corriente de pozo en gas, '
     'petróleo y agua. El nivel de interfase se controla con el lazo LIC-201 y no debe superar el '
     '60% del recipiente.'),
    ('OP-02', 'Manual de operaciones', 'Separación',
     'Si el nivel de líquido en el separador supera el 80%, el sistema dispara el cierre automático '
     'de la válvula de entrada. El operador debe verificar el estado del control de nivel antes de '
     'rearmar.'),
    ('OP-03', 'Manual de operaciones', 'Compresión',
     'La planta compresora tiene tres unidades de tornillo de 1,200 HP cada una. En operación normal '
     'trabajan dos y la tercera queda en reserva rotativa, alternando cada 500 horas de servicio.'),
    ('OP-04', 'Manual de operaciones', 'Compresión',
     'La temperatura de descarga del compresor no debe superar los 120 °C. Por encima de ese valor '
     'el sistema de enfriamiento requiere inspección inmediata y la unidad debe pasar a carga '
     'reducida.'),
    ('OP-05', 'Manual de operaciones', 'Deshidratación',
     'La planta de deshidratación con trietilenglicol reduce el contenido de agua del gas a menos de '
     '65 miligramos por metro cúbico, que es la especificación de entrega al gasoducto troncal.'),
    ('OP-06', 'Manual de operaciones', 'Deshidratación',
     'La concentración de glicol pobre debe mantenerse por encima del 98.5%. Una concentración menor '
     'indica arrastre de agua en el regenerador o temperatura insuficiente en el rehervidor.'),
    ('MT-01', 'Plan de mantenimiento', 'Válvulas',
     'Las válvulas de alivio de presión se calibran en banco cada 24 meses. El certificado de '
     'calibración debe archivarse en el legajo del equipo y una copia queda en la sala de control.'),
    ('MT-02', 'Plan de mantenimiento', 'Válvulas',
     'Las válvulas de bloqueo de emergencia se prueban con carrera parcial cada 6 meses y con carrera '
     'completa durante la parada anual de planta.'),
    ('MT-03', 'Plan de mantenimiento', 'Rotativos',
     'El análisis de vibraciones de las unidades de compresión se realiza cada 3 meses. Un valor por '
     'encima de 7.1 milímetros por segundo en velocidad eficaz obliga a programar intervención.'),
    ('MT-04', 'Plan de mantenimiento', 'Rotativos',
     'El cambio de aceite de los compresores se hace cada 4,000 horas de operación o cuando el '
     'análisis de laboratorio indique degradación del aditivo antioxidante.'),
    ('MT-05', 'Plan de mantenimiento', 'Instrumentos',
     'Los medidores de caudal fiscales se verifican contra patrón cada 12 meses. La incertidumbre '
     'admitida en la medición fiscal de gas es del 1% sobre el valor medido.'),
    ('MT-06', 'Plan de mantenimiento', 'Recipientes',
     'Los recipientes a presión se inspeccionan por ultrasonido cada 5 años para medir espesor '
     'remanente. Un adelgazamiento mayor al 20% del espesor nominal obliga a evaluación de aptitud '
     'para el servicio.'),
    ('SG-01', 'Procedimientos de seguridad', 'Permisos',
     'Todo trabajo en caliente dentro del área clasificada requiere permiso de trabajo firmado por el '
     'supervisor de operaciones y medición previa de atmósfera explosiva.'),
    ('SG-02', 'Procedimientos de seguridad', 'Permisos',
     'El ingreso a espacios confinados exige medición continua de oxígeno, gases explosivos y ácido '
     'sulfhídrico, más un vigía permanente en el exterior durante toda la tarea.'),
    ('SG-03', 'Procedimientos de seguridad', 'Bloqueo',
     'Antes de intervenir un equipo se aplica bloqueo y etiquetado de todas las fuentes de energía. '
     'Cada persona que interviene coloca su propio candado y solo esa persona puede retirarlo.'),
    ('SG-04', 'Procedimientos de seguridad', 'Gas sulfhídrico',
     'En áreas con presencia de ácido sulfhídrico el personal usa detector personal con alarma en 10 '
     'partes por millón. Ante alarma se evacua a favor del viento hacia el punto de reunión.'),
    ('SG-05', 'Procedimientos de seguridad', 'Emergencias',
     'El simulacro general de evacuación se realiza dos veces por año. Los puntos de reunión están '
     'señalizados y el conteo de personal lo hace el jefe de cada área.'),
    ('SG-06', 'Procedimientos de seguridad', 'Derrames',
     'Ante un derrame de hidrocarburo se contiene con barreras absorbentes, se corta la fuente y se '
     'da aviso a medio ambiente dentro de la hora. Todo derrame se registra sin importar el volumen.'),
    ('SG-07', 'Procedimientos de seguridad', 'Protección personal',
     'El uso de protección auditiva es obligatorio en toda la zona de compresión, donde el nivel '
     'sonoro supera los 85 decibeles en jornada de 8 horas.'),
    ('PO-01', 'Manual de pozos', 'Boca de pozo',
     'El conjunto de válvulas de boca de pozo se prueba hidráulicamente antes de la puesta en '
     'servicio y después de cada intervención mayor.'),
    ('PO-02', 'Manual de pozos', 'Intervenciones',
     'Antes de una intervención se mata el pozo con salmuera de densidad suficiente para contener la '
     'presión de formación, con un margen de seguridad de 200 libras por pulgada cuadrada.'),
    ('PO-03', 'Manual de pozos', 'Intervenciones',
     'Cuando una herramienta queda atrapada en el pozo se arma una maniobra de recuperación con '
     'herramienta de pesca. Si dos intentos fallan se evalúa desviar el tramo.'),
    ('PO-04', 'Manual de pozos', 'Producción',
     'La caída de caudal esperada en los pozos del yacimiento es del 8 al 12% anual. Una caída mayor '
     'en un mes sugiere problema mecánico o entrada de agua, no declinación natural.'),
    ('PO-05', 'Manual de pozos', 'Medición',
     'Cada pozo se afora individualmente al menos una vez por mes mediante el separador de control, '
     'con registro de caudal de gas, petróleo y agua.'),
    ('PO-06', 'Manual de pozos', 'Producción',
     'Un aumento sostenido de la relación gas-petróleo puede indicar conificación de gas o '
     'agotamiento de la zona de petróleo, y obliga a revisar el régimen de producción.'),
    ('AM-01', 'Gestión ambiental', 'Emisiones',
     'El venteo de gas está prohibido salvo emergencia. Todo evento de venteo se documenta con '
     'volumen estimado, causa y duración, y se informa mensualmente a la autoridad.'),
    ('AM-02', 'Gestión ambiental', 'Emisiones',
     'Las fugas en conexiones bridadas se detectan con cámara infrarroja en campañas semestrales. '
     'Toda fuga detectada se repara dentro de los 15 días corridos.'),
    ('AM-03', 'Gestión ambiental', 'Agua',
     'El agua de producción se reinyecta en el pozo sumidero autorizado. Se analiza contenido de '
     'hidrocarburos y sólidos suspendidos cada 15 días.'),
    ('AM-04', 'Gestión ambiental', 'Residuos',
     'Los residuos peligrosos se segregan en el sitio y se entregan a operador habilitado con '
     'manifiesto de transporte. El manifiesto se archiva por 10 años.'),
    ('AD-01', 'Régimen contractual', 'Entrega',
     'El poder calorífico del gas entregado en el punto de medición debe estar entre 8,900 y 9,300 '
     'kilocalorías por metro cúbico para cumplir el contrato de suministro.'),
    ('AD-02', 'Régimen contractual', 'Entrega',
     'El contenido de ácido sulfhídrico en el gas de entrega no puede superar 3 miligramos por metro '
     'cúbico. Fuera de especificación, el comprador puede rechazar la entrega.'),
    ('AD-03', 'Régimen contractual', 'Compromisos',
     'El compromiso de entrega firme es de 2.5 millones de metros cúbicos por día. Los volúmenes por '
     'debajo de ese valor generan penalidad salvo caso fortuito declarado.'),
]

# Questions a person would actually ask, each with the chunk that should come
# back. Several share no useful word with their answer ("tapones para los oídos"
# against "protección auditiva") — those are the ones that show why keyword
# search is not enough. The expected id is what makes retrieval measurable
# instead of eyeballed.
PREGUNTAS = [
    # Shares most of its words with the answer: here keyword search also works,
    # and that is the point of including it.
    ('p1', '¿Cada cuánto hay que calibrar las válvulas de alivio?', 'MT-01'),
    ('p2', '¿Hasta cuánto puede subir la temperatura en la descarga del compresor?', 'OP-04'),
    # From here down the wording drifts away from the manual's vocabulary.
    ('p3', '¿Cuánta agua puede llevar el gas que mandamos al ducto?', 'OP-05'),
    ('p4', 'La producción se me cayó de golpe, ¿es el yacimiento o es otra cosa?', 'PO-04'),
    ('p5', 'Se soltó un caño en el fondo y no lo puedo sacar, ¿qué corresponde?', 'PO-03'),
    ('p6', '¿Hace falta cuidarse los oídos cerca de las máquinas grandes?', 'SG-07'),
    ('p7', '¿Se puede soltar gas al aire cuando hay una emergencia?', 'AM-01'),
    ('p8', '¿Cómo me aseguro de que nadie arranque el equipo mientras lo estoy reparando?', 'SG-03'),
]

TOP_K = 5


def cargar_modelo():
    import torch
    from transformers import AutoModel, AutoTokenizer

    # token=False on purpose: the model is public, and any stale token in the
    # machine's HF cache would be sent along and bounce back a 401.
    tok = AutoTokenizer.from_pretrained(MODELO, token=False)
    model = AutoModel.from_pretrained(MODELO, token=False)
    model.eval()

    def embed(textos: list[str], prefijo: str = 'query') -> np.ndarray:
        """E5 expects "query: " on the question side and "passage: " on the
        document side. Skipping the prefixes silently degrades retrieval."""
        textos = [f'{prefijo}: {t}' for t in textos]
        vecs = []
        with torch.no_grad():
            for i in range(0, len(textos), 32):
                lote = textos[i : i + 32]
                enc = tok(lote, padding=True, truncation=True, max_length=256, return_tensors='pt')
                salida = model(**enc).last_hidden_state
                # Mean pooling over real tokens only, then L2 normalize.
                mascara = enc['attention_mask'].unsqueeze(-1).float()
                sumado = (salida * mascara).sum(1)
                promedio = sumado / mascara.sum(1).clamp(min=1e-9)
                promedio = promedio / promedio.norm(dim=1, keepdim=True).clamp(min=1e-9)
                vecs.append(promedio.cpu().numpy())
        return np.vstack(vecs)

    return embed


def pca_2d(X: np.ndarray) -> np.ndarray:
    """Project onto the first two principal components. Plain SVD on centered
    data — the same thing sklearn's PCA does, without the dependency."""
    Xc = X - X.mean(axis=0, keepdims=True)
    _, _, Vt = np.linalg.svd(Xc, full_matrices=False)
    return Xc @ Vt[:2].T


def build_embeddings_map(embed) -> None:
    terminos, familias = [], []
    for familia, palabras in TERMINOS.items():
        for p in palabras:
            terminos.append(p)
            familias.append(familia)

    X = embed(terminos)
    xy = pca_2d(X)
    sim = X @ X.T  # already normalized, so this is cosine

    # Scale to a tidy range so the chart does not depend on PCA's raw units.
    xy = xy / np.abs(xy).max() * 100

    salida = []
    for i, termino in enumerate(terminos):
        orden = np.argsort(-sim[i])
        vecinos = [
            {'termino': terminos[j], 'sim': round(float(sim[i, j]), 4)}
            for j in orden
            if j != i
        ][:TOP_K]
        salida.append({
            'id': f't{i}',
            'termino': termino,
            'familia': familias[i],
            'x': round(float(xy[i, 0]), 2),
            'y': round(float(xy[i, 1]), 2),
            'vecinos': vecinos,
            'glosa': GLOSARIO_JERGA.get(termino),
        })

    write_json(
        os.path.join(ROOT, 'embeddings_2d.json'),
        salida,
        source=f'embeddings de {MODELO}, proyectados a 2D por PCA. Los vecinos se calculan en '
        'las 384 dimensiones originales, no en el mapa.',
    )
    print(f'  embeddings_2d: {len(salida)} términos en {len(TERMINOS)} familias')


def build_rag(embed) -> None:
    C = embed([c[3] for c in CORPUS], prefijo='passage')
    Q = embed([p[1] for p in PREGUNTAS], prefijo='query')
    sim = Q @ C.T

    chunks = [
        {'id': cid, 'doc': doc, 'seccion': sec, 'texto': txt}
        for cid, doc, sec, txt in CORPUS
    ]
    ids = [c[0] for c in CORPUS]

    preguntas, top1, top3 = [], 0, 0
    for i, (pid, texto, esperado) in enumerate(PREGUNTAS):
        orden = np.argsort(-sim[i])[:TOP_K]
        ranking = [{'chunk': CORPUS[j][0], 'sim': round(float(sim[i, j]), 4)} for j in orden]
        puestos = [r['chunk'] for r in ranking]
        top1 += puestos[0] == esperado
        top3 += esperado in puestos[:3]
        if esperado not in puestos[:3]:
            j = ids.index(esperado)
            print(f'    ! {pid}: {esperado} no entra ni en el top 3 (sim={sim[i, j]:.3f}); '
                  f'devolvió {puestos[:3]}')
        elif puestos[0] != esperado:
            print(f'    · {pid}: {esperado} sale {puestos.index(esperado) + 1}º, no 1º')
        preguntas.append({
            'id': pid,
            'texto': texto,
            'esperado': esperado,
            'ranking': ranking,
        })

    write_json(
        os.path.join(ROOT, 'rag_corpus.json'),
        {'chunks': chunks, 'preguntas': preguntas},
        source='corpus redactado para el curso: simula un manual interno, que es justamente lo que '
        'un modelo no puede haber leído. Rankings por similitud coseno con '
        f'{MODELO}.',
    )
    n = len(preguntas)
    print(f'  rag_corpus: {len(chunks)} fragmentos · el esperado sale 1º en {top1}/{n} '
          f'y entra en el top 3 en {top3}/{n}')


if __name__ == '__main__':
    print(f'cargando {MODELO}…', flush=True)
    embed = cargar_modelo()
    build_embeddings_map(embed)
    build_rag(embed)
    print('OK: public/data/ actualizado')
