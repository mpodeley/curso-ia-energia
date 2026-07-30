import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ajustar, arps, declinacionAnual, diasDelMes, errorRelativo, eur, r2, rmse, serieModelo } from './decline'

describe('diasDelMes', () => {
  it('knows the calendar, leap years included', () => {
    expect(diasDelMes('2021-02')).toBe(28)
    expect(diasDelMes('2020-02')).toBe(29)
    expect(diasDelMes('2024-02')).toBe(29)
    expect(diasDelMes('2019-01')).toBe(31)
    expect(diasDelMes('2019-04')).toBe(30)
    expect(diasDelMes('2019-12')).toBe(31)
  })
})

describe('arps', () => {
  it('starts at qi', () => {
    expect(arps(1000, 0.03, 0.5, 0)).toBe(1000)
  })

  it('collapses to the exponential when b = 0', () => {
    const qi = 1000
    const Di = 0.02
    for (const t of [1, 6, 24, 90]) {
      expect(arps(qi, Di, 0, t)).toBeCloseTo(qi * Math.exp(-Di * t), 6)
    }
  })

  it('collapses to the harmonic when b = 1', () => {
    const qi = 1000
    const Di = 0.02
    for (const t of [1, 6, 24, 90]) {
      expect(arps(qi, Di, 1, t)).toBeCloseTo(qi / (1 + Di * t), 6)
    }
  })

  it('decreases monotonically', () => {
    for (const b of [0, 0.3, 0.7, 1]) {
      const s = serieModelo(1000, 0.03, b, 60)
      for (let i = 1; i < s.length; i++) expect(s[i]).toBeLessThan(s[i - 1])
    }
  })

  it('declines more slowly the larger b is (fatter tail)', () => {
    const t = 60
    expect(arps(1000, 0.03, 1, t)).toBeGreaterThan(arps(1000, 0.03, 0.5, t))
    expect(arps(1000, 0.03, 0.5, t)).toBeGreaterThan(arps(1000, 0.03, 0, t))
  })
})

describe('eur', () => {
  it('matches the closed form for the exponential case', () => {
    const [qi, Di] = [1000, 0.02]
    expect(eur(qi, Di, 0, 120)).toBeCloseTo((qi / Di) * (1 - Math.exp(-Di * 120)), 4)
  })

  it('matches the closed form for the harmonic case', () => {
    const [qi, Di] = [1000, 0.02]
    expect(eur(qi, Di, 1, 120)).toBeCloseTo((qi / Di) * Math.log(1 + Di * 120), 4)
  })

  it('agrees with numeric integration of the hyperbolic curve', () => {
    const [qi, Di, b, meses] = [1000, 0.03, 0.6, 120]
    const paso = 0.001
    let integral = 0
    for (let t = 0; t < meses; t += paso) {
      integral += ((arps(qi, Di, b, t) + arps(qi, Di, b, t + paso)) / 2) * paso
    }
    expect(eur(qi, Di, b, meses)).toBeCloseTo(integral, 0)
  })

  it('grows with the horizon and is zero at zero', () => {
    expect(eur(1000, 0.02, 0.5, 0)).toBe(0)
    expect(eur(1000, 0.02, 0.5, 240)).toBeGreaterThan(eur(1000, 0.02, 0.5, 120))
  })
})

describe('rmse y r2', () => {
  const modelo = serieModelo(1000, 0.02, 0.5, 24)

  it('is zero when the model passes through every point', () => {
    expect(rmse(modelo, modelo)).toBeCloseTo(0, 10)
    expect(r2(modelo, modelo)).toBeCloseTo(1, 10)
  })

  it('ignores months with no report instead of counting them as zero', () => {
    const conHuecos = modelo.map((v, i) => (i % 5 === 0 ? null : v))
    expect(rmse(conHuecos, modelo)).toBeCloseTo(0, 10)
  })

  it('returns NaN when there is nothing to compare', () => {
    expect(rmse([null, null], [1, 2])).toBeNaN()
  })

  it('gives a negative r2 to a model worse than the flat average', () => {
    const observado = [100, 100, 100, 100, 100, 100].map((v, i) => v + (i % 2 ? 2 : -2))
    const malo = [10, 900, 10, 900, 10, 900]
    expect(r2(observado, malo)).toBeLessThan(0)
  })
})

describe('ajustar', () => {
  it('recovers the parameters of a synthetic curve', () => {
    const verdad = { qi: 5000, Di: 0.025, b: 0.6 }
    const serie = serieModelo(verdad.qi, verdad.Di, verdad.b, 72)
    const est = ajustar(serie)
    expect(est.qi).toBeCloseTo(verdad.qi, -2)
    expect(est.Di).toBeCloseTo(verdad.Di, 2)
    expect(est.b).toBeCloseTo(verdad.b, 1)
    expect(r2(serie, serieModelo(est.qi, est.Di, est.b, serie.length))).toBeGreaterThan(0.999)
  })

  it('is deterministic — a screen-shared run reproduces', () => {
    const serie = serieModelo(3000, 0.018, 0.3, 60)
    expect(ajustar(serie)).toEqual(ajustar(serie))
  })

  it('fits an exponential well with a b near zero', () => {
    const serie = serieModelo(2000, 0.03, 0, 60)
    expect(ajustar(serie).b).toBeLessThan(0.2)
  })

  it('cannot fit a plateau that falls off a cliff', () => {
    // Six years flat, then collapse — an intervention, not a decline.
    const serie = [...Array(72).fill(14000), ...[10400, 7242, 4668, 3755, 3064, 2902, 2522, 1829, 1680, 808, 639, 1005]]
    const est = ajustar(serie)
    expect(r2(serie, serieModelo(est.qi, est.Di, est.b, serie.length))).toBeLessThan(0.9)
  })
})

// Guards the well selection itself. If someone swaps a well for one that does
// not decline cleanly, the exercise stops teaching what it claims to teach.
describe('decline_wells.json', () => {
  type Pozo = { id: string; sigla: string; serie: { ym: string; gas: number }[] }
  const pozos = JSON.parse(readFileSync('public/data/decline_wells.json', 'utf-8')).data as Pozo[]

  /** Daily rate — Arps describes a rate, and the raw series is monthly volume. */
  const caudalDiario = (p: Pozo) => p.serie.map((d) => (d.gas > 0 ? d.gas / diasDelMes(d.ym) : null))

  /** Error relative to the average rate. r2 would be the wrong yardstick here:
   *  it scores the nearly flat wells badly for having little variance, even
   *  when the fitted curve sits right on the data. */
  const desajuste = (p: Pozo) => {
    const obs = caudalDiario(p)
    const { qi, Di, b } = ajustar(obs)
    return errorRelativo(obs, serieModelo(qi, Di, b, obs.length))
  }

  it('ships six wells with the full monthly series', () => {
    expect(pozos).toHaveLength(6)
    for (const p of pozos) expect(p.serie.length).toBeGreaterThanOrEqual(80)
  })

  it('fits the five well-behaved wells to within 8% of a typical month', () => {
    for (const p of pozos.filter((p) => p.id !== '34663')) {
      expect(desajuste(p), `${p.sigla} debería ajustar`).toBeLessThan(0.08)
    }
  })

  it('fails to fit the well that broke instead of declining', () => {
    const roto = pozos.find((p) => p.id === '34663')!
    expect(roto.sigla).toBe('YPF.St.SP.x-1')
    // Three times worse than the worst well-behaved one — the contrast is the lesson.
    expect(desajuste(roto), 'el contraejemplo no debería ajustar').toBeGreaterThan(0.15)
  })

  it('makes the sawtooth a calendar artifact, not reservoir behavior', () => {
    // February is always the low month in monthly VOLUME, never in daily RATE.
    const p = pozos.find((x) => x.id === '34585')!
    const feb = p.serie.filter((d) => d.ym.endsWith('-02'))
    for (const f of feb) {
      const i = p.serie.indexOf(f)
      const prev = p.serie[i - 1]
      if (!prev || prev.gas <= 0 || f.gas <= 0) continue
      expect(f.gas).toBeLessThan(prev.gas) // volume dips
      const tasaFeb = f.gas / diasDelMes(f.ym)
      const tasaPrev = prev.gas / diasDelMes(prev.ym)
      expect(tasaFeb / tasaPrev).toBeGreaterThan(0.93) // rate barely moves
    }
  })
})

describe('declinacionAnual', () => {
  it('converts a monthly rate into the yearly figure engineers quote', () => {
    expect(declinacionAnual(0)).toBe(0)
    expect(declinacionAnual(0.01)).toBeCloseTo(1 - Math.exp(-0.12), 6)
    expect(declinacionAnual(0.05)).toBeGreaterThan(declinacionAnual(0.02))
  })
})
