import { describe, expect, it } from 'vitest'
import {
  LIMITES,
  normalizarNombre,
  slugNombre,
  validarNombre,
  validarPayload,
  validarRef,
  validarRespuesta,
} from './validate'

describe('normalizarNombre', () => {
  it('collapses whitespace and trims', () => {
    expect(normalizarNombre('  Ana   Rojas  ')).toBe('Ana Rojas')
    expect(normalizarNombre('Ana\n\tRojas')).toBe('Ana Rojas')
  })

  it('preserves the case the person typed', () => {
    expect(normalizarNombre('de la Fuente')).toBe('de la Fuente')
  })

  it('survives non-strings', () => {
    expect(normalizarNombre(undefined)).toBe('')
    expect(normalizarNombre(42)).toBe('')
  })
})

describe('slugNombre', () => {
  it('strips accents so the same person on two days is the same student', () => {
    expect(slugNombre('Rubén Gómez')).toBe('ruben-gomez')
    expect(slugNombre('Ruben Gomez')).toBe('ruben-gomez')
  })

  it('is case-insensitive', () => {
    expect(slugNombre('ANA ROJAS')).toBe(slugNombre('ana rojas'))
  })

  it('handles ñ and dieresis', () => {
    expect(slugNombre('Iñaki Peña')).toBe('inaki-pena')
    expect(slugNombre('Güemes')).toBe('guemes')
  })

  it('never ends in a dash, even when truncation lands on one', () => {
    const largo = slugNombre('a'.repeat(39) + ' bcdef')
    expect(largo.endsWith('-')).toBe(false)
    expect(largo.length).toBeLessThanOrEqual(40)
  })
})

describe('validarNombre', () => {
  it('accepts an ordinary name', () => {
    const r = validarNombre('  Ana  Rojas ')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.valor).toEqual({ nombre: 'Ana Rojas', alumnoId: 'ana-rojas' })
  })

  it('rejects empty and single-character names', () => {
    expect(validarNombre('').ok).toBe(false)
    expect(validarNombre('   ').ok).toBe(false)
    expect(validarNombre('A').ok).toBe(false)
  })

  it('rejects names longer than the cap', () => {
    expect(validarNombre('x'.repeat(LIMITES.nombre + 1)).ok).toBe(false)
    expect(validarNombre('x'.repeat(LIMITES.nombre)).ok).toBe(true)
  })

  // Emoji-only names slug to the empty string and would collide with each other
  // on the composite primary key, silently merging two students into one row.
  it('rejects names that carry no sluggable characters', () => {
    expect(validarNombre('🙂🙂').ok).toBe(false)
    expect(validarNombre('...').ok).toBe(false)
  })
})

describe('validarRef', () => {
  it('accepts the ref shapes the client actually sends', () => {
    for (const ref of ['relevamiento-s1', 's1-palabra-ia', 'quiz:quiz_s1', 'tokenizer-lab']) {
      expect(validarRef(ref).ok).toBe(true)
    }
  })

  it('rejects anything outside the boring alphabet', () => {
    expect(validarRef('con espacio').ok).toBe(false)
    expect(validarRef('acento-ñ').ok).toBe(false)
    expect(validarRef('../../etc').ok).toBe(false)
    expect(validarRef('').ok).toBe(false)
    expect(validarRef(null).ok).toBe(false)
  })
})

describe('validarPayload', () => {
  it('accepts the real payload shapes', () => {
    expect(validarPayload({ opcion: 2 }).ok).toBe(true)
    expect(validarPayload({ palabra: 'incertidumbre' }).ok).toBe(true)
    expect(validarPayload({ 'a1-area': 'Reservorios', 'c1-datos': [0, 2, 5] }).ok).toBe(true)
    expect(validarPayload({ correctas: 4, total: 6, respuestas: [0, 1, 1, 2] }).ok).toBe(true)
  })

  it('rejects a string longer than the text cap', () => {
    expect(validarPayload({ t: 'x'.repeat(LIMITES.texto + 1) }).ok).toBe(false)
    expect(validarPayload({ t: 'x'.repeat(LIMITES.texto) }).ok).toBe(true)
  })

  it('rejects too many keys, too many items and too much nesting', () => {
    const muchasClaves = Object.fromEntries(
      Array.from({ length: LIMITES.claves + 1 }, (_, i) => [`k${i}`, 1]),
    )
    expect(validarPayload(muchasClaves).ok).toBe(false)
    expect(validarPayload(Array.from({ length: LIMITES.items + 1 }, () => 1)).ok).toBe(false)
    expect(validarPayload({ a: { b: { c: { d: { e: 1 } } } } }).ok).toBe(false)
  })

  it('rejects NaN and Infinity, which JSON.stringify would silently turn into null', () => {
    expect(validarPayload({ n: NaN }).ok).toBe(false)
    expect(validarPayload({ n: Infinity }).ok).toBe(false)
  })

  it('measures bytes, not characters', () => {
    // Two fields, each exactly at the per-string character cap, so every
    // individual check passes. In ASCII that is 4 000 bytes and fits; in ñ it is
    // 8 000 and must not. This is the whole reason the cap is measured on the
    // encoded form.
    const dosCampos = (c: string) => ({ a: c.repeat(LIMITES.texto), b: c.repeat(LIMITES.texto) })
    expect(validarPayload(dosCampos('x')).ok).toBe(true)
    expect(validarPayload(dosCampos('ñ')).ok).toBe(false)
  })

  it('returns the serialized form it measured', () => {
    const r = validarPayload({ opcion: 3 })
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.valor).toBe('{"opcion":3}')
  })
})

describe('validarRespuesta', () => {
  const base = { tipo: 'pulso', ref: 's1-palabra-ia', sesion: 1, payload: { palabra: 'dudas' } }

  it('accepts a well-formed envelope', () => {
    const r = validarRespuesta(base)
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.valor.tipo).toBe('pulso')
      expect(r.valor.json).toBe('{"palabra":"dudas"}')
    }
  })

  it('rejects an unknown tipo', () => {
    expect(validarRespuesta({ ...base, tipo: 'otra-cosa' }).ok).toBe(false)
    expect(validarRespuesta({ ...base, tipo: undefined }).ok).toBe(false)
  })

  it('rejects a sesion outside 1..8', () => {
    for (const sesion of [0, 9, 1.5, '1', null]) {
      expect(validarRespuesta({ ...base, sesion }).ok).toBe(false)
    }
    for (const sesion of [1, 8]) {
      expect(validarRespuesta({ ...base, sesion }).ok).toBe(true)
    }
  })

  it('rejects a missing body', () => {
    expect(validarRespuesta(null).ok).toBe(false)
    expect(validarRespuesta('cadena').ok).toBe(false)
  })
})
