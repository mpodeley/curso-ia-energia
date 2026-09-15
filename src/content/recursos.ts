// Curated pre-session material, one list per day (second edition: four days,
// each merging two sessions of the first edition).
//
// Every link here was opened and checked on the date below — titles, channels
// and durations are the real ones, not remembered. A course that teaches
// verification cannot ship a dead link or an invented citation. When you add
// one, check it and move the date; when a link rots, remove it rather than
// leaving it "probably fine".
//
// Quality bar (instructor's rule, 2026-08-10): first-rate sources only —
// 3Blue1Brown, Welch Labs, Khan Academy, Anthropic, Distill, official tools
// and data sources. No generic-divulgation YouTube channels, in any language.
// A short list beats a padded one; a session with no external resource is fine.

export const VERIFICADO = '2026-09-15'

export type Recurso = {
  tipo: 'video' | 'lectura' | 'herramienta' | 'curso'
  titulo: string
  url: string
  /** Channel, publication or author. */
  fuente: string
  /** Videos and courses. */
  duracion?: string
  /** 'YYYY-MM'. Required on videos, where check_links.py verifies it against
   *  YouTube. A link is not only alive or dead: it also ages, and a three-year
   *  old explainer about generative AI teaches something other than what it
   *  claims to. Without this field that is invisible from the data. */
  publicado?: string
  /** Age is not a defect here: either the entry is linked precisely because it
   *  is old (LeNet 1989, the 2020 CNN videos), or its subject does not age
   *  (handwritten digits through a neural network). Exempts the entry from the
   *  staleness warning, never from the date check. */
  historico?: boolean
  idioma: 'es' | 'en'
  /** What to look for in it. A link without this is just a link. */
  porque: string
}

export const RECURSOS: Record<number, Recurso[]> = {
  1: [
    {
      tipo: 'video',
      titulo: 'Large Language Models explained briefly',
      url: 'https://www.youtube.com/watch?v=LPZh9BOjkQs',
      fuente: '3Blue1Brown',
      duracion: '7:58',
      publicado: '2024-11',
      idioma: 'en',
      porque:
        'El video del punto 1 de la lista de arriba. Tiene pista de audio en español, elegible en el reproductor. No hace falta entender todo: quedate con la idea de que el modelo aprende de texto y genera texto.',
    },
    {
      // Repetido a propósito en INTERPRETABILIDAD (día 1): acá respalda la
      // línea de la capa 3 del deck ("el video dura un minuto y está en la página").
      tipo: 'video',
      titulo: 'Convolutional Network Demo from 1989 (versión restaurada)',
      url: 'https://www.youtube.com/watch?v=H0oEr40YhrQ',
      fuente: 'Yann LeCun',
      duracion: '1:01',
      publicado: '2024-12',
      historico: true,
      idioma: 'en',
      porque:
        'El ejemplo fundacional de la capa 3, en un minuto y sin narración: una red de los Laboratorios Bell leyendo números escritos a mano en 1989. Es el mismo mecanismo que hoy escribe informes, en una computadora de hace treinta y siete años.',
    },
    {
      tipo: 'video',
      titulo: 'The moment we stopped understanding AI [AlexNet]',
      url: 'https://www.youtube.com/watch?v=UZDiGooFs54',
      fuente: 'Welch Labs',
      duracion: '17:38',
      publicado: '2024-07',
      idioma: 'en',
      porque:
        'Donde la capa 3 explota: AlexNet (2012), el mismo mecanismo de LeNet con GPUs y un millón de imágenes. El título es literal, y es el hilo que retomamos los días 1 y 4: desde acá los modelos rinden más de lo que se dejan leer.',
    },
    {
      // Repetido a propósito en el día 1, donde acompaña la sección de
      // interpretabilidad: acá es el "para curiosos" de la capa 3 del mapa.
      tipo: 'video',
      titulo: '¿Qué es una Red Neuronal? | Aprendizaje Profundo, capítulo 1',
      url: 'https://www.youtube.com/watch?v=jKCQsndqEGQ',
      fuente: '3Blue1Brown Español',
      duracion: '20:51',
      publicado: '2020-09',
      historico: true,
      idioma: 'es',
      porque:
        'Para el más curioso: la mejor visualización que existe de qué hace una red neuronal por dentro, doblada al español. Es la capa 3 del mapa de esta sesión, contada con el reconocimiento de dígitos escritos a mano.',
    },
    {
      tipo: 'curso',
      titulo: 'Neural networks, la serie completa',
      url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
      fuente: '3Blue1Brown',
      duracion: '10 videos',
      idioma: 'en',
      porque:
        'La idea de este curso es ser bien práctico, así que la matemática queda afuera. Para el más curioso, esta serie es un recurso excelente: arranca donde el video anterior (acá en su versión original) y sigue hasta adentro de los transformers de los chatbots actuales, con las mismas visualizaciones.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Tiktokenizer',
      url: 'https://tiktokenizer.vercel.app',
      fuente: 'Xenova',
      idioma: 'en',
      porque:
        'Pegá cualquier texto tuyo y mirá cómo lo parte cada modelo. Probá con nombres de pozos y unidades: ahí se ve por qué el modelo se equivoca contando.',
    },
    {
      // Pedido por Matías el 7-sep-2026: GPT-2 corriendo en el navegador, con la
      // atención y las probabilidades del próximo token en vivo. Se abre en el
      // bloque de predicción del día 1 y queda acá para curiosos.
      tipo: 'herramienta',
      titulo: 'Transformer Explainer',
      url: 'https://poloclub.github.io/transformer-explainer/',
      fuente: 'Polo Club of Data Science, Georgia Tech',
      idioma: 'en',
      porque:
        'Escribí una frase y mirá cómo el modelo reparte probabilidad entre las próximas palabras, capa por capa. Es el laboratorio de predicción de la sesión, pero con un modelo real adentro.',
    },
  ],
  2: [
    {
      tipo: 'video',
      titulo: 'Prompting 101 | Code w/ Claude',
      url: 'https://www.youtube.com/watch?v=ysPbXH0LpIE',
      fuente: 'Anthropic',
      duracion: '24:52',
      publicado: '2025-07',
      idioma: 'en',
      porque:
        'La clase de prompting de los que hacen los modelos: el equipo de Anthropic construye un prompt real, pieza por pieza, sobre un caso de seguros. Son las mismas piezas del constructor de esta página, contadas desde adentro. En inglés, con subtítulos.',
    },
    {
      tipo: 'herramienta',
      titulo: 'LMArena',
      url: 'https://lmarena.ai',
      fuente: 'LMArena',
      idioma: 'en',
      porque:
        'El ranking de chatbots hecho con votos a ciegas: miles de personas eligen entre dos respuestas sin saber de qué modelo es cada una. Sirve para el pulso general; tu tarea sigue siendo el benchmark que importa.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Artificial Analysis',
      url: 'https://artificialanalysis.ai',
      fuente: 'Artificial Analysis',
      idioma: 'en',
      porque:
        'Capacidad, precio por token y velocidad de todos los modelos en un solo cuadro. El lugar para mirar la escalera grande/rápido de cada proveedor con los números al lado.',
    },
    {
      tipo: 'lectura',
      titulo: "Learning more about Claude's mathematical capabilities",
      url: 'https://www.anthropic.com/research/riemann-zeta',
      fuente: 'Anthropic',
      idioma: 'en',
      porque:
        'El anuncio original de la contracara de esta sesión: la cota de Riemann movida de 41.6% a 67.2% con un prompt de aliento, y 31 millones de tokens y una prueba formal atrás. Con sus advertencias a la vista: no prueba la hipótesis.',
    },
    {
      tipo: 'lectura',
      titulo: 'Prompt engineering overview',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
      fuente: 'Anthropic',
      idioma: 'en',
      porque:
        'La guía con la que Anthropic enseña a escribir prompts. Está pensada para gente que programa, pero las técnicas (ser claro, dar ejemplos, dejar pensar) son las mismas piezas del constructor de esta página, y sirven en cualquier chatbot. En inglés: el traductor del navegador alcanza.',
    },
    {
      tipo: 'video',
      titulo: 'Introduction to residuals and least-squares regression',
      url: 'https://www.youtube.com/watch?v=VqD-nf1YUks',
      fuente: 'Khan Academy',
      duracion: '4:49',
      publicado: '2018-06',
      historico: true,
      idioma: 'en',
      porque:
        'La primera mitad de la matemática del botón "que la busque la máquina": qué es un residuo y por qué se minimiza la suma de sus cuadrados. Cinco minutos, sin pedir nada previo.',
    },
    {
      tipo: 'video',
      titulo: 'Calculating the equation of a regression line',
      url: 'https://www.youtube.com/watch?v=FGesqq22TCM',
      fuente: 'Khan Academy',
      duracion: '8:10',
      publicado: '2017-07',
      historico: true,
      idioma: 'en',
      porque:
        'La segunda mitad, que el video anterior deja abierta: cómo se encuentra la recta que minimiza esos cuadrados. Es la cuenta que el laboratorio hace cada vez que apretás el botón.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Producción por pozo — Capítulo IV',
      url: 'https://datos.energia.gob.ar/dataset/produccion-de-petroleo-y-gas-por-pozo',
      fuente: 'Secretaría de Energía, Argentina',
      idioma: 'es',
      porque:
        'La fuente de los pozos del laboratorio. Bajate un año y probá el flujo de la sesión con datos de verdad, que es la mejor práctica antes de tocar los de tu empresa.',
    },
    {
      // Segunda edición: la fuente del bloque "De PDF a tabla" del día 2. No
      // hay página índice: los PDF viven bajo wp-content/uploads/downloads/AAAA/MM/
      // con nombre predecible, uno por día hábil. Copias del 8 al 15 de
      // septiembre de 2026 en public/descargas/ por si la red corporativa
      // bloquea el sitio del regulador.
      tipo: 'herramienta',
      titulo: 'Reporte diario preliminar de producción y operaciones',
      url: 'https://controlhidrocarburos.gob.ec/',
      fuente: 'Agencia de Regulación y Control de Hidrocarburos (ARCH), Ecuador',
      idioma: 'es',
      porque:
        'Una página por día: producción por compañía y por bloque, estado de pozos, gas y las novedades pozo por pozo con su causa de cierre. El PDF de cada día se llama REPORTE-DIARIO-PRELIMINAR-DE-PRODUCCION-Y-OPERACIONES-DE-DD-DE-MES-DE-AAAA.pdf bajo wp-content/uploads/downloads/AAAA/MM/.',
    },
  ],
  3: [
    {
      tipo: 'video',
      titulo: 'RAG Explained For Beginners',
      url: 'https://www.youtube.com/watch?v=_HQ2H_0Ayy0',
      fuente: 'KodeKloud',
      duracion: '10:09',
      publicado: '2025-08',
      idioma: 'en',
      porque:
        'El circuito completo de la generación aumentada por recuperación (RAG) en diez minutos: por qué la búsqueda clásica se queda corta y qué hace cada etapa (recuperar, aumentar, generar). Es el mismo busca-y-pega del ejercicio de esta página, contado paso a paso.',
    },
    {
      tipo: 'herramienta',
      titulo: 'NotebookLM',
      url: 'https://notebooklm.google.com',
      fuente: 'Google',
      idioma: 'es',
      porque:
        'La versión sin programar de todo esto. Subí dos o tres documentos públicos de tu rubro y hacele una pregunta antes de la sesión: más abajo en esta página hay tres reales para arrancar.',
    },
    {
      tipo: 'video',
      titulo: 'Agentic AI: Workflows vs. agents',
      url: 'https://www.youtube.com/watch?v=Qd6anWv0mv0',
      fuente: 'Google Cloud Tech',
      duracion: '5:30',
      publicado: '2025-03',
      idioma: 'en',
      porque:
        'La distinción que ordena el tema en cinco minutos: un flujo fijo que usa un modelo no es lo mismo que un modelo que decide sus propios pasos. Es el mismo eje de la lectura de Anthropic de abajo, en video.',
    },
    {
      tipo: 'lectura',
      titulo: 'Measuring AI ability to complete long tasks',
      url: 'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/',
      fuente: 'METR',
      idioma: 'en',
      porque:
        'La medición detrás de "el techo sube solo": el largo de tarea que un agente completa viene duplicándose cada siete meses. Con su letra chica a la vista (50% de éxito, tareas de software), que es lo que la hace confiable.',
    },
    {
      tipo: 'video',
      titulo: 'Tips for building AI agents',
      url: 'https://www.youtube.com/watch?v=LP5OCa20Zpg',
      fuente: 'Anthropic',
      duracion: '18:19',
      publicado: '2025-02',
      idioma: 'en',
      porque:
        'Tres personas de Anthropic (investigación, aplicaciones y relación con desarrolladores) cuentan qué agentes funcionan hoy y los errores típicos de quien empieza. El mejor complemento en video de la lectura de abajo.',
    },
    {
      tipo: 'video',
      titulo: 'How We Build Effective Agents: Barry Zhang, Anthropic',
      url: 'https://www.youtube.com/watch?v=D7_ipDqhtwk',
      fuente: 'Anthropic, en la conferencia AI Engineer',
      duracion: '15:09',
      publicado: '2025-04',
      idioma: 'en',
      porque:
        'La charla del coautor de la lectura de abajo, en un cuarto de hora: no construyas agentes para todo, mantenelos simples, y pensá desde el punto de vista del agente. Tiene pista de audio en español, elegible en el reproductor.',
    },
    {
      tipo: 'lectura',
      titulo: 'Building effective agents',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      fuente: 'Anthropic',
      idioma: 'en',
      porque:
        'Para el más curioso: la nota de ingeniería de Anthropic sobre qué es un agente y, sobre todo, cuándo no conviene armar uno. Está escrita para gente que construye, pero la primera mitad es el mejor antídoto que existe contra el humo del género. En inglés.',
    },
  ],
  4: [
    {
      tipo: 'video',
      titulo: 'What is interpretability?',
      url: 'https://www.youtube.com/watch?v=TxhhMTOTMDg',
      fuente: 'Anthropic',
      duracion: '3:53',
      publicado: '2024-06',
      idioma: 'en',
      porque:
        'La pregunta que sostiene esta sesión, contada por el equipo que la investiga: qué es mirar adentro de un modelo, y por qué todavía no alcanza para garantizar cómo se comporta. El video de abajo es la versión larga.',
    },
    {
      tipo: 'video',
      titulo: 'The Dark Matter of AI [Mechanistic Interpretability]',
      url: 'https://www.youtube.com/watch?v=UGO_Ehywuxc',
      fuente: 'Welch Labs',
      duracion: '24:09',
      publicado: '2024-12',
      idioma: 'en',
      porque:
        'Para el más curioso: por qué mirar adentro de un modelo es difícil de verdad. Welch Labs explica la interpretabilidad mecanicista, la disciplina detrás de "se puede mirar adentro, pero no lo bastante para garantizar", que es el corazón de esta sesión.',
    },
    {
      tipo: 'herramienta',
      titulo: 'AI Incident Database',
      url: 'https://incidentdatabase.ai',
      fuente: 'Responsible AI Collaborative',
      idioma: 'en',
      porque:
        'El registro público de incidentes de IA, con el mismo espíritu que los registros de incidentes de aviación: documentar para que otros no repitan. Buscá los de tu industria antes de la sesión y traé el que más se parezca a tu trabajo.',
    },
    {
      tipo: 'video',
      titulo: 'We Already Built AGI | Michal Kosinski',
      url: 'https://www.youtube.com/watch?v=xKq2yl3nHJY',
      fuente: 'Michal Kosinski (Stanford), en FounderCoHo',
      duracion: '46:50',
      publicado: '2026-07',
      idioma: 'en',
      porque:
        'Especulativo a propósito: es para el bloque de conversación. Lo mejor está en los últimos diez minutos: la hipótesis de que la inteligencia artificial reemplaza el trabajo científico y la mayoría de los usos prácticos del lenguaje, con el ejemplo del mail de cuatro puntos que conversamos en vivo.',
    },
    {
      tipo: 'video',
      titulo: 'OpenAI: Inside the Battle for the Startup\'s Soul',
      url: 'https://www.youtube.com/watch?v=VGtOPcd33ks',
      fuente: 'Bloomberg Originals',
      duracion: '8:14',
      publicado: '2023-11',
      idioma: 'en',
      porque:
        'Ocho minutos sobre los cinco días de noviembre de 2023 en que echaron y repusieron al director ejecutivo de OpenAI. Ilya Sutskever, el científico jefe, votó por echarlo y después se fue de la empresa; nunca dijo del todo por qué, y de ahí salió la pregunta que quedó dando vueltas en el rubro: qué vio. Sirve para ver que las discusiones sobre riesgo no son abstractas: se pelean adentro de las empresas que construyen esto.',
    },
    {
      tipo: 'video',
      titulo: 'Gemini Robotics 2 brings whole body intelligence to robots',
      url: 'https://www.youtube.com/watch?v=4lSQnrMC6nY',
      fuente: 'Google DeepMind',
      duracion: '3:00',
      publicado: '2026-07',
      idioma: 'en',
      porque:
        'Tres minutos del anuncio oficial: el mismo tipo de modelo que redacta informes, moviendo un cuerpo completo. Es la conversación del bloque final saliendo de la pantalla, y conecta con la regla del día 4: en el mundo físico el error no vuelve como mensaje.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Artificial Intelligence',
      url: 'https://ourworldindata.org/artificial-intelligence',
      fuente: 'Our World in Data',
      idioma: 'en',
      porque:
        'Los 35 gráficos que hacen falta para discutir el futuro con datos y no con anécdotas: cómputo de entrenamiento, desempeño en pruebas contra la línea humana, inversión, adopción entre trabajadores y demanda eléctrica de los centros de datos. En clase se recorre en vivo.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Data',
      url: 'https://epoch.ai/data',
      fuente: 'Epoch AI',
      idioma: 'en',
      porque:
        'Once exploradores con los datos crudos, al día y descargables: capacidades contra benchmarks, 3,500 modelos desde 1950, y el seguimiento de centros de datos por satélite. Epoch AI es el instituto de referencia en medir hacia dónde va la capacidad de estos sistemas.',
    },
    {
      tipo: 'lectura',
      titulo: 'Understanding is the new bottleneck',
      url: 'https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck',
      fuente: 'Geoffrey Litt',
      idioma: 'en',
      porque:
        'Con lo que cierra el curso. Contra la idea cómoda de que si el agente se verifica solo entender deja de hacer falta: se entiende para participar, no solo para controlar. Su instrumento es un cuestionario de cinco preguntas después de cada explicación, que es el mismo aparato que usaron acá cuatro días seguidos.',
    },
    {
      tipo: 'lectura',
      titulo: 'AGI: conteo regresivo',
      url: 'https://lifearchitect.ai/agi/',
      fuente: 'LifeArchitect (Alan D. Thompson)',
      idioma: 'en',
      porque:
        'Un analista que mantiene, con criterio propio y explícito, un porcentaje de cuán cerca está la inteligencia artificial general. Es una opinión con método a la vista, no un consenso: leelo como se lee un pronóstico, mirando los supuestos.',
    },
    {
      tipo: 'lectura',
      titulo: 'ASI: superinteligencia',
      url: 'https://lifearchitect.ai/asi/',
      fuente: 'LifeArchitect (Alan D. Thompson)',
      idioma: 'en',
      porque:
        'La página hermana del conteo: qué significaría un sistema por encima del nivel humano en todo, y quiénes lo toman en serio. Material de conversación, no de planificación.',
    },
  ],
}

/** Session 2's interpretability detour: the antecedent, the intuition, and the
 *  technique. Kept apart from the pre-session list because it is optional. */
export const INTERPRETABILIDAD: Recurso[] = [
  {
    tipo: 'video',
    titulo: 'Convolutional Network Demo from 1989 (versión restaurada)',
    url: 'https://www.youtube.com/watch?v=H0oEr40YhrQ',
    fuente: 'Yann LeCun',
    duracion: '1:01',
    publicado: '2024-12',
    historico: true,
    idioma: 'en',
    porque:
      'Un minuto, sin narración: LeNet-1 leyendo números escritos a mano en 1989. Es el mismo mecanismo que hoy mueve todo, corriendo en una computadora de hace treinta y siete años.',
  },
  {
    // Repetido a propósito en el material previo del día 1 (capa 3).
    tipo: 'video',
    titulo: 'The moment we stopped understanding AI [AlexNet]',
    url: 'https://www.youtube.com/watch?v=UZDiGooFs54',
    fuente: 'Welch Labs',
    duracion: '17:38',
    publicado: '2024-07',
    idioma: 'en',
    porque:
      'El otro extremo del arco que abre LeNet: AlexNet (2012), cuando la escala hizo que el rendimiento le ganara a la legibilidad. Es la mejor motivación visual de por qué existe todo lo que sigue en esta lista.',
  },
  {
    tipo: 'lectura',
    titulo: 'Feature Visualization',
    url: 'https://distill.pub/2017/feature-visualization/',
    fuente: 'Distill',
    historico: true,
    idioma: 'en',
    porque:
      'El artículo de referencia, con las imágenes que se citan en todos lados. Se puede recorrer mirando solo las figuras.',
  },
  {
    tipo: 'lectura',
    titulo: 'Zoom In: An Introduction to Circuits',
    url: 'https://distill.pub/2020/circuits/zoom-in/',
    fuente: 'Distill',
    historico: true,
    idioma: 'en',
    porque:
      'Va un paso más allá: no solo qué detecta cada neurona, sino cómo se conectan entre sí para formar un detector. Es el origen del programa de investigación que hoy se aplica a los modelos de lenguaje.',
  },
  {
    tipo: 'lectura',
    titulo: 'Mapping the Mind of a Large Language Model',
    url: 'https://www.anthropic.com/research/mapping-mind-language-model',
    fuente: 'Anthropic',
    idioma: 'en',
    porque:
      'Lo mismo, pero adentro de un modelo de lenguaje actual: millones de conceptos identificados, y la posibilidad de amplificarlos o suprimirlos para ver qué cambia en la respuesta.',
  },
  {
    tipo: 'lectura',
    titulo: 'Los demos originales de LeNet',
    url: 'http://yann.lecun.com/exdb/lenet/',
    fuente: 'Yann LeCun',
    historico: true,
    idioma: 'en',
    porque:
      'La página original, todavía en pie. Los videos muestran el sistema resistiendo ruido, rotaciones y trazos deformados.',
  },
]

/** El marco del que sale la tabla de las cuatro propiedades del día 4. En
 *  inglés y opcional: se enlaza y se atribuye, no se copia. Los materiales del
 *  framework de AI Fluency de Anthropic son CC BY-NC-SA 4.0 y este curso es
 *  pago, así que toda la prosa del sitio es propia. Las ideas no se licencian;
 *  la redacción sí. */
export const PROPIEDADES: Recurso[] = [
  {
    tipo: 'lectura',
    titulo: 'The four properties of AI',
    url: 'https://claude.com/resources/tutorials/the-4-properties-of-ai',
    fuente: 'Anthropic',
    idioma: 'en',
    porque:
      'La versión corta del marco de la tabla de más arriba, en cinco minutos y sin registrarse. Si el inglés te frena, el traductor del navegador lo resuelve: lo que importa son los cuatro nombres y el par capacidad/límite de cada uno.',
  },
  {
    tipo: 'curso',
    titulo: 'AI Capabilities and Limitations',
    url: 'https://anthropic.skilljar.com/ai-capabilities-and-limitations',
    fuente: 'Anthropic',
    duracion: '13 lecciones',
    idioma: 'en',
    porque:
      'El curso completo del que sale la idea de ordenar los errores por su causa. Es gratuito, está en inglés y pide crear una cuenta. Cada propiedad trae un ejercicio para probarla, con ejemplos genéricos: los de esta industria los ponemos nosotros.',
  },
]
