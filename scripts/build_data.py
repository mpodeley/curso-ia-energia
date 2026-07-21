"""Precompute the exercise datasets in public/data/.

Runs offline on the instructor's machine — nothing model-related ships to the
browser, only these JSONs. Requires: pip install tiktoken

Usage: python scripts/build_data.py
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _meta import write_json

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')


# ---------------------------------------------------------------------------
# 1. Tokenizer examples — real BPE splits from tiktoken (o200k_base = GPT-4o).
# ---------------------------------------------------------------------------

TOKENIZER_TEXTS = [
    {
        'id': 'produccion',
        'label': 'Parte de producción (español)',
        'texto': 'El pozo Sirari-12 produjo 4.850 barriles de petróleo por día.',
        'note': 'Las palabras comunes en español suelen partirse en 2–3 pedazos, y los números y '
        'nombres propios en más. Compará este conteo con la misma frase en inglés.',
    },
    {
        'id': 'ingles',
        'label': 'La misma frase en inglés',
        'texto': 'Well Sirari-12 produced 4,850 barrels of oil per day.',
        'note': 'La misma información en inglés usa menos tokens: el tokenizador se entrenó con '
        'mucho más inglés que español. Por eso el español «rinde menos» por token (y cuesta más en APIs).',
    },
    {
        'id': 'tecnico',
        'label': 'Términos técnicos',
        'texto': 'La estimulación hidráulica del esquisto aumentó la permeabilidad del reservorio.',
        'note': 'Términos técnicos poco frecuentes se parten en varias piezas. El modelo no «conoce '
        'la palabra»: conoce estadísticas sobre sus pedazos.',
    },
    {
        'id': 'siglas',
        'label': 'Siglas y unidades',
        'texto': 'YPFB reportó 42 MMm3/d de gas natural y 1.200 psi en boca de pozo.',
        'note': 'Siglas, unidades y números se tokenizan de formas poco intuitivas. Esta es una de '
        'las razones por las que los LLMs se equivocan contando caracteres o haciendo aritmética.',
    },
    {
        'id': 'numeros',
        'label': 'Un número largo',
        'texto': 'La reserva probada es de 10.234.567.890 metros cúbicos.',
        'note': 'El número se parte en grupos arbitrarios de dígitos: el modelo no ve «un número», '
        've pedazos. Desconfiá de cualquier aritmética que haga de cabeza.',
    },
]


def build_tokenizer_examples():
    import tiktoken

    enc = tiktoken.get_encoding('o200k_base')
    out = []
    for item in TOKENIZER_TEXTS:
        ids = enc.encode(item['texto'])
        pieces = []
        for tid in ids:
            piece = enc.decode_single_token_bytes(tid).decode('utf-8', errors='replace')
            pieces.append(piece)
        out.append(
            {
                'id': item['id'],
                'label': item['label'],
                'texto': item['texto'],
                'tokens': pieces,
                'note': item['note'],
            }
        )
    write_json(
        os.path.join(ROOT, 'tokenizer_examples.json'),
        out,
        source='tokenizador o200k_base (GPT-4o) vía tiktoken',
    )
    return out


# ---------------------------------------------------------------------------
# 2. Next-token distributions — hand-curated, illustrative (clearly labeled).
# ---------------------------------------------------------------------------

NEXT_TOKEN = [
    {
        'id': 'presion',
        'contexto': 'La presión en boca de pozo se mide en',
        'opciones': [
            {'token': ' psi', 'p': 0.48},
            {'token': ' bar', 'p': 0.22},
            {'token': ' kg/cm²', 'p': 0.12},
            {'token': ' unidades', 'p': 0.10},
            {'token': ' metros', 'p': 0.05},
            {'token': ' vacas', 'p': 0.03},
        ],
        'note': 'El modelo leyó millones de textos técnicos: «psi» domina, pero fijate que ninguna '
        'opción tiene probabilidad cero — ni siquiera las absurdas. Solo son muy improbables.',
    },
    {
        'id': 'vaca',
        'contexto': 'El principal yacimiento no convencional de Argentina es Vaca',
        'opciones': [
            {'token': ' Muerta', 'p': 0.90},
            {'token': ' muerta', 'p': 0.06},
            {'token': ' Negra', 'p': 0.02},
            {'token': ' Viva', 'p': 0.01},
            {'token': ' Loca', 'p': 0.01},
        ],
        'note': 'Cuando el contexto apunta a un hecho muy repetido en el entrenamiento, la '
        'distribución se concentra: acá el modelo está «casi seguro». La seguridad viene de la '
        'frecuencia en los datos, no de haber verificado nada.',
    },
    {
        'id': 'valvula',
        'contexto': 'El operador cerró la válvula porque detectó una',
        'opciones': [
            {'token': ' fuga', 'p': 0.40},
            {'token': ' caída', 'p': 0.18},
            {'token': ' falla', 'p': 0.16},
            {'token': ' pérdida', 'p': 0.12},
            {'token': ' anomalía', 'p': 0.09},
            {'token': ' serpiente', 'p': 0.05},
        ],
        'note': 'Contexto ambiguo → distribución repartida. Acá la temperatura importa mucho: con '
        'temperatura alta, «serpiente» aparece cada tanto.',
    },
    {
        'id': 'informe',
        'contexto': 'Adjunto el informe mensual de',
        'opciones': [
            {'token': ' producción', 'p': 0.45},
            {'token': ' actividades', 'p': 0.20},
            {'token': ' gestión', 'p': 0.15},
            {'token': ' perforación', 'p': 0.10},
            {'token': ' gastos', 'p': 0.07},
            {'token': ' vacaciones', 'p': 0.03},
        ],
        'note': 'En texto administrativo el modelo es un excelente autocompletador: por eso los '
        'borradores de correos e informes le salen tan naturales.',
    },
]


def build_next_token():
    write_json(
        os.path.join(ROOT, 'next_token_dists.json'),
        NEXT_TOKEN,
        source='distribuciones ilustrativas curadas a mano — no son salidas reales de un modelo',
    )


# ---------------------------------------------------------------------------
# 3. Quiz sesión 1.
# ---------------------------------------------------------------------------

QUIZ_S1 = [
    {
        'pregunta': '¿Cuál de estas frases describe mejor la relación entre machine learning e IA generativa?',
        'opciones': [
            {
                'texto': 'Son lo mismo con distinto nombre de marketing.',
                'explicacion': 'No: todo lo generativo es machine learning, pero el machine learning clásico (clasificar, predecir un número) no genera contenido nuevo.',
            },
            {
                'texto': 'La IA generativa es un tipo de machine learning: modelos entrenados con enormes cantidades de datos que aprenden a generar contenido nuevo.',
                'correcta': True,
                'explicacion': 'Exacto: es la capa más nueva del mapa — machine learning llevado a una escala donde el modelo ya no solo clasifica o predice: genera.',
            },
            {
                'texto': 'El machine learning es un tipo de IA generativa.',
                'explicacion': 'Es al revés: la IA generativa es un subconjunto (reciente) del machine learning.',
            },
            {
                'texto': 'No tienen relación: la IA generativa reemplazó al machine learning.',
                'explicacion': 'El machine learning «clásico» sigue vivo y muy usado (mantenimiento predictivo, interpretación sísmica). La IA generativa se suma, no reemplaza.',
            },
        ],
    },
    {
        'pregunta': 'En el fondo, ¿qué hace un LLM cuando le escribís?',
        'opciones': [
            {
                'texto': 'Busca tu pregunta en una base de datos gigante de preguntas y respuestas.',
                'explicacion': 'No hay tal base de datos: por eso puede responder preguntas que nadie hizo nunca — y también por eso puede inventar.',
            },
            {
                'texto': 'Consulta internet en tiempo real y resume lo que encuentra.',
                'explicacion': 'Algunos chatbots pueden buscar en la web como función extra, pero el mecanismo base es otro: generar texto desde lo aprendido en el entrenamiento.',
            },
            {
                'texto': 'Predice, token a token, la continuación más plausible del texto.',
                'correcta': True,
                'explicacion': 'Esa única operación, repetida, produce todo lo que viste. En la sesión 2 la vas a ver funcionando por dentro.',
            },
            {
                'texto': 'Ejecuta reglas que programadores escribieron para cada tema.',
                'explicacion': 'Nadie programó reglas por tema: el comportamiento emerge del entrenamiento con texto. Eso explica tanto su flexibilidad como su imprevisibilidad.',
            },
        ],
    },
    {
        'pregunta': '¿Por qué esta tecnología explotó ahora y no hace 20 años?',
        'opciones': [
            {
                'texto': 'Se descubrió hace poco un algoritmo secreto que lo cambió todo.',
                'explicacion': 'La arquitectura clave (el transformer) es pública desde 2017. No hubo magia: hubo escala.',
            },
            {
                'texto': 'Se juntaron tres cosas: enormes cantidades de texto disponible, cómputo (GPUs) y una arquitectura que mejora de forma predecible al escalarla.',
                'correcta': True,
                'explicacion': 'Esa es la receta. Y como sigue mejorando con escala, conviene asumir que lo que hoy «no puede hacer» quizás lo haga en la próxima generación.',
            },
            {
                'texto': 'Las computadoras cuánticas lo hicieron posible.',
                'explicacion': 'Nada de esto usa computación cuántica: son GPUs — el mismo hardware de los videojuegos.',
            },
            {
                'texto': 'Los gobiernos liberaron datos que antes eran secretos.',
                'explicacion': 'El combustible fue el texto público de internet (y libros, y código), no datos gubernamentales.',
            },
        ],
    },
    {
        'pregunta': 'Le preguntás al chatbot la profundidad de un pozo del campo Yapacaní y te da una cifra exacta, con tono seguro. ¿Qué corresponde hacer?',
        'opciones': [
            {
                'texto': 'Usarla: si la dice con esa seguridad, la sabe.',
                'explicacion': 'El tono seguro es un estilo aprendido, no una medida de confianza. El modelo genera la continuación más plausible — aunque sea inventada.',
            },
            {
                'texto': 'Tratarla como no verificada: el tono no es evidencia. Buscar la fuente primaria antes de usar la cifra en nada que importe.',
                'correcta': True,
                'explicacion': 'Regla de oro del curso: la salida de un LLM es un borrador plausible, no una fuente. Datos puntuales y citas se verifican siempre.',
            },
            {
                'texto': 'Preguntarle si está seguro, y confiar si dice que sí.',
                'explicacion': 'Te va a decir que sí con la misma seguridad con la que inventó la cifra. Preguntarle al modelo por su propia confiabilidad no es verificación.',
            },
            {
                'texto': 'Pedirle la cifra dos veces y quedarse con el promedio.',
                'explicacion': 'Dos muestras de la misma máquina de plausibilidad no hacen una verificación. Puede darte el mismo número inventado dos veces.',
            },
        ],
    },
    {
        'pregunta': '¿Cuál de estas tareas es HOY el mejor caso de uso para un chatbot gratuito?',
        'opciones': [
            {
                'texto': 'Calcular el balance de materiales del campo con los datos reales de producción.',
                'explicacion': 'Dos problemas: aritmética compleja (donde el mecanismo de tokens falla) y datos confidenciales que no deben subirse a una herramienta gratuita.',
            },
            {
                'texto': 'Resumir un paper SPE de 40 páginas en una página, para decidir si vale la pena leerlo entero.',
                'correcta': True,
                'explicacion': 'El punto dulce: el borrador cuesta mucho, la verificación es rápida (si el resumen interesa, vas al paper), y el documento no es confidencial.',
            },
            {
                'texto': 'Decidir el punto óptimo de inyección de agua del bloque.',
                'explicacion': 'Decisiones de ingeniería con consecuencias físicas y económicas necesitan modelos, datos y responsables — el chatbot puede ayudar a redactar el informe, no a decidir.',
            },
            {
                'texto': 'Llevar el registro oficial de producción del campo.',
                'explicacion': 'Un sistema de registro necesita exactitud y trazabilidad garantizadas — exactamente lo que una máquina de texto plausible no ofrece.',
            },
        ],
    },
]


def build_quiz():
    write_json(
        os.path.join(ROOT, 'quiz_s1.json'),
        QUIZ_S1,
        source='elaboración propia para el curso',
    )


if __name__ == '__main__':
    build_next_token()
    build_quiz()
    ex = build_tokenizer_examples()
    for e in ex:
        print(f"  {e['id']}: {len(e['texto'])} chars -> {len(e['tokens'])} tokens")
    print('OK: public/data/ actualizado')
