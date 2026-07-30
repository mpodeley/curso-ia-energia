"""Precompute the exercise datasets in public/data/.

Runs offline on the instructor's machine — nothing model-related ships to the
browser, only these JSONs. Requires: pip install tiktoken

Usage: python scripts/build_data.py
"""

import calendar
import json
import math
import random
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
    try:
        import tiktoken
    except ImportError:
        print('  tokenizer: SALTEADO — falta tiktoken (pip install -r scripts/requirements.txt).')
        print('             public/data/tokenizer_examples.json queda como está.')
        return []

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


QUIZ_S2 = [
    {
        'pregunta': 'Le pedís al modelo que cuente cuántas letras "r" tiene una palabra y se equivoca. ¿Por qué?',
        'opciones': [
            {
                'texto': 'Porque no le pusiste suficiente contexto en el prompt.',
                'explicacion': 'El contexto no cambia nada acá. El problema es anterior al prompt: está en cómo el modelo ve el texto.',
            },
            {
                'texto': 'Porque no lee letras: lee tokens, que son pedazos de palabra. Contar caracteres exige ver algo que el modelo no tiene delante.',
                'correcta': True,
                'explicacion': 'Exacto. Para el modelo la palabra puede ser dos o tres piezas, y adentro de cada pieza no distingue letras. Por eso también falla con aritmética larga.',
            },
            {
                'texto': 'Porque los modelos son malos en matemática en general.',
                'explicacion': 'Es una consecuencia, no la causa, y además no es del todo cierto: con una herramienta de cálculo aciertan. El origen del problema es la tokenización.',
            },
            {
                'texto': 'Porque la temperatura estaba muy alta.',
                'explicacion': 'La temperatura cambia cuánto riesgo toma al elegir, no le da acceso a las letras. Con temperatura cero se equivoca igual.',
            },
        ],
    },
    {
        'pregunta': '¿Qué hace exactamente la temperatura?',
        'opciones': [
            {
                'texto': 'Cambia cuánto riesgo toma al elegir el próximo token: baja se queda con lo más probable, alta reparte entre opciones menos probables.',
                'correcta': True,
                'explicacion': 'Eso es todo lo que hace. No agrega ni quita conocimiento: solo modifica cómo elige entre las opciones que ya tenía.',
            },
            {
                'texto': 'Controla cuánta información tiene en cuenta el modelo.',
                'explicacion': 'La información que tiene en cuenta la define el contexto, no la temperatura. Con cualquier temperatura ve lo mismo.',
            },
            {
                'texto': 'Hace al modelo más o menos inteligente.',
                'explicacion': 'Un modelo con temperatura alta no es más creativo en el sentido de saber más: es más propenso a elegir tokens raros, que a veces suena original y a veces es un disparate.',
            },
            {
                'texto': 'Determina cuánto se demora en responder.',
                'explicacion': 'La velocidad depende del tamaño del modelo y del largo de la respuesta, no de la temperatura.',
            },
        ],
    },
    {
        'pregunta': 'En el ejercicio, "Vaca ___" daba 90% de probabilidad a "Muerta". ¿Qué significa esa seguridad?',
        'opciones': [
            {
                'texto': 'Que el modelo verificó el dato antes de responder.',
                'explicacion': 'No hay ninguna verificación en el proceso. Solo hay una distribución de probabilidad sobre el próximo token.',
            },
            {
                'texto': 'Que esa combinación aparece muchísimo en el texto con el que se entrenó. La seguridad viene de la frecuencia, no de la verdad.',
                'correcta': True,
                'explicacion': 'Y de ahí sale la trampa: el modelo suena igual de seguro cuando la frecuencia es alta y cuando está inventando, porque el tono no depende de la probabilidad.',
            },
            {
                'texto': 'Que el 90% de las veces que respondió esa pregunta acertó.',
                'explicacion': 'No es una tasa de acierto histórica. Es la probabilidad que le asigna al próximo token en este contexto puntual.',
            },
            {
                'texto': 'Que hay un 10% de posibilidades de que el dato sea falso.',
                'explicacion': 'La probabilidad es sobre qué palabra sigue, no sobre si el enunciado es verdadero. Son dos cosas distintas que es fácil confundir.',
            },
        ],
    },
    {
        'pregunta': 'A partir de la mecánica que vimos, ¿por qué alucina un modelo?',
        'opciones': [
            {
                'texto': 'Porque tiene errores en los datos de entrenamiento que hay que ir corrigiendo.',
                'explicacion': 'Los datos sucios agregan errores, pero un modelo entrenado con datos perfectos alucinaría igual. El mecanismo es otro.',
            },
            {
                'texto': 'Porque su única operación es continuar el texto de la forma más plausible, y una continuación plausible puede ser falsa.',
                'correcta': True,
                'explicacion': 'No hay un paso donde consulte si algo es cierto. Cuando no tiene el dato, igual produce la continuación que mejor encaja — y esa continuación tiene la forma de un dato verdadero.',
            },
            {
                'texto': 'Porque a veces se queda sin contexto y rellena.',
                'explicacion': 'Quedarse sin contexto empeora las cosas, pero alucina también con todo el contexto disponible.',
            },
            {
                'texto': 'Porque los desarrolladores todavía no terminaron de ajustarlo.',
                'explicacion': 'Los ajustes reducen la frecuencia, no eliminan el mecanismo. Es una propiedad de cómo funciona, no un error pendiente de arreglo.',
            },
        ],
    },
]

QUIZ_S3 = [
    {
        'pregunta': 'De las cinco piezas de un prompt, ¿cuál suele cambiar más la calidad de la salida en una tarea de oficina?',
        'opciones': [
            {
                'texto': 'El rol, porque define quién es el modelo.',
                'explicacion': 'Ayuda a fijar el registro, pero un rol bien puesto sobre un pedido sin contexto sigue dando un texto genérico.',
            },
            {
                'texto': 'El contexto, cuando dice para qué se va a usar el resultado y qué decisión alimenta.',
                'correcta': True,
                'explicacion': 'Es lo que le da criterio para jerarquizar: qué dejar afuera. Sin eso resume "en general", que es resumir para nadie.',
            },
            {
                'texto': 'Los ejemplos, siempre.',
                'explicacion': 'Un ejemplo real es muy potente, pero es opcional. El contexto no lo es: sin él, el ejemplo tampoco sabe hacia dónde apuntar.',
            },
            {
                'texto': 'El largo del prompt: cuanto más detallado, mejor.',
                'explicacion': 'Un prompt largo y vago rinde menos que uno corto y específico. Lo que importa es qué piezas están, no cuántas palabras.',
            },
        ],
    },
    {
        'pregunta': 'Tenés que resumir el informe mensual de producción del bloque. ¿Cuál es la forma correcta de usar un chatbot gratuito?',
        'opciones': [
            {
                'texto': 'Subir el informe completo con los datos reales: es más rápido y el resultado va a ser mejor.',
                'explicacion': 'Producción real por pozo no va a una herramienta gratuita. La ganancia de calidad no compensa el riesgo de confidencialidad.',
            },
            {
                'texto': 'No usarlo: para datos de la empresa no sirve ninguna herramienta de este tipo.',
                'explicacion': 'Demasiado restrictivo. Hay formas de aprovecharlo sin exponer datos, y renunciar del todo también tiene un costo.',
            },
            {
                'texto': 'Trabajar la estructura y el estilo con datos inventados o públicos que tengan la misma forma, y poner los números reales vos, después.',
                'correcta': True,
                'explicacion': 'Lo que aporta el modelo es la redacción y la organización, y eso se puede pedir sin datos sensibles. Los números los pegás en tu máquina.',
            },
            {
                'texto': 'Subir el informe pero cambiándole el nombre a los pozos.',
                'explicacion': 'Los volúmenes, las fechas y las relaciones entre pozos siguen ahí. Anonimizar mal da una sensación de seguridad sin la seguridad.',
            },
        ],
    },
    {
        'pregunta': 'El primer resultado no sirve. ¿Qué conviene hacer?',
        'opciones': [
            {
                'texto': 'Empezar de cero con un prompt completamente distinto.',
                'explicacion': 'A veces hace falta, pero tirar todo descarta la parte que sí funcionaba. Iterar suele llegar antes.',
            },
            {
                'texto': 'Decirle qué está mal y pedirle el ajuste concreto: más corto, sin jerga, con la conclusión al principio.',
                'correcta': True,
                'explicacion': 'La conversación es parte del método, no señal de que fallaste. Cada corrección concreta rinde más que reescribir el prompt entero.',
            },
            {
                'texto': 'Preguntarle por qué le salió mal.',
                'explicacion': 'Te va a dar una explicación plausible e inventada de su propio proceso. No tiene acceso introspectivo a por qué generó lo que generó.',
            },
            {
                'texto': 'Volver a mandar el mismo prompt hasta que salga algo mejor.',
                'explicacion': 'Vas a obtener variaciones del mismo error. Si el prompt no cambia, el problema no cambia.',
            },
        ],
    },
]

QUIZ_S4 = [
    {
        'pregunta': 'Ajustaste una curva de declinación a un pozo real y el modelo pasa muy cerca de todos los puntos. ¿Qué probaste?',
        'opciones': [
            {
                'texto': 'Que entendiste el comportamiento del reservorio.',
                'explicacion': 'Es la conclusión tentadora y es la equivocada. La curva medida incluye compresión, restricciones de planta y estado del pozo, no solo reservorio.',
            },
            {
                'texto': 'Que la producción cayó de forma sostenida, sin interrupciones grandes. Nada más que eso.',
                'correcta': True,
                'explicacion': 'Un buen ajuste dice que la serie es suave, no que sepas por qué. Separar despresurización de efectos operativos necesita caudales corregidos por horas de operación y presión de boca.',
            },
            {
                'texto': 'Que podés proyectar la producción de los próximos diez años con confianza.',
                'explicacion': 'La cola de la curva la controla b, que es justamente el parámetro peor determinado. Un ajuste bueno sobre el pasado puede dar proyecciones muy distintas.',
            },
            {
                'texto': 'Que el pozo no tuvo intervenciones.',
                'explicacion': 'Una intervención suave o un cambio gradual de restricción puede pasar desapercibido dentro de una curva que ajusta bien.',
            },
        ],
    },
    {
        'pregunta': 'En la serie mensual de un pozo, febrero siempre aparece más bajo que enero. ¿Qué es eso?',
        'opciones': [
            {
                'texto': 'Una caída estacional de la demanda.',
                'explicacion': 'La demanda afecta a algunos pozos, pero esto pasa en todos los pozos y todos los años, con la misma forma. Hay una explicación más simple.',
            },
            {
                'texto': 'Que febrero tiene menos días: el dato es volumen mensual, no caudal. Dividiendo por días del mes el escalón desaparece.',
                'correcta': True,
                'explicacion': 'Es el error más común al mirar datos de producción crudos. La declinación describe un caudal, así que hay que compararla contra un caudal.',
            },
            {
                'texto': 'Paradas de mantenimiento que suelen programarse a principio de año.',
                'explicacion': 'Las paradas aparecen como caídas puntuales en meses distintos según el año, no como un patrón que se repite exactamente cada febrero.',
            },
            {
                'texto': 'Un error de carga en el sistema de reporte.',
                'explicacion': 'El dato está bien cargado: es volumen del mes. El error está en leerlo como si fuera un caudal.',
            },
        ],
    },
    {
        'pregunta': 'El chatbot te escribió código para analizar tu planilla y devolvió un número razonable. ¿Qué chequeás?',
        'opciones': [
            {
                'texto': 'Nada: si el número es razonable y el código corrió sin errores, está bien.',
                'explicacion': 'Un filtro mal escrito no rompe nada. Devuelve menos filas y sigue, y el resultado sigue pareciendo razonable.',
            },
            {
                'texto': 'Le pedís que te muestre el código y el conteo de filas antes y después de cada filtro, y rastreás un caso a mano en la planilla.',
                'correcta': True,
                'explicacion': 'Los conteos delatan los filtros que se comieron datos, y un caso rastreado a mano cierra o abre toda la discusión en dos minutos.',
            },
            {
                'texto': 'Le preguntás si está seguro del resultado.',
                'explicacion': 'Va a decir que sí con la misma seguridad con la que se equivocó. Preguntarle al modelo por su confiabilidad no es verificar.',
            },
            {
                'texto': 'Le pedís que lo calcule de nuevo y comparás.',
                'explicacion': 'Si el código tiene el mismo error, va a dar el mismo número las dos veces. Repetir no es verificar.',
            },
        ],
    },
]

QUIZ_S5 = [
    {
        'pregunta': 'En una palabra: ¿qué hace un sistema de recuperación aumentada antes de responder?',
        'opciones': [
            {
                'texto': 'Reentrena el modelo con tus documentos.',
                'explicacion': 'Eso es otra técnica, mucho más cara y lenta, y casi nunca es lo que se usa. El modelo no cambia en absoluto.',
            },
            {
                'texto': 'Busca los fragmentos más parecidos a la pregunta y los pega adelante de la pregunta, en el mismo prompt.',
                'correcta': True,
                'explicacion': 'Nada más que eso. El modelo responde con el libro abierto: no aprendió tu manual, lo está leyendo en ese momento.',
            },
            {
                'texto': 'Le da acceso a internet para que busque la respuesta.',
                'explicacion': 'Buscar en internet es otra herramienta. Acá el corpus es tuyo y está cerrado, que es justamente la gracia.',
            },
            {
                'texto': 'Guarda tus documentos en la memoria del modelo para las próximas consultas.',
                'explicacion': 'No hay memoria persistente. En cada pregunta se vuelve a buscar y se vuelve a pegar.',
            },
        ],
    },
    {
        'pregunta': 'El buscador trae un fragmento que no responde la pregunta, pero el modelo contesta igual. ¿Cuál es el riesgo?',
        'opciones': [
            {
                'texto': 'Ninguno: si el fragmento no sirve, el modelo va a decir que no sabe.',
                'explicacion': 'Debería, pero muchas veces no lo hace: arma una respuesta usando lo que tiene, porque es lo que sabe hacer.',
            },
            {
                'texto': 'Que la respuesta salga mal y con una cita al lado, lo que la hace más creíble que una respuesta sin fuente.',
                'correcta': True,
                'explicacion': 'La cita transmite verificación aunque no la haya. Por eso hay que mirar los fragmentos recuperados, no solo la respuesta.',
            },
            {
                'texto': 'Que el sistema se ponga más lento.',
                'explicacion': 'El costo es de confiabilidad, no de velocidad.',
            },
            {
                'texto': 'Que se rompa la búsqueda para las próximas preguntas.',
                'explicacion': 'Cada consulta es independiente. El problema es la respuesta de esta vez.',
            },
        ],
    },
    {
        'pregunta': 'En el mapa de significados, "burro" y "araña" quedaban lejos del vocabulario del yacimiento. ¿Qué muestra eso?',
        'opciones': [
            {
                'texto': 'Que el mapa está mal calculado.',
                'explicacion': 'El mapa está bien: refleja fielmente lo que el modelo entiende por esas palabras.',
            },
            {
                'texto': 'Que el modelo aprendió esas palabras del lenguaje corriente y no conoce su significado en el yacimiento.',
                'correcta': True,
                'explicacion': 'Y es la mejor demostración de por qué hace falta darle tus documentos: la jerga de tu empresa no está en internet.',
            },
            {
                'texto': 'Que hay que evitar la jerga cuando se usan estas herramientas.',
                'explicacion': 'Evitarla es un parche. La solución es darle el material donde esa jerga está definida.',
            },
            {
                'texto': 'Que el modelo es malo en español.',
                'explicacion': 'Entiende bien el español general. El problema es específico del vocabulario técnico de un oficio.',
            },
        ],
    },
]

QUIZ_S6 = [
    {
        'pregunta': '¿Qué distingue a un agente de un chatbot?',
        'opciones': [
            {
                'texto': 'Que el modelo que tiene adentro es más potente.',
                'explicacion': 'Suele ser el mismo modelo. La diferencia no está en el modelo sino en lo que lo rodea.',
            },
            {
                'texto': 'Que puede ejecutar herramientas y mirar el resultado, y decidir el paso siguiente con eso a la vista.',
                'correcta': True,
                'explicacion': 'Ese loop es todo. Un chatbot que se equivoca no se entera nunca; un agente recibe el error de vuelta y tiene la chance de corregirse.',
            },
            {
                'texto': 'Que fue entrenado específicamente para ser autónomo.',
                'explicacion': 'La autonomía viene del loop y de los permisos que le dieron, no de un entrenamiento distinto.',
            },
            {
                'texto': 'Que no alucina, porque verifica lo que hace.',
                'explicacion': 'Alucina igual. Lo que cambia es que algunos de sus errores vuelven como resultado observable, y esos los puede corregir.',
            },
        ],
    },
    {
        'pregunta': '¿Por qué un agente rinde peor en tareas largas que en tareas cortas?',
        'opciones': [
            {
                'texto': 'Porque se cansa y baja la calidad con el uso.',
                'explicacion': 'No hay fatiga: cada llamada es independiente. El problema es acumulativo pero por otra razón.',
            },
            {
                'texto': 'Porque arrastra todo lo anterior en cada vuelta: se vuelve más lento, más caro y más propenso a perder de vista el objetivo original.',
                'correcta': True,
                'explicacion': 'El contador de contexto del ejercicio lo muestra creciendo paso a paso. Una tarea de veinte pasos no es dos veces una de diez: es bastante peor.',
            },
            {
                'texto': 'Porque las herramientas fallan más cuando se usan muchas veces.',
                'explicacion': 'Las herramientas se comportan igual. Lo que se degrada es la capacidad del modelo de sostener el hilo.',
            },
            {
                'texto': 'Porque necesita permisos adicionales para tareas largas.',
                'explicacion': 'Los permisos son los mismos. El límite es de contexto, no de autorización.',
            },
        ],
    },
    {
        'pregunta': 'En la traza, el agente filtró por "AGUARAGUE" sin diéresis y le volvieron cero filas. Lo importante es el paso siguiente. ¿Por qué?',
        'opciones': [
            {
                'texto': 'Porque probó otra grafía hasta que funcionó.',
                'explicacion': 'Eso sería adivinar de nuevo. Hizo algo mejor.',
            },
            {
                'texto': 'Porque fue a leer los valores que realmente existen en la columna en vez de suponer otro, y ahí encontró la diéresis.',
                'correcta': True,
                'explicacion': 'Reemplazó una suposición por un dato. Un chatbot sin herramientas hubiera seguido escribiendo con total seguridad sobre una tabla vacía.',
            },
            {
                'texto': 'Porque avisó del error y frenó para consultar.',
                'explicacion': 'Frenar ante cada obstáculo lo volvería inútil. La gracia es que pudo resolverlo solo, con evidencia.',
            },
            {
                'texto': 'Porque reintentó la misma consulta y la segunda vez anduvo.',
                'explicacion': 'La misma consulta hubiera devuelto cero filas de nuevo. El error era del filtro, no de la ejecución.',
            },
        ],
    },
]

QUIZ_S7 = [
    {
        'pregunta': 'De estas cuatro afirmaciones de un informe generado con tu planilla adjunta, ¿cuál es la que más probablemente esté inventada?',
        'opciones': [
            {
                'texto': '"La producción de gas del bloque en junio fue de 1,847,320 metros cúbicos."',
                'explicacion': 'Sale de la planilla y la podés recalcular en dos minutos. Cuando el modelo suma números que le diste, suele acertar.',
            },
            {
                'texto': '"Esto representa una caída del 4.2% respecto de mayo."',
                'explicacion': 'También se deriva de los mismos datos. Una cuenta simple sobre lo que le entregaste es terreno seguro.',
            },
            {
                'texto': '"La caída se explica por la parada programada de la planta compresora entre el 8 y el 11 de junio."',
                'correcta': True,
                'explicacion': 'En la planilla hay caudales, no eventos operativos. El modelo no puede saber que hubo una parada ni sus fechas: construyó la explicación más plausible y la escribió con el mismo tono que las cifras reales.',
            },
            {
                'texto': '"Dos pozos no reportaron producción durante la segunda quincena."',
                'explicacion': 'Los huecos están en la planilla y se ven contando filas vacías. El modelo describe lo que ve, y ahí acierta.',
            },
        ],
    },
    {
        'pregunta': 'En la cacería marcaste todas las afirmaciones como sospechosas y encontraste todas las invenciones. ¿Por qué el puntaje no es perfecto?',
        'opciones': [
            {
                'texto': 'Por un detalle del puntaje que no importa en la práctica.',
                'explicacion': 'Importa, y bastante: es la diferencia entre una herramienta que te ahorra tiempo y una que no.',
            },
            {
                'texto': 'Porque desconfiar de todo cuesta el mismo tiempo que escribirlo a mano, y hace que la herramienta deje de servir.',
                'correcta': True,
                'explicacion': 'La habilidad que se entrena es la puntería: saber qué clase de afirmación exige fuente. Sin eso, o confiás de más o verificás todo, y las dos salen caras.',
            },
            {
                'texto': 'Porque el ejercicio premia la velocidad.',
                'explicacion': 'El tiempo no entra en el puntaje. Lo que se mide es cuántas invenciones encontraste y cuántas afirmaciones sanas marcaste de más.',
            },
            {
                'texto': 'Porque siempre hay que dejar alguna afirmación sin marcar.',
                'explicacion': 'No es una cuota. Si un texto tuviera todo inventado, marcarlo todo sería correcto.',
            },
        ],
    },
    {
        'pregunta': 'Alguien propone conectar un agente al sistema de control de la planta para que optimice en tiempo real. ¿Cuál es la objeción más fuerte?',
        'opciones': [
            {
                'texto': 'Que los modelos todavía no son lo bastante precisos para esa tarea.',
                'explicacion': 'La precisión mejora todos los años. Si el problema fuera ese, alcanzaría con esperar — y no alcanza.',
            },
            {
                'texto': 'Que el loop del agente funciona porque el error vuelve y se corrige, y ahí un paso equivocado no vuelve como mensaje de error sino como una válvula en la posición que no era.',
                'correcta': True,
                'explicacion': 'Toda la utilidad del agente supone que equivocarse es barato y reversible. En un sistema que opera equipos, ninguna de las dos cosas es cierta.',
            },
            {
                'texto': 'Que es caro de implementar.',
                'explicacion': 'El costo es un problema de proyecto. Acá el problema es de seguridad, y no se arregla con presupuesto.',
            },
            {
                'texto': 'Que la empresa no tiene todavía una política de uso.',
                'explicacion': 'La política hace falta, pero escribirla no vuelve segura una arquitectura que no lo es.',
            },
        ],
    },
    {
        'pregunta': 'Tenés que responder una consulta sobre qué obliga la normativa para informar un venteo. ¿Cómo lo hacés?',
        'opciones': [
            {
                'texto': 'Le preguntás al chatbot y usás la respuesta, que suele citar el decreto y el artículo.',
                'explicacion': 'Que cite un número de decreto y un artículo no significa que existan. Las respuestas normativas de memoria son el peor caso de uso, porque el costo del error es legal.',
            },
            {
                'texto': 'Le adjuntás el texto de la norma y le pedís que responda solo con eso, citando el artículo, y después abrís el artículo citado.',
                'correcta': True,
                'explicacion': 'Con el texto a la vista el modelo pasa de recordar a leer, que es donde es confiable. El chequeo final del artículo cuesta un minuto y cierra el tema.',
            },
            {
                'texto': 'Le preguntás y después le pedís que confirme si está seguro.',
                'explicacion': 'Va a confirmar con la misma seguridad con la que inventó. La confirmación no agrega información.',
            },
            {
                'texto': 'Le preguntás a dos chatbots distintos y comparás.',
                'explicacion': 'Dos modelos entrenados con textos parecidos pueden coincidir en el mismo invento plausible. Coincidir no es verificar.',
            },
        ],
    },
]

QUIZZES = {
    'quiz_s1': QUIZ_S1,
    'quiz_s2': QUIZ_S2,
    'quiz_s3': QUIZ_S3,
    'quiz_s4': QUIZ_S4,
    'quiz_s5': QUIZ_S5,
    'quiz_s6': QUIZ_S6,
    'quiz_s7': QUIZ_S7,
}


def build_quiz():
    for nombre, preguntas in QUIZZES.items():
        write_json(
            os.path.join(ROOT, f'{nombre}.json'),
            preguntas,
            source='elaboración propia para el curso',
        )
    total = sum(len(p) for p in QUIZZES.values())
    print(f'  quizzes: {len(QUIZZES)} sesiones, {total} preguntas')


# ---------------------------------------------------------------------------
# 4. Prompt builder cases — one per office task taught in session 3. Each slot
#    offers the same three levels: omitted, weak, solid. The contrast between
#    the last two is the lesson; the rubric alone cannot see it.
# ---------------------------------------------------------------------------

PROMPT_CASOS = [
    {
        'id': 'informe',
        'label': 'Resumen ejecutivo del informe mensual',
        'situacion': 'Tenés el informe mensual de producción del bloque, veintitantas páginas con '
        'tablas. El comité de operaciones quiere una página para la reunión del martes.',
        'slots': [
            {
                'componente': 'rol',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin rol', 'texto': '',
                     'comentario': 'Sin rol, el modelo elige un registro por su cuenta. Suele salir '
                     'un texto de divulgación genérico, ni técnico ni ejecutivo.'},
                    {'calidad': 'floja', 'etiqueta': 'Genérico', 'texto': 'Sos un asistente experto.',
                     'comentario': '"Experto" no dice en qué ni para quién. Un rol que no restringe '
                     'nada es casi lo mismo que no poner rol.'},
                    {'calidad': 'buena', 'etiqueta': 'Con oficio y audiencia',
                     'texto': 'Sos un ingeniero de producción senior que le escribe al comité de '
                     'operaciones: gente técnica, con poco tiempo y sin el detalle del día a día.',
                     'comentario': 'Fija el vocabulario y el nivel de detalle de una sola vez. '
                     'El rol útil dice oficio y audiencia, no adjetivos.'},
                ],
            },
            {
                'componente': 'contexto',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin contexto', 'texto': '',
                     'comentario': 'El modelo no sabe para qué se usa el resumen, así que no puede '
                     'decidir qué dejar afuera. Y decidir qué dejar afuera es todo el trabajo.'},
                    {'calidad': 'floja', 'etiqueta': 'Solo la fuente',
                     'texto': 'Contexto: te paso el informe mensual.',
                     'comentario': 'Decís qué es el documento pero no qué se juega con él. '
                     'El modelo resume "en general", que es resumir para nadie.'},
                    {'calidad': 'buena', 'etiqueta': 'Qué se decide con esto',
                     'texto': 'Contexto: te paso el informe mensual del bloque. El comité lo usa para '
                     'decidir si adelanta el workover del pozo con mayor caída de caudal, así que lo '
                     'que importa son los desvíos contra el mes anterior y sus causas.',
                     'comentario': 'Al decir qué decisión alimenta el resumen, le das el criterio '
                     'para jerarquizar. Ahora sabe qué es ruido y qué es señal.'},
                ],
            },
            {
                'componente': 'tarea',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin verbo', 'texto': '',
                     'comentario': 'Sin verbo no hay pedido. El modelo va a adivinar entre resumir, '
                     'comentar o reescribir, y a veces hace las tres.'},
                    {'calidad': 'floja', 'etiqueta': 'Vago',
                     'texto': 'Analizá el informe y decime qué te parece.',
                     'comentario': '"Qué te parece" invita a opinar. Vas a recibir adjetivos donde '
                     'querías hechos.'},
                    {'calidad': 'buena', 'etiqueta': 'Verbo y alcance',
                     'texto': 'Tarea: redactá el resumen ejecutivo, y marcá aparte cualquier cifra '
                     'del informe que no puedas ubicar en una tabla.',
                     'comentario': 'Un verbo concreto y un pedido de verificación en el mismo '
                     'movimiento. La segunda parte te ahorra la mitad del control posterior.'},
                ],
            },
            {
                'componente': 'formato',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin formato', 'texto': '',
                     'comentario': 'Vas a recibir la extensión que al modelo le parezca. Casi siempre '
                     'es más larga de lo que sirve.'},
                    {'calidad': 'floja', 'etiqueta': 'Solo el largo', 'texto': 'Formato: que sea corto.',
                     'comentario': '"Corto" no es una medida. Poné el número: cambia el resultado '
                     'más que cualquier otra instrucción de estilo.'},
                    {'calidad': 'buena', 'etiqueta': 'Estructura y tope',
                     'texto': 'Formato: máximo 300 palabras, en tres secciones — qué pasó, por qué, '
                     'qué se propone. Cada cifra con su unidad y el mes al que corresponde.',
                     'comentario': 'El tope de palabras fuerza la jerarquización. Pedir la unidad y '
                     'el mes al lado de cada cifra hace que el error se vea solo.'},
                ],
            },
            {
                'componente': 'ejemplos',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin ejemplo', 'texto': '',
                     'comentario': 'Se puede vivir sin ejemplo. Pero si ya tenés un "así me gusta", '
                     'no dárselo es tirar la mejor instrucción que tenías.'},
                    {'calidad': 'floja', 'etiqueta': 'Mencionado, no mostrado',
                     'texto': 'Seguí el estilo de los informes que ya usamos.',
                     'comentario': 'El modelo no conoce tus informes. Nombrar un estilo que no puede '
                     'ver es pedirle que invente uno y le ponga tu nombre.'},
                    {'calidad': 'buena', 'etiqueta': 'Una línea real, pegada',
                     'texto': 'Por ejemplo, así abría el mes pasado: "La producción del bloque cayó '
                     '4% contra septiembre, explicado casi por completo por la parada programada de '
                     'la planta compresora."',
                     'comentario': 'Una sola línea real transmite tono, densidad y nivel de detalle '
                     'mejor que un párrafo de instrucciones sobre el tono.'},
                ],
            },
        ],
        'modelo': 'Sos un ingeniero de producción senior que le escribe al comité de operaciones: '
        'gente técnica, con poco tiempo y sin el detalle del día a día.\n'
        'Contexto: te paso el informe mensual del bloque. El comité lo usa para decidir si adelanta '
        'el workover del pozo con mayor caída de caudal, así que lo que importa son los desvíos '
        'contra el mes anterior y sus causas.\n'
        'Tarea: redactá el resumen ejecutivo, y marcá aparte cualquier cifra del informe que no '
        'puedas ubicar en una tabla.\n'
        'Formato: máximo 300 palabras, en tres secciones — qué pasó, por qué, qué se propone. Cada '
        'cifra con su unidad y el mes al que corresponde.\n'
        'Por ejemplo, así abría el mes pasado: "La producción del bloque cayó 4% contra septiembre, '
        'explicado casi por completo por la parada programada de la planta compresora."',
        'note': 'Fijate que la pieza que más cambia la salida no es el rol: es el contexto que dice '
        'qué se decide con el resumen. Sin eso, el modelo no tiene con qué jerarquizar.',
    },
    {
        'id': 'minuta',
        'label': 'Minuta a partir de notas sueltas',
        'situacion': 'Saliste de la reunión de coordinación con dos carillas de notas telegráficas. '
        'Hay que mandar la minuta hoy, con los compromisos claros.',
        'slots': [
            {
                'componente': 'rol',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin rol', 'texto': '',
                     'comentario': 'Para una minuta el rol pesa menos que en otros casos. Igual '
                     'ayuda a fijar cuán formal sale el texto.'},
                    {'calidad': 'floja', 'etiqueta': 'Decorativo',
                     'texto': 'Sos un profesional muy organizado.',
                     'comentario': 'Un adjetivo de personalidad no cambia la salida. El rol sirve '
                     'cuando delimita un oficio, no cuando halaga.'},
                    {'calidad': 'buena', 'etiqueta': 'Función concreta',
                     'texto': 'Sos el coordinador que redacta las minutas del equipo de operaciones.',
                     'comentario': 'Una función real trae consigo un formato esperado: compromisos, '
                     'responsables, fechas.'},
                ],
            },
            {
                'componente': 'contexto',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin contexto', 'texto': '',
                     'comentario': 'Sin saber quiénes estaban, el modelo no puede atribuir '
                     'compromisos. Los va a inventar o los va a dejar sin dueño.'},
                    {'calidad': 'floja', 'etiqueta': 'Genérico',
                     'texto': 'Contexto: son notas de una reunión de trabajo.',
                     'comentario': 'Repite lo que ya se ve en las notas. Un contexto que no agrega '
                     'información no agrega nada.'},
                    {'calidad': 'buena', 'etiqueta': 'Quiénes y para qué',
                     'texto': 'Contexto: reunión semanal de coordinación entre operaciones, '
                     'mantenimiento y logística. La minuta se manda a los tres jefes de área y es el '
                     'registro de lo que cada uno se comprometió a hacer.',
                     'comentario': 'Ahora sabe que cada compromiso necesita un área responsable, '
                     'porque ese es el uso real del documento.'},
                ],
            },
            {
                'componente': 'tarea',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin verbo', 'texto': '',
                     'comentario': 'Pegar las notas sin pedido explícito suele devolver las notas '
                     'ordenadas, no una minuta.'},
                    {'calidad': 'floja', 'etiqueta': 'Ambiguo',
                     'texto': 'Pasá esto en limpio.',
                     'comentario': '"En limpio" puede significar corregir la ortografía o reescribir '
                     'todo. Dos salidas muy distintas para el mismo pedido.'},
                    {'calidad': 'buena', 'etiqueta': 'Con la regla del vacío',
                     'texto': 'Tarea: convertí las notas en minuta, separando lo que se discutió de '
                     'lo que se decidió. Si de una nota no surge quién es el responsable o para '
                     'cuándo, dejá el campo vacío en vez de completarlo.',
                     'comentario': 'La segunda oración es la importante. Autorizar el hueco es la '
                     'forma más barata de evitar que te invente responsables y fechas.'},
                ],
            },
            {
                'componente': 'formato',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin formato', 'texto': '',
                     'comentario': 'Vas a recibir prosa corrida, que es el peor formato posible para '
                     'algo que se consulta buscando un compromiso puntual.'},
                    {'calidad': 'floja', 'etiqueta': 'A medias',
                     'texto': 'Formato: en viñetas.',
                     'comentario': 'Mejor que nada, pero las viñetas no fuerzan que cada compromiso '
                     'tenga responsable y fecha.'},
                    {'calidad': 'buena', 'etiqueta': 'Tabla con columnas nombradas',
                     'texto': 'Formato: dos partes. Primero, temas tratados en viñetas. Después, una '
                     'tabla de compromisos con las columnas qué, quién y para cuándo.',
                     'comentario': 'Las columnas nombradas hacen visible lo que falta: un campo vacío '
                     'en "quién" salta a la vista, un párrafo sin responsable no.'},
                ],
            },
            {
                'componente': 'ejemplos',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin ejemplo', 'texto': '',
                     'comentario': 'Con un formato de tabla bien especificado, el ejemplo aporta '
                     'menos que en otros casos.'},
                    {'calidad': 'floja', 'etiqueta': 'Abstracto',
                     'texto': 'Por ejemplo, poné cosas como tareas y responsables.',
                     'comentario': 'Un ejemplo que no es un ejemplo. Repite la instrucción con otras '
                     'palabras.'},
                    {'calidad': 'buena', 'etiqueta': 'Una fila concreta',
                     'texto': 'Por ejemplo, una fila válida: "Cambiar la válvula de seguridad del '
                     'separador | Mantenimiento | 15 de marzo".',
                     'comentario': 'Muestra el nivel de detalle esperado en cada columna. Con una '
                     'fila alcanza.'},
                ],
            },
        ],
        'modelo': 'Sos el coordinador que redacta las minutas del equipo de operaciones.\n'
        'Contexto: reunión semanal de coordinación entre operaciones, mantenimiento y logística. La '
        'minuta se manda a los tres jefes de área y es el registro de lo que cada uno se comprometió '
        'a hacer.\n'
        'Tarea: convertí las notas en minuta, separando lo que se discutió de lo que se decidió. Si '
        'de una nota no surge quién es el responsable o para cuándo, dejá el campo vacío en vez de '
        'completarlo.\n'
        'Formato: dos partes. Primero, temas tratados en viñetas. Después, una tabla de compromisos '
        'con las columnas qué, quién y para cuándo.\n'
        'Por ejemplo, una fila válida: "Cambiar la válvula de seguridad del separador | '
        'Mantenimiento | 15 de marzo".',
        'note': 'Este caso tiene una pieza que no está en la lista de cinco: la instrucción de dejar '
        'el campo vacío. Autorizar explícitamente el "no sé" es la defensa más efectiva contra las '
        'invenciones, y no aparece en ninguna rúbrica de estructura.',
    },
    {
        'id': 'paper',
        'label': 'Triaje de un paper técnico',
        'situacion': 'Te pasaron un paper de la Society of Petroleum Engineers (SPE) de 30 páginas '
        'sobre control de arena. Querés saber en cinco minutos si vale la pena leerlo entero.',
        'slots': [
            {
                'componente': 'rol',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin rol', 'texto': '',
                     'comentario': 'Sin rol el resumen sale en registro de divulgación, explicando '
                     'cosas que ya sabés y salteando las que te importan.'},
                    {'calidad': 'floja', 'etiqueta': 'Demasiado amplio',
                     'texto': 'Sos un experto en petróleo.',
                     'comentario': 'El dominio es tan ancho que no restringe nada. Un experto en '
                     'petróleo puede ser geofísico o comercializador.'},
                    {'calidad': 'buena', 'etiqueta': 'Especialidad y propósito',
                     'texto': 'Sos un ingeniero de terminación de pozos que hace triaje de '
                     'bibliografía para su equipo.',
                     'comentario': 'La especialidad fija qué es obvio y qué es novedad. El propósito '
                     'de triaje fija que el resumen sirve para decidir, no para reemplazar la '
                     'lectura.'},
                ],
            },
            {
                'componente': 'contexto',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin contexto', 'texto': '',
                     'comentario': 'Sin saber contra qué comparás, no puede decirte si el paper trae '
                     'algo que no tengas.'},
                    {'calidad': 'floja', 'etiqueta': 'Sin el problema propio',
                     'texto': 'Contexto: es un paper sobre control de arena.',
                     'comentario': 'Eso ya está en el título del paper. El contexto que sirve es el '
                     'tuyo, no el del documento.'},
                    {'calidad': 'buena', 'etiqueta': 'Tu problema como filtro',
                     'texto': 'Contexto: en nuestros pozos usamos mallas ranuradas en arenas poco '
                     'consolidadas y tenemos problemas de taponamiento. Quiero saber si este paper '
                     'aplica a ese escenario o si trata otro tipo de terminación.',
                     'comentario': 'Convierte el resumen en una respuesta a tu pregunta. La salida '
                     'deja de ser "de qué trata" y pasa a ser "te sirve o no".'},
                ],
            },
            {
                'componente': 'tarea',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin verbo', 'texto': '',
                     'comentario': 'Pegar el paper sin pedido devuelve un resumen genérico, que es '
                     'justo lo que no necesitás para decidir.'},
                    {'calidad': 'floja', 'etiqueta': 'El pedido por defecto',
                     'texto': 'Resumime el paper.',
                     'comentario': 'Funciona, y por eso es la trampa: devuelve algo razonable que no '
                     'responde tu pregunta real, que es si lo leés o no.'},
                    {'calidad': 'buena', 'etiqueta': 'Extraer y recomendar',
                     'texto': 'Tarea: extraé el problema que ataca, el método, las condiciones del '
                     'ensayo y los resultados numéricos. Después decime si aplica a mi escenario, y '
                     'si no aplica, por qué no.',
                     'comentario': 'Separa la extracción del juicio. Podés verificar la primera parte '
                     'contra el paper y quedarte con la segunda como opinión.'},
                ],
            },
            {
                'componente': 'formato',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin formato', 'texto': '',
                     'comentario': 'Un resumen en prosa obliga a leerlo entero para encontrar el '
                     'único dato que buscabas.'},
                    {'calidad': 'floja', 'etiqueta': 'Solo el largo',
                     'texto': 'Formato: media página.',
                     'comentario': 'Limita el tamaño pero no la estructura. Vas a tener que buscar '
                     'los números adentro del párrafo.'},
                    {'calidad': 'buena', 'etiqueta': 'Campos y trazabilidad',
                     'texto': 'Formato: una tabla con las filas problema, método, condiciones, '
                     'resultados y limitaciones declaradas por los autores. Al lado de cada dato '
                     'numérico, la página de donde lo sacaste. Cerrá con una línea: leerlo entero, '
                     'hojearlo o descartarlo.',
                     'comentario': 'Pedir la página de cada número es lo que convierte el resumen en '
                     'verificable. Sin eso tenés que releer el paper para controlarlo, y perdiste el '
                     'tiempo que querías ganar.'},
                ],
            },
            {
                'componente': 'ejemplos',
                'opciones': [
                    {'calidad': 'ninguna', 'etiqueta': 'Sin ejemplo', 'texto': '',
                     'comentario': 'Con las filas de la tabla ya nombradas, el ejemplo agrega poco.'},
                    {'calidad': 'floja', 'etiqueta': 'Fuera de lugar',
                     'texto': 'Por ejemplo, hacelo como un resumen de Wikipedia.',
                     'comentario': 'Un ejemplo que contradice el formato pedido. Dos instrucciones '
                     'que pelean entre sí dan resultados impredecibles.'},
                    {'calidad': 'buena', 'etiqueta': 'Una celda modelo',
                     'texto': 'Por ejemplo, la fila de resultados debería verse así: "Reducción del '
                     'taponamiento del 60% contra malla convencional, en ensayo de laboratorio con '
                     'arena sintética (p. 14)."',
                     'comentario': 'Muestra los tres ingredientes juntos: el número, la condición en '
                     'que vale y la página. Difícil de explicar, fácil de mostrar.'},
                ],
            },
        ],
        'modelo': 'Sos un ingeniero de terminación de pozos que hace triaje de bibliografía para su '
        'equipo.\n'
        'Contexto: en nuestros pozos usamos mallas ranuradas en arenas poco consolidadas y tenemos '
        'problemas de taponamiento. Quiero saber si este paper aplica a ese escenario o si trata '
        'otro tipo de terminación.\n'
        'Tarea: extraé el problema que ataca, el método, las condiciones del ensayo y los resultados '
        'numéricos. Después decime si aplica a mi escenario, y si no aplica, por qué no.\n'
        'Formato: una tabla con las filas problema, método, condiciones, resultados y limitaciones '
        'declaradas por los autores. Al lado de cada dato numérico, la página de donde lo sacaste. '
        'Cerrá con una línea: leerlo entero, hojearlo o descartarlo.\n'
        'Por ejemplo, la fila de resultados debería verse así: "Reducción del taponamiento del 60% '
        'contra malla convencional, en ensayo de laboratorio con arena sintética (p. 14)."',
        'note': 'Pedir la página de cada cifra cambia la economía del ejercicio: el resumen pasa de '
        'ser algo en lo que confiás a ser algo que podés controlar en dos minutos.',
    },
]


def build_prompt_casos():
    write_json(
        os.path.join(ROOT, 'prompt_casos.json'),
        PROMPT_CASOS,
        source='elaboración propia para el curso',
    )


# ---------------------------------------------------------------------------
# 5. Decline curves — real monthly production of conventional gas wells of the
#    Noroeste basin (Salta). Same Devonian-Carboniferous sub-andean reservoirs
#    (huamampampa, tupambi, icla, santa rosa) that YPFB Andina produces from
#    across the border, so the audience reads its own geology.
#
#    Wells are picked by idpozo, not by sigla: the same sigla shows up more
#    than once when a well reports several producing layers.
#
#    Requires scripts/_cache/, produced by: python scripts/fetch_capiv_gas.py
# ---------------------------------------------------------------------------

# Teaching wells, generated from known Arps parameters. They come first in the
# exercise on purpose: on real data the monthly rate mixes reservoir depletion
# with compressor availability, plant constraints, line backpressure and liquid
# loading, so a fit there is never a clean read of the reservoir. Learn the tool
# on a curve that has an answer, then meet the noise.
DECLINE_ESCUELA = [
    {
        'id': 'escuela-exp',
        'sigla': 'Pozo escuela 1',
        'formacion': 'exponencial (b = 0)',
        'verdad': {'qi': 320.0, 'Di': 0.021, 'b': 0.0},
        'ruido': 0.02,
        'meses': 72,
        'nota': 'Declinación exponencial pura: el caso más simple, y el que se usa como referencia '
        'conservadora. Con b en cero y el Di correcto, la curva pasa por el medio de los puntos. '
        'El ruido que ves es de medición, del orden del 2%.',
    },
    {
        'id': 'escuela-hip',
        'sigla': 'Pozo escuela 2',
        'formacion': 'hiperbólica (b = 0.6)',
        'verdad': {'qi': 780.0, 'Di': 0.055, 'b': 0.6},
        'ruido': 0.03,
        'meses': 72,
        'nota': 'Hiperbólica: cae fuerte al principio y después la cola se estira. Si intentás '
        'ajustarla con b en cero vas a poder acomodar los primeros meses o los últimos, pero nunca '
        'los dos a la vez. Ahí se entiende para qué existe b.',
    },
]

DECLINE_POZOS = [
    {
        'idpozo': '34585',
        'nota': 'El más parejo de los reales: cae de forma sostenida durante siete años y medio, sin '
        'saltos. Aun así, la curva que ves no es solo el reservorio despresurizándose — también está '
        'la disponibilidad de compresión y la contrapresión de línea. Que ajuste bien no prueba que '
        'sea declinación pura; prueba que nada la interrumpió de golpe.',
    },
    {
        'idpozo': '79164',
        'nota': 'Declinación tan suave que en siete años perdió apenas un cuarto del caudal, y el '
        'ruido de mes a mes es del mismo tamaño que la tendencia. Vas a encontrar muchas '
        'combinaciones de b y Di que ajustan casi igual de bien: los datos no alcanzan para elegir '
        'entre ellas. Un ajuste con pocos datos de caída no es una predicción.',
    },
    {
        'idpozo': '153510',
        'nota': 'Parecido al primero pero la mitad de caudal. Buen pozo para comprobar que qi y Di '
        'hacen cosas distintas: uno mueve la curva entera, el otro cambia su pendiente.',
    },
    {
        'idpozo': '127112',
        'nota': 'Declinación intermedia sobre santa rosa. Probá ajustarlo primero en metros cúbicos '
        'por mes y después por día: el serrucho desaparece y el error baja sin que toques nada.',
    },
    {
        'idpozo': '10639',
        'nota': 'Casi no declina: en siete años perdió menos de un quinto de su caudal. Necesita un '
        'Di muy chico. Un pozo así vale por su permanencia, no por su caudal inicial.',
    },
    {
        'idpozo': '34663',
        'nota': 'Acá ningún juego de parámetros ajusta bien, y ese es el punto. Seis años de meseta '
        'y después un derrumbe en doce meses no es una declinación: es una intervención, un cierre o '
        'la entrada de agua. Arps describe un reservorio que se despresuriza solo, y no fue lo que '
        'pasó. El modelo no sabe nada de la operación del pozo — eso lo sabés vos.',
    },
]


def _arps(qi, Di, b, t):
    if t <= 0 or Di <= 0:
        return qi
    if b < 1e-6:
        return qi * math.exp(-Di * t)
    return qi / (1 + b * Di * t) ** (1 / b)


def _serie_escuela(spec):
    """Monthly VOLUME from a known daily rate, so the exercise's per-day toggle
    recovers the true curve exactly and the calendar sawtooth shows up here too.
    Seeded: the same JSON comes out of every rebuild."""
    rng = random.Random(20260730)
    v = spec['verdad']
    serie = []
    anio, mes = 2019, 1
    for t in range(spec['meses']):
        dias = calendar.monthrange(anio, mes)[1]
        tasa = _arps(v['qi'], v['Di'], v['b'], t)
        medido = tasa * (1 + rng.uniform(-spec['ruido'], spec['ruido']))
        serie.append({
            'ym': f'{anio:04d}-{mes:02d}',
            'gas': round(medido * dias, 2),
            'pet': 0.0,
            'agua': 0.0,
        })
        mes += 1
        if mes > 12:
            mes, anio = 1, anio + 1
    return serie


def build_decline_wells():
    cache = os.path.join(os.path.dirname(__file__), '_cache')
    csv_path = os.path.join(cache, 'capiv_noroeste_monthly.csv')
    meta_path = os.path.join(cache, 'capiv_noroeste_wells.json')
    if not (os.path.exists(csv_path) and os.path.exists(meta_path)):
        raise SystemExit(
            'Falta scripts/_cache/. Corré primero: python scripts/fetch_capiv_gas.py'
        )

    import csv as _csv

    with open(meta_path, encoding='utf-8') as f:
        wells = json.load(f)

    series = {}
    with open(csv_path, encoding='utf-8') as f:
        for row in _csv.DictReader(f):
            series.setdefault(row['idpozo'], []).append(row)

    out = []
    for spec in DECLINE_ESCUELA:
        out.append({
            'id': spec['id'],
            'tipo': 'escuela',
            'sigla': spec['sigla'],
            'area': 'generado para el curso',
            'formacion': spec['formacion'],
            'empresa': '',
            'verdad': spec['verdad'],
            'nota': spec['nota'],
            'serie': _serie_escuela(spec),
        })

    for elegido in DECLINE_POZOS:
        idp = elegido['idpozo']
        w = wells[idp]
        filas = sorted(series[idp], key=lambda r: r['ym'])
        out.append({
            'id': idp,
            'tipo': 'real',
            'sigla': w['sigla'],
            'area': w['area'],
            'formacion': ', '.join(w['formaciones']),
            'empresa': w['empresa'],
            'verdad': None,
            'nota': elegido['nota'],
            'serie': [
                {
                    'ym': r['ym'],
                    'gas': float(r['prod_gas']),
                    'pet': float(r['prod_pet']),
                    'agua': float(r['prod_agua']),
                }
                for r in filas
            ],
        })

    reales = [p for p in out if p['tipo'] == 'real']
    desde = min(p['serie'][0]['ym'] for p in reales)
    hasta = max(p['serie'][-1]['ym'] for p in reales)
    write_json(
        os.path.join(ROOT, 'decline_wells.json'),
        out,
        source='pozos escuela generados a partir de parámetros de Arps conocidos; pozos reales del '
        'Capítulo IV — producción de pozos de gas y petróleo, Secretaría de Energía (Argentina), '
        'datos.energia.gob.ar, cuenca Noroeste (Salta).',
        source_date=hasta,
    )
    print(f'  decline: {len(DECLINE_ESCUELA)} de escuela + {len(reales)} reales ({desde} a {hasta})')
    return out


# ---------------------------------------------------------------------------
# 6. Agent trace — a curated run, not a literal capture. Curated on purpose:
#    the teaching value is in a specific failure and its recovery (the agent
#    assumes a column name, the read fails, it re-reads the header and fixes
#    itself), and a real capture rarely fails on cue.
#
#    The data it works on is the real Capítulo IV file from session 4, so the
#    numbers that appear in the outputs are the numbers of that dataset.
# ---------------------------------------------------------------------------

AGENT_TRACE = {
    'objetivo': 'Averiguá cuál de los pozos de gas de Aguaragüe declinó más rápido en los últimos '
    'dos años, y hacé un gráfico.',
    'modelo': 'Un agente con acceso a una terminal y a un intérprete de Python, sobre una carpeta '
    'con el CSV de producción de Capítulo IV.',
    'pasos': [
        {
            'pensamiento': 'No sé qué archivos hay ni cómo son. Antes de escribir código, miro.',
            'herramienta': 'bash',
            'entrada': 'ls -la datos/',
            'salida': 'total 33240\n-rw-r--r-- 1 user user 34012984 jul 30 10:12 capitulo_iv_pozos.csv\n'
            '-rw-r--r-- 1 user user   612844 jul 30 10:12 produccion_mensual.csv',
            'estado': 'ok',
        },
        {
            'pensamiento': 'Dos archivos. Necesito saber qué columnas tienen antes de cruzarlos.',
            'herramienta': 'bash',
            'entrada': 'head -1 datos/produccion_mensual.csv',
            'salida': 'idpozo,ym,prod_gas,prod_pet,prod_agua',
            'estado': 'ok',
        },
        {
            'pensamiento': 'La producción está por idpozo, sin nombre ni área. El nombre debe estar '
            'en el otro archivo. Voy a filtrar Aguaragüe por la columna "area".',
            'herramienta': 'python',
            'entrada': "import pandas as pd\n"
            "pozos = pd.read_csv('datos/capitulo_iv_pozos.csv')\n"
            "agua = pozos[pozos['area'] == 'AGUARAGUE']\n"
            "print(len(agua))",
            'salida': '0',
            'estado': 'error',
        },
        {
            'pensamiento': 'Cero pozos. O el área se llama distinto, o la escribí mal. En vez de '
            'adivinar otra vez, miro los valores que existen de verdad.',
            'herramienta': 'python',
            'entrada': "print([a for a in pozos['area'].unique() if 'GUA' in str(a).upper()])",
            'salida': "['AGUARAGÜE', 'AGUA SALADA', 'AGUARAGÜE NORTE']",
            'estado': 'ok',
        },
        {
            'pensamiento': 'Lleva diéresis: AGUARAGÜE. Mi cadena sin acento nunca iba a coincidir. '
            'Corrijo y sigo.',
            'herramienta': 'python',
            'entrada': "agua = pozos[pozos['area'] == 'AGUARAGÜE']\n"
            "print(len(agua), agua['tipopozo'].value_counts().to_dict())",
            'salida': "428 {'Gasífero': 115, 'Otro tipo': 203, 'Petrolífero': 88, 'Inyección de Agua': 22}",
            'estado': 'ok',
        },
        {
            'pensamiento': 'Me quedo con los gasíferos y cruzo con la producción de los últimos '
            '24 meses. Ojo: la producción es volumen mensual, así que febrero siempre parece bajo. '
            'Divido por días del mes para comparar caudales.',
            'herramienta': 'python',
            'entrada': "gas = agua[agua['tipopozo'] == 'Gasífero']['idpozo']\n"
            "prod = pd.read_csv('datos/produccion_mensual.csv')\n"
            "p = prod[prod['idpozo'].isin(gas)].copy()\n"
            "p['fecha'] = pd.to_datetime(p['ym'])\n"
            "p = p[p['fecha'] >= p['fecha'].max() - pd.DateOffset(months=24)]\n"
            "p['dias'] = p['fecha'].dt.days_in_month\n"
            "p['caudal'] = p['prod_gas'] / p['dias']\n"
            "print(p['idpozo'].nunique(), 'pozos,', len(p), 'registros')",
            'salida': '115 pozos, 2760 registros',
            'estado': 'ok',
        },
        {
            'pensamiento': 'Para cada pozo, comparo el caudal promedio del primer trimestre contra '
            'el del último. Descarto los que casi no producen, donde el porcentaje engaña.',
            'herramienta': 'python',
            'entrada': "r = []\n"
            "for pid, g in p.sort_values('fecha').groupby('idpozo'):\n"
            "    ini, fin = g['caudal'].head(3).mean(), g['caudal'].tail(3).mean()\n"
            "    if ini > 5:\n"
            "        r.append({'idpozo': pid, 'caida': 1 - fin / ini})\n"
            "res = pd.DataFrame(r).sort_values('caida', ascending=False)\n"
            "print(res.head(3).to_string(index=False))",
            'salida': ' idpozo    caida\n 110457 0.612903\n 118820 0.447511\n 108663 0.318844',
            'estado': 'ok',
        },
        {
            'pensamiento': 'Ya tengo el pozo que más cayó. Le pongo el nombre y grafico su serie.',
            'herramienta': 'python',
            'entrada': "top = res.iloc[0]['idpozo']\n"
            "print(pozos[pozos['idpozo'] == top][['sigla', 'formacion']].to_string(index=False))",
            'salida': '          sigla formacion\n TPT.St.CD-1021   tupambi',
            'estado': 'ok',
        },
        {
            'pensamiento': 'Grafico caudal contra tiempo y guardo la figura.',
            'herramienta': 'python',
            'entrada': "import matplotlib; matplotlib.use('Agg')\n"
            "import matplotlib.pyplot as plt\n"
            "s = p[p['idpozo'] == top].sort_values('fecha')\n"
            "plt.figure(figsize=(8, 4))\n"
            "plt.plot(s['fecha'], s['caudal'], marker='o')\n"
            "plt.ylabel('Mm³/día'); plt.title('TPT.St.CD-1021 — caudal de gas')\n"
            "plt.savefig('declinacion.png', dpi=120, bbox_inches='tight')",
            'salida': 'Figura guardada en declinacion.png',
            'estado': 'ok',
        },
        {
            'pensamiento': 'Tengo la respuesta y el gráfico. Le aviso, y le digo qué NO verifiqué.',
            'herramienta': 'respuesta',
            'entrada': '',
            'salida': 'De los 115 pozos gasíferos de Aguaragüe, el que más cayó en los últimos dos '
            'años es TPT.St.CD-1021 (formación tupambi): perdió 61% de caudal entre el primer y el '
            'último trimestre. El gráfico quedó en declinacion.png.\n\n'
            'Dos advertencias: comparé promedios de tres meses contra tres meses, así que una parada '
            'de planta al final del período se vería como declinación. Y no revisé si el pozo tuvo '
            'una intervención, que explicaría la caída mejor que el agotamiento.',
            'estado': 'ok',
        },
    ],
}


def build_agent_trace():
    write_json(
        os.path.join(ROOT, 'agent_trace.json'),
        AGENT_TRACE,
        source='traza curada para el curso. Reconstruye una corrida real sobre el dataset de '
        'Capítulo IV: los comandos, el error de la diéresis y las salidas son representativos, no '
        'una captura literal de pantalla.',
    )


# ---------------------------------------------------------------------------
# 7. Hallucination hunt. Every fabricated claim below is the kind of mistake a
#    model actually makes: false precision, an invented citation, a unit slip,
#    a plausible causal story, arithmetic that looks right. The sound claims are
#    there so the exercise teaches discrimination, not blanket suspicion.
# ---------------------------------------------------------------------------

ALUCINACIONES = [
    {
        'id': 'parte',
        'label': 'Parte de producción mensual',
        'contexto': 'Le pediste al chatbot que redacte el resumen del mes a partir de una planilla '
        'de producción que le pegaste. Esto es lo que devolvió. Marcá lo que no usarías sin '
        'verificar antes.',
        'segmentos': [
            {
                'texto': 'La producción de gas del bloque durante junio fue de 1,847,320 metros '
                'cúbicos.',
                'porque': 'Está bien: es la suma de la planilla que le pasaste, y podés recalcularla '
                'en dos minutos. Una cifra que sale de datos que vos entregaste es verificable.',
            },
            {
                'texto': 'Esto representa una caída del 4.2% respecto de mayo.',
                'porque': 'También correcta y recalculable a partir de los mismos datos. Cuando el '
                'modelo hace una cuenta simple sobre números que le diste, suele acertar.',
            },
            {
                'texto': 'La caída se explica principalmente por la parada programada de la planta '
                'compresora entre el 8 y el 11 de junio.',
                'inventada': True,
                'porque': 'Acá inventó una causa. En la planilla hay caudales, no eventos '
                'operativos: el modelo no tiene forma de saber que hubo una parada, ni sus fechas. '
                'Construyó la explicación más plausible y la escribió con la misma seguridad que '
                'las cifras reales.',
                'comoVerificar': 'Buscá el parte de novedades o el registro de paradas del mes. Si '
                'no figura ninguna parada en esas fechas, la frase entera se cae — y con ella la '
                'conclusión del informe.',
            },
            {
                'texto': 'El pozo con mayor aporte fue el AG-14, con 312,500 metros cúbicos.',
                'inventada': True,
                'porque': 'Falsa precisión con nombre propio. El número termina en cifras redondas '
                'sospechosas y el identificador del pozo puede no existir en tu planilla. Los '
                'modelos completan nombres con el patrón que vieron, no con tu nomenclatura.',
                'comoVerificar': 'Buscá "AG-14" en la planilla original. Si no está, el modelo '
                'inventó el pozo. Si está, ordená por producción y comprobá que sea el primero.',
            },
            {
                'texto': 'El corte de agua promedio se mantuvo estable en 18%.',
                'porque': 'Verificable contra la planilla. Es el tipo de afirmación agregada que el '
                'modelo calcula bien cuando tiene los datos delante.',
            },
            {
                'texto': 'Dos pozos no reportaron producción durante la segunda quincena.',
                'porque': 'Correcta: los huecos están en la planilla y se ven contando filas vacías. '
                'Notá que el modelo dice que no reportaron, no por qué — cuando se limita a '
                'describir lo que ve, acierta.',
            },
            {
                'texto': 'Se recomienda evaluar la instalación de bombeo neumático en los tres pozos '
                'de menor caudal, con una recuperación estimada de 45,000 metros cúbicos mensuales.',
                'inventada': True,
                'porque': 'La recomendación puede ser razonable, pero el número de recuperación es '
                'puro invento: estimarlo requiere un modelo de reservorio y datos que el chatbot no '
                'tiene. Una cifra de beneficio inventada es la más peligrosa de todas, porque es la '
                'que termina en una presentación a gerencia.',
                'comoVerificar': 'Preguntale de dónde salió el número. Si no puede señalar un dato '
                'de la planilla ni un cálculo explícito, no existe. Una estimación así se hace con '
                'análisis nodal, no con una frase.',
            },
        ],
        'note': 'Fijate el patrón: las tres invenciones son las tres afirmaciones que NO se pueden '
        'derivar de la planilla. El modelo no distingue entre resumir lo que tiene y completar lo '
        'que le falta, y escribe las dos cosas con el mismo tono.',
    },
    {
        'id': 'paper',
        'label': 'Resumen de un artículo técnico',
        'contexto': 'Le pediste un resumen de un artículo sobre control de arena en pozos de gas. '
        'No le adjuntaste el artículo: se lo pediste de memoria. Marcá lo que no usarías sin '
        'verificar.',
        'segmentos': [
            {
                'texto': 'El control de arena busca evitar que los granos de la formación migren '
                'hacia el pozo y dañen las instalaciones.',
                'porque': 'Conocimiento general de la industria, repetido en miles de textos. Este '
                'tipo de afirmación amplia es donde los modelos son más confiables.',
            },
            {
                'texto': 'Las dos familias principales de solución son las mallas o filtros y el '
                'empaque de grava.',
                'porque': 'También conocimiento general y correcto. Sirve como marco, no como dato.',
            },
            {
                'texto': 'Según Al-Rashidi et al. (2019), publicado en el Journal of Petroleum '
                'Technology, las mallas expandibles redujeron el taponamiento un 63% en pozos del '
                'Golfo Pérsico.',
                'inventada': True,
                'porque': 'La cita completa es el invento clásico: autor plausible, año plausible, '
                'revista real, porcentaje específico. Los modelos generan referencias que tienen la '
                'forma de una cita real sin corresponder a ningún artículo existente.',
                'comoVerificar': 'Buscá el título o los autores en OnePetro o en Google Scholar. Si '
                'no aparece el artículo exacto, la cita es inventada. Nunca copies una referencia '
                'sin haberla abierto.',
            },
            {
                'texto': 'La elección entre una y otra depende de la distribución granulométrica de '
                'la arena y de la geometría del pozo.',
                'porque': 'Correcto y general. Es el tipo de criterio que aparece en cualquier '
                'manual de terminación.',
            },
            {
                'texto': 'La norma API RP 58 establece que el empaque de grava debe dimensionarse '
                'con un factor de 6 a 8 veces el percentil D50 de la formación.',
                'inventada': True,
                'porque': 'Mezcla una norma real con un contenido que no le corresponde. El criterio '
                'de dimensionamiento suele expresarse con el D50 pero el número y la norma citada '
                'están cambiados. Es más difícil de detectar que una cita falsa entera, justamente '
                'porque la norma existe.',
                'comoVerificar': 'Abrí la norma citada y buscá el criterio. Si tu empresa no la '
                'tiene, preguntale a alguien de terminación: un especialista detecta el número '
                'cambiado al instante.',
            },
            {
                'texto': 'En pozos horizontales el problema se complica porque la distribución del '
                'flujo a lo largo del tramo no es uniforme.',
                'porque': 'Correcto y bien conocido. Otra afirmación de marco general.',
            },
        ],
        'note': 'Las dos invenciones son las dos afirmaciones más específicas y más citables: la '
        'referencia y el número normativo. Es exactamente al revés de lo que dice la intuición — '
        'cuanto más precisa suena una frase generada sin fuente, más hay que desconfiar.',
    },
    {
        'id': 'normativa',
        'label': 'Consulta sobre normativa',
        'contexto': 'Le preguntaste al chatbot qué obligaciones tiene la empresa para informar un '
        'venteo de gas. Marcá lo que no usarías sin verificar.',
        'segmentos': [
            {
                'texto': 'En general, los marcos regulatorios de hidrocarburos exigen registrar y '
                'reportar los eventos de venteo a la autoridad de aplicación.',
                'porque': 'Afirmación general y prudente, con el "en general" que corresponde. Sirve '
                'para orientarse, no para cumplir.',
            },
            {
                'texto': 'El Decreto Supremo 28397, artículo 14, obliga a informar todo venteo mayor '
                'a 500 metros cúbicos dentro de las 48 horas.',
                'inventada': True,
                'porque': 'Número de norma, artículo, umbral y plazo: los cuatro elementos suenan '
                'exactos y ninguno es verificable sin ir a la fuente. Las respuestas sobre normativa '
                'son el peor caso de uso de un chatbot sin documentos adjuntos, porque el costo del '
                'error es legal.',
                'comoVerificar': 'Buscá el texto de la norma en el boletín oficial o en la página de '
                'la autoridad. Cualquier consulta normativa se responde con el texto a la vista, no '
                'de memoria — ni la del modelo ni la tuya.',
            },
            {
                'texto': 'La obligación alcanza tanto al venteo por emergencia como al venteo '
                'operativo programado, aunque el tratamiento suele diferir entre ambos.',
                'porque': 'Prudente y bien matizada: dice "suele" en vez de afirmar un régimen '
                'concreto. Cuando el modelo se cuida así, generalmente está en terreno general y no '
                'inventando un dato.',
            },
            {
                'texto': 'Además debe presentarse un informe mensual consolidado con el volumen '
                'total venteado y las causas de cada evento.',
                'inventada': True,
                'porque': 'Suena razonable y probablemente se parezca a la obligación real, y eso lo '
                'vuelve más peligroso que un disparate: una afirmación casi correcta pasa cualquier '
                'revisión rápida.',
                'comoVerificar': 'Contrastá con el procedimiento interno de gestión ambiental de tu '
                'empresa, que ya tiene mapeadas las obligaciones vigentes.',
            },
            {
                'texto': 'Te recomiendo confirmar esto con el área legal o de medio ambiente antes '
                'de actuar, porque la normativa cambia y puede variar según la jurisdicción.',
                'porque': 'Esta advertencia es correcta y es lo más valioso de la respuesta. El '
                'problema es que aparece al final, después de dos párrafos escritos con total '
                'seguridad, y la mayoría de la gente ya dejó de leer.',
            },
        ],
        'note': 'Este es el caso donde conviene no usar un chatbot sin adjuntarle la norma. Fijate '
        'que la respuesta trae su propia advertencia al final: el modelo "sabe" que puede estar '
        'equivocado y aun así escribió el número de decreto y el plazo sin ninguna marca de duda.',
    },
]


def build_alucinaciones():
    write_json(
        os.path.join(ROOT, 'alucinaciones.json'),
        ALUCINACIONES,
        source='informes redactados para el curso, con errores plantados a propósito. Los tipos de '
        'error son los que producen los modelos de verdad: falsa precisión, citas inventadas y '
        'normativa de memoria.',
    )


if __name__ == '__main__':
    build_next_token()
    build_quiz()
    build_prompt_casos()
    build_decline_wells()
    build_agent_trace()
    build_alucinaciones()
    ex = build_tokenizer_examples()
    for e in ex:
        print(f"  {e['id']}: {len(e['texto'])} chars -> {len(e['tokens'])} tokens")
    print('OK: public/data/ actualizado')
