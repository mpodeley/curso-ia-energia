// Pre-session material: short videos, tools and readings, each with a line on
// what to look for. Rendered from src/content/recursos.ts, where every link
// carries the date it was last checked.
import { RECURSOS, VERIFICADO, type Recurso } from '../content/recursos'
import { colors, radius, space } from '../theme'

const ETIQUETA: Record<Recurso['tipo'], string> = {
  video: 'video',
  lectura: 'lectura',
  herramienta: 'herramienta',
}

const COLOR: Record<Recurso['tipo'], string> = {
  video: colors.accent.blue,
  lectura: colors.accent.green,
  herramienta: colors.accent.orange,
}

export function ListaRecursos({ items, titulo }: { items: Recurso[]; titulo?: string }) {
  if (items.length === 0) return null
  return (
    <div style={{ margin: `${space.lg}px 0` }}>
      {titulo && (
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
          {titulo}
        </div>
      )}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((r) => (
          <li
            key={r.url}
            style={{
              border: `1px solid ${colors.border}`,
              borderLeft: `3px solid ${COLOR[r.tipo]}`,
              borderRadius: radius.md,
              padding: space.md,
              marginBottom: space.sm,
              background: colors.surface,
            }}
          >
            <div style={{ display: 'flex', gap: space.sm, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--pd-font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  color: COLOR[r.tipo],
                }}
              >
                {ETIQUETA[r.tipo]}
                {r.duracion ? ` · ${r.duracion}` : ''}
                {r.idioma === 'en' ? ' · en inglés' : ''}
              </span>
            </div>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 600, fontSize: 'var(--pd-fs-sm)', display: 'inline-block', marginTop: 2 }}
            >
              {r.titulo}
            </a>
            <span style={{ color: colors.textDim, fontSize: 13 }}> · {r.fuente}</span>
            <p style={{ margin: `${space.xs}px 0 0`, fontSize: 13, color: colors.textSecondary, maxWidth: '68ch' }}>
              {r.porque}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Drop-in for a session page: the material for that session, or nothing. */
export function Recursos({ sesion }: { sesion: number }) {
  const items = RECURSOS[sesion] ?? []
  if (items.length === 0) return null
  return (
    <>
      <ListaRecursos items={items} titulo={`Material previo · sesión ${sesion}`} />
      <p style={{ fontSize: 12, color: colors.textDim, fontFamily: 'var(--pd-font-mono)', margin: 0 }}>
        enlaces verificados el {VERIFICADO}
      </p>
    </>
  )
}
