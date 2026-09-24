import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading, Slider, Stat, StatRow } from '../components/ui'
import { conUnidad, ejemplosDeEntrenamiento, palabras } from '../engine/autosupervisado'
import { useAutosupervisado } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

type LabState = { posicion: number }

// Self-supervised learning, made visible: walk a real sentence word by word and
// every step is a training example whose answer came free with the text.
export function EjerciciosGratis({ sesion = 2 }: { sesion?: number }) {
  const { data, meta, loading, error } = useAutosupervisado()
  const [state, patch, reset] = useExerciseState<LabState>('ejercicios-gratis', { posicion: 1 })

  if (loading) return <Loading what="la oración del ejercicio" />
  if (error || !data) return <div style={{ color: colors.status.err }}>No se pudo cargar la oración.</div>

  const w = palabras(data.oracion)
  const ejemplos = ejemplosDeEntrenamiento(data.oracion)
  if (ejemplos.length === 0) return null

  // posicion = index of the masked word, 1..n-1 (the first word has no context).
  const pos = Math.min(Math.max(1, state.posicion), w.length - 1)
  const ejemplo = ejemplos[pos - 1]
  const mover = (d: number) => patch({ posicion: Math.min(Math.max(1, pos + d), w.length - 1) })

  const escalones = [
    { que: 'Esta oración', n: w.length, unidad: 'palabras', fuente: data.fuente },
    ...data.escalas.map((e) => ({ que: e.que, n: e.palabras_o_tokens, unidad: e.unidad, fuente: e.fuente })),
  ]
  const maxLog = Math.max(...escalones.map((e) => Math.log10(e.n)))

  return (
    <Ejercicio
      titulo="Cada oración, un montón de ejercicios con respuesta"
      sesion={sesion}
      intro="Un modelo de lenguaje se entrena con un solo ejercicio: tapar una palabra y adivinarla a partir de las anteriores. Recorré la oración y mirá cuántos ejercicios, cada uno con su respuesta, salen de un texto que nadie preparó para esto."
      onReset={reset}
    >
      <p
        aria-live="polite"
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.lg,
          fontSize: 19,
          lineHeight: 2,
          margin: `0 0 ${space.md}px`,
        }}
      >
        {w.map((palabra, i) =>
          i < pos ? (
            <span key={i} style={{ color: colors.textPrimary }}>
              {palabra}{' '}
            </span>
          ) : i === pos ? (
            <span
              key={i}
              aria-label="palabra tapada"
              style={{
                display: 'inline-block',
                minWidth: 48,
                textAlign: 'center',
                border: `2px solid ${colors.accent.orange}`,
                borderRadius: radius.sm,
                color: colors.accent.orange,
                fontFamily: 'var(--pd-font-mono)',
                fontWeight: 700,
                lineHeight: 1.4,
                margin: '0 6px 0 0',
                padding: '0 6px',
              }}
            >
              ¿?
            </span>
          ) : (
            <span key={i} style={{ color: colors.textDim, opacity: 0.45 }}>
              {palabra}{' '}
            </span>
          ),
        )}
      </p>

      <div style={{ display: 'flex', gap: space.sm, alignItems: 'center', flexWrap: 'wrap', marginBottom: space.sm }}>
        <button type="button" className="tbtn" onClick={() => mover(-1)} disabled={pos <= 1}>
          ← Anterior
        </button>
        <button type="button" className="tbtn" onClick={() => mover(1)} disabled={pos >= w.length - 1}>
          Siguiente →
        </button>
      </div>
      <Slider
        label="Palabra tapada"
        value={pos}
        min={1}
        max={w.length - 1}
        step={1}
        onChange={(v) => patch({ posicion: v })}
        format={(v) => `${v + 1} de ${w.length}`}
      />

      <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: space.lg }}>
        <div>
          <span style={{ color: colors.textDim }}>Lo que el modelo ve: </span>
          <span style={{ fontFamily: 'var(--pd-font-mono)' }}>«{ejemplo.contexto.join(' ')}»</span>
        </div>
        <div>
          <span style={{ color: colors.textDim }}>La respuesta, gratis: </span>
          <strong style={{ color: colors.accent.orange, fontFamily: 'var(--pd-font-mono)' }}>«{ejemplo.siguiente}»</strong>
        </div>
      </div>

      <StatRow>
        <Stat label="palabras en la oración" value={w.length} />
        <Stat label="ejemplos de entrenamiento" value={ejemplos.length} accent={colors.accent.orange} />
      </StatRow>

      <h4 style={{ margin: `${space.xl}px 0 ${space.sm}px`, fontSize: 16 }}>De una oración a todo lo escrito</h4>
      <p style={{ color: colors.textMuted, fontSize: 14, margin: `0 0 ${space.md}px` }}>
        El largo de cada barra sigue la cantidad de cifras del número: cada tramo igual multiplica por 10.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {escalones.map((e, i) => (
          <li key={i} style={{ marginBottom: space.md }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: space.md, fontSize: 14, flexWrap: 'wrap' }}>
              <span>{e.que}</span>
              <span style={{ fontFamily: 'var(--pd-font-mono)', color: colors.textPrimary, fontWeight: 600 }}>
                {conUnidad(e.n, e.unidad)}
              </span>
            </div>
            <div style={{ background: colors.surfaceAlt, border: `1px solid ${colors.border}`, borderRadius: radius.sm, height: 10, marginTop: 4 }}>
              <div
                style={{
                  width: `${Math.max(2, (Math.log10(e.n) / maxLog) * 100)}%`,
                  height: '100%',
                  background: i === 0 ? colors.accent.orange : colors.accent.blue,
                  borderRadius: radius.sm,
                }}
              />
            </div>
            <a href={e.fuente.url} target="_blank" rel="noopener" style={{ fontSize: 12, color: colors.textDim }}>
              {e.fuente.titulo}
            </a>
          </li>
        ))}
      </ul>

      <Solucion titulo="Por qué esto cambió todo">
        <p style={{ margin: 0 }}>
          Nadie tuvo que etiquetar nada: cada palabra de un texto es la respuesta del ejercicio que forman las
          palabras anteriores. Por eso la cantidad de ejemplos depende solo de cuánto texto haya, y hay muchísimo. En
          la sesión 1, con los pozos, alguien tuvo que declarar el tipo de cada uno para que el modelo aprendiera; acá
          la respuesta viene incluida en el propio dato. Así se preentrenan todos los modelos grandes de lenguaje: con
          billones de estos ejercicios. Para predecir bien la palabra siguiente en textos de todo tipo, el modelo
          termina aprendiendo gramática, datos del mundo y algo de razonamiento.
        </p>
      </Solucion>

      <div style={{ marginTop: space.md, fontSize: 12, color: colors.textDim }}>fuente: {meta.source}</div>
    </Ejercicio>
  )
}
