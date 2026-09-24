import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  anioDecimal,
  decadas,
  dominios,
  factor,
  formatoFlop,
  porDominio,
  ubicarEtiquetas,
  type ModeloEscala,
} from './escala'

const fila = (modelo: string, flop: number, dominio = 'Lenguaje', fecha = '2020-01-01'): ModeloEscala => ({
  modelo,
  organizacion: 'x',
  fecha,
  flop,
  parametros: null,
  dominio,
  confianza: 'confiable',
})

describe('anioDecimal', () => {
  it('maps the first of January to the whole year', () => {
    expect(anioDecimal('2017-01-01')).toBe(2017)
  })

  it('places mid-year near .5', () => {
    expect(anioDecimal('2020-07-02')).toBeCloseTo(2020.5, 2)
  })
})

describe('decadas', () => {
  it('covers the range with powers of ten', () => {
    expect(decadas(3e3, 2e5)).toEqual([1e3, 1e4, 1e5, 1e6])
  })

  it('handles exact powers and bad input', () => {
    expect(decadas(1e2, 1e3)).toEqual([1e2, 1e3])
    expect(decadas(0, 10)).toEqual([])
    expect(decadas(10, 1)).toEqual([])
  })
})

describe('formatoFlop', () => {
  it('writes exact powers of ten as 10 with a superscript', () => {
    expect(formatoFlop(1e25)).toBe('10²⁵')
    expect(formatoFlop(1e3)).toBe('10³')
  })

  it('keeps one decimal of mantissa', () => {
    expect(formatoFlop(2.1e25)).toBe('2.1 × 10²⁵')
    expect(formatoFlop(1.496338e12)).toBe('1.5 × 10¹²')
  })

  it('rolls a mantissa that rounds to 10 into the next power', () => {
    expect(formatoFlop(9.97e20)).toBe('10²¹')
  })
})

describe('porDominio and dominios', () => {
  const filas = [fila('a', 1), fila('b', 2, 'Visión'), fila('c', 3), fila('d', 4, 'Habla')]

  it('filters by domain, or keeps everything for todos', () => {
    expect(porDominio(filas, 'todos')).toHaveLength(4)
    expect(porDominio(filas, 'Visión').map((f) => f.modelo)).toEqual(['b'])
  })

  it('orders domains by count, then name', () => {
    expect(dominios(filas)).toEqual(['Lenguaje', 'Habla', 'Visión'])
  })
})

describe('ubicarEtiquetas', () => {
  const limites = { x: 0, y: 0, ancho: 600, alto: 400 }

  it('puts a lone label right above its dot, with no leader line', () => {
    const r = ubicarEtiquetas([{ id: 'a', x: 300, y: 200, ancho: 60, alto: 16 }], limites)
    expect(r[0]).toMatchObject({ id: 'a', tx: 300, anchor: 'middle', guia: null })
    expect(r[0].ty).toBeLessThan(200)
  })

  it('is deterministic whatever the input order', () => {
    const items = [
      { id: 'a', x: 300, y: 200, ancho: 60, alto: 16 },
      { id: 'b', x: 305, y: 200, ancho: 60, alto: 16 },
      { id: 'c', x: 310, y: 205, ancho: 60, alto: 16 },
    ]
    const orden = (r: ReturnType<typeof ubicarEtiquetas>) => [...r].sort((x, y) => (x.id < y.id ? -1 : 1))
    expect(orden(ubicarEtiquetas(items, limites))).toEqual(orden(ubicarEtiquetas([...items].reverse(), limites)))
  })

  it('never overlaps two labels when there is room, and draws a leader line when it moves one far', () => {
    const items = ['a', 'b', 'c', 'd', 'e'].map((id, i) => ({ id, x: 300 + i * 3, y: 200 + i * 2, ancho: 70, alto: 16 }))
    const r = ubicarEtiquetas(items, limites)
    const cajas = r.map((u) => {
      const it = items.find((i) => i.id === u.id)!
      const x = u.anchor === 'end' ? u.tx - it.ancho : u.anchor === 'start' ? u.tx : u.tx - it.ancho / 2
      return { x, y: u.ty - it.alto * 0.85, ancho: it.ancho, alto: it.alto }
    })
    for (let i = 0; i < cajas.length; i++)
      for (let j = i + 1; j < cajas.length; j++) {
        const a = cajas[i]
        const b = cajas[j]
        const pisan = a.x < b.x + b.ancho - 0.5 && b.x < a.x + a.ancho - 0.5 && a.y < b.y + b.alto - 0.5 && b.y < a.y + a.alto - 0.5
        expect(pisan, `${r[i].id} y ${r[j].id}`).toBe(false)
      }
    expect(r.some((u) => u.guia !== null)).toBe(true)
  })

  it('moves a second label off the first one', () => {
    const r = ubicarEtiquetas(
      [
        { id: 'a', x: 300, y: 200, ancho: 60, alto: 16 },
        { id: 'b', x: 305, y: 200, ancho: 60, alto: 16 },
      ],
      limites,
    )
    // Same spot would overlap: the second label must land somewhere else.
    expect([r[1].tx, r[1].ty]).not.toEqual([r[0].tx, r[0].ty])
  })

  it('keeps labels inside the plot when it can', () => {
    const r = ubicarEtiquetas([{ id: 'a', x: 300, y: 5, ancho: 60, alto: 16 }], limites)
    expect(r[0].ty).toBeGreaterThan(5)
  })
})

describe('los datos de Epoch que se publican', () => {
  const filas = (JSON.parse(readFileSync('public/data/escala.json', 'utf-8')) as { data: ModeloEscala[] }).data

  it('has positive compute and ISO dates on every row', () => {
    for (const f of filas) {
      expect(f.flop).toBeGreaterThan(0)
      expect(f.fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('labels the two ends of the story the page tells', () => {
    const lenet = filas.find((f) => f.destacado && f.etiqueta?.startsWith('LeNet'))
    const gpt4 = filas.find((f) => f.destacado && f.etiqueta === 'GPT-4')
    expect(lenet && gpt4).toBeTruthy()
    if (lenet && gpt4) expect(factor(lenet, gpt4)).toBeGreaterThan(1e12)
  })

  it('gives every highlighted row a label', () => {
    for (const f of filas.filter((x) => x.destacado)) expect(f.etiqueta).toBeTruthy()
  })
})
