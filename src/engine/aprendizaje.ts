// Supervised vs unsupervised learning on real wells: k nearest neighbours (the
// label is known) and k-means (it is not). Framework-free and deterministic.
//
// Both work in the same plane the chart draws: x = log10 of the gas-oil ratio,
// y = water cut (0–1). One decade of RGP weighs about as much as the whole range
// of water cut, which is what an engineer's eye does on that chart too. That
// choice is what makes k-means with two groups find the declared well type; with
// both axes standardized it splits by water instead. The page says so.
//
// Determinism matters for the same reason as in pulso.ts: this is projected, and
// a k-means that seeds at random would paint different groups on each click.

export type Tipo = 'petrolifero' | 'gasifero'

export type Pozo = {
  id: string
  sigla: string
  area: string
  tipo: Tipo
  /** Gas-oil ratio, m3/m3. */
  rgp: number
  /** Water cut, 0–1. */
  corte: number
  meses: number
}

export type Punto = { x: number; y: number }
export type PuntoId = Punto & { id: string }

/** The plane both algorithms and the chart share. RGP below 1 m3/m3 is clamped
 *  to 1 so the log stays finite. */
export function coordenadas(rgp: number, corte: number): Punto {
  return { x: Math.log10(Math.max(rgp, 1)), y: corte }
}

export function distancia2(a: Punto, b: Punto): number {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
}

/** The k points closest to `p`, nearest first; ties broken by id. */
export function vecinos<T extends PuntoId>(puntos: T[], p: Punto, k: number): T[] {
  return [...puntos]
    .sort((a, b) => distancia2(a, p) - distancia2(b, p) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    .slice(0, Math.max(0, k))
}

export type Voto = { prediccion: Tipo; votos: Record<Tipo, number> }

/** Majority vote of the neighbours. A tie goes to the nearest neighbour's type,
 *  so the answer never depends on the order of the input. */
export function votar(cercanos: { tipo: Tipo }[]): Voto {
  const votos: Record<Tipo, number> = { petrolifero: 0, gasifero: 0 }
  for (const v of cercanos) votos[v.tipo]++
  const prediccion: Tipo =
    votos.petrolifero === votos.gasifero
      ? (cercanos[0]?.tipo ?? 'petrolifero')
      : votos.petrolifero > votos.gasifero
        ? 'petrolifero'
        : 'gasifero'
  return { prediccion, votos }
}

export type PozoPlano = PuntoId & { tipo: Tipo }

export function enElPlano(pozos: Pozo[]): PozoPlano[] {
  return pozos.map((p) => ({ id: p.id, tipo: p.tipo, ...coordenadas(p.rgp, p.corte) }))
}

/** Leave-one-out: hide each well's label, predict it from the other wells, count
 *  hits. It is the honest version of "how often does it get it right". */
export function aciertosDejandoUnoAfuera(pozos: PozoPlano[], k: number): { aciertos: number; total: number } {
  let aciertos = 0
  for (const p of pozos) {
    const resto = pozos.filter((q) => q.id !== p.id)
    if (votar(vecinos(resto, p, k)).prediccion === p.tipo) aciertos++
  }
  return { aciertos, total: pozos.length }
}

export type Agrupamiento = { grupos: number[]; centros: Punto[]; iteraciones: number }

/** k-means with farthest-point seeding from the point with the lowest x (ties by
 *  id): same input, same groups, every time. Groups are renumbered by the x of
 *  their centre, so group 0 is always the lowest RGP and colours stay put. */
export function kmeans(entrada: PuntoId[], k: number, maxIter = 100): Agrupamiento {
  const n = entrada.length
  if (n === 0 || k <= 0) return { grupos: [], centros: [], iteraciones: 0 }
  k = Math.min(k, n)

  // Everything runs on the points sorted by id, sums included: floating-point
  // addition is not associative, and a centre that differs in the last digit
  // depending on input order is exactly the instability this function forbids.
  const porId = (a: PuntoId, b: PuntoId) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  const puntos = [...entrada].sort(porId)
  const primero = [...puntos].sort((a, b) => a.x - b.x || porId(a, b))[0]
  const semillas: PuntoId[] = [primero]
  while (semillas.length < k) {
    let mejor = puntos[0]
    let mejorD = -1
    for (const p of puntos) {
      const d = Math.min(...semillas.map((s) => distancia2(p, s)))
      if (d > mejorD) {
        mejorD = d
        mejor = p
      }
    }
    semillas.push(mejor)
  }

  let centros: Punto[] = semillas.map(({ x, y }) => ({ x, y }))
  let grupos: number[] = new Array(n).fill(0)
  let iteraciones = 0
  for (; iteraciones < maxIter; iteraciones++) {
    grupos = puntos.map((p) => {
      let g = 0
      for (let j = 1; j < k; j++) if (distancia2(p, centros[j]) < distancia2(p, centros[g])) g = j
      return g
    })
    const nuevos = centros.map((c, j) => {
      const miembros = puntos.filter((_, i) => grupos[i] === j)
      if (miembros.length === 0) return c
      return {
        x: miembros.reduce((s, p) => s + p.x, 0) / miembros.length,
        y: miembros.reduce((s, p) => s + p.y, 0) / miembros.length,
      }
    })
    const quieto = nuevos.every((c, j) => c.x === centros[j].x && c.y === centros[j].y)
    centros = nuevos
    if (quieto) break
  }

  const orden = centros.map((c, j) => ({ c, j })).sort((a, b) => a.c.x - b.c.x || a.c.y - b.c.y)
  const nuevoNumero = new Array(k)
  orden.forEach(({ j }, i) => (nuevoNumero[j] = i))
  const grupoDe = new Map(puntos.map((p, i) => [p.id, nuevoNumero[grupos[i]] as number]))
  return {
    grupos: entrada.map((p) => grupoDe.get(p.id) ?? 0),
    centros: orden.map(({ c }) => c),
    iteraciones,
  }
}

/** Rows = groups, columns = declared type: how the groups found without labels
 *  line up with the labels the operator declared. */
export function tablaCruzada(grupos: number[], tipos: Tipo[], k: number): Record<Tipo, number>[] {
  const tabla = Array.from({ length: k }, () => ({ petrolifero: 0, gasifero: 0 }))
  grupos.forEach((g, i) => tabla[g][tipos[i]]++)
  return tabla
}

/** With two groups: the wells whose group agrees with the declared type, taking
 *  each group to mean the type most of its wells have. */
export function coincidencias(grupos: number[], tipos: Tipo[], k: number): { coinciden: number; total: number } {
  const tabla = tablaCruzada(grupos, tipos, k)
  const coinciden = tabla.reduce((s, fila) => s + Math.max(fila.petrolifero, fila.gasifero), 0)
  return { coinciden, total: tipos.length }
}
