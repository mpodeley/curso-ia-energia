// Arps decline curves — the standard way the industry describes how a well's
// rate falls over time. Three regimes, one family:
//
//   b = 0        exponential   q = qi · e^(-Di·t)
//   0 < b < 1    hyperbolic    q = qi / (1 + b·Di·t)^(1/b)
//   b = 1        harmonic      q = qi / (1 + Di·t)
//
// t is in months, Di in 1/month, q in whatever unit the series carries.
//
// Note on units: the Capítulo IV dataset reports monthly VOLUME, not rate.
// February always looks like a bad month because it has fewer days. Arps
// describes a rate, so fitting the daily rate (volume / days in month) is the
// correct move — diasDelMes() exists for exactly that.

const EPS_B = 1e-6
const CERCA_DE_UNO = 1e-6

/** Days in the month of an ISO "YYYY-MM" string. */
export function diasDelMes(ym: string): number {
  const [a, m] = ym.split('-').map(Number)
  if (!a || !m) return 30
  return new Date(Date.UTC(a, m, 0)).getUTCDate()
}

/** Arps rate at month t (t = 0 is the first point, where q = qi). */
export function arps(qi: number, Di: number, b: number, t: number): number {
  if (t <= 0) return qi
  if (Di <= 0) return qi
  if (b < EPS_B) return qi * Math.exp(-Di * t)
  const base = 1 + b * Di * t
  if (base <= 0) return 0
  return qi / Math.pow(base, 1 / b)
}

/** The modeled series for n months, starting at t = 0. */
export function serieModelo(qi: number, Di: number, b: number, n: number): number[] {
  return Array.from({ length: n }, (_, t) => arps(qi, Di, b, t))
}

/** Cumulative production between t = 0 and t = meses, by closed form. */
export function eur(qi: number, Di: number, b: number, meses: number): number {
  if (meses <= 0 || qi <= 0) return 0
  if (Di <= 0) return qi * meses
  if (b < EPS_B) return (qi / Di) * (1 - Math.exp(-Di * meses))
  if (Math.abs(b - 1) < CERCA_DE_UNO) return (qi / Di) * Math.log(1 + Di * meses)
  const base = 1 + b * Di * meses
  return (qi / ((1 - b) * Di)) * (1 - Math.pow(base, 1 - 1 / b))
}

/** Root mean squared error between observed and modeled series.
 *  Points where the observation is null (well shut in, no report) are skipped. */
export function rmse(observado: (number | null)[], modelo: number[]): number {
  let suma = 0
  let n = 0
  for (let i = 0; i < observado.length && i < modelo.length; i++) {
    const o = observado[i]
    if (o === null || !Number.isFinite(o)) continue
    const d = o - modelo[i]
    suma += d * d
    n++
  }
  return n === 0 ? NaN : Math.sqrt(suma / n)
}

/** RMSE as a fraction of the average observed rate — "the model is off by X%
 *  of a typical month". This is the honest goodness-of-fit measure here: r2
 *  punishes a nearly flat well for having little variance to explain, even
 *  when the curve sits right on top of the data. */
export function errorRelativo(observado: (number | null)[], modelo: number[]): number {
  const validos = observado.filter((v): v is number => v !== null && Number.isFinite(v))
  if (validos.length === 0) return NaN
  const media = validos.reduce((s, v) => s + v, 0) / validos.length
  return media === 0 ? NaN : rmse(observado, modelo) / media
}

/** Fraction of the observed variance the model explains. Negative means the
 *  model is worse than just drawing a horizontal line through the average —
 *  which is exactly what happens on a well that did not decline, it broke. */
export function r2(observado: (number | null)[], modelo: number[]): number {
  const pares: [number, number][] = []
  for (let i = 0; i < observado.length && i < modelo.length; i++) {
    const o = observado[i]
    if (o === null || !Number.isFinite(o)) continue
    pares.push([o, modelo[i]])
  }
  if (pares.length < 2) return NaN
  const media = pares.reduce((s, [o]) => s + o, 0) / pares.length
  const ssTot = pares.reduce((s, [o]) => s + (o - media) ** 2, 0)
  const ssRes = pares.reduce((s, [o, m]) => s + (o - m) ** 2, 0)
  return ssTot === 0 ? NaN : 1 - ssRes / ssTot
}

export type Ajuste = { qi: number; Di: number; b: number }

const B_GRID = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2]

/** Coarse-to-fine grid search for the least-squares Arps parameters.
 *  Deterministic on purpose: the same well always yields the same answer, so a
 *  screen-shared run reproduces. */
export function ajustar(observado: (number | null)[]): Ajuste {
  const validos = observado.filter((v): v is number => v !== null && Number.isFinite(v) && v > 0)
  if (validos.length < 3) return { qi: validos[0] ?? 0, Di: 0, b: 0 }

  const qi0 = Math.max(...validos.slice(0, 3))
  let mejor: Ajuste = { qi: qi0, Di: 0.01, b: 0.5 }
  let mejorErr = Infinity

  const probar = (qi: number, Di: number, b: number) => {
    const err = rmse(observado, serieModelo(qi, Di, b, observado.length))
    if (Number.isFinite(err) && err < mejorErr) {
      mejorErr = err
      mejor = { qi, Di, b }
    }
  }

  // Pass 1 — coarse sweep over the three axes.
  for (const b of B_GRID) {
    for (let Di = 0.001; Di <= 0.12; Di += 0.002) {
      for (const f of [0.85, 0.95, 1, 1.05, 1.15]) probar(qi0 * f, Di, b)
    }
  }

  // Pass 2 — refine around the winner.
  const { qi: q1, Di: d1, b: b1 } = mejor
  for (let b = Math.max(0, b1 - 0.1); b <= b1 + 0.1; b += 0.02) {
    for (let Di = Math.max(0.0002, d1 - 0.004); Di <= d1 + 0.004; Di += 0.0004) {
      for (let f = 0.94; f <= 1.06; f += 0.02) probar(q1 * f, Di, b)
    }
  }

  return {
    qi: Math.round(mejor.qi * 100) / 100,
    Di: Math.round(mejor.Di * 10000) / 10000,
    b: Math.round(mejor.b * 100) / 100,
  }
}

/** Di is per month; engineers quote decline per year. Exponential equivalent. */
export function declinacionAnual(Di: number): number {
  return 1 - Math.exp(-Di * 12)
}
