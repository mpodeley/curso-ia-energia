// Survey validation and per-question aggregation for the instructor panel.
// Framework-free; the question text lives in src/content/encuesta-s1.ts.

import type { Pregunta } from '../content/encuesta-s1'

/** One answer, as the form holds it before sending. */
export type Valor = string | number | number[] | undefined
export type Valores = Record<string, Valor>

export function respondida(v: Valor): boolean {
  if (v === undefined) return false
  if (typeof v === 'string') return v.trim().length > 0
  if (typeof v === 'number') return true
  if (Array.isArray(v)) return v.length > 0
  return false
}

/** Which required questions are still empty. The form uses this to enable the
 *  send button and to point at what is missing — never to block typing. */
export function faltantes(preguntas: Pregunta[], valores: Valores): string[] {
  return preguntas.filter((p) => !p.opcional && !respondida(valores[p.id])).map((p) => p.id)
}

export function completadas(preguntas: Pregunta[], valores: Valores): number {
  return preguntas.filter((p) => respondida(valores[p.id])).length
}

/** Drops empty answers so a half-filled survey does not store a dozen empty
 *  strings, and trims text. What travels is what the person actually wrote. */
export function paraEnviar(preguntas: Pregunta[], valores: Valores): Record<string, Valor> {
  const out: Record<string, Valor> = {}
  for (const p of preguntas) {
    const v = valores[p.id]
    if (!respondida(v)) continue
    out[p.id] = typeof v === 'string' ? v.trim() : v
  }
  return out
}

export type RespuestaAlumno = { alumnoId: string; nombre: string; payload: unknown }

export type ResumenOpcion = { indice: number; texto: string; n: number }
export type ResumenTexto = { nombre: string; texto: string }

export type ResumenPregunta =
  | { pregunta: Pregunta; clase: 'opciones'; n: number; opciones: ResumenOpcion[] }
  | { pregunta: Pregunta; clase: 'texto'; n: number; textos: ResumenTexto[] }

/** Panel view: choice questions become counts, free text becomes a readable
 *  list with who wrote it. This is what feeds the session-5 shortlist. */
export function resumen(preguntas: Pregunta[], filas: RespuestaAlumno[]): ResumenPregunta[] {
  return preguntas.map((pregunta) => {
    const valores = filas
      .map((f) => ({ f, v: (f.payload as Valores | null)?.[pregunta.id] }))
      .filter((x) => x.v !== undefined && x.v !== null)

    if (pregunta.tipo === 'opcion-unica' || pregunta.tipo === 'opcion-multiple') {
      const ops = pregunta.opciones ?? []
      const cuenta = new Array<number>(ops.length).fill(0)
      let n = 0
      for (const { v } of valores) {
        const elegidas = Array.isArray(v) ? v : [v]
        let conto = false
        for (const i of elegidas) {
          if (typeof i === 'number' && i >= 0 && i < ops.length) {
            cuenta[i]++
            conto = true
          }
        }
        if (conto) n++
      }
      return {
        pregunta,
        clase: 'opciones',
        n,
        // Content order, not count order: these options are a scale.
        opciones: ops.map((texto, indice) => ({ indice, texto, n: cuenta[indice] })),
      }
    }

    const textos = valores
      .map(({ f, v }) => ({ nombre: f.nombre, texto: String(v).trim() }))
      .filter((t) => t.texto.length > 0)
    return { pregunta, clase: 'texto', n: textos.length, textos }
  })
}

/** How many people finished the whole survey, for the "N de M" line. */
export function completaron(preguntas: Pregunta[], filas: RespuestaAlumno[]): number {
  const obligatorias = preguntas.filter((p) => !p.opcional)
  return filas.filter((f) => {
    const v = (f.payload as Valores | null) ?? {}
    return obligatorias.every((p) => respondida(v[p.id]))
  }).length
}
