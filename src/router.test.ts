import { describe, expect, it } from 'vitest'
import { hrefFor, parseHash } from './router'

describe('parseHash', () => {
  it('routes home for empty/unknown hashes', () => {
    expect(parseHash('')).toEqual({ page: 'home' })
    expect(parseHash('#/')).toEqual({ page: 'home' })
    expect(parseHash('#/nada')).toEqual({ page: 'home' })
  })

  it('routes sessions 1..8 and rejects out-of-range', () => {
    expect(parseHash('#/sesion/1')).toEqual({ page: 'sesion', n: 1 })
    expect(parseHash('#/sesion/8/')).toEqual({ page: 'sesion', n: 8 })
    expect(parseHash('#/sesion/9')).toEqual({ page: 'home' })
    expect(parseHash('#/sesion/0')).toEqual({ page: 'home' })
    expect(parseHash('#/sesion/x')).toEqual({ page: 'home' })
  })

  it('routes recursos', () => {
    expect(parseHash('#/recursos')).toEqual({ page: 'recursos' })
  })

  it('hrefFor round-trips through parseHash', () => {
    const routes = [
      { page: 'home' },
      { page: 'sesion', n: 3 },
      { page: 'recursos' },
    ] as const
    for (const r of routes) expect(parseHash(hrefFor(r))).toEqual(r)
  })
})
