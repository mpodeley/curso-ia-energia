// Guards over the tokenizer dataset. The exercise itself has no engine — the
// splits come precomputed from build_data.py — but two of them are promises
// made elsewhere, out loud, and nothing else pins them.
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { TokenizerExample } from '../types'

const ejemplos = JSON.parse(readFileSync('public/data/tokenizer_examples.json', 'utf-8'))
  .data as TokenizerExample[]

const porId = (id: string) => ejemplos.find((e) => e.id === id)!

describe('tokenizer_examples.json', () => {
  it('keeps "perforación direccional" at exactly six tokens', () => {
    // The s2-cuantos-tokens pulso offers "6" as its correct option and the
    // session-2 deck repeats the number. Editing this example breaks both.
    const e = porId('direccional')
    expect(e.texto).toBe('perforación direccional')
    expect(e.tokens).toHaveLength(6)
  })

  it('keeps the Spanish sentence costlier than its English twin', () => {
    // Both examples' notes claim Spanish spends more tokens than English for
    // the same content. Rewriting either text could silently invert that.
    expect(porId('produccion').tokens.length).toBeGreaterThan(porId('ingles').tokens.length)
  })

  it('joins each example back into its own text', () => {
    for (const e of ejemplos) {
      expect(e.tokens.join(''), e.id).toBe(e.texto)
    }
  })
})
