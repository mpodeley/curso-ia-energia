// Structural rubric for prompts. Detects which of the five pieces taught in
// session 3 (rol, contexto, tarea, formato, ejemplos) are present in a prompt.
//
// This measures STRUCTURE, not quality — a prompt can carry all five pieces and
// still be useless. The exercise says so out loud; keeping the engine honest
// about its own limits is part of the lesson.

export type Componente = 'rol' | 'contexto' | 'tarea' | 'formato' | 'ejemplos'

export const COMPONENTES: { id: Componente; label: string; ayuda: string }[] = [
  { id: 'rol', label: 'Rol', ayuda: 'Quién querés que sea: «sos un ingeniero de producción senior».' },
  { id: 'contexto', label: 'Contexto', ayuda: 'Lo que necesita saber para no inventar: para quién es, de qué se trata.' },
  { id: 'tarea', label: 'Tarea', ayuda: 'El verbo concreto: resumir, comparar, redactar, extraer, traducir.' },
  { id: 'formato', label: 'Formato', ayuda: 'Cómo querés la salida: tabla, viñetas, máximo de palabras.' },
  { id: 'ejemplos', label: 'Ejemplos', ayuda: 'Un «así me gusta» vale más que tres párrafos de instrucciones.' },
]

/** Lowercase + strip Spanish accents, preserving length 1:1 so match indices
 *  still point at the original string (NFD normalization would shift them). */
const ACENTOS: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n', â: 'a', ê: 'e', î: 'i', ô: 'o', û: 'u',
}

export function normalizar(texto: string): string {
  return texto.toLowerCase().replace(/[áéíóúüñâêîôû]/g, (c) => ACENTOS[c] ?? c)
}

// Patterns run against text that is already lowercased and accent-stripped, so
// they are written unaccented on purpose.

// Task verbs, allowing the voseo imperative, the infinitive and the enclitic
// pronouns people actually type ("resumime esto", "traducimelo").
const VERBOS_TAREA =
  '(resum|redact|traduc|list|analiz|critic|clasific|orden|calcul|identific|explic|revis|compar|extra|reescrib|sintetiz)'
const CIERRE_VERBO = '(i|a|e|ir|ar|er)(me|nos|lo|la|los|las|melo|mela|selo)?'

const NUMERO = '(\\d+|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)'

const PATRONES: Record<Componente, RegExp[]> = {
  rol: [
    /\b(sos|eres|actua como|actualo como|comportate como|hace de|haces de)\b/,
    /\btu rol es\b/,
    /\b(como|siendo) (un|una) [a-z]+ (senior|tecnic|especialista|experto|experta)/,
  ],
  contexto: [
    /\b(contexto|antecedentes|situacion)\s*:/,
    /\b(te paso|te adjunto|adjunto|te comparto|a continuacion|mas abajo|aca va)\b/,
    /\b(este|esta|el|la) (informe|documento|texto|paper|planilla|reporte|minuta|resumen) (va|es para|se presenta|lo lee)/,
    /\b(para|dirigido a) (el|la|un|una) (comite|directorio|gerencia|cliente|equipo|jefatura|auditoria)/,
  ],
  tarea: [new RegExp(`\\b${VERBOS_TAREA}${CIERRE_VERBO}\\b`), /\btarea\s*:/],
  formato: [
    /\b(formato|estructura|salida)\s*:/,
    /\b(tabla|columnas|vinetas|bullets|lista numerada|json|markdown|csv)\b/,
    new RegExp(`\\b(maximo|no mas de|hasta|en) ${NUMERO} (palabras|caracteres|lineas|filas|parrafos|puntos|paginas)\\b`),
    /\b(una|media|dos) (pagina|paginas|carilla|carillas)\b/,
    new RegExp(`\\b${NUMERO} (secciones|partes|apartados|columnas|vinetas)\\b`),
  ],
  ejemplos: [
    /\b(por ejemplo|ejemplo\s*:|ejemplos\s*:|un ejemplo|asi me gusta|como este|siguiendo este modelo)\b/,
    /\b(te doy|te muestro|mira este|segui el formato de)\b/,
    /\bentrada\s*:.*\bsalida\s*:/s,
  ],
}

export type ComponenteDetectado = {
  id: Componente
  presente: boolean
  /** Fragment of the ORIGINAL text that triggered the match, for the UI to show. */
  evidencia: string | null
}

export type Rubrica = {
  componentes: ComponenteDetectado[]
  presentes: number
  total: number
  palabras: number
  /** Specificity signals — they modulate the reading, they are not components. */
  senales: { numeros: boolean; suficientementeLargo: boolean; unaSolaLinea: boolean }
}

/** Widen a match to its surrounding clause so the evidence reads as a phrase. */
function fragmento(original: string, indice: number, largo: number): string {
  const desde = Math.max(0, original.lastIndexOf('\n', indice) + 1)
  const corteFin = original.indexOf('\n', indice + largo)
  const hasta = corteFin === -1 ? original.length : corteFin
  const linea = original.slice(desde, hasta).trim()
  return linea.length > 90 ? linea.slice(0, 88).trimEnd() + '…' : linea
}

export function evaluar(prompt: string): Rubrica {
  const original = prompt.trim()
  const texto = normalizar(original)

  const componentes = COMPONENTES.map(({ id }): ComponenteDetectado => {
    for (const patron of PATRONES[id]) {
      const m = patron.exec(texto)
      if (m) return { id, presente: true, evidencia: fragmento(original, m.index, m[0].length) }
    }
    return { id, presente: false, evidencia: null }
  })

  const palabras = original ? original.split(/\s+/).length : 0

  return {
    componentes,
    presentes: componentes.filter((c) => c.presente).length,
    total: COMPONENTES.length,
    palabras,
    senales: {
      numeros: /\d/.test(original),
      suficientementeLargo: palabras >= 25,
      unaSolaLinea: original.length > 0 && !original.includes('\n') && palabras < 12,
    },
  }
}

/** Assemble the prompt from the builder's per-slot choices, in teaching order. */
export function armar(partes: Partial<Record<Componente, string>>): string {
  return COMPONENTES.map(({ id }) => (partes[id] ?? '').trim())
    .filter((t) => t.length > 0)
    .join('\n')
}
