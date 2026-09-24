import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { anioDecimal, fechaLarga, vecinoDe, type Hito, type LineaDeTiempo } from './lineaDeTiempo'

const hito = (id: string, fecha: string): Hito => ({
  id,
  fecha,
  titulo: id,
  que: '',
  porque: '',
  era: 'generales',
  fuente: { titulo: '', url: 'https://example.org' },
})

describe('anioDecimal', () => {
  it('places a full date inside its year', () => {
    expect(anioDecimal('2022-11-30')).toBeCloseTo(2022 + 10 / 12 + 29 / 365, 6)
  })

  it('centres a year-only or month-only date', () => {
    expect(anioDecimal('1956')).toBeCloseTo(1956.5, 6)
    expect(anioDecimal('1958-07')).toBeCloseTo(1958 + 6 / 12 + 14 / 365, 6)
  })
})

describe('fechaLarga', () => {
  it('keeps the precision of the source, with lowercase months', () => {
    expect(fechaLarga('1956')).toBe('1956')
    expect(fechaLarga('1958-07')).toBe('julio de 1958')
    expect(fechaLarga('2022-11-30')).toBe('30 de noviembre de 2022')
  })
})

describe('vecinoDe', () => {
  const hitos = [hito('a', '1950'), hito('b', '1960'), hito('c', '1970')]

  it('walks forward and back, clamped at the ends', () => {
    expect(vecinoDe(hitos, 'b', 1)?.id).toBe('c')
    expect(vecinoDe(hitos, 'b', -1)?.id).toBe('a')
    expect(vecinoDe(hitos, 'c', 1)?.id).toBe('c')
    expect(vecinoDe(hitos, 'a', -1)?.id).toBe('a')
  })

  it('falls back to the first milestone for an unknown id', () => {
    expect(vecinoDe(hitos, 'zzz', 1)?.id).toBe('a')
  })
})

// The timeline is hand-authored: guard it the way quiz.test.ts guards the quizzes.
describe('linea_de_tiempo.json', () => {
  const { eras, hitos } = (
    JSON.parse(readFileSync('public/data/linea_de_tiempo.json', 'utf-8')) as { data: LineaDeTiempo }
  ).data

  it('has unique ids and milestones in date order', () => {
    expect(new Set(hitos.map((h) => h.id)).size).toBe(hitos.length)
    const anios = hitos.map((h) => anioDecimal(h.fecha))
    expect([...anios].sort((a, b) => a - b)).toEqual(anios)
  })

  it('puts every milestone in a known era, with a source', () => {
    const ids = new Set(eras.map((e) => e.id))
    for (const h of hitos) {
      expect(ids.has(h.era), h.id).toBe(true)
      expect(h.fuente.url, h.id).toMatch(/^https:\/\//)
      expect(h.fecha, h.id).toMatch(/^\d{4}(-\d{2}(-\d{2})?)?$/)
    }
  })

  it('keeps every milestone inside the years of its era', () => {
    const porId = new Map(eras.map((e) => [e.id, e]))
    for (const h of hitos) {
      const e = porId.get(h.era)!
      const a = Math.floor(anioDecimal(h.fecha))
      expect(a, h.id).toBeGreaterThanOrEqual(e.desde)
      expect(a, h.id).toBeLessThanOrEqual(e.hasta)
    }
  })
})
