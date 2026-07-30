// Shared data types. Every dataset in public/data/ carries the metadata
// envelope written by scripts/build_data.py (same convention as the sibling
// repos: estado-red-gas / simulador-subastas-peru).

import type { Componente } from './engine/promptScore'

export type Envelope<T> = {
  generated_at: string | null
  source: string | null
  source_date: string | null
  data: T
}

export type Meta = {
  generated_at: string | null
  source: string | null
  source_date: string | null
}

export type FetchState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
  meta: Meta
}

// ---- exercise datasets ----

export type TokenizerExample = {
  id: string
  label: string
  texto: string
  tokens: string[]
  note?: string
}

export type NextTokenOption = { token: string; p: number }

export type NextTokenContext = {
  id: string
  contexto: string
  opciones: NextTokenOption[]
  note?: string
}

export type TerminoEmbebido = {
  id: string
  termino: string
  familia: string
  x: number
  y: number
  vecinos: { termino: string; sim: number }[]
  glosa?: string | null
}

export type RagChunk = { id: string; doc: string; seccion: string; texto: string }

export type RagPregunta = {
  id: string
  texto: string
  esperado: string
  ranking: { chunk: string; sim: number }[]
}

export type RagCorpus = { chunks: RagChunk[]; preguntas: RagPregunta[] }

export type PasoAgente = {
  pensamiento: string
  herramienta: 'bash' | 'python' | 'respuesta'
  entrada: string
  salida: string
  estado: 'ok' | 'error'
}

export type TrazaAgente = {
  objetivo: string
  modelo: string
  pasos: PasoAgente[]
}

export type PromptOpcion = {
  calidad: 'ninguna' | 'floja' | 'buena'
  etiqueta: string
  texto: string
  comentario: string
}

export type PromptSlot = {
  componente: Componente
  opciones: PromptOpcion[]
}

export type PuntoProduccion = { ym: string; gas: number; pet: number; agua: number }

export type Fluido = 'gas' | 'pet' | 'agua'

export type PozoDeclinacion = {
  id: string
  /** 'escuela' wells are generated from known parameters; 'real' ones carry
   *  everything the field does — compression, facilities, wellbore effects. */
  tipo: 'escuela' | 'real'
  sigla: string
  area: string
  formacion: string
  empresa: string
  /** The parameters the curve was generated from. Only on 'escuela' wells. */
  verdad: { qi: number; Di: number; b: number } | null
  nota: string
  serie: PuntoProduccion[]
}

export type PromptCaso = {
  id: string
  label: string
  situacion: string
  slots: PromptSlot[]
  modelo: string
  note?: string
}
