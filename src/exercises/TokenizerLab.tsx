import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Stat, StatRow } from '../components/ui'
import { useTokenizerExamples } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { chart, colors, radius, space } from '../theme'

// Alternating soft fills so adjacent tokens read as separate pieces.
const TOKEN_BG = chart.fill.map((c) => c + '38')

const visible = (t: string) => t.replace(/ /g, '␣').replace(/\n/g, '⏎')

type LabState = { ejemplo: string }

export function TokenizerLab({ sesion = 2 }: { sesion?: number }) {
  const { data: ejemplos, meta, loading, error } = useTokenizerExamples()
  const [state, patch, reset] = useExerciseState<LabState>('tokenizer-lab', { ejemplo: '' })

  if (loading) return <Loading what="los ejemplos de tokenización" />
  if (error || !ejemplos || ejemplos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar los ejemplos.</div>

  const actual = ejemplos.find((e) => e.id === state.ejemplo) ?? ejemplos[0]
  const chars = actual.texto.length

  return (
    <Ejercicio
      titulo="El texto que ve el modelo: tokens"
      sesion={sesion}
      intro="Un LLM no lee letras ni palabras: lee tokens. Cada bloque de color es un token — exactamente como lo parte un tokenizador real. El símbolo ␣ marca el espacio que viaja pegado al token."
      onReset={reset}
    >
      <Field label="Elegí un texto">
        <Select
          value={actual.id}
          options={ejemplos.map((e) => ({ value: e.id, label: e.label }))}
          onChange={(v) => patch({ ejemplo: v })}
        />
      </Field>

      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.lg,
          lineHeight: 2.1,
          fontFamily: 'var(--pd-font-mono)',
          fontSize: 15,
          wordBreak: 'break-word',
        }}
      >
        {actual.tokens.map((t, i) => (
          <span
            key={i}
            title={`token ${i + 1}`}
            style={{
              background: TOKEN_BG[i % TOKEN_BG.length],
              borderRadius: 4,
              padding: '2px 1px',
              marginRight: 1,
            }}
          >
            {visible(t)}
          </span>
        ))}
      </div>

      <div style={{ marginTop: space.lg }}>
        <StatRow>
          <Stat label="Caracteres" value={chars} />
          <Stat label="Tokens" value={actual.tokens.length} accent={colors.accent.blue} />
          <Stat label="Caracteres por token" value={(chars / actual.tokens.length).toFixed(1)} />
        </StatRow>
      </div>

      {actual.note && <Solucion titulo="¿Qué mirar acá?">{actual.note}</Solucion>}

      {meta.source && (
        <div
          style={{
            marginTop: space.md,
            fontFamily: 'var(--pd-font-mono)',
            fontSize: 'var(--pd-fs-cap)',
            color: colors.textDim,
          }}
        >
          fuente: {meta.source}
        </div>
      )}
    </Ejercicio>
  )
}
