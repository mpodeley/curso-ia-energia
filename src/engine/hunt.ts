// Scoring for the hallucination hunt.
//
// Marking every sentence as suspicious would catch every fabrication, so recall
// alone would reward paranoia. Precision alone would reward marking nothing.
// The exercise scores both, because the skill being taught is discrimination:
// knowing which claims need a source, not distrusting the whole document.

export type Segmento = {
  texto: string
  /** Present and true when the claim is fabricated or wrong. */
  inventada?: boolean
  /** Why it is wrong — or, for sound claims, why it looked suspicious. */
  porque: string
  /** Concretely, how to check this one. Only on the fabricated ones. */
  comoVerificar?: string
}

export type Informe = {
  id: string
  label: string
  contexto: string
  segmentos: Segmento[]
  note?: string
}

export type Puntaje = {
  /** Fabrications correctly marked. */
  encontradas: number
  /** Sound claims wrongly marked. */
  falsasAlarmas: number
  /** Fabrications that slipped through. */
  perdidas: number
  totalInventadas: number
  precision: number
  recall: number
  f1: number
}

export function puntuar(segmentos: Segmento[], marcados: Set<number>): Puntaje {
  let encontradas = 0
  let falsasAlarmas = 0
  let perdidas = 0
  let totalInventadas = 0

  segmentos.forEach((s, i) => {
    const inventada = s.inventada === true
    const marcado = marcados.has(i)
    if (inventada) totalInventadas++
    if (inventada && marcado) encontradas++
    if (!inventada && marcado) falsasAlarmas++
    if (inventada && !marcado) perdidas++
  })

  const marcadosTotal = encontradas + falsasAlarmas
  const precision = marcadosTotal === 0 ? 0 : encontradas / marcadosTotal
  const recall = totalInventadas === 0 ? 0 : encontradas / totalInventadas
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall)

  return { encontradas, falsasAlarmas, perdidas, totalInventadas, precision, recall, f1 }
}

/** Short verdict shown after checking, keyed off the shape of the mistakes. */
export function veredicto(p: Puntaje): string {
  if (p.totalInventadas === 0) return 'No había nada que encontrar.'
  if (p.encontradas === p.totalInventadas && p.falsasAlarmas === 0)
    return 'Las encontraste todas y no marcaste ninguna afirmación sana. Eso es leer con criterio.'
  if (p.encontradas === 0)
    return 'No marcaste ninguna de las invenciones. Fijate abajo qué las delataba: casi siempre es una cifra muy precisa sin fuente.'
  if (p.precision < 0.5)
    return 'Marcaste más afirmaciones sanas que invenciones. Desconfiar de todo cuesta tanto tiempo como no desconfiar de nada, y encima no deja lugar para la duda cuando hace falta.'
  if (p.encontradas === p.totalInventadas)
    return 'Encontraste todas las invenciones, pero te llevaste puestas algunas afirmaciones correctas.'
  return 'Encontraste algunas. Las que se te escaparon son las más peligrosas, porque son las que pasarían una revisión.'
}
