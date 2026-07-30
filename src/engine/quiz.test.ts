import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { correctIndex, score, type QuizPregunta } from './quiz'

const PREGUNTAS: QuizPregunta[] = [
  {
    pregunta: '¿2+2?',
    opciones: [
      { texto: '3', explicacion: 'no' },
      { texto: '4', correcta: true, explicacion: 'sí' },
    ],
  },
  {
    pregunta: '¿Color del cielo?',
    opciones: [
      { texto: 'azul', correcta: true, explicacion: 'sí' },
      { texto: 'verde', explicacion: 'no' },
    ],
  },
]

describe('quiz scoring', () => {
  it('finds the correct index', () => {
    expect(correctIndex(PREGUNTAS[0])).toBe(1)
    expect(correctIndex(PREGUNTAS[1])).toBe(0)
  })

  it('scores answered questions', () => {
    expect(score(PREGUNTAS, [1, 0])).toEqual({ correct: 2, total: 2 })
    expect(score(PREGUNTAS, [0, 0])).toEqual({ correct: 1, total: 2 })
  })

  it('treats null as unanswered', () => {
    expect(score(PREGUNTAS, [null, null])).toEqual({ correct: 0, total: 2 })
    expect(score(PREGUNTAS, [])).toEqual({ correct: 0, total: 2 })
  })
})

// Guards the quiz content. A quiz with two right answers, or with an option
// that has no explanation, teaches nothing and the component would not say so.
describe('quiz_sN.json', () => {
  const SESIONES = [1, 2, 3, 4, 5, 6, 7]

  const cargar = (n: number) =>
    JSON.parse(readFileSync(`public/data/quiz_s${n}.json`, 'utf-8')).data as QuizPregunta[]

  it('ships a quiz for every session that has one', () => {
    for (const n of SESIONES) expect(cargar(n).length, `sesión ${n}`).toBeGreaterThanOrEqual(3)
  })

  it('has exactly one correct option per question', () => {
    for (const n of SESIONES) {
      cargar(n).forEach((p, i) => {
        const correctas = p.opciones.filter((o) => o.correcta === true)
        expect(correctas.length, `s${n} p${i + 1}: "${p.pregunta.slice(0, 50)}"`).toBe(1)
      })
    }
  })

  it('explains every option, not only the right one', () => {
    for (const n of SESIONES) {
      cargar(n).forEach((p, i) => {
        p.opciones.forEach((o, j) => {
          expect(o.explicacion.length, `s${n} p${i + 1} opción ${j + 1}`).toBeGreaterThan(30)
        })
      })
    }
  })

  it('offers enough options to make guessing unattractive', () => {
    for (const n of SESIONES) {
      cargar(n).forEach((p, i) => {
        expect(p.opciones.length, `s${n} p${i + 1}`).toBeGreaterThanOrEqual(3)
      })
    }
  })

  it('does not always put the right answer in the same place', () => {
    // A quiz whose answer is always the second option is a quiz about position.
    const posiciones = SESIONES.flatMap((n) => cargar(n).map((p) => correctIndex(p)))
    expect(new Set(posiciones).size).toBeGreaterThan(2)
  })
})
