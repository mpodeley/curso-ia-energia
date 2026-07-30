import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { buscarPorPalabras } from './lexical'
import { distancia2D, fidelidadDelMapa, vecinosEnMapa, type PuntoTermino } from './vecinos'

const P = (id: string, x: number, y: number): PuntoTermino => ({ id, termino: id, x, y })

describe('distancia2D', () => {
  it('is the plain euclidean distance', () => {
    expect(distancia2D(P('a', 0, 0), P('b', 3, 4))).toBe(5)
    expect(distancia2D(P('a', 1, 1), P('a', 1, 1))).toBe(0)
  })
})

describe('vecinosEnMapa', () => {
  const todos = [P('centro', 0, 0), P('cerca', 1, 0), P('medio', 5, 0), P('lejos', 50, 0)]

  it('returns the closest points, nearest first, excluding itself', () => {
    const v = vecinosEnMapa(todos[0], todos, 2)
    expect(v.map((p) => p.id)).toEqual(['cerca', 'medio'])
  })

  it('never returns more than there are', () => {
    expect(vecinosEnMapa(todos[0], todos, 99)).toHaveLength(3)
  })
})

describe('fidelidadDelMapa', () => {
  it('is 1 when the projection preserves every neighbor', () => {
    expect(fidelidadDelMapa(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(1)
  })

  it('is 0 when the projection preserves none', () => {
    expect(fidelidadDelMapa(['x', 'y'], ['a', 'b'])).toBe(0)
  })

  it('reports the fraction preserved', () => {
    expect(fidelidadDelMapa(['a', 'x'], ['a', 'b'])).toBe(0.5)
  })

  it('handles an empty expectation without dividing by zero', () => {
    expect(fidelidadDelMapa(['a'], [])).toBe(0)
  })
})

describe('embeddings_2d.json', () => {
  type T = { id: string; termino: string; familia: string; x: number; y: number; vecinos: { termino: string; sim: number }[]; glosa?: string | null }
  const terminos = JSON.parse(readFileSync('public/data/embeddings_2d.json', 'utf-8')).data as T[]

  it('ships every term with coordinates and five real neighbors', () => {
    expect(terminos.length).toBeGreaterThan(40)
    for (const t of terminos) {
      expect(Number.isFinite(t.x) && Number.isFinite(t.y), t.termino).toBe(true)
      expect(t.vecinos.length, t.termino).toBe(5)
      expect(t.vecinos.some((v) => v.termino === t.termino), `${t.termino} no puede ser vecino de sí mismo`).toBe(false)
    }
  })

  it('sorts each neighbor list by similarity', () => {
    for (const t of terminos) {
      const sims = t.vecinos.map((v) => v.sim)
      expect([...sims].sort((a, b) => b - a), t.termino).toEqual(sims)
    }
  })

  it('explains the jargon terms, since the exercise reveals their field meaning', () => {
    const jerga = terminos.filter((t) => t.familia === 'jerga')
    expect(jerga.length).toBeGreaterThanOrEqual(5)
    for (const t of jerga) expect(t.glosa?.length ?? 0, t.termino).toBeGreaterThan(20)
  })

  it('loses information in the projection, which is what the exercise claims', () => {
    // If the 2D map were a faithful stand-in for the 384-dim space, the whole
    // "the map is a lossy projection" lesson would be a lie.
    const fidelidades = terminos.map((t) =>
      fidelidadDelMapa(vecinosEnMapa(t, terminos).map((p) => p.termino), t.vecinos.map((v) => v.termino)),
    )
    const media = fidelidades.reduce((s, v) => s + v, 0) / fidelidades.length
    expect(media).toBeLessThan(0.9)
  })
})

describe('semántica contra palabras, en el corpus real', () => {
  const data = JSON.parse(readFileSync('public/data/rag_corpus.json', 'utf-8')).data as {
    chunks: { id: string; texto: string }[]
    preguntas: { id: string; texto: string; esperado: string; ranking: { chunk: string }[] }[]
  }
  const docs = data.chunks.map((c) => ({ id: c.id, texto: c.texto }))

  it('gets every question right by meaning', () => {
    for (const p of data.preguntas) {
      expect(p.ranking[0].chunk, `${p.id}: ${p.texto}`).toBe(p.esperado)
    }
  })

  it('keeps at least three questions that keyword search gets wrong', () => {
    const fallan = data.preguntas.filter(
      (p) => buscarPorPalabras(p.texto, docs)[0]?.id !== p.esperado,
    )
    expect(fallan.length).toBeGreaterThanOrEqual(3)
  })
})
