import { useState } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Stat, StatRow } from '../components/ui'
import { COMPONENTES, armar, evaluar, type Componente } from '../engine/promptScore'
import { usePromptCasos } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

type LabState = {
  caso: string
  modo: 'armar' | 'puntuar'
  /** caso id -> componente -> index into that slot's options. */
  elecciones: Record<string, Record<string, number>>
  propio: string
}

const VACIO = 0 // every slot's option[0] is the "sin esta pieza" variant

const CALIDAD_COLOR = {
  ninguna: colors.status.muted,
  floja: colors.status.warn,
  buena: colors.status.ok,
} as const

export function PromptBuilder({ sesion = 3 }: { sesion?: number }) {
  const { data: casos, meta, loading, error } = usePromptCasos()
  const [state, patch, reset] = useExerciseState<LabState>('prompt-builder', {
    caso: '',
    modo: 'armar',
    elecciones: {},
    propio: '',
  })
  const [copiado, setCopiado] = useState(false)

  if (loading) return <Loading what="los casos" />
  if (error || !casos || casos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar los casos.</div>

  const caso = casos.find((c) => c.id === state.caso) ?? casos[0]
  const elegidas = state.elecciones[caso.id] ?? {}

  const partes: Partial<Record<Componente, string>> = {}
  for (const slot of caso.slots) {
    const i = elegidas[slot.componente] ?? VACIO
    partes[slot.componente] = slot.opciones[i]?.texto ?? ''
  }
  const armado = armar(partes)

  const texto = state.modo === 'armar' ? armado : state.propio
  const rubrica = evaluar(texto)

  const elegir = (componente: Componente, i: number) =>
    patch({ elecciones: { ...state.elecciones, [caso.id]: { ...elegidas, [componente]: i } } })

  const copiar = () => {
    void navigator.clipboard?.writeText(texto).then(() => {
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 1800)
    })
  }

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
      titulo="Constructor de prompts"
      sesion={sesion}
      intro="Un prompt es una orden de trabajo. Armá uno pieza por pieza y mirá cómo cambia, o pegá uno tuyo y fijate qué le falta."
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.sm, marginBottom: space.lg, flexWrap: 'wrap' }}>
        <button type="button" style={tabStyle(state.modo === 'armar')} onClick={() => patch({ modo: 'armar' })}>
          1 · Armar
        </button>
        <button type="button" style={tabStyle(state.modo === 'puntuar')} onClick={() => patch({ modo: 'puntuar' })}>
          2 · Puntuar el tuyo
        </button>
      </div>

      {state.modo === 'armar' ? (
        <>
          <Field label="Caso">
            <Select
              value={caso.id}
              options={casos.map((c) => ({ value: c.id, label: c.label }))}
              onChange={(v) => patch({ caso: v })}
            />
          </Field>

          <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textSecondary, margin: `0 0 ${space.lg}px` }}>
            {caso.situacion}
          </p>

          {caso.slots.map((slot) => {
            const i = elegidas[slot.componente] ?? VACIO
            const opcion = slot.opciones[i]
            const def = COMPONENTES.find((c) => c.id === slot.componente)
            return (
              <div key={slot.componente} style={{ marginBottom: space.lg }}>
                <div style={{ display: 'flex', gap: space.sm, alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--pd-fs-sm)', color: colors.textPrimary }}>
                    {def?.label}
                  </span>
                  <span style={{ fontSize: 12, color: colors.textDim }}>{def?.ayuda}</span>
                </div>
                <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap' }}>
                  {slot.opciones.map((o, j) => (
                    <button
                      key={j}
                      type="button"
                      className="tbtn"
                      style={{
                        fontSize: 13,
                        borderColor: j === i ? CALIDAD_COLOR[o.calidad] : undefined,
                        color: j === i ? CALIDAD_COLOR[o.calidad] : undefined,
                        fontWeight: j === i ? 700 : undefined,
                      }}
                      onClick={() => elegir(slot.componente, j)}
                    >
                      {o.etiqueta}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: colors.textMuted, margin: `${space.sm}px 0 0`, maxWidth: '68ch' }}>
                  {opcion.comentario}
                </p>
              </div>
            )
          })}
        </>
      ) : (
        <Field label="Pegá acá un prompt tuyo — el de la tarea de la sesión 2, por ejemplo">
          <textarea
            value={state.propio}
            onChange={(e) => patch({ propio: e.target.value })}
            rows={8}
            placeholder="Sos un…&#10;Contexto: …&#10;Tarea: …&#10;Formato: …"
            style={{
              width: '100%',
              font: 'inherit',
              fontFamily: 'var(--pd-font-mono)',
              fontSize: 14,
              padding: space.md,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              background: colors.surface,
              color: colors.textPrimary,
              resize: 'vertical',
            }}
          />
        </Field>
      )}

      <div style={{ margin: `${space.lg}px 0` }}>
        <StatRow>
          <Stat
            label="Piezas presentes"
            value={`${rubrica.presentes} / ${rubrica.total}`}
            accent={rubrica.presentes >= 4 ? colors.status.ok : rubrica.presentes >= 2 ? colors.status.warn : colors.status.muted}
            hint="Cuántas de las cinco piezas detecta la rúbrica"
          />
          <Stat label="Palabras" value={rubrica.palabras} hint="Un prompt de oficina útil rara vez baja de 25 palabras" />
        </StatRow>
      </div>

      <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap', marginBottom: space.lg }}>
        {rubrica.componentes.map((c) => {
          const def = COMPONENTES.find((d) => d.id === c.id)
          return (
            <span
              key={c.id}
              title={c.evidencia ?? 'No detectada'}
              style={{
                fontFamily: 'var(--pd-font-mono)',
                fontSize: 12,
                padding: '3px 10px',
                borderRadius: radius.pill,
                border: `1px solid ${c.presente ? colors.status.ok : colors.border}`,
                color: c.presente ? colors.status.ok : colors.textDim,
                background: c.presente ? colors.status.ok + '12' : 'transparent',
              }}
            >
              {c.presente ? '✓' : '·'} {def?.label}
            </span>
          )
        })}
      </div>

      {rubrica.senales.unaSolaLinea && (
        <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.status.warn, marginBottom: space.md }}>
          Una línea suelta. Es exactamente el prompt que el modelo tiene que completar adivinando.
        </p>
      )}

      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.lg,
          fontFamily: 'var(--pd-font-mono)',
          fontSize: 14,
          whiteSpace: 'pre-wrap',
          minHeight: 60,
          color: texto ? colors.textPrimary : colors.textDim,
        }}
      >
        {texto || 'Elegí piezas arriba y el prompt se arma acá.'}
      </div>

      {texto && (
        <div style={{ display: 'flex', gap: space.md, alignItems: 'center', marginTop: space.md, flexWrap: 'wrap' }}>
          <button type="button" className="tbtn" onClick={copiar}>
            Copiar prompt
          </button>
          <span style={{ fontSize: 13, color: copiado ? colors.status.ok : colors.textMuted }}>
            {copiado ? 'Copiado. Pegalo en tu chatbot y compará la salida.' : 'Pegalo en tu chatbot con un documento tuyo, no confidencial.'}
          </span>
        </div>
      )}

      {state.modo === 'armar' && (
        <Solucion titulo="Ver el prompt de referencia para este caso">
          <div
            style={{
              fontFamily: 'var(--pd-font-mono)',
              fontSize: 13,
              whiteSpace: 'pre-wrap',
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              padding: space.md,
              marginBottom: space.sm,
            }}
          >
            {caso.modelo}
          </div>
          {caso.note}
        </Solucion>
      )}

      <Solucion titulo="Qué NO mide este puntaje">
        La rúbrica detecta estructura, no calidad. Podés escribir las cinco piezas y tener un prompt inútil: un rol
        decorativo, un contexto que repite lo que ya está en el documento, un ejemplo que contradice el formato. Al
        revés también pasa — un prompt de dos líneas escrito por alguien que sabe exactamente qué quiere puede ganarle
        a uno de veinte. Usá el puntaje para no olvidarte piezas, no para creer que ya está.
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
