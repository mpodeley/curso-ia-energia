// API del curso — rutas bajo /api/v1/.
//
// Un solo Worker, sin framework: un switch sobre `METODO /ruta`. Doce rutas no
// justifican un router.
//
// Nada de esto es infraestructura crítica. El criterio de diseño es que una
// falla del Worker no pueda arruinar una clase en vivo: el cliente trata todo
// error como "guardá local y reintentá", así que acá lo importante es responder
// rápido y con un código honesto, nunca colgarse.

import { bearer, firmarToken, pinCorrecto, verificarToken } from './auth'
import { cabecerasCors, origenPermitido, preflight } from './cors'
import {
  alumnosDe,
  edicionesDisponibles,
  entrarAlumno,
  estaAbierto,
  guardarRespuesta,
  marcarPulso,
  pulsoAbierto,
  respuestasDe,
  respuestasPanel,
} from './db'
import type { Env, FilaRespuesta, TokenPayload } from './types'
import { LIMITES, validarNombre, validarRef, validarRespuesta } from './validate'

const BODY_MAX = 8 * 1024
const RETARDO_PIN_MS = 400

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const pre = preflight(req, env)
    if (pre) return pre

    const origen = origenPermitido(req, env)
    try {
      return await rutear(req, env, origen)
    } catch (e) {
      // Never leak a stack to the browser; the instructor reads `wrangler tail`.
      console.error('error no manejado', e)
      return json({ error: 'servidor' }, 500, origen)
    }
  },
} satisfies ExportedHandler<Env>

async function rutear(req: Request, env: Env, origen: string | null): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname.replace(/\/+$/, '')
  const ruta = `${req.method} ${path}`
  const ahora = Date.now()

  switch (ruta) {
    // ---- pública ---------------------------------------------------------
    // La sonda que le permite al cliente distinguir "no llego al servidor" de
    // "el PIN está mal". Son dos mensajes muy distintos en el medio de una clase.
    case 'GET /api/v1/salud':
      return json({ ok: true, edicion: env.EDICION, ts: new Date(ahora).toISOString() }, 200, origen)

    case 'POST /api/v1/entrar': {
      const body = await leerJson(req)
      if (!body.ok) return json({ error: body.error }, body.status, origen)

      if (!(await pinCorrecto((body.valor as Record<string, unknown>).pin, env.PIN_ALUMNO))) {
        await esperar(RETARDO_PIN_MS)
        return json({ error: 'pin' }, 401, origen)
      }
      const v = validarNombre((body.valor as Record<string, unknown>).nombre)
      if (!v.ok) return json({ error: 'nombre', detalle: v.falla.motivo }, 400, origen)

      const { yaExistia, nombreGuardado } = await entrarAlumno(env, v.valor.alumnoId, v.valor.nombre)
      const { token, exp } = await firmarToken(
        env.TOKEN_SECRET,
        { edicion: env.EDICION, rol: 'alumno', alumnoId: v.valor.alumnoId, nombre: nombreGuardado },
        ahora,
      )
      return json(
        { token, exp, edicion: env.EDICION, alumnoId: v.valor.alumnoId, nombre: nombreGuardado, yaExistia },
        200,
        origen,
      )
    }

    // ---- alumno ----------------------------------------------------------
    case 'POST /api/v1/respuesta': {
      const sesion = await sesionDe(req, env, ahora, 'alumno')
      if (!sesion) return json({ error: 'auth' }, 401, origen)

      const body = await leerJson(req)
      if (!body.ok) return json({ error: body.error }, body.status, origen)

      const v = validarRespuesta(body.valor)
      if (!v.ok) return json({ error: 'payload', campo: v.falla.campo, detalle: v.falla.motivo }, 422, origen)

      // Un pulso cerrado no acepta más votos: si no, alguien que llegó tarde
      // mueve las barras después de que el instructor las mostró.
      if (v.valor.tipo === 'pulso' && !(await estaAbierto(env, v.valor.ref))) {
        return json({ error: 'pulso-cerrado' }, 409, origen)
      }

      const { actualizado } = await guardarRespuesta(env, sesion.a, v.valor)
      return json({ ok: true, actualizado }, 200, origen)
    }

    // También lo consulta el panel: con dos instructores (edición 2026-09), el
    // que no apretó el botón necesita enterarse de qué pulso quedó abierto.
    case 'GET /api/v1/pulso': {
      const sesion =
        (await sesionDe(req, env, ahora, 'alumno')) ?? (await sesionDe(req, env, ahora, 'instructor'))
      if (!sesion) return json({ error: 'auth' }, 401, origen)
      return json({ pulsoId: await pulsoAbierto(env) }, 200, origen)
    }

    // El alumno ve el recuento recién cuando el instructor cierra el pulso.
    // Es pedagógico: nadie ancla su respuesta en la de los demás.
    case 'GET /api/v1/tally': {
      const sesion = await sesionDe(req, env, ahora, 'alumno')
      if (!sesion) return json({ error: 'auth' }, 401, origen)

      const ref = validarRef(url.searchParams.get('pulso'), 'pulso')
      if (!ref.ok) return json({ error: 'pulso' }, 400, origen)
      if (await estaAbierto(env, ref.valor)) return json({ error: 'abierto' }, 409, origen)

      const filas = await respuestasDe(env, 'pulso', ref.valor)
      return json({ pulsoId: ref.valor, ...contar(filas) }, 200, origen)
    }

    // ---- instructor ------------------------------------------------------
    case 'POST /api/v1/panel/entrar': {
      const body = await leerJson(req)
      if (!body.ok) return json({ error: body.error }, body.status, origen)

      if (!(await pinCorrecto((body.valor as Record<string, unknown>).pin, env.PIN_INSTRUCTOR))) {
        await esperar(RETARDO_PIN_MS)
        return json({ error: 'pin' }, 401, origen)
      }
      const { token, exp } = await firmarToken(env.TOKEN_SECRET, { edicion: env.EDICION, rol: 'instructor' }, ahora)
      return json({ token, exp, edicion: env.EDICION }, 200, origen)
    }

    case 'GET /api/v1/panel/ediciones': {
      if (!(await sesionDe(req, env, ahora, 'instructor'))) return json({ error: 'auth' }, 401, origen)
      return json({ actual: env.EDICION, ediciones: await edicionesDisponibles(env) }, 200, origen)
    }

    case 'GET /api/v1/panel/alumnos': {
      if (!(await sesionDe(req, env, ahora, 'instructor'))) return json({ error: 'auth' }, 401, origen)
      const edicion = url.searchParams.get('edicion') || env.EDICION
      return json({ edicion, alumnos: await alumnosDe(env, edicion) }, 200, origen)
    }

    case 'GET /api/v1/panel/respuestas': {
      if (!(await sesionDe(req, env, ahora, 'instructor'))) return json({ error: 'auth' }, 401, origen)
      const edicion = url.searchParams.get('edicion') || env.EDICION
      const filas = await respuestasPanel(env, edicion, {
        tipo: url.searchParams.get('tipo'),
        ref: url.searchParams.get('ref'),
      })
      // servidorTs deja que el panel muestre "actualizado hace Xs" sin depender
      // del reloj de la laptop del instructor.
      return json({ edicion, servidorTs: new Date(ahora).toISOString(), filas: filas.map(salida) }, 200, origen)
    }

    case 'POST /api/v1/panel/pulso': {
      if (!(await sesionDe(req, env, ahora, 'instructor'))) return json({ error: 'auth' }, 401, origen)
      const body = await leerJson(req)
      if (!body.ok) return json({ error: body.error }, body.status, origen)

      const b = body.valor as Record<string, unknown>
      const ref = validarRef(b.pulsoId, 'pulsoId')
      if (!ref.ok) return json({ error: 'pulsoId', detalle: ref.falla.motivo }, 400, origen)

      await marcarPulso(env, ref.valor, b.abierto === true)
      return json({ ok: true, pulsoId: ref.valor, abierto: b.abierto === true }, 200, origen)
    }

    // Carga una respuesta a nombre de alguien. Veinte líneas que salvan la clase
    // si a un alumno le bloquean el dominio y dicta su respuesta por el chat.
    case 'POST /api/v1/panel/respuesta': {
      if (!(await sesionDe(req, env, ahora, 'instructor'))) return json({ error: 'auth' }, 401, origen)
      const body = await leerJson(req)
      if (!body.ok) return json({ error: body.error }, body.status, origen)

      const b = body.valor as Record<string, unknown>
      const nombre = validarNombre(b.nombre)
      if (!nombre.ok) return json({ error: 'nombre', detalle: nombre.falla.motivo }, 400, origen)

      const v = validarRespuesta(b)
      if (!v.ok) return json({ error: 'payload', campo: v.falla.campo, detalle: v.falla.motivo }, 422, origen)

      await entrarAlumno(env, nombre.valor.alumnoId, nombre.valor.nombre)
      const { actualizado } = await guardarRespuesta(env, nombre.valor.alumnoId, v.valor)
      return json({ ok: true, alumnoId: nombre.valor.alumnoId, actualizado }, 200, origen)
    }

    case 'GET /api/v1/panel/export': {
      if (!(await sesionDe(req, env, ahora, 'instructor'))) return json({ error: 'auth' }, 401, origen)
      const edicion = url.searchParams.get('edicion') || env.EDICION
      const filas = await respuestasPanel(env, edicion, { tipo: null, ref: null })

      if (url.searchParams.get('formato') === 'csv') {
        return new Response(csv(filas), {
          headers: {
            ...cabecerasCors(origen),
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': `attachment; filename="respuestas-${edicion}.csv"`,
          },
        })
      }
      return json({ edicion, filas: filas.map(salida) }, 200, origen)
    }

    default:
      return json({ error: 'ruta' }, 404, origen)
  }
}

// ---- helpers ---------------------------------------------------------------

function json(data: unknown, status: number, origen: string | null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cabecerasCors(origen), 'content-type': 'application/json; charset=utf-8' },
  })
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms))

type Leido = { ok: true; valor: unknown } | { ok: false; error: string; status: number }

async function leerJson(req: Request): Promise<Leido> {
  // Rechazar por Content-Length antes de leer, y de nuevo después: la cabecera
  // puede mentir o faltar.
  const largo = Number(req.headers.get('content-length') ?? '0')
  if (largo > BODY_MAX) return { ok: false, error: 'muy-largo', status: 413 }

  let texto: string
  try {
    texto = await req.text()
  } catch {
    return { ok: false, error: 'cuerpo', status: 400 }
  }
  if (texto.length > BODY_MAX) return { ok: false, error: 'muy-largo', status: 413 }

  try {
    const valor = JSON.parse(texto)
    if (typeof valor !== 'object' || valor === null) return { ok: false, error: 'cuerpo', status: 400 }
    return { ok: true, valor }
  } catch {
    return { ok: false, error: 'json', status: 400 }
  }
}

/** Verifies the bearer token and checks the role and the edition. A token minted
 *  for a previous cohort is not valid for this one. */
async function sesionDe(
  req: Request,
  env: Env,
  ahora: number,
  rol: TokenPayload['r'],
): Promise<TokenPayload | null> {
  const p = await verificarToken(env.TOKEN_SECRET, bearer(req), ahora)
  if (!p || p.r !== rol || p.e !== env.EDICION) return null
  return p
}

/** Wire shape for the panel: payload comes back parsed, so the client does not
 *  have to JSON.parse a string out of a JSON document. */
function salida(f: FilaRespuesta) {
  let payload: unknown = null
  try {
    payload = JSON.parse(f.payload)
  } catch {
    payload = f.payload
  }
  return {
    alumnoId: f.alumno_id,
    nombre: f.nombre ?? f.alumno_id,
    tipo: f.tipo,
    ref: f.ref,
    sesion: f.sesion,
    payload,
    creado: f.creado,
    actualizado: f.actualizado,
  }
}

/** Counts for the student-facing tally. Deterministic order (n desc, then key
 *  asc) so repeated polls never reshuffle the bars on a projector. Raw keys on
 *  purpose — presentation (content order, zero bars, accent folding) is the
 *  client's job, in engine/pulso.ts, so student and panel shape the same way.
 *  `total` counts only the votes that parsed into a key: it has to equal the
 *  sum of the bars the client draws. */
function contar(filas: FilaRespuesta[]): { total: number; items: { clave: string; n: number }[] } {
  const cuenta = new Map<string, number>()
  let total = 0
  for (const f of filas) {
    let clave: string | null = null
    try {
      const p = JSON.parse(f.payload) as Record<string, unknown>
      if (typeof p.opcion === 'number') clave = String(p.opcion)
      else if (typeof p.palabra === 'string') clave = p.palabra.trim().toLowerCase().slice(0, LIMITES.nombre)
    } catch {
      clave = null
    }
    if (!clave) continue
    cuenta.set(clave, (cuenta.get(clave) ?? 0) + 1)
    total++
  }
  const items = [...cuenta.entries()]
    .map(([clave, n]) => ({ clave, n }))
    .sort((a, b) => b.n - a.n || a.clave.localeCompare(b.clave))
  return { total, items }
}

function csv(filas: FilaRespuesta[]): string {
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const cab = ['alumno_id', 'nombre', 'tipo', 'ref', 'sesion', 'payload', 'creado', 'actualizado']
  const cuerpo = filas.map((f) =>
    [f.alumno_id, f.nombre, f.tipo, f.ref, f.sesion, f.payload, f.creado, f.actualizado].map(esc).join(','),
  )
  // BOM: sin esto Excel abre el CSV en latin-1 y rompe todos los acentos.
  return '﻿' + [cab.join(','), ...cuerpo].join('\r\n') + '\r\n'
}
