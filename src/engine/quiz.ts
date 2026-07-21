// Quiz data types + scoring. Question files live in public/data/quiz_sN.json.

export type QuizOpcion = {
  texto: string
  correcta?: boolean
  explicacion: string
}

export type QuizPregunta = {
  pregunta: string
  opciones: QuizOpcion[]
}

export function correctIndex(p: QuizPregunta): number {
  return p.opciones.findIndex((o) => o.correcta)
}

export function score(preguntas: QuizPregunta[], answers: (number | null)[]): { correct: number; total: number } {
  let correct = 0
  preguntas.forEach((p, i) => {
    if (answers[i] != null && answers[i] === correctIndex(p)) correct++
  })
  return { correct, total: preguntas.length }
}
