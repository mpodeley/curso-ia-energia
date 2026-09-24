import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  aciertosDejandoUnoAfuera,
  coincidencias,
  coordenadas,
  enElPlano,
  kmeans,
  tablaCruzada,
  vecinos,
  votar,
  type Pozo,
  type PozoPlano,
} from './aprendizaje'

const p = (id: string, x: number, y: number, tipo: PozoPlano['tipo'] = 'petrolifero'): PozoPlano => ({
  id,
  x,
  y,
  tipo,
})

// Two tight blobs far apart: any sane k-means and kNN must get these right.
const blobs: PozoPlano[] = [
  p('a1', 1.0, 0.8),
  p('a2', 1.1, 0.7),
  p('a3', 0.9, 0.9),
  p('b1', 4.0, 0.3, 'gasifero'),
  p('b2', 4.1, 0.2, 'gasifero'),
  p('b3', 3.9, 0.4, 'gasifero'),
]

describe('coordenadas', () => {
  it('uses log10 of the gas-oil ratio and the raw water cut', () => {
    expect(coordenadas(1000, 0.5)).toEqual({ x: 3, y: 0.5 })
  })

  it('clamps a ratio below 1 so the log stays finite', () => {
    expect(coordenadas(0, 0.2).x).toBe(0)
  })
})

describe('vecinos and votar', () => {
  it('returns the nearest wells first, ties broken by id', () => {
    const r = vecinos([p('z', 1, 0), p('a', 1, 0), p('m', 5, 0)], { x: 1, y: 0 }, 2)
    expect(r.map((q) => q.id)).toEqual(['a', 'z'])
  })

  it('predicts the majority type', () => {
    expect(votar(vecinos(blobs, { x: 4, y: 0.3 }, 3)).prediccion).toBe('gasifero')
    expect(votar(vecinos(blobs, { x: 1, y: 0.8 }, 3)).prediccion).toBe('petrolifero')
  })

  it('breaks a tie with the nearest neighbour', () => {
    const r = votar([{ tipo: 'gasifero' }, { tipo: 'petrolifero' }])
    expect(r.prediccion).toBe('gasifero')
    expect(r.votos).toEqual({ petrolifero: 1, gasifero: 1 })
  })
})

describe('aciertosDejandoUnoAfuera', () => {
  it('gets well-separated blobs all right', () => {
    expect(aciertosDejandoUnoAfuera(blobs, 3)).toEqual({ aciertos: 6, total: 6 })
  })
})

describe('kmeans', () => {
  it('finds two separated blobs', () => {
    const { grupos } = kmeans(blobs, 2)
    expect(grupos).toEqual([0, 0, 0, 1, 1, 1])
  })

  it('is deterministic and independent of input order', () => {
    const a = kmeans(blobs, 2)
    const b = kmeans([...blobs].reverse(), 2)
    expect(a.centros).toEqual(b.centros)
    expect([...b.grupos].reverse()).toEqual(a.grupos)
  })

  it('numbers groups by the x of their centre', () => {
    const { centros } = kmeans(blobs, 2)
    expect(centros[0].x).toBeLessThan(centros[1].x)
  })

  it('handles empty input and k larger than the data', () => {
    expect(kmeans([], 2)).toEqual({ grupos: [], centros: [], iteraciones: 0 })
    expect(kmeans(blobs.slice(0, 1), 3).grupos).toEqual([0])
  })
})

describe('tablaCruzada and coincidencias', () => {
  it('counts declared types per group', () => {
    const tipos = blobs.map((q) => q.tipo)
    expect(tablaCruzada([0, 0, 0, 1, 1, 1], tipos, 2)).toEqual([
      { petrolifero: 3, gasifero: 0 },
      { petrolifero: 0, gasifero: 3 },
    ])
    expect(coincidencias([0, 0, 1, 1, 1, 1], tipos, 2)).toEqual({ coinciden: 5, total: 6 })
  })
})

// The page tells a story about the real wells: the label is learnable from these
// two numbers, and two groups found without labels line up with it. If a new
// Capítulo IV cut broke that story, the prose would be wrong: this catches it.
describe('los pozos reales del ejercicio', () => {
  const pozos = (JSON.parse(readFileSync('public/data/pozos_aprendizaje.json', 'utf-8')) as { data: Pozo[] })
    .data
  const plano = enElPlano(pozos)

  it('has both declared types', () => {
    expect(pozos.some((q) => q.tipo === 'petrolifero')).toBe(true)
    expect(pozos.some((q) => q.tipo === 'gasifero')).toBe(true)
  })

  it('lets five neighbours recover the declared type at least 90% of the time', () => {
    const { aciertos, total } = aciertosDejandoUnoAfuera(plano, 5)
    expect(aciertos / total).toBeGreaterThanOrEqual(0.9)
  })

  it('finds, without labels, two groups that match the declared type at least 90% of the time', () => {
    const { grupos } = kmeans(plano, 2)
    const { coinciden, total } = coincidencias(
      grupos,
      plano.map((q) => q.tipo),
      2,
    )
    expect(coinciden / total).toBeGreaterThanOrEqual(0.9)
  })
})
