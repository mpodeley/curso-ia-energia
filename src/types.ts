// Shared data types. Every dataset in public/data/ carries the metadata
// envelope written by scripts/build_data.py (same convention as the sibling
// repos: estado-del-sistema / simulador-subastas-peru).

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
