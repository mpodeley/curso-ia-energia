import { describe, expect, it } from 'vitest'
import { PULSOS, pulsoPorId, pulsosDeSesion } from '../content/pulsos'
import { layoutNube, normalizarPalabra, tallyOpciones, tallyPalabras, type Voto } from './pulso'

const voto = (i: number, payload: unknown): Voto => ({
  alumnoId: `a${i}`,
  nombre: `Alumno ${i}`,
  payload,
})

describe('normalizarPalabra', () => {
  it('folds case and accents so the same word lands in one bar', () => {
    expect(normalizarPalabra('Incertidumbre')).toBe('incertidumbre')
    expect(normalizarPalabra('  AUTOMATIZACIÓN ')).toBe('automatizacion')
    expect(normalizarPalabra('Ñoño')).toBe('nono')
  })

  it('drops punctuation but keeps internal hyphens', () => {
    expect(normalizarPalabra('¿miedo?')).toBe('miedo')
    expect(normalizarPalabra('costo-beneficio')).toBe('costo-beneficio')
  })

  it('returns empty for input with nothing countable', () => {
    expect(normalizarPalabra('   ')).toBe('')
    expect(normalizarPalabra('!!!')).toBe('')
  })
})

describe('tallyOpciones', () => {
  const opciones = ['Nunca', 'A veces', 'Siempre']

  it('keeps every option, including the ones nobody picked', () => {
    const r = tallyOpciones([voto(1, { opcion: 0 }), voto(2, { opcion: 0 })], opciones)
    expect(r.total).toBe(2)
    expect(r.items.map((i) => i.n)).toEqual([2, 0, 0])
    expect(r.items.map((i) => i.etiqueta)).toEqual(opciones)
  })

  it('holds content order rather than count order, because the options are a scale', () => {
    const r = tallyOpciones([voto(1, { opcion: 2 }), voto(2, { opcion: 2 }), voto(3, { opcion: 0 })], opciones)
    expect(r.items.map((i) => i.etiqueta)).toEqual(opciones)
    expect(r.items.map((i) => i.n)).toEqual([1, 0, 2])
  })

  it('computes percentages over the votes cast', () => {
    const r = tallyOpciones([voto(1, { opcion: 0 }), voto(2, { opcion: 1 })], opciones)
    expect(r.items[0].pct).toBeCloseTo(0.5)
  })

  it('ignores malformed votes and options that no longer exist', () => {
    const r = tallyOpciones(
      [voto(1, { opcion: 99 }), voto(2, { opcion: '0' }), voto(3, null), voto(4, { opcion: 1 })],
      opciones,
    )
    expect(r.total).toBe(1)
    expect(r.items.map((i) => i.n)).toEqual([0, 1, 0])
  })

  it('does not divide by zero with no votes', () => {
    const r = tallyOpciones([], opciones)
    expect(r.total).toBe(0)
    expect(r.items.every((i) => i.pct === 0)).toBe(true)
  })
})

describe('tallyPalabras', () => {
  it('groups normalized variants', () => {
    const r = tallyPalabras([
      voto(1, { palabra: 'Incertidumbre' }),
      voto(2, { palabra: 'incertidumbre' }),
      voto(3, { palabra: 'ruido' }),
    ])
    expect(r.total).toBe(3)
    expect(r.items).toEqual([
      { clave: 'incertidumbre', etiqueta: 'incertidumbre', n: 2, pct: 2 / 3 },
      { clave: 'ruido', etiqueta: 'ruido', n: 1, pct: 1 / 3 },
    ])
  })

  // The projector refreshes every 2 s. Ties must never swap places between
  // polls, so the order has to be total, not just "by count".
  it('breaks ties alphabetically, so repeated polls never reshuffle', () => {
    const uno = tallyPalabras([voto(1, { palabra: 'zeta' }), voto(2, { palabra: 'alfa' })])
    const otro = tallyPalabras([voto(1, { palabra: 'alfa' }), voto(2, { palabra: 'zeta' })])
    expect(uno.items.map((i) => i.clave)).toEqual(['alfa', 'zeta'])
    expect(otro.items.map((i) => i.clave)).toEqual(uno.items.map((i) => i.clave))
  })

  it('skips votes that normalize to nothing', () => {
    const r = tallyPalabras([voto(1, { palabra: '!!!' }), voto(2, { palabra: 'dudas' })])
    expect(r.total).toBe(1)
    expect(r.items).toHaveLength(1)
  })
})

describe('layoutNube', () => {
  const items = tallyPalabras([
    voto(1, { palabra: 'incertidumbre' }),
    voto(2, { palabra: 'incertidumbre' }),
    voto(3, { palabra: 'ruido' }),
    voto(4, { palabra: 'costo' }),
  ]).items

  it('is deterministic for the same input', () => {
    const a = layoutNube(items, { ancho: 800, alto: 400 })
    const b = layoutNube(items, { ancho: 800, alto: 400 })
    expect(a).toEqual(b)
  })

  it('scales the most frequent word largest', () => {
    const { palabras } = layoutNube(items, { ancho: 800, alto: 400 })
    const top = palabras.find((p) => p.palabra === 'incertidumbre')
    const otra = palabras.find((p) => p.palabra === 'ruido')
    expect(top!.size).toBeGreaterThan(otra!.size)
  })

  it('keeps every word inside the box', () => {
    const { palabras } = layoutNube(items, { ancho: 800, alto: 400 })
    for (const p of palabras) {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.y).toBeLessThanOrEqual(400)
    }
  })

  it('drops what does not fit instead of overlapping it', () => {
    const r = layoutNube(items, { ancho: 120, alto: 40 })
    expect(r.omitidas).toBeGreaterThan(0)
  })

  it('handles an empty tally', () => {
    expect(layoutNube([], { ancho: 800, alto: 400 })).toEqual({ palabras: [], omitidas: 0 })
  })

  it('does not divide by zero when every word ties', () => {
    const empatados = tallyPalabras([voto(1, { palabra: 'a' }), voto(2, { palabra: 'b' })]).items
    const { palabras } = layoutNube(empatados, { ancho: 800, alto: 400 })
    expect(palabras.every((p) => Number.isFinite(p.size))).toBe(true)
  })
})

// Guards the shipped content the same way quiz.test.ts guards the quiz JSON:
// a typo in an id silently orphans every answer already stored under it.
describe('catálogo de pulsos', () => {
  it('has unique ids', () => {
    const ids = PULSOS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses ids that the Worker will accept as a ref', () => {
    for (const p of PULSOS) expect(p.id).toMatch(/^[a-zA-Z0-9:_-]+$/)
  })

  it('places every pulso in a real session', () => {
    for (const p of PULSOS) expect(p.sesion).toBeGreaterThanOrEqual(1)
    for (const p of PULSOS) expect(p.sesion).toBeLessThanOrEqual(8)
  })

  it('gives every choice pulso at least two options', () => {
    for (const p of PULSOS) {
      if (p.tipo === 'opcion') expect(p.opciones.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('covers the two sessions being taught first', () => {
    expect(pulsosDeSesion(1).length).toBeGreaterThan(0)
    expect(pulsosDeSesion(2).length).toBeGreaterThan(0)
  })

  it('finds a pulso by id', () => {
    expect(pulsoPorId('s1-palabra-ia')?.tipo).toBe('palabra')
    expect(pulsoPorId('no-existe')).toBeUndefined()
  })
})
