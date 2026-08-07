// La pestaña de la encuesta de relevamiento.
//
// Su trabajo real es alimentar la shortlist de casos de la sesión 5, que es una
// tarea de leer texto libre y pegarlo en notas. Por eso las preguntas abiertas
// se muestran como una lista legible con quién las escribió, y hay un botón que
// copia todo de una: es el formato en el que este material se usa después.

import { useCallback, useState } from 'react'
import { PREGUNTAS, REF_ENCUESTA } from '../../content/encuesta-s1'
import { completaron, resumen } from '../../engine/encuesta'
import { hace, usePoll } from '../../hooks/usePoll'
import { panelRespuestas } from '../../lib/api'
import { colors, radius, space } from '../../theme'
import { ConteoBarChart } from '../charts'
import { Stat, StatRow } from '../ui'

const POLL_MS = 10_000

export function PanelRelevamiento({ token, edicion }: { token: string; edicion: string }) {
  const consultar = useCallback(
    () => panelRespuestas(token, { edicion, tipo: 'encuesta', ref: REF_ENCUESTA }),
    [token, edicion],
  )
  const { dato, desde, fallando } = usePoll(consultar, POLL_MS)
  const [copiado, setCopiado] = useState(false)

  const filas = (dato?.filas ?? []).map((f) => ({
    alumnoId: f.alumnoId,
    nombre: f.nombre,
    payload: f.payload,
  }))
  const resumenes = resumen(PREGUNTAS, filas)

  const copiarTodo = async () => {
    const texto = resumenes
      .map((r) => {
        if (r.clase === 'opciones') {
          return `## ${r.pregunta.texto}\n${r.opciones.map((o) => `  ${o.n}  ${o.texto}`).join('\n')}`
        }
        return `## ${r.pregunta.texto}\n${r.textos.map((t) => `  - ${t.nombre}: ${t.texto}`).join('\n')}`
      })
      .join('\n\n')
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div>
      <StatRow>
        <Stat label="respondieron" value={filas.length} accent={colors.accent.orange} />
        <Stat label="completaron todo" value={completaron(PREGUNTAS, filas)} />
        <Stat
          label="actualizado"
          value={hace(desde)}
          accent={fallando ? colors.status.warn : colors.textPrimary}
        />
      </StatRow>

      <p style={{ margin: `${space.lg}px 0` }}>
        <button type="button" className="tbtn" onClick={() => void copiarTodo()}>
          {copiado ? 'Copiado' : 'Copiar todo como texto'}
        </button>
      </p>

      {filas.length === 0 && (
        <p style={{ color: colors.textMuted }}>Todavía no respondió nadie la encuesta.</p>
      )}

      {resumenes.map((r) => (
        <section
          key={r.pregunta.id}
          style={{
            borderTop: `1px solid ${colors.border}`,
            paddingTop: space.lg,
            marginTop: space.xl,
          }}
        >
          <h3 style={{ fontSize: 18, lineHeight: 1.35, margin: `0 0 ${space.xs}px` }}>
            {r.pregunta.texto}
          </h3>
          <p
            style={{
              fontFamily: 'var(--pd-font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: colors.textDim,
              margin: `0 0 ${space.md}px`,
            }}
          >
            {r.n} {r.n === 1 ? 'respuesta' : 'respuestas'}
          </p>

          {r.clase === 'opciones' ? (
            r.n === 0 ? (
              <p style={{ color: colors.textDim, fontSize: 14 }}>Sin respuestas.</p>
            ) : (
              <ConteoBarChart data={r.opciones.map((o) => ({ etiqueta: o.texto, n: o.n }))} />
            )
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {r.textos.map((t, i) => (
                <li
                  key={`${t.nombre}-${i}`}
                  style={{
                    background: colors.surfaceAlt,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.md,
                    padding: space.md,
                    marginBottom: space.sm,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--pd-font-mono)',
                      fontSize: 12,
                      color: colors.accent.orange,
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {t.nombre}
                  </span>
                  <span style={{ whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>{t.texto}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
