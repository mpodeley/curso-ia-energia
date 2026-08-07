// Polling con backoff, para el panel y para el widget de pulsos.
//
// Tres cosas que no son opcionales cuando esto está proyectado:
//   - Pausar con la pestaña oculta. Si el instructor pasa a la ventana del deck
//     por veinte minutos, el poll no tiene que seguir corriendo.
//   - Backoff ante fallas, para que un Worker caído no genere una tormenta.
//   - Conservar el último dato bueno. El panel nunca puede quedar en blanco: es
//     preferible mostrar datos de hace treinta segundos, avisando, que nada.

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Resultado } from '../lib/api'

const MAX_MS = 30_000

export type Poll<T> = {
  dato: T | null
  /** Date.now() del último dato bueno; null si nunca hubo uno. */
  desde: number | null
  cargando: boolean
  fallando: boolean
  refrescar: () => void
}

export function usePoll<T>(
  fn: () => Promise<Resultado<T>>,
  intervaloMs: number,
  activo = true,
): Poll<T> {
  const [dato, setDato] = useState<T | null>(null)
  const [desde, setDesde] = useState<number | null>(null)
  const [cargando, setCargando] = useState(false)
  const [fallando, setFallando] = useState(false)

  // La función cambia de identidad en cada render del componente que la pasa;
  // guardarla en una ref evita reiniciar el intervalo en cada uno.
  const fnRef = useRef(fn)
  fnRef.current = fn

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fallos = useRef(0)
  const vivo = useRef(true)
  const [tick, setTick] = useState(0)

  const refrescar = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    vivo.current = true
    if (!activo) return

    const correr = async () => {
      if (document.visibilityState === 'hidden') {
        agendar(intervaloMs)
        return
      }
      setCargando(true)
      const r = await fnRef.current()
      if (!vivo.current) return
      setCargando(false)

      if (r.ok) {
        fallos.current = 0
        setFallando(false)
        setDato(r.data)
        setDesde(Date.now())
        agendar(intervaloMs)
      } else {
        fallos.current++
        setFallando(true)
        // Deja el dato anterior intacto a propósito.
        agendar(Math.min(intervaloMs * 2 ** fallos.current, MAX_MS))
      }
    }

    const agendar = (ms: number) => {
      if (!vivo.current) return
      timer.current = setTimeout(correr, ms)
    }

    void correr()

    // Volver a la pestaña refresca ya: el instructor que vuelve del deck espera
    // ver el estado de ahora, no el de dentro de dos segundos.
    const alVolver = () => {
      if (document.visibilityState === 'visible') {
        if (timer.current) clearTimeout(timer.current)
        void correr()
      }
    }
    document.addEventListener('visibilitychange', alVolver)

    return () => {
      vivo.current = false
      if (timer.current) clearTimeout(timer.current)
      document.removeEventListener('visibilitychange', alVolver)
    }
  }, [intervaloMs, activo, tick])

  return { dato, desde, cargando, fallando, refrescar }
}

/** "hace 4 s" / "hace 2 min". Para el sello de frescura del panel. */
export function hace(desde: number | null, ahora = Date.now()): string {
  if (desde === null) return 'nunca'
  const s = Math.max(0, Math.round((ahora - desde) / 1000))
  if (s < 60) return `hace ${s} s`
  const m = Math.round(s / 60)
  return m < 60 ? `hace ${m} min` : `hace ${Math.round(m / 60)} h`
}
