// Aggregation for the live pulso view. Framework-free and deterministic.
//
// Determinism is the whole point here, not an aesthetic preference: these
// results are on a projector refreshing every two seconds. If the sort or the
// cloud layout were unstable, bars would swap places and words would jump
// between polls, and the room would read the motion as data changing.

export type Voto = { alumnoId: string; nombre: string; payload: unknown }
export type Conteo = { clave: string; etiqueta: string; n: number; pct: number }

/** Lowercase, accent-stripped, whitespace-collapsed. So "Incertidumbre" and
 *  "incertidumbre" land in the same bar, which is what a word cloud has to do. */
export function normalizarPalabra(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // combining marks left by NFD
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function ordenar(a: Conteo, b: Conteo): number {
  // n desc, then key asc — a total order, so equal counts never swap.
  return b.n - a.n || a.clave.localeCompare(b.clave, 'es')
}

function conPorcentaje(pares: [string, number][], total: number, etiqueta: (k: string) => string): Conteo[] {
  return pares
    .map(([clave, n]) => ({ clave, etiqueta: etiqueta(clave), n, pct: total ? n / total : 0 }))
    .sort(ordenar)
}

/** Tally for a single-choice pulso. Every option appears, including the ones
 *  nobody picked: a bar at zero is information, and a chart whose bars appear
 *  one by one as votes arrive is unreadable while it fills. */
export function tallyOpciones(votos: Voto[], opciones: string[]): { total: number; items: Conteo[] } {
  const cuenta = new Map<string, number>(opciones.map((_, i) => [String(i), 0]))
  let total = 0
  for (const v of votos) {
    const p = v.payload as { opcion?: unknown } | null
    if (!p || typeof p.opcion !== 'number') continue
    const k = String(p.opcion)
    if (!cuenta.has(k)) continue // an option that no longer exists in content
    cuenta.set(k, (cuenta.get(k) ?? 0) + 1)
    total++
  }
  const items = conPorcentaje([...cuenta.entries()], total, (k) => opciones[Number(k)] ?? k)
  // Choice bars keep content order, not count order: the options mean something
  // ("nunca" … "todos los días") and reordering them destroys the scale.
  items.sort((a, b) => Number(a.clave) - Number(b.clave))
  return { total, items }
}

/** Tally for a free-word pulso. */
export function tallyPalabras(votos: Voto[]): { total: number; items: Conteo[] } {
  const cuenta = new Map<string, number>()
  let total = 0
  for (const v of votos) {
    const p = v.payload as { palabra?: unknown } | null
    if (!p || typeof p.palabra !== 'string') continue
    const clave = normalizarPalabra(p.palabra)
    if (!clave) continue
    cuenta.set(clave, (cuenta.get(clave) ?? 0) + 1)
    total++
  }
  return { total, items: conPorcentaje([...cuenta.entries()], total, (k) => k) }
}

export type PalabraUbicada = { palabra: string; n: number; x: number; y: number; size: number }

/** Row-packing layout for the word cloud. No randomness and no collision
 *  simulation: same input, same picture, every poll. Words that do not fit are
 *  dropped rather than overlapped — the caller reports how many.
 *
 *  Expects `items` sorted by n descending, which is what tallyPalabras returns. */
export function layoutNube(
  items: Conteo[],
  opts: { ancho: number; alto: number; min?: number; max?: number },
): { palabras: PalabraUbicada[]; omitidas: number } {
  const min = opts.min ?? 16
  const max = opts.max ?? 64
  if (items.length === 0) return { palabras: [], omitidas: 0 }

  const nMax = items[0].n
  const nMin = items[items.length - 1].n
  const escala = (n: number) =>
    nMax === nMin ? (min + max) / 2 : min + ((n - nMin) / (nMax - nMin)) * (max - min)

  const PAD_X = 14
  const PAD_Y = 10
  const palabras: PalabraUbicada[] = []
  let x = 0
  let y = 0
  let altoFila = 0
  let omitidas = 0

  for (const item of items) {
    const size = escala(item.n)
    // 0.55em per character is a decent monospace-ish estimate for Plex Sans and
    // avoids measuring text in the DOM, which would make this untestable.
    const ancho = item.etiqueta.length * size * 0.55 + PAD_X
    const alto = size + PAD_Y

    if (x + ancho > opts.ancho) {
      x = 0
      y += altoFila
      altoFila = 0
    }
    if (y + alto > opts.alto) {
      omitidas++
      continue
    }
    palabras.push({ palabra: item.etiqueta, n: item.n, x, y: y + size, size })
    x += ancho
    altoFila = Math.max(altoFila, alto)
  }

  return { palabras, omitidas }
}
