// Envelope validation and payload caps for the course API.
//
// Pure on purpose: no Workers globals, no imports. That keeps it reachable from
// the repo's vitest run (environment: 'node') so the rules that decide what the
// database will accept are the one part of the Worker covered by tests.
//
// Division of labour: the *semantics* of a payload (which questions exist, which
// options are valid) live in src/content/ on the client, versioned in git. The
// server does not duplicate them — it only enforces shape and size, so a bad
// client or a curious student cannot fill the database. That is the right split
// for a course tool: the blast radius of a wrong payload is one row that the
// instructor can see and delete.

export const TIPOS = ['encuesta', 'pulso', 'ejercicio', 'discusion', 'tarea'] as const
export type Tipo = (typeof TIPOS)[number]

export type Respuesta = {
  tipo: Tipo
  ref: string
  sesion: number
  payload: unknown
}

export const LIMITES = {
  nombre: 60,
  ref: 80,
  pulsoId: 80,
  texto: 2000,
  payloadBytes: 6144,
  claves: 40,
  items: 60,
  profundidad: 4,
} as const

export type Falla = { campo: string; motivo: string }
export type Valid<T> = { ok: true; valor: T } | { ok: false; falla: Falla }

const ok = <T>(valor: T): Valid<T> => ({ ok: true, valor })
const no = (campo: string, motivo: string): Valid<never> => ({ ok: false, falla: { campo, motivo } })

/** Collapses whitespace and trims. Does not touch case: people write their own
 *  names and "de la Fuente" should survive. */
export function normalizarNombre(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw.replace(/\s+/g, ' ').trim()
}

/** Stable identity key derived from the name. Accent-stripped so "Rubén" and
 *  "Ruben" typed on different days are the same student. */
export function slugNombre(nombre: string): string {
  const base = nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // combining marks left behind by NFD
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '')
  return base
}

export function validarNombre(raw: unknown): Valid<{ nombre: string; alumnoId: string }> {
  const nombre = normalizarNombre(raw)
  if (nombre.length === 0) return no('nombre', 'Escribí tu nombre para entrar.')
  if (nombre.length < 2) return no('nombre', 'Necesito al menos dos letras.')
  if (nombre.length > LIMITES.nombre) return no('nombre', `Máximo ${LIMITES.nombre} caracteres.`)

  const alumnoId = slugNombre(nombre)
  // A name of only punctuation or emoji slugs to nothing and would collide with
  // every other such name on the composite primary key.
  if (alumnoId.length < 2) return no('nombre', 'Usá letras o números en el nombre.')
  return ok({ nombre, alumnoId })
}

/** Refs are used verbatim as part of a primary key and echoed back to the
 *  instructor panel, so they stay in a boring alphabet. */
export function validarRef(raw: unknown, campo = 'ref'): Valid<string> {
  if (typeof raw !== 'string') return no(campo, 'Falta.')
  const ref = raw.trim()
  if (ref.length === 0) return no(campo, 'Vacío.')
  if (ref.length > LIMITES.ref) return no(campo, `Máximo ${LIMITES.ref} caracteres.`)
  if (!/^[a-zA-Z0-9:_-]+$/.test(ref)) return no(campo, 'Solo letras, números, : _ y -.')
  return ok(ref)
}

/** Walks the payload rejecting anything unbounded. Returns the serialized form
 *  so the caller stores exactly what was measured — re-serializing later could
 *  produce a different size. */
export function validarPayload(payload: unknown): Valid<string> {
  const falla = revisar(payload, 0)
  if (falla) return { ok: false, falla }

  let json: string | undefined
  try {
    json = JSON.stringify(payload)
  } catch {
    return no('payload', 'No es JSON serializable.')
  }
  // undefined for a bare `undefined` payload; cycles already threw above.
  if (json === undefined) return no('payload', 'Vacío.')
  // Byte length, not string length: acentos y ñ ocupan dos bytes en UTF-8.
  const bytes = new TextEncoder().encode(json).length
  if (bytes > LIMITES.payloadBytes) return no('payload', 'Demasiado largo.')
  return ok(json)
}

function revisar(v: unknown, prof: number): Falla | null {
  if (prof > LIMITES.profundidad) return { campo: 'payload', motivo: 'Demasiado anidado.' }

  if (v === null || typeof v === 'boolean') return null
  if (typeof v === 'number') {
    return Number.isFinite(v) ? null : { campo: 'payload', motivo: 'Número inválido.' }
  }
  if (typeof v === 'string') {
    return v.length <= LIMITES.texto ? null : { campo: 'payload', motivo: 'Texto demasiado largo.' }
  }
  if (Array.isArray(v)) {
    if (v.length > LIMITES.items) return { campo: 'payload', motivo: 'Demasiados items.' }
    for (const item of v) {
      const f = revisar(item, prof + 1)
      if (f) return f
    }
    return null
  }
  if (typeof v === 'object') {
    const claves = Object.keys(v as Record<string, unknown>)
    if (claves.length > LIMITES.claves) return { campo: 'payload', motivo: 'Demasiados campos.' }
    for (const k of claves) {
      if (k.length > LIMITES.ref) return { campo: 'payload', motivo: 'Nombre de campo demasiado largo.' }
      const f = revisar((v as Record<string, unknown>)[k], prof + 1)
      if (f) return f
    }
    return null
  }
  return { campo: 'payload', motivo: 'Tipo no soportado.' }
}

export function validarRespuesta(body: unknown): Valid<Respuesta & { json: string }> {
  if (typeof body !== 'object' || body === null) return no('body', 'Falta el cuerpo.')
  const b = body as Record<string, unknown>

  if (typeof b.tipo !== 'string' || !(TIPOS as readonly string[]).includes(b.tipo)) {
    return no('tipo', `Tiene que ser uno de: ${TIPOS.join(', ')}.`)
  }
  const ref = validarRef(b.ref)
  if (!ref.ok) return ref

  const sesion = b.sesion
  if (typeof sesion !== 'number' || !Number.isInteger(sesion) || sesion < 1 || sesion > 8) {
    return no('sesion', 'Tiene que ser un entero entre 1 y 8.')
  }

  const payload = validarPayload(b.payload)
  if (!payload.ok) return payload

  return ok({ tipo: b.tipo as Tipo, ref: ref.valor, sesion, payload: b.payload, json: payload.valor })
}
