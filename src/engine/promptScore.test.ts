import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { armar, evaluar, normalizar } from './promptScore'

const COMPLETO = `Sos un ingeniero de reservorios que escribe para un directorio no técnico.
Contexto: adjunto las conclusiones del estudio de simulación del campo.
Tarea: redactá un resumen ejecutivo.
Formato: máximo 300 palabras, tres secciones (situación, opciones, recomendación).
Por ejemplo, el informe del trimestre pasado abría con la conclusión.`

const presente = (p: string, id: string) => evaluar(p).componentes.find((c) => c.id === id)!.presente

describe('normalizar', () => {
  it('strips accents preserving length so match indices stay valid', () => {
    expect(normalizar('Redactá un RESUMEN técnico ñandú')).toBe('redacta un resumen tecnico nandu')
    const s = 'áéíóúüñ'
    expect(normalizar(s)).toHaveLength(s.length)
  })
})

describe('evaluar', () => {
  it('finds the five pieces in a complete prompt', () => {
    const r = evaluar(COMPLETO)
    expect(r.presentes).toBe(5)
    expect(r.total).toBe(5)
    expect(r.componentes.every((c) => c.presente)).toBe(true)
  })

  it('reports an empty prompt as having nothing', () => {
    const r = evaluar('')
    expect(r.presentes).toBe(0)
    expect(r.palabras).toBe(0)
    expect(r.componentes.every((c) => c.evidencia === null)).toBe(true)
  })

  it('detects the task but nothing else in a one-liner', () => {
    const r = evaluar('resumime esto')
    expect(presente('resumime esto', 'tarea')).toBe(true)
    expect(r.presentes).toBe(1)
    expect(r.senales.unaSolaLinea).toBe(true)
    expect(r.senales.suficientementeLargo).toBe(false)
  })

  it('matches with and without accents', () => {
    expect(presente('Redactá un informe', 'tarea')).toBe(true)
    expect(presente('Redacta un informe', 'tarea')).toBe(true)
    expect(presente('Sos un geólogo senior', 'rol')).toBe(true)
    expect(presente('Actua como un geologo senior', 'rol')).toBe(true)
  })

  it('recognizes format constraints by shape, not just by keyword', () => {
    expect(presente('Devolvelo en una tabla de dos columnas', 'formato')).toBe(true)
    expect(presente('Máximo 200 palabras', 'formato')).toBe(true)
    expect(presente('En tres secciones', 'formato')).toBe(true)
    expect(presente('Contame del pozo', 'formato')).toBe(false)
  })

  it('quotes the matching line as evidence', () => {
    const r = evaluar(COMPLETO)
    const rol = r.componentes.find((c) => c.id === 'rol')!
    expect(rol.evidencia).toContain('ingeniero de reservorios')
  })

  it('flags specificity signals independently of the components', () => {
    const r = evaluar('Resumí el informe en máximo 200 palabras para el comité de gerencia del bloque.')
    expect(r.senales.numeros).toBe(true)
    expect(r.senales.unaSolaLinea).toBe(false)
  })
})

// Guards the dataset, not the code: if a case is edited into something the
// rubric can no longer see, the exercise would teach the wrong lesson.
describe('prompt_casos.json', () => {
  const casos = JSON.parse(readFileSync('public/data/prompt_casos.json', 'utf-8')).data as {
    id: string
    modelo: string
    slots: { componente: string; opciones: { calidad: string; texto: string }[] }[]
  }[]

  it('ships the three cases with the five slots each', () => {
    expect(casos).toHaveLength(3)
    for (const caso of casos) {
      expect(caso.slots.map((s) => s.componente)).toEqual(['rol', 'contexto', 'tarea', 'formato', 'ejemplos'])
    }
  })

  it('scores every reference prompt as complete', () => {
    for (const caso of casos) {
      const r = evaluar(caso.modelo)
      const faltan = r.componentes.filter((c) => !c.presente).map((c) => c.id)
      expect(faltan, `caso ${caso.id}`).toEqual([])
    }
  })

  it('offers an empty, a weak and a solid variant per slot', () => {
    for (const caso of casos) {
      for (const slot of caso.slots) {
        expect(slot.opciones.map((o) => o.calidad), `${caso.id}/${slot.componente}`).toEqual([
          'ninguna',
          'floja',
          'buena',
        ])
        expect(slot.opciones[0].texto).toBe('')
      }
    }
  })

  it('assembles the solid choices into a complete prompt', () => {
    for (const caso of casos) {
      const partes = Object.fromEntries(
        caso.slots.map((s) => [s.componente, s.opciones[2].texto]),
      )
      expect(evaluar(armar(partes)).presentes, `caso ${caso.id}`).toBe(5)
    }
  })
})

describe('armar', () => {
  it('joins the chosen pieces in teaching order', () => {
    expect(armar({ tarea: 'Resumí el informe.', rol: 'Sos un ingeniero.' })).toBe(
      'Sos un ingeniero.\nResumí el informe.',
    )
  })

  it('skips empty and missing slots', () => {
    expect(armar({ rol: '', tarea: 'Resumí.', formato: '   ' })).toBe('Resumí.')
    expect(armar({})).toBe('')
  })
})
