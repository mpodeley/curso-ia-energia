// Self-supervised learning: a text carries its own answers. Every prefix of a
// sentence, paired with the word that follows, is a training example nobody had
// to label. Data: public/data/autosupervisado.json.

export type Fuente = { titulo: string; url: string }

export type Escalon = {
  que: string
  palabras_o_tokens: number
  unidad: 'palabras' | 'tokens'
  fuente: Fuente
}

export type DatosAutosupervisado = { oracion: string; fuente: Fuente; escalas: Escalon[] }

export type EjemploEntrenamiento = { contexto: string[]; siguiente: string }

/** Words as the exercise shows them: split on any run of whitespace, with the
 *  punctuation left attached to its word ("julio," stays one piece). A real
 *  model reads tokens, which is session 2's first lab; words keep this one
 *  readable. */
export function palabras(oracion: string): string[] {
  return oracion.split(/\s+/).filter(Boolean)
}

/** One training example per word after the first: the words before it are the
 *  context and the word itself is the answer. The first word is skipped because
 *  inside a lone sentence it has no context; in real pretraining it would be
 *  predicted from the text before it, which this exercise does not show. So a
 *  sentence of n words yields n − 1 examples. */
export function ejemplosDeEntrenamiento(oracion: string): EjemploEntrenamiento[] {
  const w = palabras(oracion)
  return w.slice(1).map((siguiente, i) => ({ contexto: w.slice(0, i + 1), siguiente }))
}

const redondear = (x: number) => {
  const r = x >= 100 ? Math.round(x) : Math.round(x * 10) / 10
  return r.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

/** Big counts in Spanish words with the course's number convention (comma for
 *  thousands, point for decimals) and the long scale: un billón es 10^12, un
 *  millón de millones. 136 → "136"; 5e9 → "5,000 millones"; 1.5e13 → "15 billones". */
export function formatoGrande(n: number): string {
  if (!Number.isFinite(n)) return String(n)
  const a = Math.abs(n)
  if (a >= 1e12) {
    const v = n / 1e12
    return `${redondear(v)} ${Math.abs(v) === 1 ? 'billón' : 'billones'}`
  }
  if (a >= 1e6) {
    const v = n / 1e6
    return `${redondear(v)} ${Math.abs(v) === 1 ? 'millón' : 'millones'}`
  }
  return Math.round(n).toLocaleString('en-US')
}

/** A count and its unit, with the "de" Spanish needs after millón and billón:
 *  "136 palabras", "5,000 millones de palabras", "15 billones de tokens". */
export function conUnidad(n: number, unidad: string): string {
  const f = formatoGrande(n)
  return /(millón|millones|billón|billones)$/.test(f) ? `${f} de ${unidad}` : `${f} ${unidad}`
}
