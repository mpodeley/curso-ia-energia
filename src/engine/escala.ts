// Training compute of notable AI models over time (Epoch AI, CC BY).
// Data: public/data/escala.json, built by scripts/build_escala.py.

export type ModeloEscala = {
  modelo: string
  organizacion: string
  /** YYYY-MM-DD */
  fecha: string
  /** Training compute, floating-point operations (Epoch's estimate). */
  flop: number
  parametros: number | null
  dominio: string
  /** Epoch's confidence in the compute estimate: confiable, probable, especulativa. */
  confianza: string
  destacado?: boolean
  etiqueta?: string
}

/** "YYYY-MM-DD" (or "YYYY-MM", "YYYY") as a fractional year, for a time axis. */
export function anioDecimal(fecha: string): number {
  const [y, m = 1, d = 1] = fecha.split('-').map(Number)
  const inicio = Date.UTC(y, 0, 1)
  const fin = Date.UTC(y + 1, 0, 1)
  return y + (Date.UTC(y, m - 1, d) - inicio) / (fin - inicio)
}

/** Every power of ten from the one at or below `min` to the one at or above
 *  `max`: the gridlines of a log axis, each one ×10 the previous. */
export function decadas(min: number, max: number): number[] {
  if (!(min > 0) || !(max > 0) || max < min) return []
  const out: number[] = []
  for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++) out.push(10 ** e)
  return out
}

const SUPER: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
}
const superindice = (n: number) => String(n).replace(/[-0-9]/g, (c) => SUPER[c])

/** Scientific notation that reads on a projector: 1e25 → "10²⁵",
 *  2.1e25 → "2.1 × 10²⁵". The mantissa keeps one decimal at most. */
export function formatoFlop(x: number): string {
  if (!(x > 0) || !Number.isFinite(x)) return String(x)
  let e = Math.floor(Math.log10(x))
  let m = Math.round((x / 10 ** e) * 10) / 10
  if (m >= 10) {
    m = 1
    e += 1
  }
  return m === 1 ? `10${superindice(e)}` : `${m.toLocaleString('en-US')} × 10${superindice(e)}`
}

/** The rows of one domain, or all of them for 'todos'. */
export function porDominio(filas: ModeloEscala[], dominio: string): ModeloEscala[] {
  return dominio === 'todos' ? filas : filas.filter((f) => f.dominio === dominio)
}

/** Domains ordered by how many models they have, most first (ties by name). */
export function dominios(filas: ModeloEscala[]): string[] {
  const n = new Map<string, number>()
  for (const f of filas) n.set(f.dominio, (n.get(f.dominio) ?? 0) + 1)
  return [...n.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([d]) => d)
}

/** How many times more compute `b` used than `a`. */
export function factor(a: ModeloEscala, b: ModeloEscala): number {
  return b.flop / a.flop
}

export type Caja = { x: number; y: number; ancho: number; alto: number }
export type Etiqueta = { id: string; x: number; y: number; ancho: number; alto: number }
export type EtiquetaUbicada = {
  id: string
  tx: number
  ty: number
  anchor: 'start' | 'middle' | 'end'
  /** A thin line from the dot to the label, when the label had to move away. */
  guia: { x1: number; y1: number; x2: number; y2: number } | null
}

const pisa = (a: Caja, b: Caja) =>
  a.x < b.x + b.ancho && b.x < a.x + a.ancho && a.y < b.y + b.alto && b.y < a.y + a.alto

type Direccion = 'N' | 'S' | 'O' | 'E' | 'NO' | 'NE' | 'SO' | 'SE'
const DIRECCIONES: Direccion[] = ['N', 'S', 'O', 'E', 'NO', 'SO', 'NE', 'SE']

/** Greedy, deterministic label placement for the highlighted dots. Each label,
 *  in x order, tries eight directions around its dot at growing distances and
 *  keeps the first spot inside the plot that overlaps no label already placed
 *  and no other highlighted dot. Beyond the first ring it gets a leader line. If
 *  nothing fits, it goes above anyway: a readable overlap beats a missing name.
 *  `x`,`y` is the dot; `ancho`,`alto` the text box. Text y is its baseline. */
export function ubicarEtiquetas(
  items: Etiqueta[],
  limites: Caja,
  separacion = 10,
  anillos = [1, 3, 5, 7],
): EtiquetaUbicada[] {
  const puestas: Caja[] = []
  const puntos: Caja[] = items.map((it) => ({ x: it.x - 6, y: it.y - 6, ancho: 12, alto: 12 }))
  const out: EtiquetaUbicada[] = []
  const dentro = (c: Caja) =>
    c.x >= limites.x && c.y >= limites.y && c.x + c.ancho <= limites.x + limites.ancho && c.y + c.alto <= limites.y + limites.alto

  const candidato = (it: Etiqueta, dir: Direccion, d: number) => {
    const { ancho: w, alto: h } = it
    const dx = dir.includes('O') ? -1 : dir.includes('E') ? 1 : 0
    const dy = dir.includes('N') ? -1 : dir.includes('S') ? 1 : 0
    const anchor: EtiquetaUbicada['anchor'] = dx < 0 ? 'end' : dx > 0 ? 'start' : 'middle'
    const ax = it.x + dx * d // anchor point of the text
    const cy = dy < 0 ? it.y - d - h / 2 : dy > 0 ? it.y + d + h / 2 : it.y // box centre y
    const x = anchor === 'end' ? ax - w : anchor === 'start' ? ax : ax - w / 2
    const caja: Caja = { x, y: cy - h / 2, ancho: w, alto: h }
    return { caja, tx: ax, ty: cy + h * 0.35, anchor }
  }

  for (const it of [...items].sort((a, b) => a.x - b.x || (a.id < b.id ? -1 : 1))) {
    let elegido: (ReturnType<typeof candidato> & { lejos: boolean }) | null = null
    for (const [k, r] of anillos.entries()) {
      for (const dir of DIRECCIONES) {
        const c = candidato(it, dir, separacion * r)
        const propio = puntos[items.indexOf(it)]
        const libre =
          dentro(c.caja) && !puestas.some((p) => pisa(p, c.caja)) && !puntos.some((p) => p !== propio && pisa(p, c.caja))
        if (libre) {
          elegido = { ...c, lejos: k > 0 }
          break
        }
      }
      if (elegido) break
    }
    const final = elegido ?? { ...candidato(it, 'N', separacion), lejos: false }
    puestas.push(final.caja)
    const cx = Math.min(Math.max(it.x, final.caja.x), final.caja.x + final.caja.ancho)
    const cy = Math.min(Math.max(it.y, final.caja.y), final.caja.y + final.caja.alto)
    out.push({
      id: it.id,
      tx: final.tx,
      ty: final.ty,
      anchor: final.anchor,
      guia: final.lejos ? { x1: it.x, y1: it.y, x2: cx, y2: cy } : null,
    })
  }
  return out
}
