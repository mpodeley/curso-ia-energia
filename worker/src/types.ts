// Bindings and wire types for the course API.

export interface Env {
  DB: D1Database

  // [vars] in wrangler.toml — public, versioned.
  EDICION: string
  ORIGENES: string

  // wrangler secret — never in git, never in the client bundle.
  PIN_ALUMNO: string
  PIN_INSTRUCTOR: string
  TOKEN_SECRET: string
}

export type Rol = 'alumno' | 'instructor'

/** Signed and handed to the client. Short keys because it travels in a header
 *  on every request. `a` and `n` are empty for the instructor. */
export type TokenPayload = {
  e: string // edicion
  r: Rol
  a: string // alumnoId
  n: string // nombre
  x: number // expiry, epoch ms
}

export type FilaAlumno = {
  alumno_id: string
  nombre: string
  creado: string
  visto: string
}

export type FilaRespuesta = {
  alumno_id: string
  nombre: string
  tipo: string
  ref: string
  sesion: number
  payload: string
  creado: string
  actualizado: string
}
