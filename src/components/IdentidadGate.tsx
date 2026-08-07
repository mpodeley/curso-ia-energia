// La tarjeta de PIN + nombre.
//
// Se renderiza EN LÍNEA, dentro del formulario que la necesita. Nunca como
// modal, nunca al cargar la página: alguien que entra a leer la prosa de la
// sesión no tiene por qué toparse con un PIN.
//
// Y no bloquea. Si el servidor no responde, la tarjeta lo dice y habilita igual
// el formulario en modo local: lo que se escriba queda en el navegador y se
// reintenta solo. Ese camino tiene que ser visible, no un error escondido.

import { useEffect, useState } from 'react'
import { useIdentidad } from '../lib/identidad'
import { colors, radius, space } from '../theme'
import { Campo, TextInput } from './forms'

export function IdentidadGate({ para }: { para: string }) {
  const { identidad, backend, entrando, error, yaExistia, probar, entrar, salir } = useIdentidad()
  const [pin, setPin] = useState('')
  const [nombre, setNombre] = useState('')
  const [avisoDuplicado, setAvisoDuplicado] = useState(false)

  // La sonda arranca acá, cuando el primer formulario se monta.
  useEffect(() => probar(), [probar])

  if (identidad && !(yaExistia && avisoDuplicado)) {
    return (
      <p style={{ color: colors.textMuted, fontSize: 14, margin: `0 0 ${space.lg}px` }}>
        Estás como <strong style={{ color: colors.textPrimary }}>{identidad.nombre}</strong>
        {' · '}
        <button type="button" className="tbtn" onClick={salir} style={{ padding: 0 }}>
          cambiar
        </button>
      </p>
    )
  }

  // Segundo dispositivo o dos personas con el mismo nombre: preguntamos en vez
  // de adivinar. No hace falta un sistema de cuentas para resolverlo.
  if (identidad && yaExistia && avisoDuplicado) {
    return (
      <div style={caja}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
          Ya hay alguien registrado como <strong>{identidad.nombre}</strong>. Si sos vos desde otra
          computadora, seguí. Si no, agregá tu apellido para que no se mezclen las respuestas.
        </p>
        <div style={{ display: 'flex', gap: space.sm, marginTop: space.md, flexWrap: 'wrap' }}>
          <button type="button" className="btn" onClick={() => setAvisoDuplicado(false)}>
            Soy yo, seguir
          </button>
          <button
            type="button"
            className="tbtn"
            onClick={() => {
              salir()
              setAvisoDuplicado(false)
            }}
          >
            Cambiar el nombre
          </button>
        </div>
      </div>
    )
  }

  const enviar = async () => {
    const ok = await entrar(pin.trim(), nombre)
    if (ok) {
      setPin('')
      setAvisoDuplicado(true)
    }
  }

  return (
    <div style={caja}>
      <p style={{ margin: `0 0 ${space.md}px`, fontSize: 15, lineHeight: 1.55 }}>
        Para {para}, entrá con el PIN del curso.
      </p>

      {backend === 'caido' && (
        <p style={{ ...nota, color: colors.status.warn }}>
          No pude conectar con el servidor del curso. Podés responder igual: se guarda en tu
          navegador y lo reintento solo.
        </p>
      )}

      <Campo label="PIN del curso" requerido>
        <TextInput value={pin} onChange={setPin} placeholder="El que dicta el instructor" maxLength={60} />
      </Campo>
      <Campo label="Tu nombre" requerido>
        <TextInput value={nombre} onChange={setNombre} placeholder="Nombre y apellido" maxLength={60} />
      </Campo>

      {error && (
        <p style={{ ...nota, color: colors.status.err }} role="status">
          {error.mensaje}
        </p>
      )}

      <button
        type="button"
        className="btn"
        onClick={() => void enviar()}
        disabled={entrando || pin.trim() === '' || nombre.trim() === ''}
      >
        {entrando ? 'Entrando…' : 'Entrar'}
      </button>

      <p style={{ ...nota, color: colors.textDim }}>
        Se guarda en este navegador para todo el curso. No pide correo ni contraseña.
      </p>
    </div>
  )
}

const caja: React.CSSProperties = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: space.lg,
  marginBottom: space.lg,
}

const nota: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  margin: `0 0 ${space.md}px`,
}
