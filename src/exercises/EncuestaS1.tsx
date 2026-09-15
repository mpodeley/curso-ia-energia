// La encuesta de relevamiento del día 1.
//
// Reemplaza el "(El enlace a la encuesta se comparte en vivo)" que estuvo en
// sesion-1.mdx desde el primer commit. En la primera edición de acá salía el caso
// real; hoy ajusta ejemplos y siembra el taller del día 3. Lo que más importa no es que
// se vea linda: es que nadie pierda lo que escribió. El borrador se guarda en
// cada tecla y, si el servidor no está, la respuesta va a la cola de reintentos.

import { useState } from 'react'
import { Ejercicio } from '../components/Ejercicio'
import { IdentidadGate } from '../components/IdentidadGate'
import {
  Aviso,
  Campo,
  CheckboxGroup,
  EnviarButton,
  NotaSinServidor,
  RadioGroup,
  TextArea,
  TextInput,
  type EstadoEnvio,
} from '../components/forms'
import { BLOQUES, NOTA_PRIVACIDAD, PREGUNTAS, REF_ENCUESTA } from '../content/encuesta-s1'
import { completadas, faltantes, paraEnviar, type Valores } from '../engine/encuesta'
import { useExerciseState } from '../hooks/useExerciseState'
import { enviarRespuesta } from '../lib/api'
import { apiHabilitada } from '../lib/config'
import { useIdentidad } from '../lib/identidad'
import { encolar } from '../lib/outbox'
import { colors, space } from '../theme'

type Estado = { valores: Valores; enviado: boolean }

export function EncuestaS1({ sesion = 1 }: { sesion?: number }) {
  const [estado, patch, reset] = useExerciseState<Estado>('encuesta-s1', { valores: {}, enviado: false })
  const { identidad, sincronizar } = useIdentidad()
  const [envio, setEnvio] = useState<EstadoEnvio>('listo')
  const [mensaje, setMensaje] = useState<string>()
  const [copiado, setCopiado] = useState(false)

  // Con el sitio construido sin VITE_API_URL no hay dónde mandar nada, así que
  // el formulario no se muestra: en su lugar va una nota, para que la prosa de
  // la sesión que habla de la encuesta no quede apuntando a la nada.
  if (!apiHabilitada) {
    return (
      <NotaSinServidor titulo="Encuesta de relevamiento.">
        Se completa en el día 1 en vivo. Esta copia del sitio corre sin el servidor del curso,
        así que el formulario no está disponible acá.
      </NotaSinServidor>
    )
  }

  const valores = estado.valores
  const setValor = (id: string, v: Valores[string]) => patch({ valores: { ...valores, [id]: v } })

  const pendientes = faltantes(PREGUNTAS, valores)
  const hechas = completadas(PREGUNTAS, valores)

  const enviar = async () => {
    if (!identidad) return
    const payload = paraEnviar(PREGUNTAS, valores)
    const envioRespuesta = { tipo: 'encuesta', ref: REF_ENCUESTA, sesion, payload }

    setEnvio('enviando')
    const r = await enviarRespuesta(identidad.token, envioRespuesta)
    if (r.ok) {
      setEnvio('enviado')
      patch({ enviado: true })
      void sincronizar()
      return
    }
    // Cualquier falla que no sea culpa del contenido va a la cola: se reintenta
    // sola y la persona no pierde veinte minutos de escritura.
    if (r.error === 'red' || r.error === 'servidor' || r.error === 'sin-backend') {
      encolar(envioRespuesta)
      setEnvio('local')
      patch({ enviado: true })
      return
    }
    setEnvio('error')
    setMensaje(r.mensaje)
  }

  const copiar = async () => {
    const texto = PREGUNTAS.filter((p) => valores[p.id] !== undefined)
      .map((p) => {
        const v = valores[p.id]
        const legible = Array.isArray(v)
          ? v.map((i) => p.opciones?.[i] ?? i).join('; ')
          : typeof v === 'number'
            ? (p.opciones?.[v] ?? String(v))
            : String(v)
        return `${p.texto}\n${legible}`
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
    <Ejercicio
      titulo="Encuesta de relevamiento"
      sesion={sesion}
      // La invitación va acá y no en el MDX: si el sitio se construye sin
      // backend, el componente no renderiza, y una prosa que dijera "la encuesta
      // está acá abajo" quedaría apuntando a la nada.
      intro={`Son quince minutos y la hacemos juntos en vivo. Si preferís adelantarla, mejor: llegamos a la sesión con los datos puestos. ${NOTA_PRIVACIDAD}`}
      done={estado.enviado}
      onReset={() => {
        reset()
        setEnvio('listo')
      }}
    >
      <IdentidadGate para="mandar la encuesta" />

      {BLOQUES.map((bloque) => (
        <section key={bloque.id} style={{ marginBottom: space.xxl }}>
          <h4
            style={{
              fontFamily: 'var(--pd-font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: colors.textDim,
              margin: `0 0 ${space.lg}px`,
            }}
          >
            {bloque.titulo} · {bloque.minutos} min
          </h4>

          {PREGUNTAS.filter((p) => p.bloque === bloque.id).map((p) => (
            <Campo key={p.id} label={p.texto} ayuda={p.ayuda} requerido={!p.opcional}>
              {p.tipo === 'texto-corto' && (
                <TextInput value={String(valores[p.id] ?? '')} onChange={(v) => setValor(p.id, v)} />
              )}
              {p.tipo === 'texto-largo' && (
                <TextArea value={String(valores[p.id] ?? '')} onChange={(v) => setValor(p.id, v)} filas={4} />
              )}
              {p.tipo === 'opcion-unica' && (
                <RadioGroup
                  name={p.id}
                  opciones={p.opciones ?? []}
                  value={typeof valores[p.id] === 'number' ? (valores[p.id] as number) : undefined}
                  onChange={(i) => setValor(p.id, i)}
                />
              )}
              {p.tipo === 'opcion-multiple' && (
                <CheckboxGroup
                  opciones={p.opciones ?? []}
                  value={Array.isArray(valores[p.id]) ? (valores[p.id] as number[]) : []}
                  onChange={(v) => setValor(p.id, v)}
                />
              )}
            </Campo>
          ))}
        </section>
      ))}

      <div style={{ display: 'flex', gap: space.md, alignItems: 'center', flexWrap: 'wrap' }}>
        <EnviarButton estado={envio} onClick={() => void enviar()} disabled={!identidad || pendientes.length > 0}>
          {estado.enviado ? 'Actualizar mis respuestas' : 'Enviar'}
        </EnviarButton>
        <span style={{ color: colors.textDim, fontSize: 14 }}>
          {hechas} de {PREGUNTAS.length} respondidas
          {pendientes.length > 0 && ` · faltan ${pendientes.length} obligatorias`}
        </span>
      </div>

      <Aviso estado={envio} mensaje={mensaje} />

      {/* El camino humano cuando la red no coopera: copiar y pegar en el chat de
          la videollamada. Va visible, no escondido detrás de un error. */}
      {(envio === 'local' || envio === 'error') && (
        <p style={{ marginTop: space.md }}>
          <button type="button" className="tbtn" onClick={() => void copiar()}>
            {copiado ? 'Copiado' : 'Copiar mis respuestas'}
          </button>
          <span style={{ color: colors.textDim, fontSize: 13, marginLeft: space.sm }}>
            para pegarlas en el chat de la videollamada
          </span>
        </p>
      )}
    </Ejercicio>
  )
}
