// Curated pre-session material, one list per session (second edition: eight
// sessions of 2 h, two per day).
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

export const VERIFICADO = '2026-10-01'

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
      // Repetido a propósito en INTERPRETABILIDAD (sesión 2): acá respalda la
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
      // Repetido a propósito en la sesión 2, donde acompaña la sección de
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
      // Agregado el 2026-09-24 con la línea de tiempo de la sesión 1: el mismo
      // recorrido en una página, con los gráficos de Our World in Data.
      tipo: 'lectura',
      titulo: 'The brief history of artificial intelligence: the world has changed fast',
      url: 'https://ourworldindata.org/brief-history-of-ai',
      fuente: 'Max Roser, Our World in Data (6 de diciembre de 2022)',
      idioma: 'en',
      porque:
        'La historia de la IA en una sola página, con gráficos: de las primeras redes a los modelos que escriben, y cuánto se aceleró todo. Complementa la línea de tiempo de la sesión; es de 2022, así que termina justo cuando sale ChatGPT.',
    },
    // Movidos desde la sesión 4 el 2026-09-25: explican el botón "Que la busque la
    // máquina" del duelo de declinación, que vive en esta sesión. El comentario va
    // afuera del objeto para que check_links.py lo lea (su regex exige `{ tipo:`).
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
        'La primera mitad de la matemática del botón "Que la busque la máquina", en el duelo de declinación de esta sesión: qué es un residuo y por qué se minimiza la suma de sus cuadrados. Cinco minutos, sin pedir nada previo.',
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
        'La segunda mitad, que el video anterior deja abierta: cómo se calcula la recta que minimiza esos cuadrados. El duelo busca una curva, y la busca probando combinaciones, pero el criterio es el mismo: el error más chico.',
    },
  ],
  2: [
    // Movidos desde la sesión 1 el 2026-09-28 (pedido de Matías): abren la sesión 2.
    {
      tipo: 'video',
      titulo: 'Large Language Models explained briefly',
      url: 'https://www.youtube.com/watch?v=LPZh9BOjkQs',
      fuente: '3Blue1Brown',
      duracion: '7:58',
      publicado: '2024-11',
      idioma: 'en',
      porque:
        'Tiene pista de audio en español, elegible en el reproductor. No hace falta entender todo: quedate con la idea de que el modelo aprende de texto y genera texto.',
    },
    {
      // Also in INTERPRETABILIDAD; sesion-2.mdx filters that list against this one,
      // so the page shows it once, here.
      tipo: 'video',
      titulo: 'The moment we stopped understanding AI [AlexNet]',
      url: 'https://www.youtube.com/watch?v=UZDiGooFs54',
      fuente: 'Welch Labs',
      duracion: '17:38',
      publicado: '2024-07',
      idioma: 'en',
      porque:
        'AlexNet (2012): el mismo mecanismo de la red que leía códigos postales en 1989, con placas gráficas (GPU) y un millón de imágenes. El título es literal: desde ahí los modelos rinden más de lo que se dejan leer, y ese hilo vuelve en la sesión 7.',
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
      // bloque de predicción de la sesión 2 y queda acá para curiosos.
      tipo: 'herramienta',
      titulo: 'Transformer Explainer',
      url: 'https://poloclub.github.io/transformer-explainer/',
      fuente: 'Polo Club of Data Science, Georgia Tech',
      idioma: 'en',
      porque:
        'Escribí una frase y mirá cómo el modelo reparte probabilidad entre las próximas palabras, capa por capa. Es el laboratorio de predicción de la sesión, pero con un modelo real adentro.',
    },
  ],
  3: [
    {
      // Rehecha el 2026-09-28 (noche): la sesión 3 explica qué es un prompt y
      // muestra el prompt de sistema publicado de Claude.
      tipo: 'lectura',
      titulo: 'Indicaciones del sistema de Claude Sonnet 5.5',
      url: 'https://platform.claude.com/docs/es/release-notes/system-prompts/claude-sonnet-5-5',
      fuente: 'Anthropic',
      idioma: 'es',
      porque:
        'El prompt de sistema completo que recibe Claude en la aplicación, antes de tu primer mensaje, en la versión del 28 de septiembre de 2026. Dentro de la app no se ve; esta copia la publica Anthropic, con la página en español y el prompt en inglés, tal cual lo recibe Claude. La sesión muestra cinco fragmentos.',
    },
    {
      tipo: 'lectura',
      titulo: 'Mejores prácticas de prompting',
      url: 'https://platform.claude.com/docs/es/build-with-claude/prompt-engineering/claude-prompting-best-practices',
      fuente: 'Anthropic',
      idioma: 'es',
      porque:
        'La guía oficial de Anthropic: el modelo como un empleado brillante pero nuevo, la regla de oro de mostrarle el prompt a un colega, los ejemplos, las etiquetas y el prompt de sistema. Está escrita para quien programa, pero cada técnica sirve en el chat, y tiene versión en español.',
    },
    {
      tipo: 'lectura',
      titulo: 'Prompt design strategies',
      url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies',
      fuente: 'Google',
      idioma: 'en',
      porque:
        'La misma idea contada por Google: instrucciones claras y específicas, ejemplos ("los prompts sin ejemplos suelen ser menos efectivos"), todo el contexto primero y el pedido al final.',
    },
    {
      tipo: 'lectura',
      titulo: 'Create and edit files with Claude',
      url: 'https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude',
      fuente: 'Anthropic',
      idioma: 'en',
      porque:
        'La ayuda oficial de lo que usamos en el taller: cómo activar la ejecución de código y qué archivos devuelve (planillas, documentos, presentaciones, PDF). Dice que está en todos los planes, el gratuito incluido.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Reporte diario preliminar de producción y operaciones',
      url: 'https://mpodeley.github.io/curso-ia-energia/descargas/arch-reporte-diario-2026-09-15.pdf',
      fuente: 'Agencia de Regulación y Control de Hidrocarburos (ARCH), Ecuador; copia del curso',
      idioma: 'es',
      porque:
        'La fuente del correo y del taller: una página por día, con producción por compañía y por bloque, estado de pozos, gas y novedades pozo por pozo. La dirección de cada PDF tiene siempre la misma forma, y por eso se puede bajar solo, que es lo que mañana hace un agente. El link va a la copia del curso: el 30 de septiembre de 2026 el sitio de la ARCH no mostraba los reportes.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Producción de petróleo y gas por pozo (Capítulo IV)',
      url: 'http://datos.energia.gob.ar/dataset/produccion-de-petroleo-y-gas-por-pozo',
      fuente: 'Secretaría de Energía, Argentina',
      idioma: 'es',
      porque:
        'La fuente del archivo de los siete campos es uno de sus recursos, "Producción de Capítulo IV agrupada por yacimiento y formación productiva": petróleo, gas, agua e inyección, mes a mes desde 2006, con licencia abierta.',
    },
    {
      tipo: 'video',
      titulo: 'Prompting 101 | Code w/ Claude',
      url: 'https://www.youtube.com/watch?v=ysPbXH0LpIE',
      fuente: 'Anthropic',
      duracion: '24:52',
      publicado: '2025-07',
      idioma: 'en',
      porque:
        'La clase de prompting de los que hacen los modelos: el equipo de Anthropic construye un prompt real, pieza por pieza, sobre un caso de seguros, con prompt de sistema y ejemplos. En inglés, con subtítulos.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Arena',
      url: 'https://arena.ai',
      fuente: 'Arena (antes LMArena)',
      idioma: 'en',
      porque:
        'Dos modelos anónimos contestan lo mismo y vos votás. El ranking que sale de millones de esos votos sirve de referencia general; para elegir, lo que importa es tu tarea corrida en dos modelos.',
    },
  ],
  // Sesión 4 desde el 2026-09-28: la ex sesión 5 (RAG y Gemini Notebook), con el cuaderno de
  // reservas y normativa.
  4: [
    {
      tipo: 'herramienta',
      titulo: 'Gemini Notebook (antes NotebookLM)',
      url: 'https://notebook.google.com/',
      fuente: 'Google',
      idioma: 'es',
      porque:
        'La herramienta de la sesión. Entrá con una cuenta personal de Google antes de la clase y fijate que abra: en varias empresas la cuenta corporativa la tiene bloqueada, y mejor descubrirlo antes que en el taller.',
    },
    {
      tipo: 'lectura',
      titulo: 'Sistema de Gerencia de los Recursos de Petróleo (PRMS) 2018, traducción oficial al español',
      url: 'https://www.spe.org/media/filer_public/a1/f2/a1f29a2d-f0b9-4872-8648-ffa055af93f3/2018_sistema_de_gerencia_de_los_recursos_de_petroleo_-_traduccion_en_espanol_-_vf.pdf',
      fuente: 'Society of Petroleum Engineers (SPE)',
      idioma: 'es',
      porque:
        'La fuente central del cuaderno de reservas: 65 páginas. Las definiciones de reserva y recurso contingente están en la sección 1.1.0.6, y los criterios para pasar de una a otra en la 2.1.2.1. Con eso a mano, las respuestas del cuaderno se chequean en un minuto.',
    },
    {
      tipo: 'lectura',
      titulo: 'Administra tus límites de uso de Gemini Notebook',
      url: 'https://support.google.com/gemininotebook/answer/17670842?hl=es-419',
      fuente: 'Ayuda de Gemini Notebook, Google',
      idioma: 'es',
      porque:
        'Por qué en vivo cada uno genera una sola pieza: desde el 2 de septiembre de 2026 la cuenta gratuita tiene límites de cómputo, con una cuota que se renueva cada cinco horas hasta un tope semanal.',
    },
    {
      tipo: 'lectura',
      titulo: 'Introducing Contextual Retrieval',
      url: 'https://www.anthropic.com/engineering/contextual-retrieval',
      fuente: 'Anthropic',
      publicado: '2024-09',
      idioma: 'en',
      porque:
        'Para curiosos: por qué un buscador trae el fragmento equivocado. Un pedazo que dice "los ingresos crecieron 3%" ya no dice de qué empresa ni de qué trimestre, y Anthropic mide cuánto baja la tasa de fallas cuando a cada fragmento se le agrega su contexto. Está escrito para quien programa; el traductor del navegador alcanza.',
    },
  ],
  // Sesión 5 (agentes, nueva el 2026-09-28): qué es un agente, el arnés y cuáles hay.
  5: [
    {
      tipo: 'video',
      titulo: 'Tips for building AI agents',
      url: 'https://www.youtube.com/watch?v=LP5OCa20Zpg',
      fuente: 'Anthropic',
      duracion: '18:19',
      publicado: '2025-02',
      idioma: 'en',
      porque:
        'Tres personas de Anthropic (investigación, aplicaciones y relación con desarrolladores) cuentan qué agentes funcionan hoy y los errores típicos de quien empieza. Tiene pista de audio en español, elegible en el reproductor.',
    },
    {
      tipo: 'lectura',
      titulo: 'Cómo funciona Claude Code',
      url: 'https://code.claude.com/docs/es/how-claude-code-works',
      fuente: 'Anthropic, documentación de Claude Code',
      idioma: 'es',
      porque:
        'La guía oficial en español del agente de terminal de la demo: el loop en tres fases (recopilar contexto, actuar, verificar), las cinco familias de herramientas, un ejemplo de seis pasos y qué ve el agente cuando lo abrís en una carpeta. Cierra con los modos de permiso y cómo deshacer un cambio.',
    },
    {
      tipo: 'lectura',
      titulo: 'How tool use works',
      url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works',
      fuente: 'Anthropic, documentación de la plataforma',
      idioma: 'en',
      porque:
        'De acá sale la frase del bloque de herramientas: "The model never executes anything on its own." Explica el contrato entre la aplicación y el modelo, dónde corre cada herramienta y el loop en cinco pasos. Corto; el traductor del navegador alcanza.',
    },
    {
      tipo: 'lectura',
      titulo: 'Building effective agents',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      fuente: 'Anthropic (19 de diciembre de 2024)',
      idioma: 'en',
      porque:
        'La definición que usa esta sesión, en una línea: modelos de lenguaje que usan herramientas según lo que les devuelve el entorno, en un loop. Separa el flujo fijo, con los pasos escritos de antemano, del agente que decide los suyos, y recomienda empezar siempre por lo más simple.',
    },
    {
      tipo: 'lectura',
      titulo: 'Effective harnesses for long-running agents',
      url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents',
      fuente: 'Anthropic (26 de noviembre de 2025)',
      idioma: 'en',
      porque:
        'De acá sale la imagen de los turnos: un proyecto atendido por ingenieros que llegan sin memoria del turno anterior. Cuenta cómo el arnés lo resuelve con archivos: un parte de avance, una lista de tareas y el historial de cambios. Para el más curioso; está escrito para gente que programa.',
    },
    {
      tipo: 'lectura',
      titulo: 'What is the Model Context Protocol (MCP)?',
      url: 'https://modelcontextprotocol.io/docs/getting-started/intro',
      fuente: 'Model Context Protocol',
      idioma: 'en',
      porque:
        'La página de entrada del estándar, en cinco minutos: qué es, la comparación con un puerto USB-C y cuatro ejemplos de lo que habilita. Desde ahí, la página de arquitectura explica host, cliente y servidor, y las tres cosas que ofrece un servidor: herramientas, recursos y prompts.',
    },
  ],
  6: [
    {
      tipo: 'herramienta',
      titulo: 'Volve field data set',
      url: 'https://www.equinor.com/energy/volve-data-sharing',
      fuente: 'Equinor',
      idioma: 'en',
      porque:
        'La página oficial del conjunto de datos de la sesión: unos 40,000 archivos de un campo del mar del Norte que produjo de 2008 a 2016, liberados en 2018 para estudiar. Hoy el acceso completo pasa por una cuenta de Databricks; el paquete del curso trae diez archivos, y el liviano está en esta página.',
    },
    {
      tipo: 'lectura',
      titulo: 'Equinor Open Data Licence (Volve)',
      url: 'https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf',
      fuente: 'Equinor',
      idioma: 'en',
      porque:
        'Los términos bajo los que el curso comparte los datos de Volve, con un resumen de una página arriba: se pueden usar, adaptar y compartir con crédito a Equinor y a los ex socios de la licencia, y no se pueden vender. Es la licencia que hay que leer antes de subir estos archivos a cualquier herramienta.',
    },
    {
      tipo: 'herramienta',
      titulo: 'FactPages',
      url: 'https://factpages.sodir.no/en/',
      fuente: 'Norwegian Offshore Directorate (Sodir)',
      idioma: 'en',
      porque:
        'El registro oficial noruego de pozos, campos y producción, bajo licencia abierta (NLOD). De acá salen los dos archivos contra los que el tablero concilia la producción de Volve; buscá el campo VOLVE para ver su ficha, sus pozos y su producción mes a mes.',
    },
    {
      tipo: 'lectura',
      titulo: 'What are artifacts and how do I use them?',
      url: 'https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them',
      fuente: 'Anthropic, ayuda de Claude',
      idioma: 'en',
      porque:
        'Qué es un artifact, la página interactiva que Claude arma al lado de la conversación y que usás en tu versión del tablero. Está en la cuenta gratuita, y el artículo explica cómo se comparte y se baja. En inglés; el traductor del navegador alcanza.',
    },
    {
      tipo: 'lectura',
      titulo: 'How to use Agent Mode on Arena',
      url: 'https://help.arena.ai/articles/5432423882-how-to-use-agent-mode',
      fuente: 'Arena',
      idioma: 'en',
      porque:
        'La alternativa gratuita a Claude para tu versión: un agente con una computadora descartable en la nube. Lista los tipos de archivo que acepta (CSV y texto, no LAS ni zip) y cómo bajar lo que arma. Lo que escribís ahí puede compartirse con los proveedores de los modelos: solo dato público.',
    },
    {
      tipo: 'lectura',
      titulo: 'How Claude remembers your project',
      url: 'https://code.claude.com/docs/en/memory',
      fuente: 'Anthropic, documentación de Claude Code',
      idioma: 'en',
      porque:
        'Cómo funciona el archivo de instrucciones que vas a ver en la demo: cada sesión arranca con el contexto vacío, y lo que el agente sabe del proyecto lo lee de CLAUDE.md. Explica también cuándo conviene escribirlo corto y concreto. En inglés; el traductor del navegador alcanza.',
    },
    {
      tipo: 'lectura',
      titulo: 'AGENTS.md',
      url: 'https://agents.md/',
      fuente: 'Agentic AI Foundation (Linux Foundation)',
      idioma: 'en',
      porque:
        'El mismo tipo de archivo de instrucciones, en un formato abierto que leen más de veinte agentes de programación, entre ellos los de OpenAI, Google y GitHub. Si cambiás de herramienta, las reglas y las trampas que escribiste para tus datos te siguen sirviendo.',
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
        'La contracara sensata de la demo, en un cuarto de hora: no armes un agente para todo, mantenelo simple, y pensá el trabajo desde lo que el agente ve. Sirve para decidir si el caso de tu empresa necesita un agente o alcanza con un chatbot.',
    },
  ],
  7: [
    {
      tipo: 'video',
      titulo: 'OpenAI confirmó que un agente IA hackeó a otra empresa',
      url: 'https://www.youtube.com/watch?v=A-3n2ZpKPWY',
      fuente: 'Televisión Pública Noticias',
      duracion: '2:21',
      publicado: '2026-07',
      idioma: 'es',
      porque:
        'El episodio de Hugging Face en dos minutos y en castellano: un agente que sale de su entorno de prueba y entra a otra empresa. Es un noticiero, así que simplifica; el detalle confirmado está en la lectura de abajo. Miralo antes de la sesión, porque es el caso que la cierra.',
    },
    {
      tipo: 'lectura',
      titulo: 'Security incident disclosure — July 2026',
      url: 'https://huggingface.co/blog/security-incident-july-2026',
      fuente: 'Hugging Face',
      idioma: 'en',
      porque:
        'La fuente primaria del mismo caso: qué se vio afectado, qué no, y qué cambiaron después. Es un buen modelo de cómo se informa un incidente. Fijate en el orden: primero el alcance, después lo que hicieron, y recién al final el análisis.',
    },
    {
      tipo: 'video',
      titulo: 'Securing AI Agents: How to Prevent Hidden Prompt Injection Attacks',
      url: 'https://www.youtube.com/watch?v=5ZA1lTxTH3c',
      fuente: 'IBM Technology',
      duracion: '10:07',
      publicado: '2026-01',
      idioma: 'en',
      porque:
        'Cómo un texto escondido en una página o en un correo termina dándole órdenes a un agente, dibujado en un pizarrón. Es el mecanismo que está detrás de la regla de dos y de la sección sobre el correo. Tiene subtítulos traducibles.',
    },
    {
      tipo: 'lectura',
      titulo: 'The lethal trifecta for AI agents',
      url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
      fuente: 'Simon Willison',
      idioma: 'en',
      porque:
        'El texto del que sale la regla de dos: datos privados, contenido que no controlás y una salida hacia afuera. Si tu agente tiene las tres, alguien puede sacarle los datos. Corto, y con ejemplos de productos conocidos.',
    },
    {
      tipo: 'herramienta',
      titulo: 'AI Incident Database',
      url: 'https://incidentdatabase.ai',
      fuente: 'Responsible AI Collaborative',
      idioma: 'en',
      porque:
        'El registro público de incidentes de IA, con el mismo espíritu que los registros de incidentes de aviación: documentar para que otros no repitan. Buscá los de tu industria y traé el que más se parezca a tu trabajo.',
    },
    {
      tipo: 'lectura',
      titulo: 'OWASP Top 10 for Agentic Applications (2026)',
      url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
      fuente: 'OWASP',
      idioma: 'en',
      porque:
        'La lista de referencia de riesgos en sistemas con agentes, la que va a citar el área de sistemas o una auditoría. No hace falta leerla entera: alcanza con reconocer los diez nombres y ver que la política de la sesión los cubre.',
    },
  ],
  8: [
    {
      tipo: 'video',
      titulo: 'We Already Built AGI | Michal Kosinski',
      url: 'https://www.youtube.com/watch?v=xKq2yl3nHJY',
      fuente: 'Michal Kosinski (Stanford), en FounderCoHo',
      duracion: '46:50',
      publicado: '2026-07',
      idioma: 'en',
      porque:
        'Es especulativo a propósito, porque acompaña el bloque de conversación. Lo mejor está en los últimos diez minutos: la hipótesis de que la inteligencia artificial reemplaza el trabajo científico y la mayoría de los usos prácticos del lenguaje, con el ejemplo del mail de cuatro puntos que conversamos en vivo.',
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
        'Ocho minutos sobre los cinco días de noviembre de 2023 en que echaron y repusieron al director ejecutivo de OpenAI. Ilya Sutskever, el científico jefe, votó por echarlo y después se fue de la empresa; nunca dijo del todo por qué, y de ahí salió la pregunta que quedó dando vueltas en el rubro: qué vio. Sirve para ver que las discusiones sobre riesgo se pelean adentro de las empresas que construyen esto.',
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
        'Tres minutos del anuncio oficial: el mismo tipo de modelo que redacta informes, moviendo un cuerpo completo. Muestra en concreto lo que se conversa en el bloque final, y se conecta con la regla de la sesión 7: en el mundo físico, un error ya no se corrige releyendo un texto.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Artificial Intelligence',
      url: 'https://ourworldindata.org/artificial-intelligence',
      fuente: 'Our World in Data',
      idioma: 'en',
      porque:
        'Los gráficos que hacen falta para discutir el futuro con datos: cómputo de entrenamiento, desempeño en pruebas contra la línea humana, inversión, adopción entre trabajadores y demanda eléctrica de los centros de datos. En clase se recorre en vivo.',
    },
    {
      tipo: 'herramienta',
      titulo: 'Data',
      url: 'https://epoch.ai/data',
      fuente: 'Epoch AI',
      idioma: 'en',
      porque:
        'Exploradores con los datos crudos, al día y descargables: capacidades contra benchmarks, una base de modelos desde 1950, y el seguimiento de centros de datos por satélite. Epoch AI es el instituto de referencia en medir hacia dónde va la capacidad de estos sistemas.',
    },
    {
      tipo: 'lectura',
      titulo: 'Understanding is the new bottleneck',
      url: 'https://www.geoffreylitt.com/2026/07/02/understanding-is-the-new-bottleneck',
      fuente: 'Geoffrey Litt',
      idioma: 'en',
      porque:
        'El texto con el que cierra el curso. Discute la idea cómoda de que, si el agente se verifica solo, ya no hace falta entender: sostiene que entender sirve para participar del trabajo, además de para controlarlo. Su instrumento es un cuestionario de cinco preguntas después de cada explicación; cada página de sesión de este curso tiene un quiz de ese estilo.',
    },
    {
      tipo: 'lectura',
      titulo: 'AGI: conteo regresivo',
      url: 'https://lifearchitect.ai/agi/',
      fuente: 'LifeArchitect (Alan D. Thompson)',
      idioma: 'en',
      porque:
        'Un analista que mantiene, con criterio propio y explícito, un porcentaje de cuán cerca está la inteligencia artificial general. Es la opinión de una persona, con el método a la vista: leelo como se lee un pronóstico, mirando los supuestos.',
    },
    {
      tipo: 'lectura',
      titulo: 'ASI: superinteligencia',
      url: 'https://lifearchitect.ai/asi/',
      fuente: 'LifeArchitect (Alan D. Thompson)',
      idioma: 'en',
      porque:
        'La página hermana del conteo: qué significaría un sistema por encima del nivel humano en todo, y quiénes lo toman en serio. Sirve para la conversación sobre escenarios; no lo uses para planificar.',
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
    // Also first in RECURSOS[2]: sesion-2.mdx hides it here to show it once.
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
      'Va un paso más allá de qué detecta cada neurona: muestra cómo se conectan entre sí para formar un detector. Es el origen del programa de investigación que hoy se aplica a los modelos de lenguaje.',
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

/** El marco del que sale la tabla de las cuatro propiedades de la sesión 7. En
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
