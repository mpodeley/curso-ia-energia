import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

// Session registry: the landing grid and session headers render from here;
// the prose body of each session lives in sesion-N.mdx (lazy → code-split).
//
// Second edition (2026-09): eight sessions of 2 h, two per day on four days
// (odd 10:00–12:00, even 12:00–14:00 Argentina). Same numbering and topics as
// the first edition (frozen at tag ypfb-2026-08).

export type Sesion = {
  n: number
  /** Día del curso (1–4): dos sesiones por día. */
  dia: number
  titulo: string
  resumen: string
  objetivos: string[]
  estado: 'lista' | 'en-preparacion'
  /** Hay deck publicado en slides/sesion-N.html y handout en handouts/sesion-N.pdf. */
  slides?: boolean
}

export const SESIONES: Sesion[] = [
  {
    n: 1,
    dia: 1,
    titulo: 'De los datos a la IA generativa',
    resumen:
      'Quiénes somos y qué esperamos del curso; de los sistemas expertos a dónde estamos hoy; cómo aprende una máquina, con pozos reales; y un chatbot frente a tareas reales, incluido verlo fallar.',
    objetivos: [
      'Distinguir una IA de propósito específico de una IA de propósito general',
      'Contar cómo se llegó de los sistemas expertos a los modelos de hoy, y dónde estamos en septiembre de 2026',
      'Distinguir aprendizaje supervisado de no supervisado, con pozos reales',
      'Ver en vivo qué puede y qué no puede hacer hoy un chatbot, y por qué se equivoca',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 2,
    dia: 1,
    titulo: 'Cómo funciona un LLM',
    resumen:
      'Lo justo del motor para manejarlo: cómo aprende de texto sin etiquetas y se vuelve un asistente general, por qué se olvida y por qué inventa.',
    objetivos: [
      'Entender qué es un token, cómo el modelo predice el siguiente y qué controla la temperatura',
      'Explicar cómo aprende de texto sin etiquetas y por qué termina siendo de propósito general',
      'Ver qué entra en la ventana de contexto y qué se cae',
      'Derivar de esa mecánica por qué alucina',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 3,
    dia: 2,
    titulo: 'Prompts y datos, en la práctica',
    resumen:
      'El chatbot gratuito lee un archivo, corre código y entrega una planilla de surveillance con relación agua-petróleo contra acumulada; con un dato bueno, alcanza un pedido corto. Y dos PDF oficiales de Ecuador que tienen que cuadrar.',
    objetivos: [
      'Pedirle a un chatbot gratuito un análisis con código sobre un archivo, y verificarlo',
      'Saber qué va en el prompt cuando el dato es bueno, y qué cambia cuando no',
      'Cruzar dos fuentes oficiales y encontrar dónde difieren',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 4,
    dia: 2,
    titulo: 'Tus documentos: RAG y Gemini Notebook',
    resumen:
      'Cómo hacer que el modelo responda a partir de tus documentos: buscar por significado, un cuaderno de reservas y normativa, y lo que genera el cuaderno con esas fuentes.',
    objetivos: [
      'Entender la intuición de RAG: buscar → traer → responder',
      'Armar un cuaderno de Gemini Notebook (antes NotebookLM) con el PRMS y la normativa de reservas de Ecuador, Colombia y Argentina',
      'Abrir cada cita y juzgar si el fragmento responde la pregunta o solo queda cerca',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 5,
    dia: 3,
    titulo: 'Agentes: qué son, el arnés y cuáles hay',
    resumen:
      'Qué es un agente, qué es el arnés que lo envuelve, qué agentes hay hoy y de qué formas se usan, con un taller para correr uno gratis.',
    objetivos: [
      'Explicar qué es un agente y qué hace el arnés que lo envuelve',
      'Ubicar los agentes de hoy por forma de uso, y cuáles se pueden probar gratis',
      'Correr un agente sobre una tarea de varios pasos y verificar lo que entregó',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 6,
    dia: 3,
    titulo: 'Agentes y el caso de tu empresa',
    resumen:
      'Un agente de terminal arma en vivo el caso real del curso, un screening de waterflooding; qué funciona hoy y dónde se rompe; y el caso de tu empresa escrito en una página.',
    objetivos: [
      'Ver a un agente trabajar sobre una carpeta, guiado por un archivo de instrucciones',
      'Separar lo que se delega hoy (digital, acotado, verificable) de lo que todavía no',
      'Escribir en una página el caso de tu empresa: dolor, datos, sensibilidad, verificabilidad',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 7,
    dia: 4,
    titulo: 'Riesgos, límites y gobernanza',
    resumen:
      'Reglas de uso que se llevan puestas: por qué falla un modelo, cuánto verificar según el costo del error, qué dato va a qué herramienta y dónde un agente no entra.',
    objetivos: [
      'Ponerle causa a un error concreto con la tabla de las cuatro propiedades',
      'Dosificar la verificación según el costo del error, y ubicar cada dato de tu trabajo en su nivel',
      'Explicar por qué un agente no se conecta a un sistema que opera equipos',
      'Salir con un borrador de política de uso de una página para tu empresa',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 8,
    dia: 4,
    titulo: 'El caso y el horizonte',
    resumen:
      'El caso de waterflooding recorrido de punta a punta sobre datos públicos y criticado junto al de cada empresa, una hoja de ruta, y una conversación sobre lo que viene.',
    objetivos: [
      'Recorrer y criticar el caso real, y el caso de tu empresa con las mismas reglas',
      'Llevarse una hoja de ruta de adopción en tres horizontes, con dueño y criterio de éxito',
      'Conversar el presente y futuro de la IA: la frontera, los modelos locales, los riesgos',
    ],
    estado: 'lista',
    slides: true,
  },
]

/** Fecha y título de cada día de la edición vigente: las dos sesiones de un día van juntas. */
export const DIAS: Record<number, { fecha: string; titulo: string }> = {
  1: { fecha: 'lunes 28 de septiembre', titulo: 'Qué es y cómo funciona' },
  2: { fecha: 'martes 29 de septiembre', titulo: 'Datos y documentos, con el chatbot trabajando' },
  3: { fecha: 'miércoles 30 de septiembre', titulo: 'Agentes' },
  4: { fecha: 'jueves 1 de octubre', titulo: 'Riesgos y el caso real' },
}

export const MDX_SESIONES: Record<number, LazyExoticComponent<ComponentType>> = {
  1: lazy(() => import('./sesion-1.mdx')),
  2: lazy(() => import('./sesion-2.mdx')),
  3: lazy(() => import('./sesion-3.mdx')),
  4: lazy(() => import('./sesion-4.mdx')),
  5: lazy(() => import('./sesion-5.mdx')),
  6: lazy(() => import('./sesion-6.mdx')),
  7: lazy(() => import('./sesion-7.mdx')),
  8: lazy(() => import('./sesion-8.mdx')),
}
