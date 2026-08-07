// CORS. The allowlist comes from [vars] ORIGENES so adding the Pages URL of a
// future cohort is a config change, not a code change.
//
// No Access-Control-Allow-Credentials: auth rides in a bearer header, not a
// cookie, so there is nothing for a cross-site request to ride on.

import type { Env } from './types'

export function origenPermitido(req: Request, env: Env): string | null {
  const origen = req.headers.get('origin')
  if (!origen) return null
  const lista = env.ORIGENES.split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  return lista.includes(origen) ? origen : null
}

export function cabecerasCors(origen: string | null): Record<string, string> {
  // Vary always, even when the origin was rejected: the response varies by
  // Origin either way and a shared cache must not serve one origin's answer to
  // another.
  const h: Record<string, string> = { vary: 'Origin' }
  if (origen) h['access-control-allow-origin'] = origen
  return h
}

export function preflight(req: Request, env: Env): Response | null {
  if (req.method !== 'OPTIONS') return null
  const origen = origenPermitido(req, env)
  return new Response(null, {
    status: origen ? 204 : 403,
    headers: {
      ...cabecerasCors(origen),
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'access-control-allow-headers': 'content-type,authorization',
      'access-control-max-age': '86400',
    },
  })
}
