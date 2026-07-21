// Design tokens. Ported from simulador-subastas-peru (same export shape so
// ui.tsx ports mechanically) but values now resolve through podeley.ar's
// tokens.css identity layer: inline React styles are real CSS, so
// 'var(--pd-*)' strings work everywhere EXCEPT where the value leaves CSS —
// Recharts writes colors into SVG attributes and badge() appends alpha hex,
// so `accent`, `status` and `chart` stay literal hex, mirroring the LIGHT
// theme values in src/styles/tokens.css (this site is light-only).

export const colors = {
  bg: 'var(--pd-bg)',
  surface: 'var(--pd-surface)',
  surfaceAlt: 'var(--pd-surface-2)',
  border: 'var(--pd-border)',
  textPrimary: 'var(--pd-text)',
  textSecondary: 'var(--pd-text-muted)',
  textMuted: 'var(--pd-text-muted)',
  textDim: 'var(--pd-text-faint)',
  accent: {
    blue: '#1f6a9b', // --pd-blue-ink
    orange: '#c24b22', // --pd-orange-ink
    green: '#147a5f', // --pd-green-ink
    gold: '#8a6412', // --pd-gold-ink
    gray: '#6b7280', // --pd-text-faint (light)
  },
  status: {
    ok: '#147a5f',
    warn: '#8a6412',
    err: '#b3261e',
    muted: '#6b7280',
  },
} as const

// Chart-only palette (SVG attributes — var() does not resolve there).
// Lines/text use the -ink variants (legible on white), fills the base hues.
export const chart = {
  line: ['#1f6a9b', '#c24b22', '#147a5f', '#8a6412'],
  fill: ['#4EA8DE', '#FF7B54', '#43C59E', '#F2C14E'],
  grid: '#e8eaed', // --pd-border-soft (light)
  tick: '#6b7280', // --pd-text-faint (light)
} as const

export const radius = { sm: 6, md: 8, lg: 12, pill: 999 } as const

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 32 } as const

export const card: React.CSSProperties = {
  background: colors.surface,
  borderRadius: radius.lg,
  padding: space.xl,
  border: `1px solid ${colors.border}`,
}

export const sectionTitle: React.CSSProperties = {
  marginBottom: space.md,
  color: colors.textDim,
  fontFamily: 'var(--pd-font-mono)',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 1,
}

export const badge = (color: string): React.CSSProperties => ({
  background: color + '22', // hex only — do not pass var() strings
  color,
  padding: '2px 10px',
  borderRadius: radius.pill,
  fontSize: 11,
  fontWeight: 700,
})
