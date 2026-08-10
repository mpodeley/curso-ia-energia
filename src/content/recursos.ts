// Curated pre-session material, one list per session.
//
// Every link here was opened and checked on the date below — titles, channels
// and durations are the real ones, not remembered. A course that teaches
// verification cannot ship a dead link or an invented citation. When you add
// one, check it and move the date; when a link rots, remove it rather than
// leaving it "probably fine".
//
// Quality bar (instructor's rule, 2026-08-10): first-rate sources only —
// 3Blue1Brown, Khan Academy, Anthropic, Distill, official tools and data
// sources. No generic-divulgation YouTube channels, in any language. A short
// list beats a padded one; a session with no external resource is fine.

export const VERIFICADO = '2026-08-10'

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
  ],
  2: [
    {
      tipo: 'video',
      titulo: '¿Qué es una Red Neuronal? | Aprendizaje Profundo, capítulo 1',
      url: 'https://www.youtube.com/watch?v=jKCQsndqEGQ',
      fuente: '3Blue1Brown Español',
      duracion: '20:51',
      publicado: '2020-09',
      historico: true,
      idioma: 'es',
      porque:
        'La mejor visualización que existe de qué hace una red por dentro, doblada al español. Usa el reconocimiento de dígitos escritos a mano, que es el mismo ejemplo del que hablamos más abajo.',
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
  ],
  3: [
    {
      tipo: 'lectura',
      titulo: 'Prompt engineering overview',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
      fuente: 'Anthropic',
      idioma: 'en',
      porque:
        'La guía con la que Anthropic enseña a escribir prompts. Está pensada para gente que programa, pero las técnicas (ser claro, dar ejemplos, dejar pensar) son las mismas piezas del constructor de esta página, y sirven en cualquier chatbot. En inglés: el traductor del navegador alcanza.',
    },
  ],
  4: [
    {
      tipo: 'herramienta',
      titulo: 'Producción por pozo — Capítulo IV',
      url: 'https://datos.energia.gob.ar/dataset/produccion-de-petroleo-y-gas-por-pozo',
      fuente: 'Secretaría de Energía, Argentina',
      idioma: 'es',
      porque:
        'La fuente de los pozos del laboratorio. Bajate un año y probá el flujo de la sesión con datos de verdad, que es la mejor práctica antes de tocar los de tu empresa.',
    },
  ],
  5: [
    {
      tipo: 'herramienta',
      titulo: 'NotebookLM',
      url: 'https://notebooklm.google.com',
      fuente: 'Google',
      idioma: 'es',
      porque:
        'La versión sin programar de todo esto. Subí dos o tres documentos públicos de tu rubro y hacele una pregunta antes de la sesión.',
    },
  ],
  6: [
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
  // La sesión 7 no tiene material previo externo: sus dos recursos de primera
  // línea (Anthropic) viven en PROPIEDADES, renderizados dentro de la prosa.
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
