// El widget de pulsos del alumno.
//
// Vive dentro de la prosa de la sesión y casi siempre está callado: mientras el
// instructor no abra nada, es una línea gris. Cuando abre un pulso, aparece la
// pregunta; cuando lo cierra, aparecen los resultados.
//
// Los resultados NO se muestran mientras el pulso sigue abierto, y eso es
// deliberado: si cada uno ve lo que votaron los demás antes de votar, el
// histograma deja de decir lo que la gente piensa y empieza a decir lo que
// piensa el que respondió primero.

import { useCallback, useState } from 'react'
import { Ejercicio } from '../components/Ejercicio'
import { IdentidadGate } from '../components/IdentidadGate'
import {
  Aviso,
  EnviarButton,
  NotaSinServidor,
  RadioGroup,
  TextInput,
  type EstadoEnvio,
} from '../components/forms'
import { pulsoPorId, type Pulso } from '../content/pulsos'
import { moldearTallyOpciones, moldearTallyPalabras } from '../engine/pulso'
import { useExerciseState } from '../hooks/useExerciseState'
import { usePoll } from '../hooks/usePoll'
import { enviarRespuesta, pulsoActual, tallyDe } from '../lib/api'
import { apiHabilitada } from '../lib/config'
import { useIdentidad } from '../lib/identidad'
import { colors, radius, space } from '../theme'

const POLL_MS = 3000

type Estado = { votados: Record<string, string | number> }

export function PulsoVivo({ sesion }: { sesion: number }) {
  const { identidad, probar } = useIdentidad()
  const [estado, patch] = useExerciseState<Estado>('pulsos', { votados: {} })
  const [gate, setGate] = useState(false)

  const token = identidad?.token
  const consultar = useCallback(
    () => (token ? pulsoActual(token) : Promise.resolve({ ok: false as const, error: 'auth' as const, mensaje: '' })),
    [token],
  )
  const { dato } = usePoll(consultar, POLL_MS, Boolean(token))

  if (!apiHabilitada) {
    return (
      <NotaSinServidor titulo="Pulsos en vivo.">
        Durante la clase el instructor abre acá preguntas cortas para votar. Esta copia del sitio
        corre sin el servidor del curso, así que hoy no hay nada abierto.
      </NotaSinServidor>
    )
  }

  // --- sin identidad: una línea, y la tarjeta solo si la pide ---------------
  if (!identidad) {
    return (
      <div style={caja}>
        {gate ? (
          <IdentidadGate para="votar en los pulsos en vivo" />
        ) : (
          <p style={{ margin: 0, color: colors.textMuted, fontSize: 14, lineHeight: 1.5 }}>
            <strong style={{ color: colors.textPrimary }}>Pulsos en vivo.</strong> Durante la clase
            el instructor abre preguntas cortas acá.{' '}
            <button
              type="button"
              className="tbtn"
              style={{ padding: 0 }}
              onClick={() => {
                setGate(true)
                probar()
              }}
            >
              Entrar con el PIN
            </button>
          </p>
        )}
      </div>
    )
  }

  const pulsoId = dato?.pulsoId ?? null
  const pulso = pulsoId ? pulsoPorId(pulsoId) : undefined

  if (!pulso || pulso.sesion !== sesion) {
    return (
      <div style={caja}>
        <p style={{ margin: 0, color: colors.textDim, fontSize: 14 }}>
          No hay ningún pulso abierto ahora.
        </p>
      </div>
    )
  }

  const yaVoto = pulso.id in estado.votados

  return (
    <Ejercicio titulo={pulso.pregunta} sesion={sesion} intro={pulso.ayuda} done={yaVoto}>
      {!yaVoto && (
        // Keyed by pulso.id: when the instructor closes one pulso and opens the
        // next, the form remounts clean. Without the key, the draft (and the
        // "enviado" state) of the previous pulso leaks into the new one — an
        // option index left in `borrador` would even render inside the text
        // input of a word pulso.
        <FormularioVoto
          key={pulso.id}
          pulso={pulso}
          token={identidad.token}
          onVotado={(valor) => patch({ votados: { ...estado.votados, [pulso.id]: valor } })}
        />
      )}

      {yaVoto && <Resultado pulsoId={pulso.id} token={identidad.token} />}
    </Ejercicio>
  )
}

/** El formulario de un pulso concreto. Dueño de su borrador y de su estado de
 *  envío, que mueren con él cuando cambia el pulso abierto. */
function FormularioVoto({
  pulso,
  token,
  onVotado,
}: {
  pulso: Pulso
  token: string
  onVotado: (valor: string | number) => void
}) {
  const [envio, setEnvio] = useState<EstadoEnvio>('listo')
  const [mensaje, setMensaje] = useState<string>()
  const [borrador, setBorrador] = useState<string | number | undefined>()

  const votar = async () => {
    if (borrador === undefined || borrador === '') return
    const payload = pulso.tipo === 'opcion' ? { opcion: Number(borrador) } : { palabra: String(borrador) }

    setEnvio('enviando')
    const r = await enviarRespuesta(token, {
      tipo: 'pulso',
      ref: pulso.id,
      sesion: pulso.sesion,
      payload,
    })
    if (r.ok) {
      setEnvio('enviado')
      onVotado(borrador)
      return
    }
    // Un pulso no se encola: para cuando la red vuelva, el instructor ya lo
    // cerró y el voto llegaría tarde. Mejor decirlo.
    setEnvio('error')
    setMensaje(r.error === 'pulso-cerrado' ? 'El instructor cerró el pulso antes de que llegara tu voto.' : r.mensaje)
  }

  return (
    <>
      {pulso.tipo === 'opcion' ? (
        <RadioGroup
          name={pulso.id}
          opciones={pulso.opciones}
          value={typeof borrador === 'number' ? borrador : undefined}
          onChange={setBorrador}
        />
      ) : (
        <div style={{ maxWidth: 340, marginBottom: space.md }}>
          <TextInput
            value={String(borrador ?? '')}
            onChange={setBorrador}
            placeholder={pulso.maxPalabras === 1 ? 'Una palabra' : `Hasta ${pulso.maxPalabras} palabras`}
            maxLength={40}
          />
        </div>
      )}
      <EnviarButton estado={envio} onClick={() => void votar()} disabled={borrador === undefined || borrador === ''}>
        Votar
      </EnviarButton>
      <Aviso estado={envio} mensaje={mensaje} />
    </>
  )
}

/** Después de votar. Mientras el pulso siga abierto el servidor responde 409 y
 *  mostramos la espera; en cuanto el instructor cierra, aparecen las barras.
 *
 *  El tally crudo del servidor se moldea con las mismas funciones que usa el
 *  panel del instructor (orden de contenido, barras en cero, tildes fundidas):
 *  el alumno y el proyector tienen que mostrar el mismo gráfico. Cerrado el
 *  pulso no entran votos nuevos, así que el primer tally bueno es el último:
 *  ahí se corta el poll. */
function Resultado({ pulsoId, token }: { pulsoId: string; token: string }) {
  const [cerrado, setCerrado] = useState(false)
  const consultar = useCallback(async () => {
    const r = await tallyDe(token, pulsoId)
    if (r.ok) setCerrado(true)
    return r
  }, [token, pulsoId])
  const { dato } = usePoll(consultar, 4000, !cerrado)
  const pulso = pulsoPorId(pulsoId)

  if (!dato) {
    return (
      <p style={{ margin: 0, color: colors.textMuted, fontSize: 15 }}>
        Listo, quedó registrado. Los resultados aparecen cuando el instructor cierre el pulso.
      </p>
    )
  }

  const conteo = pulso
    ? pulso.tipo === 'opcion'
      ? moldearTallyOpciones(dato.items, pulso.opciones)
      : moldearTallyPalabras(dato.items)
    : {
        // Pulso que ya no existe en el contenido: mostrar lo que haya, crudo.
        total: dato.items.reduce((s, i) => s + i.n, 0),
        items: dato.items.map((i) => ({ clave: i.clave, etiqueta: i.clave, n: i.n, pct: 0 })),
      }
  const max = Math.max(1, ...conteo.items.map((i) => i.n))

  return (
    <div>
      <p style={{ margin: `0 0 ${space.md}px`, color: colors.textMuted, fontSize: 14 }}>
        {conteo.total} {conteo.total === 1 ? 'respuesta' : 'respuestas'}
      </p>
      {conteo.items.map((i) => (
        <div key={i.clave} style={{ marginBottom: space.sm }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 2 }}>
            <span>{i.etiqueta}</span>
            <span style={{ fontFamily: 'var(--pd-font-mono)', color: colors.textDim }}>{i.n}</span>
          </div>
          <div style={{ background: colors.surfaceAlt, borderRadius: radius.sm, height: 8 }}>
            <div
              style={{
                width: `${(i.n / max) * 100}%`,
                background: colors.accent.orange,
                borderRadius: radius.sm,
                height: '100%',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const caja: React.CSSProperties = {
  background: colors.surfaceAlt,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: space.lg,
  margin: `${space.xxl}px 0`,
}
