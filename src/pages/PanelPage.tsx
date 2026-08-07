// Panel del instructor, en #/panel.
//
// No está enlazado desde el masthead. Eso no lo hace secreto —lo que lo protege
// es el PIN, que solo existe del lado del Worker— pero mantiene la navegación
// del sitio limpia para los alumnos.
//
// Regla que manda en el diseño: esto se proyecta. Nunca puede quedar en blanco,
// así que ante una falla de red se muestra el último dato bueno con su sello de
// antigüedad, jamás un error a pantalla completa.

import { useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Campo, TextInput } from '../components/forms'
import { PanelPulsos } from '../components/panel/PanelPulsos'
import { PanelRelevamiento } from '../components/panel/PanelRelevamiento'
import { useExerciseState } from '../hooks/useExerciseState'
import { bajarExport, panelEdiciones, panelEntrar } from '../lib/api'
import { apiHabilitada } from '../lib/config'
import { colors, radius, space } from '../theme'

type Sesion = { token: string; exp: number; edicion: string }
const SIN_SESION: Sesion = { token: '', exp: 0, edicion: '' }

type Pestana = 'pulsos' | 'relevamiento'

export function PanelPage() {
  const [sesion, setSesion, resetSesion] = useExerciseState<Sesion>('panel', SIN_SESION)
  const [pestana, setPestana] = useState<Pestana>('pulsos')
  const [proyeccion, setProyeccion] = useState(false)
  const [ediciones, setEdiciones] = useState<string[]>([])
  const [edicion, setEdicion] = useState('')

  const vigente = Boolean(sesion.token) && (!sesion.exp || sesion.exp > Date.now())
  const token = vigente ? sesion.token : ''

  useEffect(() => {
    if (!token) return
    void panelEdiciones(token).then((r) => {
      if (!r.ok) return
      setEdiciones(r.data.ediciones.map((e) => e.edicion))
      setEdicion((actual) => actual || r.data.actual)
    })
  }, [token])

  if (!apiHabilitada) {
    return (
      <div className="wrap" style={{ padding: `${space.xxl}px 0` }}>
        <h1>Panel</h1>
        <p style={{ color: colors.textMuted }}>
          Este sitio se construyó sin servidor del curso, así que no hay nada que mostrar.
        </p>
      </div>
    )
  }

  if (!token) return <Login onEntrar={setSesion} />

  return (
    <div
      className="wrap panel"
      data-proyeccion={proyeccion ? 'true' : 'false'}
      style={{ padding: `${space.xxl}px 0` }}
    >
      <div
        style={{
          display: 'flex',
          gap: space.md,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: space.xl,
        }}
      >
        {!proyeccion && (
          <>
            <div style={{ display: 'flex', gap: space.xs }}>
              <Tab actual={pestana} valor="pulsos" onClick={setPestana}>
                Pulsos
              </Tab>
              <Tab actual={pestana} valor="relevamiento" onClick={setPestana}>
                Relevamiento
              </Tab>
            </div>

            {ediciones.length > 1 && (
              <select value={edicion} onChange={(e) => setEdicion(e.target.value)}>
                {ediciones.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            )}
          </>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: space.sm }}>
          <button type="button" className="tbtn" onClick={() => setProyeccion((p) => !p)}>
            {proyeccion ? 'Salir de proyección' : 'Modo proyección'}
          </button>
          {!proyeccion && (
            <>
              <button type="button" className="tbtn" onClick={() => void bajarExport(token, edicion)}>
                Exportar CSV
              </button>
              <button type="button" className="tbtn" onClick={resetSesion}>
                Salir
              </button>
            </>
          )}
        </div>
      </div>

      <ErrorBoundary que="el panel">
        {pestana === 'pulsos' ? (
          <PanelPulsos token={token} edicion={edicion} proyeccion={proyeccion} />
        ) : (
          <PanelRelevamiento token={token} edicion={edicion} />
        )}
      </ErrorBoundary>
    </div>
  )
}

function Tab({
  actual,
  valor,
  onClick,
  children,
}: {
  actual: Pestana
  valor: Pestana
  onClick: (p: Pestana) => void
  children: string
}) {
  const elegida = actual === valor
  return (
    <button
      type="button"
      className="tbtn"
      onClick={() => onClick(valor)}
      style={{
        borderColor: elegida ? colors.accent.orange : colors.border,
        color: elegida ? colors.accent.orange : colors.textSecondary,
      }}
    >
      {children}
    </button>
  )
}

function Login({ onEntrar }: { onEntrar: (s: Sesion) => void }) {
  const [pin, setPin] = useState('')
  const [entrando, setEntrando] = useState(false)
  const [error, setError] = useState<string>()

  const enviar = useCallback(async () => {
    setEntrando(true)
    setError(undefined)
    const r = await panelEntrar(pin.trim())
    setEntrando(false)
    if (r.ok) onEntrar({ token: r.data.token, exp: r.data.exp, edicion: r.data.edicion })
    else setError(r.mensaje)
  }, [pin, onEntrar])

  return (
    <div className="wrap" style={{ padding: `${space.xxl}px 0`, maxWidth: 420 }}>
      <h1 style={{ marginBottom: space.lg }}>Panel</h1>
      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.lg,
        }}
      >
        <Campo label="PIN del instructor" requerido>
          <TextInput value={pin} onChange={setPin} maxLength={60} />
        </Campo>
        {error && (
          <p style={{ color: colors.status.err, fontSize: 14, margin: `0 0 ${space.md}px` }} role="status">
            {error}
          </p>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => void enviar()}
          disabled={entrando || pin.trim() === ''}
        >
          {entrando ? 'Entrando…' : 'Entrar'}
        </button>
      </div>
    </div>
  )
}
