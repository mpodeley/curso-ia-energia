// Cliente de la API del curso.
//
// Regla de oro de este archivo: **ninguna función tira una excepción**. Todas
// devuelven un Resultado. El sitio se proyecta en vivo delante de veinte
// personas, y una promesa rechazada que nadie atrapa es una pantalla en blanco
// en el peor momento posible. Un servidor caído tiene que ser, como mucho, un
// cartel amarillo abajo de un formulario.

import { API_URL, apiHabilitada } from './config'

export type ErrorApi =
  | 'sin-backend' // no hay VITE_API_URL: el sitio corre en modo offline
  | 'red' // no llegamos al servidor, o tardó demasiado
  | 'pin' // el PIN no es el correcto
  | 'auth' // token vencido o inválido
  | 'payload' // el servidor rechazó lo que mandamos
  | 'pulso-cerrado'
  | 'servidor'

export type Resultado<T> = { ok: true; data: T } | { ok: false; error: ErrorApi; mensaje: string }

const TIMEOUT_MS = 6000

const MENSAJES: Record<ErrorApi, string> = {
  'sin-backend': 'Este sitio está corriendo sin servidor del curso.',
  red: 'No pude conectar con el servidor del curso.',
  pin: 'Ese PIN no es el del curso.',
  auth: 'Se venció tu sesión. Volvé a entrar con el PIN.',
  payload: 'El servidor no aceptó la respuesta.',
  'pulso-cerrado': 'El instructor ya cerró este pulso.',
  servidor: 'El servidor del curso tuvo un problema.',
}

const falla = (error: ErrorApi, mensaje?: string): Resultado<never> => ({
  ok: false,
  error,
  mensaje: mensaje ?? MENSAJES[error],
})

type Opciones = { token?: string; body?: unknown; query?: Record<string, string | undefined> }

async function pedir<T>(metodo: 'GET' | 'POST', ruta: string, o: Opciones = {}): Promise<Resultado<T>> {
  if (!apiHabilitada) return falla('sin-backend')

  const url = new URL(`${API_URL}/api/v1${ruta}`)
  for (const [k, v] of Object.entries(o.query ?? {})) if (v) url.searchParams.set(k, v)

  const headers: Record<string, string> = {}
  if (o.token) headers.authorization = `Bearer ${o.token}`
  if (o.body !== undefined) headers['content-type'] = 'application/json'

  let res: Response
  try {
    res = await fetch(url, {
      method: metodo,
      headers,
      body: o.body === undefined ? undefined : JSON.stringify(o.body),
      // Cubre el timeout, la caída de red y el bloqueo por extensión o firewall
      // en un solo catch. Todos significan lo mismo para el alumno.
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch {
    return falla('red')
  }

  let cuerpo: unknown = null
  try {
    cuerpo = await res.json()
  } catch {
    cuerpo = null
  }

  if (res.ok) return { ok: true, data: cuerpo as T }

  const err = (cuerpo as { error?: string } | null)?.error
  const detalle = (cuerpo as { detalle?: string } | null)?.detalle
  if (res.status === 401) return falla(err === 'pin' ? 'pin' : 'auth')
  if (res.status === 409 && err === 'pulso-cerrado') return falla('pulso-cerrado')
  if (res.status >= 400 && res.status < 500) return falla('payload', detalle)
  return falla('servidor')
}

// ---- alumno -----------------------------------------------------------------

export type Salud = { ok: boolean; edicion: string; ts: string }
export const salud = () => pedir<Salud>('GET', '/salud')

export type Entrada = {
  token: string
  exp: number
  edicion: string
  alumnoId: string
  nombre: string
  yaExistia: boolean
}
export const entrar = (pin: string, nombre: string) =>
  pedir<Entrada>('POST', '/entrar', { body: { pin, nombre } })

export type EnvioRespuesta = { tipo: string; ref: string; sesion: number; payload: unknown }
export const enviarRespuesta = (token: string, r: EnvioRespuesta) =>
  pedir<{ ok: true; actualizado: boolean }>('POST', '/respuesta', { token, body: r })

export const pulsoActual = (token: string) => pedir<{ pulsoId: string | null }>('GET', '/pulso', { token })

export type Tally = { pulsoId: string; total: number; items: { clave: string; n: number }[] }
export const tallyDe = (token: string, pulsoId: string) =>
  pedir<Tally>('GET', '/tally', { token, query: { pulso: pulsoId } })

// ---- instructor -------------------------------------------------------------

export const panelEntrar = (pin: string) =>
  pedir<{ token: string; exp: number; edicion: string }>('POST', '/panel/entrar', { body: { pin } })

export type FilaPanel = {
  alumnoId: string
  nombre: string
  tipo: string
  ref: string
  sesion: number
  payload: unknown
  creado: string
  actualizado: string
}

export const panelRespuestas = (
  token: string,
  q: { edicion?: string; tipo?: string; ref?: string } = {},
) => pedir<{ edicion: string; servidorTs: string; filas: FilaPanel[] }>('GET', '/panel/respuestas', { token, query: q })

export const panelAlumnos = (token: string, edicion?: string) =>
  pedir<{ edicion: string; alumnos: { alumno_id: string; nombre: string }[] }>('GET', '/panel/alumnos', {
    token,
    query: { edicion },
  })

export const panelEdiciones = (token: string) =>
  pedir<{ actual: string; ediciones: { edicion: string; alumnos: number; respuestas: number }[] }>(
    'GET',
    '/panel/ediciones',
    { token },
  )

export const panelPulso = (token: string, pulsoId: string, abierto: boolean) =>
  pedir<{ ok: true; pulsoId: string; abierto: boolean }>('POST', '/panel/pulso', {
    token,
    body: { pulsoId, abierto },
  })

export const panelCargarRespuesta = (token: string, nombre: string, r: EnvioRespuesta) =>
  pedir<{ ok: true; alumnoId: string }>('POST', '/panel/respuesta', { token, body: { nombre, ...r } })

/** El export necesita la cabecera de autorización, así que no puede ser un <a
 *  href>. Se baja como blob y se dispara la descarga a mano. */
export async function bajarExport(token: string, edicion: string): Promise<Resultado<true>> {
  if (!apiHabilitada) return falla('sin-backend')
  const url = new URL(`${API_URL}/api/v1/panel/export`)
  url.searchParams.set('formato', 'csv')
  url.searchParams.set('edicion', edicion)

  try {
    const res = await fetch(url, {
      headers: { authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(30_000),
    })
    if (!res.ok) return falla(res.status === 401 ? 'auth' : 'servidor')

    const blob = await res.blob()
    const href = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = href
    a.download = `respuestas-${edicion}.csv`
    a.click()
    URL.revokeObjectURL(href)
    return { ok: true, data: true }
  } catch {
    return falla('red')
  }
}
