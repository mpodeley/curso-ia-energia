// Identidad del alumno: PIN del curso + nombre propio, una vez por navegador.
//
// Es un contexto y no un hook suelto porque la encuesta, el widget de pulsos y
// los botones de compartir de los ejercicios necesitan la misma identidad al
// mismo tiempo; con useExerciseState por componente, cada uno tendría su copia y
// divergirían hasta recargar la página.
//
// La persistencia sigue siendo useExerciseState, el mismo mecanismo que usan los
// nueve ejercicios: una sola forma de guardar cosas en este sitio.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useExerciseState } from '../hooks/useExerciseState'
import { entrar as apiEntrar, salud, type ErrorApi } from './api'
import { apiHabilitada } from './config'
import { cuantosPendientes, vaciar } from './outbox'

export type Identidad = { token: string; exp: number; alumnoId: string; nombre: string }

/** desconocido = todavía no probamos. El sitio no prueba nada al cargar: la
 *  sonda la dispara el primer formulario que se monta. */
export type Backend = 'desconocido' | 'ok' | 'caido'

type Ctx = {
  identidad: Identidad | null
  backend: Backend
  entrando: boolean
  error: { tipo: ErrorApi; mensaje: string } | null
  /** true si el nombre ya estaba registrado en esta edición. */
  yaExistia: boolean
  pendientes: number
  probar: () => void
  entrar: (pin: string, nombre: string) => Promise<boolean>
  salir: () => void
  /** Empuja la cola de reintentos. La llaman los formularios tras un envío. */
  sincronizar: () => Promise<void>
}

const VACIO: Ctx = {
  identidad: null,
  backend: 'desconocido',
  entrando: false,
  error: null,
  yaExistia: false,
  pendientes: 0,
  probar: () => {},
  entrar: async () => false,
  salir: () => {},
  sincronizar: async () => {},
}

const IdentidadCtx = createContext<Ctx>(VACIO)

export const useIdentidad = () => useContext(IdentidadCtx)

type Guardado = { token: string; exp: number; alumnoId: string; nombre: string }
const SIN_IDENTIDAD: Guardado = { token: '', exp: 0, alumnoId: '', nombre: '' }

export function IdentidadProvider({ children }: { children: ReactNode }) {
  const [guardado, setGuardado, resetGuardado] = useExerciseState<Guardado>('identidad', SIN_IDENTIDAD)
  const [backend, setBackend] = useState<Backend>('desconocido')
  const [entrando, setEntrando] = useState(false)
  const [error, setError] = useState<{ tipo: ErrorApi; mensaje: string } | null>(null)
  const [yaExistia, setYaExistia] = useState(false)
  const [pendientes, setPendientes] = useState(0)
  const [probando, setProbando] = useState(false)

  const identidad = useMemo<Identidad | null>(() => {
    if (!guardado.token) return null
    // Un token vencido es igual que no tener ninguno: que la tarjeta vuelva a
    // pedir el PIN es preferible a un 401 en medio de un envío.
    if (guardado.exp && guardado.exp < Date.now()) return null
    return guardado
  }, [guardado])

  const sincronizar = useCallback(async () => {
    if (!identidad) return
    await vaciar(identidad.token)
    setPendientes(cuantosPendientes())
  }, [identidad])

  const probar = useCallback(() => {
    if (!apiHabilitada || probando) return
    setProbando(true)
    void salud().then((r) => {
      setProbando(false)
      setBackend(r.ok ? 'ok' : 'caido')
      if (r.ok) void sincronizar()
    })
  }, [probando, sincronizar])

  const entrar = useCallback(
    async (pin: string, nombre: string) => {
      setEntrando(true)
      setError(null)
      const r = await apiEntrar(pin, nombre)
      setEntrando(false)

      if (!r.ok) {
        setError({ tipo: r.error, mensaje: r.mensaje })
        if (r.error === 'red') setBackend('caido')
        return false
      }
      setBackend('ok')
      setYaExistia(r.data.yaExistia)
      setGuardado({
        token: r.data.token,
        exp: r.data.exp,
        alumnoId: r.data.alumnoId,
        nombre: r.data.nombre,
      })
      await vaciar(r.data.token)
      setPendientes(cuantosPendientes())
      return true
    },
    [setGuardado],
  )

  const salir = useCallback(() => {
    resetGuardado()
    setYaExistia(false)
    setError(null)
  }, [resetGuardado])

  // Reintentar al recuperar la conexión: si el wifi de la oficina se cortó
  // durante la encuesta, la cola se vacía sola cuando vuelve.
  useEffect(() => {
    setPendientes(cuantosPendientes())
    const alVolver = () => void sincronizar()
    window.addEventListener('online', alVolver)
    return () => window.removeEventListener('online', alVolver)
  }, [sincronizar])

  const valor = useMemo<Ctx>(
    () => ({ identidad, backend, entrando, error, yaExistia, pendientes, probar, entrar, salir, sincronizar }),
    [identidad, backend, entrando, error, yaExistia, pendientes, probar, entrar, salir, sincronizar],
  )

  return <IdentidadCtx.Provider value={valor}>{children}</IdentidadCtx.Provider>
}
