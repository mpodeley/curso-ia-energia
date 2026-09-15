import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

// Session registry: the landing grid and session headers render from here;
// the prose body of each session lives in sesion-N.mdx (lazy → code-split).
//
// Second edition (2026-09): four days of 4 h. Each day merges two sessions of
// the first edition (frozen at tag ypfb-2026-08): S1+S2, S3+S4, S5+S6, S7+S8.

export type Sesion = {
  n: number
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
    titulo: 'Qué es esto y cómo funciona',
    resumen:
      'El mapa de la IA generativa con los pies en la industria, y lo justo del motor para manejarla: por qué cuenta mal, por qué se olvida y por qué inventa.',
    objetivos: [
      'Ubicar data science, machine learning e IA generativa en un solo mapa',
      'Ver en vivo qué puede (y qué no puede) hacer hoy un chatbot con tareas reales de la industria',
      'Entender qué es un token, cómo el modelo predice el siguiente, y derivar de ahí por qué alucina',
    ],
    estado: 'en-preparacion',
    slides: false,
  },
  {
    n: 2,
    titulo: 'Prompting y análisis asistido de datos',
    resumen:
      'Anatomía de un buen prompt, y el modelo como copiloto de análisis: de una planilla o un PDF del regulador a una tabla verificada y una curva de declinación.',
    objetivos: [
      'Escribir prompts con rol, contexto, tarea, formato y ejemplos, sobre una tarea real tuya',
      'Saber qué información de la empresa no debe subirse a un chatbot',
      'Extraer una tabla del reporte diario de la ARCH y verificarla contra el original, número por número',
      'Ajustar una curva de declinación sobre datos públicos de un pozo',
    ],
    estado: 'en-preparacion',
    slides: false,
  },
  {
    n: 3,
    titulo: 'Tu conocimiento y agentes',
    resumen:
      'Que el modelo responda con tus documentos, no con lo que recuerda de internet; y qué es un agente, qué hace bien hoy y dónde falla.',
    objetivos: [
      'Entender la intuición de RAG: buscar → traer → responder',
      'Armar un cuaderno de NotebookLM con documentos públicos del rubro y uno de tu empresa',
      'Ver el loop de un agente trabajando en vivo sobre datos de producción',
      'Escribir en una página el caso de tu empresa: dolor, datos, sensibilidad, verificabilidad',
    ],
    estado: 'en-preparacion',
    slides: false,
  },
  {
    n: 4,
    titulo: 'Riesgos, el caso y el horizonte',
    resumen:
      'Reglas de uso que se llevan puestas, el caso de waterflooding recorrido de punta a punta sobre datos públicos, y una conversación sobre lo que viene.',
    objetivos: [
      'Armar un protocolo personal de verificación y un borrador de política de uso para tu equipo',
      'Recorrer y criticar el caso real, y el caso de cada empresa con las mismas reglas',
      'Llevarse una hoja de ruta de adopción concreta',
      'Conversar el presente y futuro de la IA: la frontera, los modelos locales, los riesgos',
    ],
    estado: 'en-preparacion',
    slides: false,
  },
]

export const MDX_SESIONES: Record<number, LazyExoticComponent<ComponentType>> = {
  1: lazy(() => import('./sesion-1.mdx')),
  2: lazy(() => import('./sesion-2.mdx')),
  3: lazy(() => import('./sesion-3.mdx')),
  4: lazy(() => import('./sesion-4.mdx')),
}
