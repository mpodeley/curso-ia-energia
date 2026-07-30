import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

// Session registry: the landing grid and session headers render from here;
// the prose body of each session lives in sesion-N.mdx (lazy → code-split).

export type Sesion = {
  n: number
  titulo: string
  resumen: string
  objetivos: string[]
  estado: 'lista' | 'en-preparacion'
}

export const SESIONES: Sesion[] = [
  {
    n: 1,
    titulo: 'De los datos a la IA generativa',
    resumen: 'Qué es todo esto, por qué explotó ahora y qué tiene que ver con tu trabajo.',
    objetivos: [
      'Ubicar data science, machine learning e IA generativa en un solo mapa',
      'Ver en vivo qué puede (y qué no puede) hacer hoy un chatbot con tareas reales de la industria',
      'Completar la encuesta de relevamiento que alimenta el caso real del final del curso',
    ],
    estado: 'lista',
  },
  {
    n: 2,
    titulo: 'Cómo funciona un LLM',
    resumen: 'Tokens, probabilidades y temperatura: la mecánica del modelo, sin matemática pesada.',
    objetivos: [
      'Entender qué es un token y por qué importa para todo lo demás',
      'Ver que el modelo predice el próximo token, y qué controla la temperatura',
      'Derivar de esa mecánica por qué los modelos alucinan',
    ],
    estado: 'lista',
  },
  {
    n: 3,
    titulo: 'Uso efectivo: prompting y trabajo diario',
    resumen: 'Anatomía de un buen prompt y los flujos de oficina donde ya rinde.',
    objetivos: [
      'Escribir prompts con rol, contexto, tarea, formato y ejemplos',
      'Aplicarlo a informes, resúmenes, minutas y traducción técnica',
      'Saber qué información de la empresa no debe subirse a un chatbot',
    ],
    estado: 'lista',
  },
  {
    n: 4,
    titulo: 'IA + datos: análisis asistido',
    resumen: 'El LLM como copiloto de análisis: de un CSV o un PDF a una tabla y un gráfico.',
    objetivos: [
      'Analizar un CSV de producción con el chatbot como copiloto',
      'Extraer tablas de PDFs (boletines YPFB) y verificarlas contra el original',
      'Ajustar una curva de declinación sobre datos reales de un pozo',
    ],
    estado: 'lista',
  },
  {
    n: 5,
    titulo: 'Tu conocimiento + LLMs: RAG y NotebookLM',
    resumen: 'Que el modelo responda con tus manuales y normas, no con lo que recuerda de internet.',
    objetivos: [
      'Entender la intuición de RAG: buscar → traer → responder',
      'Armar un notebook gratuito con documentos técnicos propios',
      'Elegir entre todos el caso real que se construye hacia el final del curso',
    ],
    estado: 'lista',
  },
  {
    n: 6,
    titulo: 'Agentes',
    resumen: 'LLM + herramientas + loop: qué es un agente, qué hace bien hoy y dónde falla.',
    objetivos: [
      'Entender el loop de un agente: pensar, llamar una herramienta, leer el resultado, repetir',
      'Ver un agente real trabajando sobre datos de la industria',
      'Distinguir qué conviene delegar a un agente hoy y qué todavía no',
    ],
    estado: 'lista',
  },
  {
    n: 7,
    titulo: 'Riesgos, límites y gobernanza',
    resumen: 'Alucinaciones, confidencialidad e IA en infraestructura crítica: reglas de uso que se llevan puestas.',
    objetivos: [
      'Armar un protocolo personal de verificación de salidas de IA',
      'Definir qué datos de la empresa pueden y no pueden tocar estas herramientas',
      'Salir con un borrador de política de uso interna para su equipo',
    ],
    estado: 'lista',
  },
  {
    n: 8,
    titulo: 'Caso real y hoja de ruta',
    resumen: 'El caso construido con sus datos y necesidades, de punta a punta, y cómo seguir.',
    objetivos: [
      'Recorrer el caso real end-to-end: necesidad relevada → flujo con IA → resultado',
      'Evaluar críticamente el caso: qué funcionó, qué hay que verificar, qué falta',
      'Llevarse una hoja de ruta de adopción concreta para el equipo',
    ],
    estado: 'en-preparacion',
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
