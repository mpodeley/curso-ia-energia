import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { buscarPorPalabras, tokenizar, type Documento } from './lexical'

const DOCS: Documento[] = [
  { id: 'a', texto: 'Las válvulas de alivio de presión se calibran en banco cada 24 meses.' },
  { id: 'b', texto: 'El uso de protección auditiva es obligatorio en la zona de compresión.' },
  { id: 'c', texto: 'El separador trifásico opera a 45 bar y separa gas, petróleo y agua.' },
]

describe('tokenizar', () => {
  it('lowercases, strips accents and drops stopwords', () => {
    expect(tokenizar('¿Cada cuánto se calibran las VÁLVULAS de alivio?')).toEqual([
      'calibran',
      'valvulas',
      'alivio',
    ])
  })

  it('drops words too short to carry signal', () => {
    expect(tokenizar('el gas va a la red')).toEqual(['gas', 'red'])
  })
})

describe('buscarPorPalabras', () => {
  it('ranks the document that shares words first', () => {
    const r = buscarPorPalabras('¿cada cuánto se calibran las válvulas?', DOCS)
    expect(r[0].id).toBe('a')
    expect(r[0].score).toBeGreaterThan(0)
  })

  it('reports which query words matched, so the UI can explain the score', () => {
    const r = buscarPorPalabras('calibran válvulas', DOCS)
    expect(r[0].terminos.sort()).toEqual(['calibran', 'valvulas'])
  })

  it('scores zero when the question shares no word with any document', () => {
    // This is the whole point of the exercise: "tapones para los oídos" is the
    // same thing as "protección auditiva" and keyword search cannot tell.
    const r = buscarPorPalabras('¿necesito tapones para los oídos?', DOCS)
    expect(r.every((x) => x.score === 0)).toBe(true)
  })

  it('survives an empty query and an empty corpus', () => {
    expect(buscarPorPalabras('', DOCS).every((r) => r.score === 0)).toBe(true)
    expect(buscarPorPalabras('válvulas', [])).toEqual([])
  })

  it('returns every document, ranked', () => {
    expect(buscarPorPalabras('gas', DOCS)).toHaveLength(DOCS.length)
  })
})

// The exercise claims keyword search fails where embeddings succeed. That claim
// has to be true of the shipped corpus, not just of a toy example.
describe('rag_corpus.json', () => {
  const data = JSON.parse(readFileSync('public/data/rag_corpus.json', 'utf-8')).data as {
    chunks: { id: string; texto: string }[]
    preguntas: { id: string; texto: string; esperado: string; ranking: { chunk: string }[] }[]
  }
  const docs = data.chunks.map((c) => ({ id: c.id, texto: c.texto }))

  it('retrieves the expected chunk in the top 3 semantically, for every question', () => {
    for (const p of data.preguntas) {
      const top3 = p.ranking.slice(0, 3).map((r) => r.chunk)
      expect(top3, `${p.id}: ${p.texto}`).toContain(p.esperado)
    }
  })

  it('has at least two questions where keyword search fails outright', () => {
    const fallan = data.preguntas.filter((p) => {
      const porPalabras = buscarPorPalabras(p.texto, docs)
      return porPalabras[0].score === 0 || porPalabras[0].id !== p.esperado
    })
    expect(fallan.length).toBeGreaterThanOrEqual(2)
  })

  it('beats keyword search overall', () => {
    const semantico = data.preguntas.filter((p) => p.ranking[0].chunk === p.esperado).length
    const lexico = data.preguntas.filter(
      (p) => buscarPorPalabras(p.texto, docs)[0]?.id === p.esperado,
    ).length
    expect(semantico).toBeGreaterThan(lexico)
  })
})
