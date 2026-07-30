// The 2D map is a projection of a 384-dimensional space, so it necessarily
// loses information. This module computes who looks closest ON THE MAP, which
// the exercise contrasts against the real neighbors (precomputed in the full
// space). Where the two lists disagree, the map is lying — and showing that is
// the point, not a defect to hide.

export type PuntoTermino = { id: string; termino: string; x: number; y: number }

export function distancia2D(a: PuntoTermino, b: PuntoTermino): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/** The k closest terms on the 2D map. */
export function vecinosEnMapa(punto: PuntoTermino, todos: PuntoTermino[], k = 5): PuntoTermino[] {
  return todos
    .filter((p) => p.id !== punto.id)
    .map((p) => ({ p, d: distancia2D(punto, p) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((x) => x.p)
}

/** How many of the real neighbors the map also gets right, 0 to 1. Low values
 *  are the honest, expected outcome — not a bug. */
export function fidelidadDelMapa(enMapa: string[], reales: string[]): number {
  if (reales.length === 0) return 0
  const set = new Set(enMapa)
  return reales.filter((t) => set.has(t)).length / reales.length
}
