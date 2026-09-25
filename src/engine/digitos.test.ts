import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { makeRng } from './sampling'
import {
  LADO,
  activar,
  decodificar,
  decodificarGenerativa,
  estilosAlAzar,
  imaginar,
  imaginarPorDentro,
  trazoDeNeurona,
  masProbable,
  pesosDeNeurona,
  pesoDeSalida,
  pixelesDeMuestra,
  predecir,
  preprocesar,
  type RedDigitos,
  type RedGenerativa,
} from './digitos'

const raw = JSON.parse(readFileSync('public/data/red_digitos.json', 'utf-8')).data as RedDigitos
const red = decodificar(raw)

/** A 28x28 digit drawn big and off-centre on a 280x280 canvas, with hard edges like a pen stroke. */
function enElCanvas(px: Float32Array, escala: number, dx: number, dy: number): Float32Array {
  const W = 280
  const lienzo = new Float32Array(W * W)
  for (let y = 0; y < LADO; y++)
    for (let x = 0; x < LADO; x++) {
      if (px[y * LADO + x] < 0.3) continue
      for (let sy = 0; sy < escala; sy++)
        for (let sx = 0; sx < escala; sx++) lienzo[(dy + y * escala + sy) * W + dx + x * escala + sx] = 1
    }
  return lienzo
}

describe('red_digitos.json', () => {
  it('declares a network the shipped weights actually fill', () => {
    expect(red.w1.length).toBe(raw.entrada * raw.oculta)
    expect(red.w2.length).toBe(raw.oculta * raw.salida)
    expect(raw.b1).toHaveLength(raw.oculta)
    expect(raw.b2).toHaveLength(raw.salida)
    expect(raw.exactitud_test).toBeGreaterThan(0.95)
  })

  it('carries two sample digits of each class', () => {
    const porDigito = new Map<number, number>()
    for (const m of raw.muestras) porDigito.set(m.digito, (porDigito.get(m.digito) ?? 0) + 1)
    expect([...porDigito.keys()].sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (const n of porDigito.values()) expect(n).toBe(2)
  })
})

describe('predecir', () => {
  it('returns ten probabilities that add up to 1', () => {
    const p = predecir(red, pixelesDeMuestra(raw.muestras[0].pixeles))
    expect(p).toHaveLength(10)
    expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 5)
  })

  it('keeps a hidden layer that is never negative and explains the output', () => {
    const x = pixelesDeMuestra(raw.muestras[0].pixeles)
    const { oculta, probs } = activar(red, x)
    expect(oculta).toHaveLength(raw.oculta)
    expect(Math.min(...oculta)).toBeGreaterThanOrEqual(0)
    expect(oculta.some((a) => a === 0)).toBe(true) // ReLU switches some neurons off
    // rebuilding the output from the hidden layer gives the same winner
    const z = raw.b2.map((b, k) => b + oculta.reduce((acc, a, j) => acc + a * pesoDeSalida(red, j, k), 0))
    expect(z.indexOf(Math.max(...z))).toBe(masProbable(probs))
  })

  it('exposes the 784 incoming weights of each hidden neuron', () => {
    const w = pesosDeNeurona(red, 5)
    expect(w).toHaveLength(784)
    expect(w[10]).toBe(red.w1[10 * raw.oculta + 5])
  })

  it('reads the MNIST sample digits', () => {
    const bien = raw.muestras.filter((m) => masProbable(predecir(red, pixelesDeMuestra(m.pixeles))) === m.digito)
    expect(bien.length).toBeGreaterThanOrEqual(18)
  })
})

describe('preprocesar', () => {
  it('returns null for a blank canvas', () => {
    expect(preprocesar(new Float32Array(280 * 280), 280, 280)).toBeNull()
  })

  it('fits the ink in a 20-pixel box with its centre of mass near the middle', () => {
    const x = preprocesar(enElCanvas(pixelesDeMuestra(raw.muestras[6].pixeles), 7, 10, 60), 280, 280)!
    let masa = 0
    let mx = 0
    let my = 0
    const filas = new Set<number>()
    for (let i = 0; i < x.length; i++)
      if (x[i] > 0) {
        masa += x[i]
        mx += x[i] * (i % LADO)
        my += x[i] * Math.floor(i / LADO)
        filas.add(Math.floor(i / LADO))
      }
    expect(mx / masa).toBeCloseTo(14, 0)
    expect(my / masa).toBeCloseTo(14, 0)
    expect(filas.size).toBeLessThanOrEqual(20)
  })

  it('still reads a digit drawn large, small or off-centre on the canvas', () => {
    const casos: [number, number, number][] = [
      [9, 10, 10],
      [5, 120, 30],
      [4, 20, 150],
    ]
    for (const [escala, dx, dy] of casos) {
      const bien = raw.muestras.filter((m) => {
        const x = preprocesar(enElCanvas(pixelesDeMuestra(m.pixeles), escala, dx, dy), 280, 280)
        return x !== null && masProbable(predecir(red, x)) === m.digito
      })
      expect(bien.length).toBeGreaterThanOrEqual(17)
    }
  })
})

describe('la red al revés', () => {
  const rawGen = JSON.parse(readFileSync('public/data/red_generativa.json', 'utf-8')).data as RedGenerativa
  const gen = decodificarGenerativa(rawGen)

  it('draws 784 pixels of ink between 0 and 1', () => {
    const img = imaginar(gen, 3, [0, 0])
    expect(img).toHaveLength(784)
    expect(Math.min(...img)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...img)).toBeLessThanOrEqual(1)
  })

  it('keeps a hidden layer of switched-on and switched-off neurons', () => {
    const { oculta, img } = imaginarPorDentro(gen, 5, [0.3, -0.7])
    expect(oculta).toHaveLength(rawGen.oculta)
    expect(Math.min(...oculta)).toBeGreaterThanOrEqual(0)
    expect(oculta.some((a) => a === 0)).toBe(true)
    expect(img).toEqual(imaginar(gen, 5, [0.3, -0.7]))
  })

  it('changes the handwriting when the style numbers change', () => {
    const a = imaginar(gen, 3, [-1.5, 0])
    const b = imaginar(gen, 3, [1.5, 0])
    const diff = a.reduce((acc, v, i) => acc + Math.abs(v - b[i]), 0)
    expect(diff).toBeGreaterThan(20)
  })

  it('draws digits the reading network recognises as the one asked for', () => {
    const estilos = estilosAlAzar(makeRng(7), 12, gen.estilo)
    let bien = 0
    for (let d = 0; d < 10; d++)
      for (const e of estilos) if (masProbable(predecir(red, imaginar(gen, d, e))) === d) bien++
    expect(bien / 120).toBeGreaterThanOrEqual(0.85)
  })

  it('exposes the stroke each hidden neuron paints', () => {
    const t = trazoDeNeurona(gen, 9)
    expect(t).toHaveLength(784)
    expect(t[100]).toBe(gen.w2[9 * 784 + 100])
  })

  it('draws the same digits for the same seed', () => {
    expect(estilosAlAzar(makeRng(3), 4, 2)).toEqual(estilosAlAzar(makeRng(3), 4, 2))
  })
})
