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
