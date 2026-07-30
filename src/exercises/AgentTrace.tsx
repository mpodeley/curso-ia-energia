import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading, Stat, StatRow } from '../components/ui'
import { useAgentTrace } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'
import type { PasoAgente } from '../types'

type LabState = { paso: number }

const ETIQUETA_HERRAMIENTA: Record<PasoAgente['herramienta'], string> = {
  bash: 'terminal',
  python: 'python',
  respuesta: 'respuesta final',
}

/** Rough stand-in for how much context the run has accumulated. Characters,
 *  not tokens — the point is that it only ever grows, not the exact number. */
function contextoAcumulado(pasos: PasoAgente[], hasta: number): number {
  return pasos
    .slice(0, hasta + 1)
    .reduce((s, p) => s + p.pensamiento.length + p.entrada.length + p.salida.length, 0)
}

const bloqueMono: React.CSSProperties = {
  fontFamily: 'var(--pd-font-mono)',
  fontSize: 13,
  whiteSpace: 'pre-wrap',
  overflowX: 'auto',
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: space.md,
  margin: 0,
}

export function AgentTrace({ sesion = 6 }: { sesion?: number }) {
  const { data: traza, meta, loading, error } = useAgentTrace()
  const [state, patch, reset] = useExerciseState<LabState>('agent-trace', { paso: 0 })

  if (loading) return <Loading what="la traza" />
  if (error || !traza || traza.pasos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudo cargar la traza.</div>

  const total = traza.pasos.length
  const i = Math.min(Math.max(state.paso, 0), total - 1)
  const paso = traza.pasos[i]
  const esError = paso.estado === 'error'
  const esFinal = paso.herramienta === 'respuesta'

  return (
    <Ejercicio
      titulo="El loop por dentro"
      sesion={sesion}
      intro="Un agente no es magia: es un modelo que piensa, ejecuta una herramienta, mira el resultado y vuelve a pensar. Recorré la traza paso a paso y mirá la mecánica, incluido el momento en que se equivoca."
      onReset={reset}
    >
      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.md,
          marginBottom: space.lg,
        }}
      >
        <div style={{ fontSize: 12, color: colors.textDim, fontFamily: 'var(--pd-font-mono)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Lo que le pidieron
        </div>
        <div style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textPrimary, marginTop: 4 }}>{traza.objetivo}</div>
      </div>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: space.lg }}>
        {traza.pasos.map((p, j) => (
          <button
            key={j}
            type="button"
            title={p.pensamiento.slice(0, 80)}
            onClick={() => patch({ paso: j })}
            style={{
              font: 'inherit',
              fontFamily: 'var(--pd-font-mono)',
              fontSize: 12,
              width: 30,
              height: 30,
              borderRadius: radius.sm,
              cursor: 'pointer',
              border: `1px solid ${j === i ? colors.accent.blue : p.estado === 'error' ? colors.status.err : colors.border}`,
              background: j === i ? colors.accent.blue + '15' : j < i ? colors.surfaceAlt : colors.surface,
              color: j === i ? colors.accent.blue : p.estado === 'error' ? colors.status.err : colors.textMuted,
              fontWeight: j === i ? 700 : 400,
            }}
          >
            {j + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: space.sm, alignItems: 'center', marginBottom: space.lg, flexWrap: 'wrap' }}>
        <button type="button" className="tbtn" disabled={i === 0} onClick={() => patch({ paso: i - 1 })}>
          ← Anterior
        </button>
        <button type="button" className="tbtn" disabled={i === total - 1} onClick={() => patch({ paso: i + 1 })}>
          Siguiente →
        </button>
        <span style={{ fontSize: 13, color: colors.textMuted }}>
          Paso {i + 1} de {total}
        </span>
      </div>

      <div style={{ marginBottom: space.md }}>
        <div style={{ fontSize: 12, color: colors.textDim, fontFamily: 'var(--pd-font-mono)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
          Piensa
        </div>
        <p style={{ margin: 0, fontSize: 'var(--pd-fs-sm)', color: colors.textPrimary, maxWidth: '70ch' }}>
          {paso.pensamiento}
        </p>
      </div>

      {!esFinal && (
        <div style={{ marginBottom: space.md }}>
          <div style={{ fontSize: 12, color: colors.textDim, fontFamily: 'var(--pd-font-mono)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
            Ejecuta · {ETIQUETA_HERRAMIENTA[paso.herramienta]}
          </div>
          <pre style={bloqueMono}>{paso.entrada}</pre>
        </div>
      )}

      <div>
        <div style={{ fontSize: 12, color: esError ? colors.status.err : colors.textDim, fontFamily: 'var(--pd-font-mono)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
          {esFinal ? 'Responde' : esError ? 'Observa — no era lo que esperaba' : 'Observa'}
        </div>
        <pre style={{ ...bloqueMono, borderColor: esError ? colors.status.err : colors.border }}>{paso.salida}</pre>
      </div>

      {esError && (
        <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.status.err, marginTop: space.md, maxWidth: '70ch' }}>
          Acá el agente se equivocó: dio por sentado cómo se escribía el nombre del área. Fijate en el paso siguiente
          qué hace con el error — no vuelve a adivinar, va a mirar los datos.
        </p>
      )}

      <div style={{ marginTop: space.lg }}>
        <StatRow>
          <Stat label="Paso" value={`${i + 1} / ${total}`} hint="Cada paso es una vuelta completa del loop" />
          <Stat
            label="Contexto acumulado"
            value={contextoAcumulado(traza.pasos, i).toLocaleString('en-US')}
            unit="caracteres"
            hint="Todo lo anterior viaja en cada llamada. Por eso los agentes se vuelven lentos y caros en tareas largas."
          />
        </StatRow>
      </div>

      <Solucion titulo="El loop, en una línea">
        Objetivo → pensar qué falta → elegir una herramienta → ejecutarla → mirar el resultado → repetir hasta poder
        responder. Eso es todo. Lo único que agrega el agente sobre un chatbot es la capacidad de <em>ejecutar</em> y
        de <em>mirar lo que salió</em>, y esa diferencia es la que lo vuelve útil y la que lo vuelve riesgoso.
      </Solucion>

      <Solucion titulo="Qué mirar en esta traza">
        Tres cosas. Primero, el agente no arranca escribiendo código: arranca mirando qué hay. Segundo, cuando el
        filtro devuelve cero no insiste ni inventa un resultado — va a buscar los valores reales y encuentra que el
        área lleva diéresis. Tercero, en la respuesta final aclara qué no verificó. Un agente que no puede ejecutar
        nunca se entera de que se equivocó; este se entera porque el resultado vuelve.
      </Solucion>

      <Solucion titulo="Dónde esto se vuelve peligroso">
        Todo lo que hace este agente es reversible: lee archivos y escribe un gráfico. El problema aparece cuando las
        herramientas dejan de ser de lectura — mandar un correo, cerrar una válvula, escribir en un sistema de
        control. El loop es el mismo, pero un paso equivocado ya no se corrige mirando la salida. De eso va la
        sesión 7.
      </Solucion>

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
