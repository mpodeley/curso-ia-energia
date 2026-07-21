import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'curso-ia-energia:ej:'

function load<T extends object>(id: string, defaults: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + id)
    if (!raw) return defaults
    // Hydrate-with-defaults merge so schema changes never break saved state
    // (same trick as simulador-subastas-peru's state.ts).
    return { ...defaults, ...(JSON.parse(raw) as Partial<T>) }
  } catch {
    return defaults
  }
}

/**
 * Per-exercise persistent state: [state, patch, reset]. Persisted to
 * localStorage so attendees keep their progress between visits.
 */
export function useExerciseState<T extends object>(
  id: string,
  defaults: T,
): [T, (patch: Partial<T>) => void, () => void] {
  const [state, setState] = useState<T>(() => load(id, defaults))

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFIX + id, JSON.stringify(state))
    } catch {
      // storage full/blocked — exercise still works, just not persisted
    }
  }, [id, state])

  const patch = useCallback((p: Partial<T>) => setState((s) => ({ ...s, ...p })), [])

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(PREFIX + id)
    } catch {
      // ignore
    }
    setState(defaults)
    // defaults is intentionally captured from the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return [state, patch, reset]
}
