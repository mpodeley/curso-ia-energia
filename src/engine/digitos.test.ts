import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  LADO,
  decodificar,
  masProbable,
  pixelesDeMuestra,
  predecir,
  preprocesar,
  type RedDigitos,
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
