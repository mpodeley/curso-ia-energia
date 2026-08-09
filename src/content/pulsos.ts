// Catálogo de pulsos: las preguntas cortas que el instructor abre en vivo y
// proyecta mientras se llenan.
//
// Contenido en git, estado en la base: acá está el texto, la tabla `pulso` de D1
// guarda solamente cuál está abierto. Agregar un pulso es un commit y un deploy
// del sitio; no toca el Worker.
//
// El `id` es parte de la clave con la que se guardan las respuestas. Una vez
// dictada la sesión, no se renombra.

export type Pulso = {
  id: string
  sesion: number
  pregunta: string
  /** Se muestra debajo de la pregunta, en el widget del alumno. */
  ayuda?: string
} & (
  | { tipo: 'opcion'; opciones: string[] }
  | { tipo: 'palabra'; maxPalabras: number }
)

export const PULSOS: Pulso[] = [
  // --- Sesión 1 --------------------------------------------------------------
  {
    id: 's1-palabra-ia',
    sesion: 1,
    tipo: 'palabra',
    maxPalabras: 1,
    pregunta: 'En una palabra: ¿qué te viene a la cabeza con "inteligencia artificial"?',
    ayuda: 'No lo pienses mucho. La primera que se te ocurra.',
  },
  {
    // Se abre al terminar las demos: la confianza declarada DESPUÉS de ver al
    // chatbot fallar. El contraste con el clima del arranque es el golpe del
    // bloque. (Hubo un s1-uso-chatbot acá; se retiró porque duplicaba la
    // pregunta a3-uso-previo de la encuesta y ningún deck lo abría.)
    id: 's1-confianza',
    sesion: 1,
    tipo: 'opcion',
    pregunta: 'Después de las demos, ¿cuánto confiarías en una respuesta sin verificarla?',
    opciones: [
      'Nada: verifico todo',
      'Poco: solo para borradores',
      'Depende del tema',
      'Bastante',
      'Mucho',
    ],
  },

  // --- Sesión 2 --------------------------------------------------------------
  {
    // Se abre ANTES del TokenizerLab: todos erran, y el ejercicio revela la
    // respuesta. Es la razón por la que los pulsos se ganan el lugar en la S2.
    id: 's2-cuantos-tokens',
    sesion: 2,
    tipo: 'opcion',
    pregunta: '¿En cuántos tokens parte el modelo la frase "perforación direccional"?',
    opciones: ['2', '4', '6', '8 o más'],
    ayuda: 'Adiviná antes de abrir el laboratorio de tokens.',
  },
  {
    id: 's2-temperatura',
    sesion: 2,
    tipo: 'opcion',
    pregunta: '¿En cuál de estas tareas tuyas querrías temperatura baja?',
    opciones: [
      'Redactar un informe técnico',
      'Traducir un procedimiento',
      'Buscar ideas para un nombre',
      'Resumir una minuta',
      'Explorar hipótesis de una falla',
    ],
  },
  {
    id: 's2-palabra-alucinacion',
    sesion: 2,
    tipo: 'palabra',
    maxPalabras: 1,
    pregunta: 'Una palabra: ¿qué te preocupa de que el modelo alucine?',
  },
]

export function pulsoPorId(id: string): Pulso | undefined {
  return PULSOS.find((p) => p.id === id)
}

export function pulsosDeSesion(sesion: number): Pulso[] {
  return PULSOS.filter((p) => p.sesion === sesion)
}
