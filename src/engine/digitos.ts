// A small neural network that reads handwritten digits, run entirely in the
// browser. Weights come from scripts/build_mnist.py (784 -> hidden -> 10, ReLU,
// softmax, int8 with one scale per layer). `preprocesar` turns a drawing into
// the MNIST format: crop, fit the ink in a 20x20 box keeping proportions,
// centre of mass at (14, 14) of a 28x28 grid. The network only knows digits
// prepared that way, so this step matters as much as the weights.

export const LADO = 28
const CAJA = 20
const UMBRAL = 0.05 // ink below this counts as blank paper

export type RedDigitos = {
  entrada: number
  oculta: number
  salida: number
  w1: string
  w1_escala: number
  b1: number[]
  w2: string
  w2_escala: number
  b2: number[]
  exactitud_test: number
  n_entrenamiento: number
  n_test: number
  muestras: { digito: number; pixeles: string }[]
}

export type Red = {
  entrada: number
  oculta: number
  salida: number
  w1: Float32Array
  b1: Float32Array
  w2: Float32Array
  b2: Float32Array
}

function bytes(b64: string): Uint8Array {
  const s = atob(b64)
  const out = new Uint8Array(s.length)
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i)
  return out
}

function pesos(b64: string, escala: number): Float32Array {
  const q = new Int8Array(bytes(b64).buffer)
  const w = new Float32Array(q.length)
  for (let i = 0; i < q.length; i++) w[i] = q[i] * escala
  return w
}

export function decodificar(r: RedDigitos): Red {
  return {
    entrada: r.entrada,
    oculta: r.oculta,
    salida: r.salida,
    w1: pesos(r.w1, r.w1_escala),
    b1: Float32Array.from(r.b1),
    w2: pesos(r.w2, r.w2_escala),
    b2: Float32Array.from(r.b2),
  }
}

/** A 28x28 MNIST digit from the JSON, as ink in [0, 1]. */
export function pixelesDeMuestra(b64: string): Float32Array {
  return Float32Array.from(bytes(b64), (v) => v / 255)
}

/**
 * Ink grid (row-major, values in [0, 1], any size) → 784 inputs in MNIST
 * format, or null when there is nothing drawn.
 */
export function preprocesar(tinta: ArrayLike<number>, ancho: number, alto: number): Float32Array | null {
  let x0 = ancho
  let y0 = alto
  let x1 = -1
  let y1 = -1
  for (let y = 0; y < alto; y++)
    for (let x = 0; x < ancho; x++)
      if (tinta[y * ancho + x] > UMBRAL) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
  if (x1 < 0) return null

  // Fit the bounding box in a 20x20 box, keeping proportions (a "1" stays thin).
  const bw = x1 - x0 + 1
  const bh = y1 - y0 + 1
  const f = CAJA / Math.max(bw, bh)
  const tw = Math.max(1, Math.round(bw * f))
  const th = Math.max(1, Math.round(bh * f))

  // Box-filter downsample: each target cell averages the source area it covers.
  const parche = new Float32Array(tw * th)
  for (let ty = 0; ty < th; ty++) {
    const sy0 = y0 + ty / f
    const sy1 = Math.max(sy0 + 1, y0 + (ty + 1) / f)
    for (let tx = 0; tx < tw; tx++) {
      const sx0 = x0 + tx / f
      const sx1 = Math.max(sx0 + 1, x0 + (tx + 1) / f)
      let suma = 0
      let n = 0
      for (let sy = Math.floor(sy0); sy < Math.min(alto, Math.ceil(sy1)); sy++)
        for (let sx = Math.floor(sx0); sx < Math.min(ancho, Math.ceil(sx1)); sx++) {
          suma += tinta[sy * ancho + sx]
          n++
        }
      parche[ty * tw + tx] = n ? suma / n : 0
    }
  }

  // Centre of mass of the patch, then place it so that point lands on (14, 14).
  let masa = 0
  let mx = 0
  let my = 0
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) {
      const v = parche[y * tw + x]
      masa += v
      mx += v * x
      my += v * y
    }
  if (masa === 0) return null
  const ox = Math.min(LADO - tw, Math.max(0, Math.round(LADO / 2 - mx / masa)))
  const oy = Math.min(LADO - th, Math.max(0, Math.round(LADO / 2 - my / masa)))

  const out = new Float32Array(LADO * LADO)
  for (let y = 0; y < th; y++)
    for (let x = 0; x < tw; x++) out[(y + oy) * LADO + x + ox] = Math.min(1, parche[y * tw + x])
  return out
}

/** Forward pass: ten probabilities, one per digit, that add up to 1. */
export function predecir(red: Red, x: ArrayLike<number>): number[] {
  const h = new Float32Array(red.oculta)
  for (let j = 0; j < red.oculta; j++) h[j] = red.b1[j]
  for (let i = 0; i < red.entrada; i++) {
    const v = x[i]
    if (v === 0) continue
    const fila = i * red.oculta
    for (let j = 0; j < red.oculta; j++) h[j] += v * red.w1[fila + j]
  }
  const z = Array.from(red.b2)
  for (let j = 0; j < red.oculta; j++) {
    const a = h[j] > 0 ? h[j] : 0
    if (a === 0) continue
    const fila = j * red.salida
    for (let k = 0; k < red.salida; k++) z[k] += a * red.w2[fila + k]
  }
  const max = Math.max(...z)
  const e = z.map((v) => Math.exp(v - max))
  const s = e.reduce((a, b) => a + b, 0)
  return e.map((v) => v / s)
}

export function masProbable(p: number[]): number {
  return p.reduce((best, v, i) => (v > p[best] ? i : best), 0)
}
