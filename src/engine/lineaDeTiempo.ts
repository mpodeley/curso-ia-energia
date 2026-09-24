// A history of AI from 1950 to today, hand-authored with one primary source per
// milestone. Data: public/data/linea_de_tiempo.json (the page component and
// tools/diagramas.mjs read the same file, so slide and page cannot disagree).

export type Fuente = { titulo: string; url: string }

export type Era = { id: string; nombre: string; desde: number; hasta: number }

export type Hito = {
  id: string
  /** ISO: YYYY, YYYY-MM or YYYY-MM-DD */
  fecha: string
  titulo: string
  que: string
  porque: string
  era: string
  fuente: Fuente
}

export type LineaDeTiempo = { eras: Era[]; hitos: Hito[] }

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

/** A milestone's position on a year axis. Missing month or day fall mid-period
 *  (July, the 15th) so a year-only milestone sits in the middle of its year. */
export function anioDecimal(fecha: string): number {
  const [a, m, d] = fecha.split('-').map(Number)
  const mes = m ? m - 1 : 6
  const dia = d ? d - 1 : m ? 14 : 0
  return a + mes / 12 + dia / 365
}

/** Spanish long date at the precision the source gives: "1956", "julio de 1958",
 *  "30 de noviembre de 2022". Months in lowercase, as the style guide asks. */
export function fechaLarga(fecha: string): string {
  const [a, m, d] = fecha.split('-').map(Number)
  if (!m) return String(a)
  if (!d) return `${MESES[m - 1]} de ${a}`
  return `${d} de ${MESES[m - 1]} de ${a}`
}

/** The milestone `paso` places away from `id` in date order, clamped to the ends. */
export function vecinoDe(hitos: Hito[], id: string, paso: number): Hito | undefined {
  const i = hitos.findIndex((h) => h.id === id)
  if (i < 0) return hitos[0]
  return hitos[Math.min(Math.max(i + paso, 0), hitos.length - 1)]
}
