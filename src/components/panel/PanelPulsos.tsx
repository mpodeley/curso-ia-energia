// La pestaña en vivo: abrir un pulso y ver llenarse las barras.
//
// Poll de 2 s. Todo lo que se muestra sale de engine/pulso.ts, que ordena de
// forma total y ubica la nube de palabras sin azar: proyectado, cualquier
// reacomodo entre dos polls se lee como si los datos hubieran cambiado.

import { useCallback, useEffect, useRef, useState } from 'react'
import { PULSOS, pulsoPorId } from '../../content/pulsos'
import { layoutNube, tallyOpciones, tallyPalabras, textosDePulso, type Voto } from '../../engine/pulso'
import { hace, usePoll } from '../../hooks/usePoll'
import { panelPulso, panelRespuestas, pulsoActual } from '../../lib/api'
import { colors, radius, space } from '../../theme'
import { ConteoBarChart, NubeDePalabras } from '../charts'
import { Stat, StatRow } from '../ui'

const POLL_MS = 2000

export function PanelPulsos({
  token,
  edicion,
  proyeccion,
}: {
  token: string
  edicion: string
  proyeccion: boolean
}) {
  const [activo, setActivo] = useState<string | null>(null)
  const [abierto, setAbierto] = useState(false)
  const [ocupado, setOcupado] = useState(false)

  const consultar = useCallback(
    () => panelRespuestas(token, { edicion, tipo: 'pulso', ref: activo ?? '—' }),
    [token, edicion, activo],
  )
  const { dato, desde, fallando } = usePoll(consultar, POLL_MS, Boolean(activo))

  // Dos instructores, dos navegadores: el pulso abierto vive en la base, no acá.
  // Se sigue el cambio remoto (abrió o cerró el otro) y nada más: una selección
  // local para mirar un pulso cerrado no se pisa en cada poll.
  const consultarAbierto = useCallback(() => pulsoActual(token), [token])
  const remoto = usePoll(consultarAbierto, POLL_MS, true)
  const ultimoRemoto = useRef<string | null | undefined>(undefined)
  useEffect(() => {
    if (!remoto.dato) return
    const id = remoto.dato.pulsoId
    if (id === ultimoRemoto.current) return
    ultimoRemoto.current = id
    if (id) {
      setActivo(id)
      setAbierto(true)
    } else {
      setAbierto(false)
    }
  }, [remoto.dato])

  const pulso = activo ? pulsoPorId(activo) : undefined

  const marcar = async (id: string, abrir: boolean) => {
    setOcupado(true)
    const r = await panelPulso(token, id, abrir)
    setOcupado(false)
    if (r.ok) {
      setActivo(id)
      setAbierto(abrir)
    }
  }

  const votos: Voto[] = (dato?.filas ?? []).map((f) => ({
    alumnoId: f.alumnoId,
    nombre: f.nombre,
    payload: f.payload,
    creado: f.creado,
  }))

  return (
    <div>
      {!proyeccion && (
        <div style={{ marginBottom: space.xl }}>
          <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap' }}>
            {PULSOS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="tbtn"
                onClick={() => setActivo(p.id)}
                style={{
                  borderColor: activo === p.id ? colors.accent.orange : colors.border,
                  color: activo === p.id ? colors.accent.orange : colors.textSecondary,
                }}
              >
                S{p.sesion} · {p.id.replace(/^s\d+-/, '')}
              </button>
            ))}
          </div>
        </div>
      )}

      {!pulso && (
        <p style={{ color: colors.textMuted }}>Elegí un pulso para abrirlo y proyectar los resultados.</p>
      )}

      {pulso && (
        <>
          <h2 style={{ fontSize: proyeccion ? 40 : 24, lineHeight: 1.2, margin: `0 0 ${space.lg}px` }}>
            {pulso.pregunta}
          </h2>

          {!proyeccion && (
            <div style={{ display: 'flex', gap: space.sm, marginBottom: space.xl, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn"
                disabled={ocupado}
                onClick={() => void marcar(pulso.id, true)}
              >
                Abrir
              </button>
              <button
                type="button"
                className="tbtn"
                disabled={ocupado}
                onClick={() => void marcar(pulso.id, false)}
              >
                {pulso.tipo === 'texto' ? 'Cerrar' : 'Cerrar y mostrar a los alumnos'}
              </button>
              <span style={{ color: colors.textDim, fontSize: 13, alignSelf: 'center' }}>
                {abierto
                  ? 'Abierto: están respondiendo.'
                  : pulso.tipo === 'texto'
                    ? 'Al cerrarlo no entran más respuestas; esta lista se proyecta igual.'
                    : 'Al cerrarlo, los alumnos ven el resultado.'}
              </span>
            </div>
          )}

          <StatRow>
            <Stat label="respondieron" value={votos.length} accent={colors.accent.orange} />
            <Stat
              label="actualizado"
              value={hace(desde)}
              accent={fallando ? colors.status.warn : colors.textPrimary}
              hint={fallando ? 'Sin conexión: se muestra el último dato bueno.' : undefined}
            />
          </StatRow>

          <div style={{ marginTop: space.xl }}>
            {pulso.tipo === 'opcion' ? (
              <ConteoBarChart
                data={tallyOpciones(votos, pulso.opciones).items.map((i) => ({
                  etiqueta: i.etiqueta,
                  n: i.n,
                }))}
                grande={proyeccion}
              />
            ) : pulso.tipo === 'texto' ? (
              <Textos votos={votos} proyeccion={proyeccion} />
            ) : (
              <Nube votos={votos} proyeccion={proyeccion} />
            )}
          </div>

          {fallando && (
            <p style={{ color: colors.status.warn, fontSize: 14, marginTop: space.md }}>
              Sin conexión con el servidor. Esto es lo último que llegó, {hace(desde)}.
            </p>
          )}
        </>
      )}
    </div>
  )
}

function Nube({ votos, proyeccion }: { votos: Voto[]; proyeccion: boolean }) {
  const { items } = tallyPalabras(votos)
  const ancho = 860
  const alto = proyeccion ? 420 : 300
  const { palabras, omitidas } = layoutNube(items, {
    ancho,
    alto,
    min: proyeccion ? 22 : 16,
    max: proyeccion ? 84 : 60,
  })

  if (items.length === 0) {
    return <p style={{ color: colors.textMuted }}>Todavía no votó nadie.</p>
  }

  return (
    <div style={{ border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: space.lg }}>
      <NubeDePalabras palabras={palabras} ancho={ancho} alto={alto} />
      {/* Nunca recortar en silencio: si algo no entró, decirlo. */}
      {omitidas > 0 && (
        <p style={{ color: colors.textDim, fontSize: 13, margin: `${space.sm}px 0 0` }}>
          {omitidas} {omitidas === 1 ? 'palabra no entró' : 'palabras no entraron'} en el recuadro.
        </p>
      )}
    </div>
  )
}

/** Las respuestas de un pulso de texto, una tarjeta por persona y con su nombre:
 *  es material para conversar en ronda. Llegan en orden de llegada, así que lo
 *  que ya está en pantalla no se mueve cuando entra una nueva. */
function Textos({ votos, proyeccion }: { votos: Voto[]; proyeccion: boolean }) {
  const textos = textosDePulso(votos)
  const [copiado, setCopiado] = useState(false)

  if (textos.length === 0) {
    return <p style={{ color: colors.textMuted }}>Todavía no respondió nadie.</p>
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textos.map((t) => `- ${t.nombre}: ${t.texto}`).join('\n'))
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${proyeccion ? 420 : 300}px, 1fr))`,
          gap: space.md,
        }}
      >
        {textos.map((t) => (
          <li
            key={t.alumnoId}
            style={{
              background: colors.surfaceAlt,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              padding: proyeccion ? space.lg : space.md,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--pd-font-mono)',
                fontSize: proyeccion ? 18 : 12,
                color: colors.accent.orange,
                display: 'block',
                marginBottom: space.xs,
              }}
            >
              {t.nombre}
            </span>
            <span style={{ fontSize: proyeccion ? 28 : 16, lineHeight: 1.4 }}>{t.texto}</span>
          </li>
        ))}
      </ul>
      {!proyeccion && (
        <button type="button" className="tbtn" style={{ marginTop: space.md }} onClick={() => void copiar()}>
          {copiado ? 'Copiado' : 'Copiar todo como texto'}
        </button>
      )}
    </div>
  )
}
