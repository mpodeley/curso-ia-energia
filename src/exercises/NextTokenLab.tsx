import { ProbBarChart } from '../components/charts'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Slider, Stat, StatRow } from '../components/ui'
import { applyTemperature, argmax, entropyBits, makeRng, sampleFrom } from '../engine/sampling'
import { useNextTokenDists } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

const N_MUESTRAS = 15

type LabState = {
  ctx: string
  modo: 'adivina' | 'temperatura'
  guesses: Record<string, string>
  T: number
  seed: number
}

export function NextTokenLab({ sesion = 2 }: { sesion?: number }) {
  const { data: contextos, meta, loading, error } = useNextTokenDists()
  const [state, patch, reset] = useExerciseState<LabState>('next-token-lab', {
    ctx: '',
    modo: 'adivina',
    guesses: {},
    T: 1,
    seed: 1,
  })

  if (loading) return <Loading what="las distribuciones" />
  if (error || !contextos || contextos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar las distribuciones.</div>

  const actual = contextos.find((c) => c.id === state.ctx) ?? contextos[0]
  const guess = state.guesses[actual.id]
  const best = argmax(actual.opciones)

  const dist = applyTemperature(actual.opciones, state.T)
  const rng = makeRng(state.seed)
  const muestras = Array.from({ length: N_MUESTRAS }, () => sampleFrom(dist, rng).token)

  const tabStyle = (active: boolean): React.CSSProperties => ({
    font: 'inherit',
    fontSize: 'var(--pd-fs-sm)',
    fontWeight: 600,
    padding: `${space.sm}px ${space.lg}px`,
    borderRadius: radius.pill,
    border: `1px solid ${active ? colors.accent.blue : colors.border}`,
    background: active ? colors.accent.blue + '15' : colors.surface,
    color: active ? colors.accent.blue : colors.textMuted,
    cursor: 'pointer',
  })

  return (
    <Ejercicio
      titulo="Adiviná el próximo token"
      sesion={sesion}
      intro="Todo lo que hace un LLM sale de esto: dada una secuencia, asignar probabilidades al token siguiente. Primero jugá a adivinar; después subí la temperatura y mirá qué pasa con la «creatividad»."
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.sm, marginBottom: space.lg, flexWrap: 'wrap' }}>
        <button type="button" style={tabStyle(state.modo === 'adivina')} onClick={() => patch({ modo: 'adivina' })}>
          1 · Adivinar
        </button>
        <button
          type="button"
          style={tabStyle(state.modo === 'temperatura')}
          onClick={() => patch({ modo: 'temperatura' })}
        >
          2 · Temperatura
        </button>
      </div>

      <Field label="Contexto">
        <Select
          value={actual.id}
          options={contextos.map((c) => ({ value: c.id, label: c.contexto }))}
          onChange={(v) => patch({ ctx: v })}
        />
      </Field>

      <blockquote
        style={{
          margin: `0 0 ${space.lg}px`,
          padding: `${space.md}px ${space.lg}px`,
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          fontFamily: 'var(--pd-font-mono)',
          fontSize: 15,
        }}
      >
        {actual.contexto}
        <span style={{ color: colors.accent.orange, fontWeight: 700 }}> ___</span>
      </blockquote>

      {state.modo === 'adivina' ? (
        <>
          {!guess ? (
            <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap' }}>
              {[...actual.opciones]
                .map((o) => o.token)
                .sort((a, b) => a.localeCompare(b))
                .map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="tbtn"
                    style={{ fontSize: 14 }}
                    onClick={() => patch({ guesses: { ...state.guesses, [actual.id]: t } })}
                  >
                    «{t}»
                  </button>
                ))}
            </div>
          ) : (
            <>
              <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textSecondary }}>
                Elegiste <strong>«{guess}»</strong>.{' '}
                {guess === best.token
                  ? '¡Le pegaste al token más probable del modelo!'
                  : `El modelo le asigna la probabilidad más alta a «${best.token}» (${(best.p * 100).toFixed(0)} %).`}
              </p>
              <ProbBarChart data={actual.opciones} highlight={guess} />
            </>
          )}
          {actual.note && guess && <Solucion titulo="¿Qué mirar acá?">{actual.note}</Solucion>}
        </>
      ) : (
        <>
          <Slider
            label="Temperatura"
            value={state.T}
            min={0}
            max={2}
            step={0.05}
            onChange={(v) => patch({ T: v })}
            format={(v) => v.toFixed(2)}
          />
          <ProbBarChart data={dist} />
          <div style={{ margin: `${space.lg}px 0` }}>
            <StatRow>
              <Stat label="Entropía" value={entropyBits(dist).toFixed(2)} unit="bits" hint="Cuánta «sorpresa» hay en la distribución" />
            </StatRow>
          </div>
          <div style={{ display: 'flex', gap: space.md, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textSecondary }}>
              {N_MUESTRAS} muestras con esta temperatura:
            </span>
            <button type="button" className="tbtn" onClick={() => patch({ seed: state.seed + 1 })}>
              Muestrear de nuevo
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: space.md }}>
            {muestras.map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--pd-font-mono)',
                  fontSize: 13,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 4,
                  padding: '2px 8px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <Solucion titulo="¿Qué mirar acá?">
            Con temperatura 0 el modelo elige siempre el token más probable (salida «segura» y repetitiva). Cerca de 1
            respeta las probabilidades aprendidas. Por encima de 1 aplana la distribución: aparecen tokens raros — más
            «creativo», pero también más propenso a decir cualquier cosa. La temperatura no agrega conocimiento: solo
            cambia cuánto riesgo toma al elegir.
          </Solucion>
        </>
      )}

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
