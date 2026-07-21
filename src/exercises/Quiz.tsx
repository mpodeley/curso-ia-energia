import { Ejercicio } from '../components/Ejercicio'
import { Loading, Stat, StatRow } from '../components/ui'
import { correctIndex, score } from '../engine/quiz'
import { useQuiz } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

type QuizState = {
  answers: Record<number, number>
  checked: boolean
}

export function Quiz({
  data,
  sesion,
  titulo = 'Comprobá lo que te llevás',
}: {
  data: string
  sesion: number
  titulo?: string
}) {
  const { data: preguntas, loading, error } = useQuiz(data)
  const [state, patch, reset] = useExerciseState<QuizState>(`quiz:${data}`, {
    answers: {},
    checked: false,
  })

  if (loading) return <Loading what="el quiz" />
  if (error || !preguntas) return <div style={{ color: colors.status.err }}>No se pudo cargar el quiz.</div>

  const answersArr = preguntas.map((_, i) => (i in state.answers ? state.answers[i] : null))
  const allAnswered = answersArr.every((a) => a != null)
  const result = score(preguntas, answersArr)

  return (
    <Ejercicio
      titulo={titulo}
      sesion={sesion}
      intro="Elegí una opción por pregunta y después corregí: cada opción tiene su explicación."
      onReset={reset}
      done={state.checked}
    >
      {preguntas.map((p, i) => {
        const selected = answersArr[i]
        const correct = correctIndex(p)
        return (
          <fieldset key={i} style={{ border: 'none', margin: `0 0 ${space.xl}px`, padding: 0 }}>
            <legend style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: space.sm, padding: 0 }}>
              {i + 1}. {p.pregunta}
            </legend>
            {p.opciones.map((o, j) => {
              const isSelected = selected === j
              const showState = state.checked
              const isCorrect = j === correct
              let border = `1px solid ${colors.border}`
              if (showState && isCorrect) border = `2px solid ${colors.status.ok}`
              else if (showState && isSelected && !isCorrect) border = `2px solid ${colors.status.err}`
              else if (isSelected) border = `2px solid ${colors.accent.blue}`
              return (
                <div key={j} style={{ marginBottom: space.sm }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!state.checked) patch({ answers: { ...state.answers, [i]: j } })
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: colors.surface,
                      color: colors.textPrimary,
                      border,
                      borderRadius: radius.md,
                      padding: `${space.sm}px ${space.md}px`,
                      cursor: state.checked ? 'default' : 'pointer',
                      font: 'inherit',
                      fontSize: 'var(--pd-fs-sm)',
                    }}
                  >
                    {showState && isCorrect ? '✓ ' : ''}
                    {o.texto}
                  </button>
                  {state.checked && (isSelected || isCorrect) && (
                    <div
                      style={{
                        color: isCorrect ? colors.status.ok : colors.status.err,
                        fontSize: 'var(--pd-fs-sm)',
                        padding: `${space.xs}px ${space.md}px 0`,
                      }}
                    >
                      {o.explicacion}
                    </div>
                  )}
                </div>
              )
            })}
          </fieldset>
        )
      })}
      {!state.checked ? (
        <button type="button" className="btn btn--primary" disabled={!allAnswered} onClick={() => patch({ checked: true })}>
          Corregir
        </button>
      ) : (
        <StatRow>
          <Stat
            label="Resultado"
            value={`${result.correct} / ${result.total}`}
            accent={result.correct === result.total ? colors.status.ok : colors.accent.blue}
          />
        </StatRow>
      )}
    </Ejercicio>
  )
}
