import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { type Conversacion, type MensajeContexto, hechos, recortar } from './contexto'

const msg = (i: number, tokens: number, hecho?: string): MensajeContexto => ({
  i,
  rol: i % 2 === 0 ? 'usuario' : 'modelo',
  texto: `mensaje ${i}`,
  tokens,
  ...(hecho ? { hecho } : {}),
})

describe('recortar', () => {
  const conv = [msg(0, 50), msg(1, 30), msg(2, 40), msg(3, 20)]

  it('keeps everything when the window is big enough', () => {
    const r = recortar(conv, 1000)
    expect(r.dentro).toEqual([0, 1, 2, 3])
    expect(r.tokensDentro).toBe(140)
    expect(r.tokensFuera).toBe(0)
  })

  it('drops the oldest first, which is where instructions live', () => {
    expect(recortar(conv, 90).dentro).toEqual([1, 2, 3])
    expect(recortar(conv, 60).dentro).toEqual([2, 3])
    expect(recortar(conv, 20).dentro).toEqual([3])
  })

  it('keeps the last message even when it alone busts the budget', () => {
    expect(recortar(conv, 1).dentro).toEqual([3])
    expect(recortar(conv, 0).dentro).toEqual([3])
  })

  it('always yields a contiguous tail', () => {
    for (let limite = 0; limite <= 200; limite += 5) {
      const { dentro } = recortar(conv, limite)
      expect(dentro[dentro.length - 1]).toBe(3)
      for (let k = 1; k < dentro.length; k++) expect(dentro[k]).toBe(dentro[k - 1] + 1)
    }
  })

  it('never drops a message that already fit in a smaller window', () => {
    let previo: number[] = []
    for (let limite = 0; limite <= 200; limite += 5) {
      const { dentro } = recortar(conv, limite)
      for (const i of previo) expect(dentro).toContain(i)
      previo = dentro
    }
  })

  it('accounts for every token, in or out', () => {
    for (let limite = 0; limite <= 200; limite += 7) {
      const r = recortar(conv, limite)
      expect(r.tokensDentro + r.tokensFuera).toBe(140)
    }
  })
})

describe('hechos', () => {
  const conv = [msg(0, 50, 'la regla'), msg(1, 30), msg(2, 40, 'el dato'), msg(3, 20)]

  it('reports only the messages that carry one, and whether they survived', () => {
    expect(hechos(conv, recortar(conv, 1000)).map((h) => h.visible)).toEqual([true, true])
    expect(hechos(conv, recortar(conv, 90)).map((h) => h.visible)).toEqual([false, true])
    expect(hechos(conv, recortar(conv, 20)).map((h) => h.visible)).toEqual([false, false])
  })
})

// Guards the dataset itself: the exercise makes a specific promise in front of
// the room, and it only lands if the conversation has these shapes.
describe('contexto_conversacion.json', () => {
  const conv = JSON.parse(
    readFileSync('public/data/contexto_conversacion.json', 'utf-8'),
  ).data as Conversacion

  it('carries the token count of every message and a matching total', () => {
    expect(conv.mensajes.length).toBeGreaterThanOrEqual(10)
    for (const m of conv.mensajes) expect(m.tokens).toBeGreaterThan(0)
    expect(conv.mensajes.reduce((s, m) => s + m.tokens, 0)).toBe(conv.total)
  })

  it('opens with an instruction, because that is what falls off first', () => {
    expect(conv.mensajes[0].rol).toBe('usuario')
    expect(conv.mensajes[0].hecho).toBeTruthy()
  })

  it('has a window size that drops the rules and keeps every datum', () => {
    // The exercise opens here on purpose: the cleanest version of the lesson is
    // "the data is still there, the instruction is not".
    const r = recortar(conv.mensajes, 520)
    const h = hechos(conv.mensajes, r)
    expect(h[0].visible, 'la instrucción inicial debería haberse caído').toBe(false)
    expect(h.slice(1).every((x) => x.visible), 'los datos deberían seguir adentro').toBe(true)
  })

  it('can also lose data, so the failure is not only about instructions', () => {
    expect(hechos(conv.mensajes, recortar(conv.mensajes, 200)).every((h) => !h.visible)).toBe(true)
  })
})
