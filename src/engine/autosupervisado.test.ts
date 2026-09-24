import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { conUnidad, ejemplosDeEntrenamiento, formatoGrande, palabras, type DatosAutosupervisado } from './autosupervisado'

describe('palabras', () => {
  it('splits on any whitespace and keeps punctuation on its word', () => {
    expect(palabras('  la presión,\n\tbaja  ')).toEqual(['la', 'presión,', 'baja'])
  })

  it('returns nothing for an empty sentence', () => {
    expect(palabras('   ')).toEqual([])
  })
})

describe('ejemplosDeEntrenamiento', () => {
  it('pairs every prefix with the word that follows it', () => {
    expect(ejemplosDeEntrenamiento('el pozo produce gas')).toEqual([
      { contexto: ['el'], siguiente: 'pozo' },
      { contexto: ['el', 'pozo'], siguiente: 'produce' },
      { contexto: ['el', 'pozo', 'produce'], siguiente: 'gas' },
    ])
  })

  it('yields n − 1 examples for n words', () => {
    expect(ejemplosDeEntrenamiento('a b c d e f')).toHaveLength(5)
    expect(ejemplosDeEntrenamiento('sola')).toEqual([])
    expect(ejemplosDeEntrenamiento('')).toEqual([])
  })

  it('works on the sentence the page ships', () => {
    const { data } = JSON.parse(readFileSync('public/data/autosupervisado.json', 'utf-8')) as {
      data: DatosAutosupervisado
    }
    const n = palabras(data.oracion).length
    expect(n).toBeGreaterThan(5)
    expect(ejemplosDeEntrenamiento(data.oracion)).toHaveLength(n - 1)
    for (const e of data.escalas) expect(e.palabras_o_tokens).toBeGreaterThan(0)
  })
})

describe('formatoGrande', () => {
  it('writes small counts with a thousands comma', () => {
    expect(formatoGrande(136)).toBe('136')
    expect(formatoGrande(12345)).toBe('12,345')
  })

  it('uses millones up to a million of millions', () => {
    expect(formatoGrande(1e6)).toBe('1 millón')
    expect(formatoGrande(5e9)).toBe('5,000 millones')
    expect(formatoGrande(3e11)).toBe('300,000 millones')
  })

  it('uses the long scale: un billón is 10^12', () => {
    expect(formatoGrande(1e12)).toBe('1 billón')
    expect(formatoGrande(1.5e13)).toBe('15 billones')
    expect(formatoGrande(2.5e12)).toBe('2.5 billones')
  })
})

describe('conUnidad', () => {
  it('adds "de" after millones and billones only', () => {
    expect(conUnidad(136, 'palabras')).toBe('136 palabras')
    expect(conUnidad(5e9, 'palabras')).toBe('5,000 millones de palabras')
    expect(conUnidad(1.5e13, 'tokens')).toBe('15 billones de tokens')
  })
})
