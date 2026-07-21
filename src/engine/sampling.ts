// Next-token sampling math for the NextTokenLab exercise. Framework-free and
// unit-tested (see sampling.test.ts). Distributions ship precomputed in
// public/data/next_token_dists.json as probabilities at T=1.

import type { NextTokenOption } from '../types'

const T_MIN = 0.01

export function normalize(dist: NextTokenOption[]): NextTokenOption[] {
  const total = dist.reduce((acc, o) => acc + o.p, 0)
  if (total <= 0) return dist.map((o) => ({ ...o, p: 1 / dist.length }))
  return dist.map((o) => ({ ...o, p: o.p / total }))
}

/**
 * Re-shape a T=1 probability distribution to temperature T:
 * p_i' ∝ p_i^(1/T). T→0 concentrates on the argmax (greedy), T=1 is the
 * reference distribution, T>1 flattens it.
 */
export function applyTemperature(dist: NextTokenOption[], T: number): NextTokenOption[] {
  const base = normalize(dist)
  if (T <= T_MIN) {
    const best = argmax(base)
    return base.map((o) => ({ ...o, p: o.token === best.token ? 1 : 0 }))
  }
  const powered = base.map((o) => ({ ...o, p: Math.pow(o.p, 1 / T) }))
  return normalize(powered)
}

export function argmax(dist: NextTokenOption[]): NextTokenOption {
  return dist.reduce((best, o) => (o.p > best.p ? o : best), dist[0])
}

/** Keep the k most probable options, renormalized. */
export function topK(dist: NextTokenOption[], k: number): NextTokenOption[] {
  const sorted = [...normalize(dist)].sort((a, b) => b.p - a.p)
  return normalize(sorted.slice(0, Math.max(1, k)))
}

/** Keep the smallest prefix whose cumulative probability reaches p, renormalized. */
export function topP(dist: NextTokenOption[], p: number): NextTokenOption[] {
  const sorted = [...normalize(dist)].sort((a, b) => b.p - a.p)
  const kept: NextTokenOption[] = []
  let cum = 0
  for (const o of sorted) {
    kept.push(o)
    cum += o.p
    if (cum >= p) break
  }
  return normalize(kept)
}

/** Shannon entropy in bits — used to show "sorpresa" next to the T slider. */
export function entropyBits(dist: NextTokenOption[]): number {
  return normalize(dist).reduce((acc, o) => (o.p > 0 ? acc - o.p * Math.log2(o.p) : acc), 0)
}

/**
 * Deterministic RNG (mulberry32) so live demos reproduce on screen-share:
 * same seed → same sampled sequence.
 */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function sampleFrom(dist: NextTokenOption[], rng: () => number): NextTokenOption {
  const norm = normalize(dist)
  const r = rng()
  let cum = 0
  for (const o of norm) {
    cum += o.p
    if (r < cum) return o
  }
  return norm[norm.length - 1]
}
