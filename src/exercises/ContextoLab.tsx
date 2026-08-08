// Session 2, the working-memory property made physical. A real work
// conversation with real token counts, and a slider for the window size: shrink
// it and watch which turns fall off the desk, and what the model stops knowing.
//
// The failure this produces is the one nobody sees coming, because it is silent:
// the rules you set in the first line are the first thing to go, and the answer
// that comes back afterwards looks exactly as confident as the ones before.
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading, Slider, Stat, StatRow } from '../components/ui'
import { hechos, recortar } from '../engine/contexto'
import { useContexto } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

// Opens with the rules already off the desk and every datum still on it. It is
// the cleanest version of the lesson, and it is visible without touching
// anything, which matters for whoever only reads the page.
const VENTANA_INICIAL = 520

type LabState = { limite: number }

export function ContextoLab({ sesion = 2 }: { sesion?: number }) {
  const { data: conv, meta, loading, error } = useContexto()
  const [state, patch, reset] = useExerciseState<LabState>('contexto-lab', {
    limite: VENTANA_INICIAL,
  })

  if (loading) return <Loading what="la conversación" />
  if (error || !conv) {
    return <div style={{ color: colors.status.err }}>No se pudo cargar la conversación.</div>
  }

  const recorte = recortar(conv.mensajes, state.limite)
  const dentro = new Set(recorte.dentro)
  const listaHechos = hechos(conv.mensajes, recorte)
  const caidos = conv.mensajes.length - recorte.dentro.length
  const perdidos = listaHechos.filter((h) => !h.visible).length

  return (
    <Ejercicio
      titulo="Qué se cae del escritorio"
      sesion={sesion}
      intro="Una conversación de trabajo, con el conteo real de tokens de cada mensaje. Achicá la ventana de contexto y mirá qué deja de ver el modelo. No se olvida: lo que quedó afuera nunca estuvo."
      onReset={reset}
    >
      <Slider
        label="Tamaño de la ventana de contexto"
        value={state.limite}
        min={60}
        max={620}
        step={20}
        onChange={(v) => patch({ limite: v })}
        format={(v) => `${v} tokens`}
      />

      <StatRow>
        <Stat
          label="En la ventana"
          value={recorte.tokensDentro}
          unit={`de ${conv.total} tokens`}
          accent={colors.accent.blue}
        />
        <Stat
          label="Mensajes caídos"
          value={caidos}
          accent={caidos ? colors.status.warn : colors.status.ok}
          hint="Se descartan siempre los más viejos, que es donde suelen estar las instrucciones."
        />
        <Stat
          label="Datos perdidos"
          value={`${perdidos} de ${listaHechos.length}`}
          accent={perdidos ? colors.status.err : colors.status.ok}
          hint="De las cosas que le dijiste y que va a necesitar para responder lo último."
        />
      </StatRow>

      <div style={{ marginTop: space.lg, display: 'grid', gap: space.xs }}>
        {conv.mensajes.map((m) => {
          const visible = dentro.has(m.i)
          const usuario = m.rol === 'usuario'
          return (
            <div
              key={m.i}
              style={{
                display: 'flex',
                gap: space.sm,
                alignItems: 'baseline',
                padding: `${space.xs}px ${space.sm}px`,
                borderRadius: radius.sm,
                borderLeft: `3px solid ${
                  visible ? (usuario ? colors.accent.blue : colors.accent.green) : colors.border
                }`,
                background: visible ? colors.surface : 'transparent',
                opacity: visible ? 1 : 0.4,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--pd-font-mono)',
                  fontSize: 11,
                  color: colors.textDim,
                  minWidth: 76,
                  flexShrink: 0,
                }}
              >
                {usuario ? 'vos' : 'modelo'} · {m.tokens}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: visible ? colors.textSecondary : colors.textDim,
                  textDecoration: visible ? 'none' : 'line-through',
                }}
              >
                {m.texto}
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          marginTop: space.lg,
          padding: space.md,
          borderLeft: `3px solid ${perdidos ? colors.status.err : colors.status.ok}`,
          background: colors.surface,
          borderRadius: radius.sm,
          maxWidth: '72ch',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--pd-font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            color: colors.textDim,
            marginBottom: space.xs,
          }}
        >
          Qué sigue sabiendo para contestar lo último
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.1em', fontSize: 13, color: colors.textSecondary }}>
          {listaHechos.map((h) => (
            <li key={h.i} style={{ marginBottom: 2 }}>
              <span style={{ color: h.visible ? colors.status.ok : colors.status.err, fontWeight: 700 }}>
                {h.visible ? '✓' : '✗'}
              </span>{' '}
              <span style={{ opacity: h.visible ? 1 : 0.75 }}>{h.hecho}</span>
            </li>
          ))}
        </ul>
        {perdidos > 0 && (
          <p style={{ margin: `${space.sm}px 0 0`, fontSize: 13, color: colors.textPrimary }}>
            Le vas a pedir la estimación del mes que viene y va a contestar igual, con el mismo tono
            de siempre. No tiene forma de avisarte que le falta esto.
          </p>
        )}
      </div>

      <Solucion titulo="Por qué la instrucción es lo primero que se pierde">
        <p style={{ margin: 0 }}>
          La ventana se llena desde el final: lo último que se dijo es lo que seguro está. Cuando no
          entra todo, lo que se descarta es lo más viejo, y en una conversación de trabajo lo más
          viejo son las reglas, porque las reglas se dan al principio. Por eso la falla típica no es
          que el modelo pierda un dato del medio: es que deje de respetar algo que le pediste hace
          media hora.
        </p>
        <p style={{ margin: `${space.sm}px 0 0` }}>
          Y no hay aviso. El modelo no sabe que había algo antes, así que no puede echarlo de menos.
          Contesta con lo que tiene sobre el escritorio y suena igual de seguro que siempre.
        </p>
      </Solucion>

      <Solucion titulo="Qué hacer con esto un martes a la mañana">
        <p style={{ margin: 0 }}>
          Tres cosas, en orden de esfuerzo. Conversaciones cortas y una tarea por vez: si cambiaste
          de tema, abrí un chat nuevo. Repetir lo que no se puede perder, en el mismo mensaje donde
          hacés el pedido importante, aunque ya lo hayas dicho. Y para documentos largos, no pegar
          todo: buscar el pedazo que hace falta y pegar solo eso, que es la sesión 5.
        </p>
        <p style={{ margin: `${space.sm}px 0 0` }}>
          Las ventanas de hoy son mucho más grandes que las de este ejercicio, del orden de cientos
          de miles de tokens en los modelos más grandes. Lo que no cambió es el mecanismo: sigue
          habiendo un borde, sigue cayéndose lo más viejo primero, y sigue sin avisar.
        </p>
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
