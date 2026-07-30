import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { puntuar, veredicto, type Informe, type Segmento } from './hunt'

const SEGMENTOS: Segmento[] = [
  { texto: 'sana 1', porque: '' },
  { texto: 'inventada 1', inventada: true, porque: '', comoVerificar: 'x' },
  { texto: 'sana 2', porque: '' },
  { texto: 'inventada 2', inventada: true, porque: '', comoVerificar: 'x' },
  { texto: 'sana 3', porque: '' },
]

describe('puntuar', () => {
  it('gives a perfect score to exactly the fabricated claims', () => {
    const p = puntuar(SEGMENTOS, new Set([1, 3]))
    expect(p).toMatchObject({ encontradas: 2, falsasAlarmas: 0, perdidas: 0, totalInventadas: 2 })
    expect(p.precision).toBe(1)
    expect(p.recall).toBe(1)
    expect(p.f1).toBe(1)
  })

  it('refuses to reward marking everything', () => {
    const p = puntuar(SEGMENTOS, new Set([0, 1, 2, 3, 4]))
    expect(p.recall).toBe(1) // caught them all…
    expect(p.precision).toBeCloseTo(0.4, 10) // …by crying wolf three times
    expect(p.f1).toBeLessThan(0.6)
  })

  it('scores zero when nothing is marked', () => {
    const p = puntuar(SEGMENTOS, new Set())
    expect(p).toMatchObject({ encontradas: 0, falsasAlarmas: 0, perdidas: 2 })
    expect(p.precision).toBe(0)
    expect(p.recall).toBe(0)
    expect(p.f1).toBe(0)
  })

  it('ranks careful reading above blanket suspicion', () => {
    const cuidadoso = puntuar(SEGMENTOS, new Set([1])) // one hit, no false alarms
    const paranoico = puntuar(SEGMENTOS, new Set([0, 1, 2, 3, 4]))
    expect(cuidadoso.f1).toBeGreaterThan(paranoico.f1)
  })

  it('counts false alarms separately from misses', () => {
    const p = puntuar(SEGMENTOS, new Set([0, 2]))
    expect(p).toMatchObject({ encontradas: 0, falsasAlarmas: 2, perdidas: 2 })
  })
})

describe('veredicto', () => {
  it('calls out paranoia and perfection differently', () => {
    expect(veredicto(puntuar(SEGMENTOS, new Set([1, 3])))).toContain('criterio')
    expect(veredicto(puntuar(SEGMENTOS, new Set([0, 1, 2, 3, 4])))).toContain('Desconfiar de todo')
  })

  it('tells someone who found nothing that they found nothing, not that they are paranoid', () => {
    // One false alarm and no hits is not paranoia, it is a miss.
    expect(veredicto(puntuar(SEGMENTOS, new Set([0])))).toContain('ninguna de las invenciones')
  })
})

// Guards the content: an informe with nothing to find, or with everything
// fabricated, would not teach discrimination.
describe('alucinaciones.json', () => {
  const informes = JSON.parse(readFileSync('public/data/alucinaciones.json', 'utf-8')).data as Informe[]

  it('ships three informes', () => {
    expect(informes).toHaveLength(3)
  })

  it('mixes sound claims with fabricated ones in every informe', () => {
    for (const inf of informes) {
      const inventadas = inf.segmentos.filter((s) => s.inventada).length
      expect(inventadas, `${inf.id}`).toBeGreaterThanOrEqual(2)
      expect(inventadas, `${inf.id} no puede ser todo inventado`).toBeLessThan(inf.segmentos.length / 2)
    }
  })

  it('explains every segment and tells how to check the fabricated ones', () => {
    for (const inf of informes) {
      for (const s of inf.segmentos) {
        expect(s.porque.length, `${inf.id}: "${s.texto.slice(0, 40)}"`).toBeGreaterThan(20)
        if (s.inventada) expect(s.comoVerificar?.length ?? 0).toBeGreaterThan(20)
      }
    }
  })
})
