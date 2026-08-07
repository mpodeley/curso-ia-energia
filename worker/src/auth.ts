// PIN check and signed tokens.
//
// The threat model is a course tool, not a bank: the student PIN is projected on
// a slide and read aloud. What this code has to guarantee is narrower —
//
//   - No PIN is ever compared in the browser. Everything under src/ ships to the
//     public bundle, so a client-side check would be a check anyone can read.
//   - A student's name comes from the signed token, never from the request body,
//     so nobody can post as somebody else by editing a fetch.
//   - A leaked token expires on its own.

import type { Rol, TokenPayload } from './types'

const TTL_MS = 24 * 60 * 60 * 1000
const VERSION = 'v1'

const enc = new TextEncoder()

function b64url(bytes: Uint8Array): string {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function unb64url(s: string): Uint8Array {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4))
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)))
}

function igualesEnTiempoConstante(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

/** Compares digests rather than the strings themselves so the comparison runs
 *  over fixed-length input regardless of what was submitted. */
export async function pinCorrecto(dado: unknown, esperado: string): Promise<boolean> {
  if (typeof dado !== 'string' || dado.length === 0 || !esperado) return false
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(dado)),
    crypto.subtle.digest('SHA-256', enc.encode(esperado)),
  ])
  return igualesEnTiempoConstante(new Uint8Array(a), new Uint8Array(b))
}

export async function firmarToken(
  secret: string,
  datos: { edicion: string; rol: Rol; alumnoId?: string; nombre?: string },
  ahora: number,
): Promise<{ token: string; exp: number }> {
  const exp = ahora + TTL_MS
  const payload: TokenPayload = {
    e: datos.edicion,
    r: datos.rol,
    a: datos.alumnoId ?? '',
    n: datos.nombre ?? '',
    x: exp,
  }
  const cuerpo = b64url(enc.encode(JSON.stringify(payload)))
  const firma = b64url(await hmac(secret, cuerpo))
  return { token: `${VERSION}.${cuerpo}.${firma}`, exp }
}

export async function verificarToken(
  secret: string,
  token: string | null,
  ahora: number,
): Promise<TokenPayload | null> {
  if (!token) return null
  const partes = token.split('.')
  if (partes.length !== 3 || partes[0] !== VERSION) return null
  const [, cuerpo, firma] = partes

  let esperada: Uint8Array
  try {
    esperada = await hmac(secret, cuerpo)
  } catch {
    return null
  }
  let dada: Uint8Array
  try {
    dada = unb64url(firma)
  } catch {
    return null
  }
  if (!igualesEnTiempoConstante(esperada, dada)) return null

  try {
    const p = JSON.parse(new TextDecoder().decode(unb64url(cuerpo))) as TokenPayload
    if (typeof p.x !== 'number' || p.x < ahora) return null
    if (p.r !== 'alumno' && p.r !== 'instructor') return null
    return p
  } catch {
    return null
  }
}

export function bearer(req: Request): string | null {
  const h = req.headers.get('authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.slice(7).trim() || null
}
