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
      'El mapa de la IA generativa con los pies en la industria, y un chatbot frente a tareas reales: qué hace bien, dónde falla y de qué dos maneras se equivoca.',
    objetivos: [
      'Ubicar data science, machine learning e IA generativa en un solo mapa',
      'Ver en vivo qué puede (y qué no puede) hacer hoy un chatbot con tareas reales de la industria',
      'Distinguir las dos maneras de equivocarse de un chatbot: le faltaba el dato, o el dato no existe',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 2,
    dia: 1,
    titulo: 'Cómo funciona un LLM',
    resumen: 'Lo justo del motor para manejarlo: por qué cuenta mal, por qué se olvida y por qué inventa.',
    objetivos: [
      'Entender qué es un token, cómo el modelo predice el siguiente y qué controla la temperatura',
      'Ver qué entra en la ventana de contexto, qué se cae, y cómo se entrena el modelo',
      'Derivar de esa mecánica por qué alucina',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 3,
    dia: 2,
    titulo: 'Prompting y trabajo diario',
    resumen:
      'Anatomía de un buen prompt, cómo elegir entre el modelo grande y el rápido, y qué información de la empresa no se sube a un chatbot.',
    objetivos: [
      'Elegir entre el modelo grande y el rápido de un mismo proveedor, con tu tarea como benchmark',
      'Escribir prompts con rol, contexto, tarea, formato y ejemplos, sobre una tarea real tuya',
      'Saber qué información de la empresa no debe subirse a un chatbot',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 4,
    dia: 2,
    titulo: 'Análisis asistido de datos',
    resumen:
      'El modelo como copiloto de análisis: de una planilla o un PDF del regulador a una tabla verificada y una curva de declinación.',
    objetivos: [
      'Pedirle un análisis a un chatbot y leer el código que escribió, con el conteo de filas de cada filtro',
      'Extraer una tabla del reporte diario de la ARCH y verificarla contra el original, número por número',
      'Ajustar una curva de declinación sobre datos públicos de un pozo',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 5,
    dia: 3,
    titulo: 'Tu conocimiento: RAG y NotebookLM',
    resumen:
      'Cómo hacer que el modelo responda a partir de tus documentos: buscar por significado, responder con el libro abierto y abrir cada cita.',
    objetivos: [
      'Entender la intuición de RAG: buscar → traer → responder',
      'Armar un cuaderno de NotebookLM con documentos públicos del rubro y uno de tu empresa',
      'Abrir cada cita y juzgar si el fragmento responde la pregunta o solo queda cerca',
    ],
    estado: 'lista',
    slides: true,
  },
  {
    n: 6,
    dia: 3,
    titulo: 'Agentes y el caso de tu empresa',
    resumen: 'Qué es un agente, qué hace bien hoy y dónde falla; y el caso de tu empresa escrito en una página.',
    objetivos: [
      'Ver el loop de un agente trabajando en vivo sobre datos de producción',
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
