import { describe, expect, it } from 'vitest'
import {
  applyTemperature,
  argmax,
  entropyBits,
  makeRng,
  normalize,
  sampleFrom,
  topK,
  topP,
} from './sampling'

const DIST = [
  { token: ' psi', p: 0.5 },
  { token: ' bar', p: 0.3 },
  { token: ' metros', p: 0.15 },
  { token: ' vacas', p: 0.05 },
]

const sum = (d: { p: number }[]) => d.reduce((a, o) => a + o.p, 0)

describe('normalize', () => {
  it('makes probabilities sum to 1', () => {
    const n = normalize([{ token: 'a', p: 2 }, { token: 'b', p: 2 }])
    expect(sum(n)).toBeCloseTo(1)
    expect(n[0].p).toBeCloseTo(0.5)
  })
})

describe('applyTemperature', () => {
  it('T=1 returns the reference distribution', () => {
    const out = applyTemperature(DIST, 1)
    out.forEach((o, i) => expect(o.p).toBeCloseTo(DIST[i].p, 6))
  })

  it('T→0 collapses onto the argmax', () => {
    const out = applyTemperature(DIST, 0)
    expect(out.find((o) => o.token === ' psi')!.p).toBe(1)
    expect(sum(out)).toBeCloseTo(1)
  })

  it('high T flattens (entropy increases), low T sharpens', () => {
    const e1 = entropyBits(applyTemperature(DIST, 1))
    const eHot = entropyBits(applyTemperature(DIST, 2))
    const eCold = entropyBits(applyTemperature(DIST, 0.3))
    expect(eHot).toBeGreaterThan(e1)
    expect(eCold).toBeLessThan(e1)
  })

  it('always sums to 1', () => {
    for (const T of [0.1, 0.5, 1, 1.5, 2]) {
      expect(sum(applyTemperature(DIST, T))).toBeCloseTo(1)
    }
  })
})

describe('topK / topP', () => {
  it('topK keeps the k best, renormalized', () => {
    const out = topK(DIST, 2)
    expect(out.map((o) => o.token)).toEqual([' psi', ' bar'])
    expect(sum(out)).toBeCloseTo(1)
    expect(out[0].p).toBeCloseTo(0.5 / 0.8)
  })

  it('topP keeps the minimal prefix reaching cumulative p', () => {
    const out = topP(DIST, 0.75)
    expect(out.map((o) => o.token)).toEqual([' psi', ' bar'])
  })

  it('topP with p=1 keeps everything', () => {
    expect(topP(DIST, 1)).toHaveLength(4)
  })
})

describe('sampleFrom / makeRng', () => {
  it('is deterministic for a fixed seed', () => {
    const seq = (seed: number) => {
      const rng = makeRng(seed)
      return Array.from({ length: 10 }, () => sampleFrom(DIST, rng).token)
    }
    expect(seq(7)).toEqual(seq(7))
  })

  it('greedy sampling (T=0) always returns the argmax', () => {
    const cold = applyTemperature(DIST, 0)
    const rng = makeRng(123)
    for (let i = 0; i < 20; i++) {
      expect(sampleFrom(cold, rng).token).toBe(argmax(DIST).token)
    }
  })

  it('respects frequencies roughly at T=1', () => {
    const rng = makeRng(2024)
    let psi = 0
    const N = 2000
    for (let i = 0; i < N; i++) if (sampleFrom(DIST, rng).token === ' psi') psi++
    expect(psi / N).toBeGreaterThan(0.42)
    expect(psi / N).toBeLessThan(0.58)
  })
})
