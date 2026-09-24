// Aggregation for the live pulso view. Framework-free and deterministic.
//
// Determinism is the whole point here, not an aesthetic preference: these
// results are on a projector refreshing every two seconds. If the sort or the
// cloud layout were unstable, bars would swap places and words would jump
// between polls, and the room would read the motion as data changing.

export type Voto = { alumnoId: string; nombre: string; payload: unknown; creado?: string }
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

// The Worker's /tally returns raw counts: keys exactly as students typed them
// (lowercased, but with accents and punctuation intact) and only the options
// somebody picked, sorted by count. Presentation is this module's job, and it
// has to be the SAME presentation the instructor panel shows, or the room sees
// two different charts for one vote. These two reshape a raw tally into the
// tallyOpciones/tallyPalabras contract.

export type ItemTallyCrudo = { clave: string; n: number }

/** Reshape the server tally for a single-choice pulso: every option present
 *  (zeros included), content order, unknown keys dropped and not counted. */
export function moldearTallyOpciones(
  items: ItemTallyCrudo[],
  opciones: string[],
): { total: number; items: Conteo[] } {
  const cuenta = new Map<string, number>(opciones.map((_, i) => [String(i), 0]))
  let total = 0
  for (const item of items) {
    if (!cuenta.has(item.clave)) continue
    cuenta.set(item.clave, (cuenta.get(item.clave) ?? 0) + item.n)
    total += item.n
  }
  const res = conPorcentaje([...cuenta.entries()], total, (k) => opciones[Number(k)] ?? k)
  res.sort((a, b) => Number(a.clave) - Number(b.clave))
  return { total, items: res }
}

/** Reshape the server tally for a free-word pulso: re-key every entry through
 *  normalizarPalabra and merge, so "razón" and "razon" become one bar here just
 *  like they do on the projector. */
export function moldearTallyPalabras(items: ItemTallyCrudo[]): { total: number; items: Conteo[] } {
  const cuenta = new Map<string, number>()
  let total = 0
  for (const item of items) {
    const clave = normalizarPalabra(item.clave)
    if (!clave) continue
    cuenta.set(clave, (cuenta.get(clave) ?? 0) + item.n)
    total += item.n
  }
  return { total, items: conPorcentaje([...cuenta.entries()], total, (k) => k) }
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

export type TextoFirmado = { alumnoId: string; nombre: string; texto: string }

/** Free-text answers (tipo 'texto'), one card per student, for the projector.
 *  Whitespace collapsed, empty or non-string answers dropped, long ones capped
 *  with an ellipsis. Ordered by arrival (then id): a new answer lands at the end
 *  and nothing already on screen moves. */
export function textosDePulso(votos: Voto[], tope = 280): TextoFirmado[] {
  const out: (TextoFirmado & { creado: string })[] = []
  for (const v of votos) {
    const p = v.payload as { texto?: unknown } | null
    if (!p || typeof p.texto !== 'string') continue
    const limpio = p.texto.replace(/\s+/g, ' ').trim()
    if (!limpio) continue
    const texto = limpio.length > tope ? `${limpio.slice(0, tope - 1).trimEnd()}…` : limpio
    out.push({ alumnoId: v.alumnoId, nombre: v.nombre, texto, creado: v.creado ?? '' })
  }
  out.sort((a, b) => (a.creado === b.creado ? (a.alumnoId < b.alumnoId ? -1 : 1) : a.creado < b.creado ? -1 : 1))
  return out.map(({ alumnoId, nombre, texto }) => ({ alumnoId, nombre, texto }))
}
