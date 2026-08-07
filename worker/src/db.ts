// D1 access. Every query is scoped by edicion, which the Worker stamps from
// [vars] — the client never sends it and cannot forge it.

import type { Env, FilaAlumno, FilaRespuesta } from './types'

const ahora = () => new Date().toISOString()

export async function entrarAlumno(
  env: Env,
  alumnoId: string,
  nombre: string,
): Promise<{ yaExistia: boolean; nombreGuardado: string }> {
  const previo = await env.DB.prepare('SELECT nombre FROM alumno WHERE edicion = ? AND alumno_id = ?')
    .bind(env.EDICION, alumnoId)
    .first<{ nombre: string }>()

  const t = ahora()
  await env.DB.prepare(
    `INSERT INTO alumno (edicion, alumno_id, nombre, creado, visto) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (edicion, alumno_id) DO UPDATE SET visto = excluded.visto`,
  )
    .bind(env.EDICION, alumnoId, nombre, t, t)
    .run()

  // Keeps the first spelling: if Ana typed "Ana Rojas" on day one and "ana
  // rojas" on day three, the panel should not start calling her the latter.
  return { yaExistia: previo !== null, nombreGuardado: previo?.nombre ?? nombre }
}

export async function guardarRespuesta(
  env: Env,
  alumnoId: string,
  r: { tipo: string; ref: string; sesion: number; json: string },
): Promise<{ actualizado: boolean }> {
  const t = ahora()
  // RETURNING creado is the only exact way to tell insert from update here:
  // SQLite reports changes = 1 for both branches of an upsert, so counting rows
  // cannot distinguish them. On insert the returned creado is the t we just
  // bound; on update it is the original, older one.
  const fila = await env.DB.prepare(
    `INSERT INTO respuesta (edicion, alumno_id, tipo, ref, sesion, payload, creado, actualizado)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (edicion, alumno_id, tipo, ref)
     DO UPDATE SET payload = excluded.payload, sesion = excluded.sesion, actualizado = excluded.actualizado
     RETURNING creado`,
  )
    .bind(env.EDICION, alumnoId, r.tipo, r.ref, r.sesion, r.json, t, t)
    .first<{ creado: string }>()
  return { actualizado: fila !== null && fila.creado !== t }
}

export async function pulsoAbierto(env: Env): Promise<string | null> {
  const fila = await env.DB.prepare(
    'SELECT pulso_id FROM pulso WHERE edicion = ? AND abierto = 1 ORDER BY abierto_en DESC LIMIT 1',
  )
    .bind(env.EDICION)
    .first<{ pulso_id: string }>()
  return fila?.pulso_id ?? null
}

export async function estaAbierto(env: Env, pulsoId: string): Promise<boolean> {
  const fila = await env.DB.prepare('SELECT abierto FROM pulso WHERE edicion = ? AND pulso_id = ?')
    .bind(env.EDICION, pulsoId)
    .first<{ abierto: number }>()
  return fila?.abierto === 1
}

/** Opening a pulso closes any other one: two open at once would make the
 *  student widget ambiguous, and the instructor is driving this live. */
export async function marcarPulso(env: Env, pulsoId: string, abierto: boolean): Promise<void> {
  const t = ahora()
  if (abierto) {
    await env.DB.batch([
      env.DB.prepare(
        'UPDATE pulso SET abierto = 0, cerrado_en = ? WHERE edicion = ? AND abierto = 1',
      ).bind(t, env.EDICION),
      env.DB.prepare(
        `INSERT INTO pulso (edicion, pulso_id, abierto, abierto_en) VALUES (?, ?, 1, ?)
         ON CONFLICT (edicion, pulso_id) DO UPDATE SET abierto = 1, abierto_en = excluded.abierto_en, cerrado_en = NULL`,
      ).bind(env.EDICION, pulsoId, t),
    ])
  } else {
    await env.DB.prepare(
      `INSERT INTO pulso (edicion, pulso_id, abierto, cerrado_en) VALUES (?, ?, 0, ?)
       ON CONFLICT (edicion, pulso_id) DO UPDATE SET abierto = 0, cerrado_en = excluded.cerrado_en`,
    )
      .bind(env.EDICION, pulsoId, t)
      .run()
  }
}

export async function respuestasDe(env: Env, tipo: string, ref: string): Promise<FilaRespuesta[]> {
  const { results } = await env.DB.prepare(
    `SELECT r.alumno_id, a.nombre, r.tipo, r.ref, r.sesion, r.payload, r.creado, r.actualizado
     FROM respuesta r LEFT JOIN alumno a ON a.edicion = r.edicion AND a.alumno_id = r.alumno_id
     WHERE r.edicion = ? AND r.tipo = ? AND r.ref = ?
     ORDER BY r.actualizado ASC`,
  )
    .bind(env.EDICION, tipo, ref)
    .all<FilaRespuesta>()
  return results ?? []
}

/** The panel's read. Filters are optional; unfiltered returns the whole edition,
 *  which for 20 students over 8 sessions is a few hundred rows. */
export async function respuestasPanel(
  env: Env,
  edicion: string,
  filtros: { tipo?: string | null; ref?: string | null },
): Promise<FilaRespuesta[]> {
  const cond = ['r.edicion = ?']
  const args: unknown[] = [edicion]
  if (filtros.tipo) {
    cond.push('r.tipo = ?')
    args.push(filtros.tipo)
  }
  if (filtros.ref) {
    cond.push('r.ref = ?')
    args.push(filtros.ref)
  }
  const { results } = await env.DB.prepare(
    `SELECT r.alumno_id, a.nombre, r.tipo, r.ref, r.sesion, r.payload, r.creado, r.actualizado
     FROM respuesta r LEFT JOIN alumno a ON a.edicion = r.edicion AND a.alumno_id = r.alumno_id
     WHERE ${cond.join(' AND ')}
     ORDER BY r.actualizado ASC`,
  )
    .bind(...args)
    .all<FilaRespuesta>()
  return results ?? []
}

export async function alumnosDe(env: Env, edicion: string): Promise<FilaAlumno[]> {
  const { results } = await env.DB.prepare(
    'SELECT alumno_id, nombre, creado, visto FROM alumno WHERE edicion = ? ORDER BY nombre ASC',
  )
    .bind(edicion)
    .all<FilaAlumno>()
  return results ?? []
}

export async function edicionesDisponibles(
  env: Env,
): Promise<{ edicion: string; alumnos: number; respuestas: number }[]> {
  const { results } = await env.DB.prepare(
    `SELECT a.edicion AS edicion,
            COUNT(DISTINCT a.alumno_id) AS alumnos,
            (SELECT COUNT(*) FROM respuesta r WHERE r.edicion = a.edicion) AS respuestas
     FROM alumno a GROUP BY a.edicion ORDER BY a.edicion DESC`,
  ).all<{ edicion: string; alumnos: number; respuestas: number }>()
  return results ?? []
}
