// Cola de reintentos en localStorage.
//
// Es lo que convierte "se cayó el Worker mientras veinte personas llenaban una
// encuesta de doce preguntas" en un cartel amarillo en vez de en trabajo
// perdido. Nada se descarta: lo que no se pudo mandar queda guardado en el
// navegador y se reintenta al montar, al volver la conexión, y después de
// cualquier envío exitoso.

import { enviarRespuesta, type EnvioRespuesta } from './api'

const CLAVE = 'curso-ia-energia:outbox'
const MAX = 50

export type Pendiente = EnvioRespuesta & { encolado: number }

function leer(): Pendiente[] {
  try {
    const raw = localStorage.getItem(CLAVE)
    if (!raw) return []
    const v = JSON.parse(raw)
    return Array.isArray(v) ? (v as Pendiente[]) : []
  } catch {
    return []
  }
}

function escribir(items: Pendiente[]): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items.slice(-MAX)))
  } catch {
    // Modo privado con storage lleno: no hay nada mejor que seguir. Perder la
    // cola es preferible a romper el formulario.
  }
}

export const pendientes = (): Pendiente[] => leer()
export const cuantosPendientes = (): number => leer().length

/** Una entrada por (tipo, ref): reencolar reemplaza, igual que hace el UPSERT
 *  del servidor. Si alguien corrige la misma respuesta tres veces sin conexión,
 *  se manda una sola vez, la última. */
export function encolar(r: EnvioRespuesta): void {
  const items = leer().filter((p) => !(p.tipo === r.tipo && p.ref === r.ref))
  items.push({ ...r, encolado: Date.now() })
  escribir(items)
}

export function descartar(tipo: string, ref: string): void {
  escribir(leer().filter((p) => !(p.tipo === tipo && p.ref === ref)))
}

/** Intenta vaciar la cola. Se detiene ante el primer error de red —si el
 *  servidor no está, insistir con los otros veinte solo suma latencia— pero
 *  descarta lo que el servidor rechaza por inválido, que nunca va a entrar. */
export async function vaciar(token: string): Promise<{ enviados: number; quedan: number }> {
  let enviados = 0
  for (const p of leer()) {
    const { encolado: _encolado, ...envio } = p
    const r = await enviarRespuesta(token, envio)
    if (r.ok) {
      descartar(p.tipo, p.ref)
      enviados++
      continue
    }
    if (r.error === 'payload' || r.error === 'pulso-cerrado') {
      // Nunca va a ser aceptado: sacarlo para que no bloquee la cola para siempre.
      descartar(p.tipo, p.ref)
      continue
    }
    break
  }
  return { enviados, quedan: cuantosPendientes() }
}
