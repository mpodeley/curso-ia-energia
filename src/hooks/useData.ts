import { useEffect, useState } from 'react'
import type { Envelope, FetchState, NextTokenContext, TokenizerExample } from '../types'
import type { QuizPregunta } from '../engine/quiz'

/**
 * Loads a JSON file from ./data/ and unwraps the {generated_at, source,
 * source_date, data} envelope produced by scripts/build_data.py. Payloads
 * without an envelope are returned as-is. Ported from simulador-subastas-peru.
 */
export function useJson<T>(path: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
    meta: { generated_at: null, source: null, source_date: null },
  })

  useEffect(() => {
    let cancelled = false
    fetch(path, { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${path}`)
        return r.json()
      })
      .then((raw: unknown) => {
        if (cancelled) return
        if (raw && typeof raw === 'object' && 'data' in raw && 'generated_at' in raw) {
          const env = raw as Envelope<T>
          setState({
            data: env.data,
            loading: false,
            error: null,
            meta: {
              generated_at: env.generated_at ?? null,
              source: env.source ?? null,
              source_date: env.source_date ?? null,
            },
          })
        } else {
          setState({
            data: raw as T,
            loading: false,
            error: null,
            meta: { generated_at: null, source: null, source_date: null },
          })
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: err }))
      })
    return () => {
      cancelled = true
    }
  }, [path])

  return state
}

// One typed wrapper per dataset (paths are relative to base "./").
export const useTokenizerExamples = () => useJson<TokenizerExample[]>('./data/tokenizer_examples.json')
export const useNextTokenDists = () => useJson<NextTokenContext[]>('./data/next_token_dists.json')
export const useQuiz = (id: string) => useJson<QuizPregunta[]>(`./data/${id}.json`)
