import { describe, expect, it } from 'vitest'
import { PREGUNTAS, REF_ENCUESTA, type Pregunta } from '../content/encuesta-s1'
import { completadas, completaron, faltantes, paraEnviar, resumen, respondida } from './encuesta'

const P: Pregunta[] = [
  { id: 'q-texto', bloque: 'a', texto: '¿Área?', tipo: 'texto-corto' },
  { id: 'q-unica', bloque: 'a', texto: '¿Rol?', tipo: 'opcion-unica', opciones: ['Ing', 'Geo', 'Ops'] },
  { id: 'q-multi', bloque: 'b', texto: '¿Datos?', tipo: 'opcion-multiple', opciones: ['Prod', 'Perf'] },
  { id: 'q-opt', bloque: 'b', texto: '¿Algo más?', tipo: 'texto-largo', opcional: true },
]

describe('respondida', () => {
  it('treats whitespace-only text as unanswered', () => {
    expect(respondida('   ')).toBe(false)
    expect(respondida('Reservorios')).toBe(true)
  })

  it('treats option zero as answered', () => {
    // The first option is index 0, and a falsy check would silently discard it.
    expect(respondida(0)).toBe(true)
  })

  it('treats an empty multi-select as unanswered', () => {
    expect(respondida([])).toBe(false)
    expect(respondida([0])).toBe(true)
  })
})

describe('faltantes', () => {
  it('lists only unanswered required questions', () => {
    expect(faltantes(P, { 'q-texto': 'Reservorios' })).toEqual(['q-unica', 'q-multi'])
  })

  it('never demands an optional question', () => {
    const todo = { 'q-texto': 'x', 'q-unica': 0, 'q-multi': [1] }
    expect(faltantes(P, todo)).toEqual([])
  })
})

describe('completadas', () => {
  it('counts optional answers too', () => {
    expect(completadas(P, { 'q-texto': 'x', 'q-opt': 'algo' })).toBe(2)
  })
})

describe('paraEnviar', () => {
  it('trims text and drops the empties', () => {
    expect(paraEnviar(P, { 'q-texto': '  Producción  ', 'q-opt': '   ', 'q-unica': 1 })).toEqual({
      'q-texto': 'Producción',
      'q-unica': 1,
    })
  })

  it('keeps option zero', () => {
    expect(paraEnviar(P, { 'q-unica': 0 })).toEqual({ 'q-unica': 0 })
  })
})

describe('resumen', () => {
  const filas = [
    { alumnoId: 'a', nombre: 'Ana', payload: { 'q-texto': 'Reservorios', 'q-unica': 0, 'q-multi': [0, 1] } },
    { alumnoId: 'b', nombre: 'Beto', payload: { 'q-texto': '  ', 'q-unica': 0, 'q-multi': [1] } },
  ]

  it('counts choices in content order', () => {
    const r = resumen(P, filas)
    const unica = r.find((x) => x.pregunta.id === 'q-unica')
    expect(unica?.clase).toBe('opciones')
    if (unica?.clase === 'opciones') {
      expect(unica.opciones.map((o) => o.n)).toEqual([2, 0, 0])
      expect(unica.n).toBe(2)
    }
  })

  it('counts a multi-select person once but every option they picked', () => {
    const r = resumen(P, filas)
    const multi = r.find((x) => x.pregunta.id === 'q-multi')
    if (multi?.clase === 'opciones') {
      expect(multi.opciones.map((o) => o.n)).toEqual([1, 2])
      expect(multi.n).toBe(2)
    }
  })

  it('lists free text with who wrote it, skipping blanks', () => {
    const r = resumen(P, filas)
    const texto = r.find((x) => x.pregunta.id === 'q-texto')
    if (texto?.clase === 'texto') {
      expect(texto.textos).toEqual([{ nombre: 'Ana', texto: 'Reservorios' }])
    }
  })

  it('returns an entry per question even with no answers at all', () => {
    expect(resumen(P, [])).toHaveLength(P.length)
  })
})

describe('completaron', () => {
  it('counts only people who answered every required question', () => {
    const filas = [
      { alumnoId: 'a', nombre: 'Ana', payload: { 'q-texto': 'x', 'q-unica': 0, 'q-multi': [1] } },
      { alumnoId: 'b', nombre: 'Beto', payload: { 'q-texto': 'x', 'q-unica': 0 } },
    ]
    expect(completaron(P, filas)).toBe(1)
  })
})

// Same guard as quiz.test.ts puts on the shipped quiz JSON: these ids are half
// of the primary key the answers are stored under.
describe('encuesta de relevamiento', () => {
  it('has unique, stable-looking ids', () => {
    const ids = PREGUNTAS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/)
  })

  it('uses a ref the Worker accepts', () => {
    expect(REF_ENCUESTA).toMatch(/^[a-zA-Z0-9:_-]+$/)
  })

  it('gives every choice question its options, and no others', () => {
    for (const p of PREGUNTAS) {
      const esOpcion = p.tipo === 'opcion-unica' || p.tipo === 'opcion-multiple'
      expect(Boolean(p.opciones?.length)).toBe(esOpcion)
    }
  })

  it('still covers the four blocks of docs/encuesta.md', () => {
    expect(new Set(PREGUNTAS.map((p) => p.bloque))).toEqual(new Set(['a', 'b', 'c', 'd']))
  })
})
