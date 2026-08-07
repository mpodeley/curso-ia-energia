// Encuesta de relevamiento de la sesión 1.
//
// Es la transcripción de docs/encuesta.md, que se diseñó desde el día uno y
// quedó marcada "Implementar como Google Form" sin implementarse nunca. El texto
// de las preguntas es el de ese documento, salvo la primera: el nombre ahora lo
// toma la tarjeta de identidad, así que la pregunta 1 quedó solo con el área.
//
// Esto NO vive en la base: el contenido va en git, la base guarda solo las
// respuestas. Cambiar una pregunta es un commit, con su historia.
//
// De acá salen la shortlist de casos de la sesión 5 y el caso real de la 8.

export type TipoPregunta = 'texto-corto' | 'texto-largo' | 'opcion-unica' | 'opcion-multiple'

export type Pregunta = {
  /** Estable para siempre: es parte de la clave con la que se guardan las
   *  respuestas. Renombrarlo huérfana lo ya respondido. */
  id: string
  bloque: string
  texto: string
  tipo: TipoPregunta
  ayuda?: string
  opciones?: string[]
  opcional?: boolean
}

export type Bloque = { id: string; titulo: string; minutos: number }

export const REF_ENCUESTA = 'relevamiento-s1'

export const NOTA_PRIVACIDAD =
  'Las respuestas se usan solo para diseñar los ejercicios y el caso final del curso. ' +
  'No incluyas datos confidenciales de la empresa en ninguna respuesta.'

export const BLOQUES: Bloque[] = [
  { id: 'a', titulo: 'Quién sos', minutos: 2 },
  { id: 'b', titulo: 'Tu semana', minutos: 5 },
  { id: 'c', titulo: 'Tus datos', minutos: 5 },
  { id: 'd', titulo: 'El caso final', minutos: 3 },
]

export const PREGUNTAS: Pregunta[] = [
  // --- Bloque A: quién sos ---------------------------------------------------
  {
    id: 'a1-area',
    bloque: 'a',
    texto: '¿En qué área o gerencia trabajás?',
    tipo: 'texto-corto',
  },
  {
    id: 'a2-rol',
    bloque: 'a',
    texto: 'Tu rol se parece más a…',
    tipo: 'opcion-unica',
    opciones: [
      'Ingeniería (reservorios / producción / perforación / facilidades)',
      'Geociencias',
      'Operaciones / campo',
      'Planificación / economía / comercial',
      'Administración / legal / RRHH / HSE',
      'Sistemas / datos',
      'Gerencia',
    ],
  },
  {
    id: 'a3-uso-previo',
    bloque: 'a',
    texto: '¿Cuánto usaste chatbots de IA hasta hoy?',
    tipo: 'opcion-unica',
    opciones: [
      'Nunca',
      'Probé alguna vez',
      'Uso ocasional (algunas veces al mes)',
      'Uso frecuente (todas las semanas)',
      'Uso diario',
    ],
  },

  // --- Bloque B: tu semana ---------------------------------------------------
  {
    id: 'b1-repetitivas',
    bloque: 'b',
    texto: 'Nombrá 2 o 3 tareas repetitivas que te consumen más tiempo del que deberían.',
    tipo: 'texto-largo',
    ayuda:
      'Como guía: armar el informe mensual, consolidar planillas, buscar información en documentos viejos, traducir, preparar presentaciones, minutas.',
  },
  {
    id: 'b2-fastidio',
    bloque: 'b',
    texto: 'De esas tareas, ¿cuál te da más fastidio hacer?',
    tipo: 'texto-corto',
  },
  {
    id: 'b3-buscar',
    bloque: 'b',
    texto: '¿Qué información buscás seguido y te cuesta encontrar? ¿Dónde vive?',
    tipo: 'texto-largo',
    ayuda: 'Manuales, normas, informes históricos, correos, planillas sueltas.',
  },

  // --- Bloque C: tus datos ---------------------------------------------------
  {
    id: 'c1-tipos',
    bloque: 'c',
    texto: '¿Con qué tipo de datos trabajás a diario?',
    tipo: 'opcion-multiple',
    opciones: [
      'Series de producción (pozo / campo)',
      'Datos de perforación / workover',
      'Datos de planta / facilidades',
      'Sísmica / registros de pozo',
      'Datos económicos / presupuesto',
      'Documentos (informes, contratos, normas)',
      'Planillas de seguimiento propias',
    ],
  },
  {
    id: 'c2-formatos',
    bloque: 'c',
    texto: '¿En qué formato viven mayormente?',
    tipo: 'opcion-multiple',
    opciones: [
      'Excel / planillas',
      'PDFs / escaneos',
      'Sistemas corporativos',
      'Papel / carpetas',
      'Bases de datos',
    ],
  },
  {
    id: 'c3-conversar',
    bloque: 'c',
    texto:
      'Si pudieras "conversar" con un conjunto de documentos o datos de tu área, ¿cuál elegirías?',
    tipo: 'texto-corto',
  },

  // --- Bloque D: el caso final -----------------------------------------------
  {
    id: 'd1-caso',
    bloque: 'd',
    texto: 'Completá: "me encantaría que la IA me resolviera…"',
    tipo: 'texto-largo',
    ayuda: 'Sin filtro. Después vemos juntos qué es viable.',
  },
  {
    id: 'd2-datos',
    bloque: 'd',
    texto:
      '¿Estarías dispuesto o dispuesta a aportar datos no confidenciales o anonimizados de tu área para construir el caso final?',
    tipo: 'opcion-unica',
    opciones: ['Sí', 'No', 'Tendría que consultar'],
  },
  {
    id: 'd3-preocupacion',
    bloque: 'd',
    texto: '¿Algo que te preocupe de la llegada de estas herramientas a tu trabajo?',
    tipo: 'texto-largo',
    opcional: true,
  },
]
