// Common wrapper for interactive exercises embedded in session MDX pages.
// Each exercise component self-wraps in <Ejercicio> and passes its own reset.
import type { ReactNode } from 'react'
import { colors, radius, space } from '../theme'

export function Ejercicio({
  titulo,
  sesion,
  intro,
  onReset,
  done,
  children,
}: {
  titulo: string
  sesion: number
  intro?: string
  onReset?: () => void
  done?: boolean
  children: ReactNode
}) {
  return (
    <section
      style={{
        background: colors.surfaceAlt,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: space.xl,
        margin: `${space.xxl}px 0`,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--pd-font-mono)',
          fontSize: 'var(--pd-fs-cap)',
          letterSpacing: '.13em',
          textTransform: 'uppercase',
          color: colors.textDim,
          marginBottom: space.sm,
        }}
      >
        Ejercicio · Sesión {sesion}
        {done && <span style={{ color: colors.status.ok, marginLeft: 10 }}>✓ completado</span>}
      </div>
      <h3
        style={{
          fontFamily: 'var(--pd-font-display)',
          fontWeight: 500,
          fontSize: 'var(--pd-fs-h3)',
          margin: `0 0 ${space.sm}px`,
          color: colors.textPrimary,
        }}
      >
        {titulo}
      </h3>
      {intro && (
        <p style={{ color: colors.textMuted, fontSize: 'var(--pd-fs-sm)', margin: `0 0 ${space.lg}px`, maxWidth: '60ch' }}>
          {intro}
        </p>
      )}
      {children}
      {onReset && (
        <div style={{ marginTop: space.lg }}>
          <button type="button" className="tbtn" onClick={onReset}>
            Reiniciar ejercicio
          </button>
        </div>
      )}
    </section>
  )
}

/** Collapsed-by-default solution/comment reveal, for use inside exercises. */
export function Solucion({ titulo = 'Ver comentario', children }: { titulo?: string; children: ReactNode }) {
  return (
    <details style={{ marginTop: space.md }}>
      <summary style={{ cursor: 'pointer', color: colors.textMuted, fontSize: 'var(--pd-fs-sm)', fontWeight: 600 }}>
        {titulo}
      </summary>
      <div style={{ marginTop: space.sm, color: colors.textSecondary, fontSize: 'var(--pd-fs-sm)' }}>{children}</div>
    </details>
  )
}
