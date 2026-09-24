import { Ejercicio } from '../components/Ejercicio'
import { Loading } from '../components/ui'
import { anioDecimal, fechaLarga, vecinoDe, type Era } from '../engine/lineaDeTiempo'
import { useLineaDeTiempo } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { chart, colors, radius, space } from '../theme'

// The history of AI as a clickable axis: four eras as bands, one dot per
// milestone, and a card with what happened, why it matters here and its source.
// "Los últimos años" zooms into 2012–today, where the dots pile up. The ← →
// buttons walk the milestones in order, so it can be driven live from a
// keyboard and read on a phone where the dots are small.

const COLOR_ERA: Record<string, string> = {
  reglas: chart.line[3],
  datos: chart.line[0],
  profundas: chart.line[2],
  generales: chart.line[1],
}
const VISTAS = {
  todo: { desde: 1948, hasta: 2028, paso: 10 },
  reciente: { desde: 2011.5, hasta: 2027, paso: 2 },
} as const
type Vista = keyof typeof VISTAS

const VB = { ancho: 760, alto: 150, izq: 16, der: 16, eje: 78 }

type Estado = { vista: Vista; hito: string }

export function LineaDeTiempo({ sesion = 1 }: { sesion?: number }) {
  const { data, meta, loading, error } = useLineaDeTiempo()
  const [st, patch, reset] = useExerciseState<Estado>('linea-de-tiempo', { vista: 'todo', hito: 'dartmouth-1956' })

  if (loading) return <Loading what="la línea de tiempo" />
  if (error || !data || data.hitos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudo cargar la línea de tiempo.</div>

  const { eras, hitos } = data
  const vista = VISTAS[st.vista]
  const actual = hitos.find((h) => h.id === st.hito) ?? hitos[0]
  const era = eras.find((e) => e.id === actual.era)
  const sx = (a: number) => VB.izq + ((a - vista.desde) / (vista.hasta - vista.desde)) * (VB.ancho - VB.izq - VB.der)
  const visibles = hitos.filter((h) => {
    const a = anioDecimal(h.fecha)
    return a >= vista.desde && a < vista.hasta
  })

  // Walking out of the zoomed view switches back to the full one.
  const ir = (paso: number) => {
    const h = vecinoDe(hitos, actual.id, paso)
    if (!h) return
    const fuera = anioDecimal(h.fecha) < VISTAS.reciente.desde
    patch({ hito: h.id, ...(st.vista === 'reciente' && fuera ? { vista: 'todo' as Vista } : {}) })
  }
  const i = hitos.findIndex((h) => h.id === actual.id)

  const boton = (activo: boolean): React.CSSProperties => ({
    borderColor: activo ? colors.accent.orange : colors.border,
    color: activo ? colors.accent.orange : colors.textSecondary,
  })

  const ticks: number[] = []
  for (let a = Math.ceil(vista.desde / vista.paso) * vista.paso; a < vista.hasta; a += vista.paso) ticks.push(a)

  return (
    <Ejercicio
      titulo="Setenta y cinco años de inteligencia artificial"
      sesion={sesion}
      intro="Cada punto es un hito, con su fuente. Tocá uno, o recorrelos en orden con las flechas. El color marca la era: reglas escritas a mano, aprender de datos, redes profundas y modelos generales."
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap', marginBottom: space.md }}>
        <button type="button" className="tbtn" style={boton(st.vista === 'todo')} onClick={() => patch({ vista: 'todo' })}>
          1950 a hoy
        </button>
        <button
          type="button"
          className="tbtn"
          style={boton(st.vista === 'reciente')}
          onClick={() =>
            patch({
              vista: 'reciente',
              ...(anioDecimal(actual.fecha) < VISTAS.reciente.desde ? { hito: 'alexnet-2012' } : {}),
            })
          }
        >
          Los últimos años
        </button>
      </div>

      <svg
        viewBox={`0 0 ${VB.ancho} ${VB.alto}`}
        style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'manipulation' }}
        role="img"
        aria-label="Línea de tiempo de la inteligencia artificial, con un punto por hito"
      >
        {eras.map((e: Era, n) => {
          const a = Math.max(e.desde, vista.desde)
          const b = Math.min(n === eras.length - 1 ? vista.hasta : e.hasta, vista.hasta)
          if (b <= a) return null
          return (
            <rect
              key={e.id}
              x={sx(a)}
              y={10}
              width={sx(b) - sx(a)}
              height={VB.alto - 20}
              fill={COLOR_ERA[e.id]}
              fillOpacity={0.08}
            />
          )
        })}
        <line x1={VB.izq} x2={VB.ancho - VB.der} y1={VB.eje} y2={VB.eje} stroke={chart.tick} strokeWidth={2} />
        {ticks.map((a) => (
          <g key={a}>
            <line x1={sx(a)} x2={sx(a)} y1={VB.eje - 5} y2={VB.eje + 5} stroke={chart.tick} strokeWidth={2} />
            <text x={sx(a)} y={VB.eje + 30} textAnchor="middle" fontSize={17} fill={chart.tick}>
              {a}
            </text>
          </g>
        ))}
        {visibles.map((h) => {
          const cx = sx(anioDecimal(h.fecha))
          const sel = h.id === actual.id
          return (
            <g
              key={h.id}
              style={{ cursor: 'pointer' }}
              tabIndex={0}
              onClick={() => patch({ hito: h.id })}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault()
                  patch({ hito: h.id })
                }
              }}
            >
              <title>{`${fechaLarga(h.fecha)} · ${h.titulo}`}</title>
              <circle cx={cx} cy={VB.eje} r={16} fill="transparent" />
              <circle
                cx={cx}
                cy={VB.eje}
                r={sel ? 10 : 6.5}
                fill={COLOR_ERA[h.era]}
                style={{ stroke: sel ? colors.textPrimary : colors.bg }}
                strokeWidth={sel ? 3 : 1.5}
              />
            </g>
          )
        })}
        {(() => {
          const cx = sx(anioDecimal(actual.fecha))
          if (cx < VB.izq || cx > VB.ancho - VB.der) return null
          const anchor = cx > VB.ancho * 0.75 ? 'end' : cx < VB.ancho * 0.25 ? 'start' : 'middle'
          return (
            <text
              x={cx}
              y={VB.eje - 22}
              textAnchor={anchor}
              fontSize={18}
              fontWeight={700}
              strokeWidth={4}
              style={{ fill: colors.textPrimary, stroke: colors.bg, paintOrder: 'stroke', pointerEvents: 'none' }}
            >
              {actual.fecha.slice(0, 4)}
            </text>
          )
        })()}
      </svg>

      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderLeft: `4px solid ${COLOR_ERA[actual.era]}`,
          borderRadius: radius.md,
          padding: space.lg,
          marginTop: space.md,
          background: colors.bg,
        }}
        aria-live="polite"
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--pd-font-mono)',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.textDim,
          }}
        >
          {fechaLarga(actual.fecha)} · {era?.nombre}
        </p>
        <h4 style={{ margin: `${space.xs}px 0 ${space.sm}px`, fontSize: 20 }}>{actual.titulo}</h4>
        <p style={{ margin: `0 0 ${space.sm}px` }}>{actual.que}</p>
        <p style={{ margin: `0 0 ${space.sm}px`, color: colors.textSecondary }}>
          <strong>Por qué importa:</strong> {actual.porque}
        </p>
        <p style={{ margin: 0, fontSize: 13 }}>
          Fuente:{' '}
          <a href={actual.fuente.url} target="_blank" rel="noopener">
            {actual.fuente.titulo}
          </a>
        </p>
      </div>

      <div style={{ display: 'flex', gap: space.sm, alignItems: 'center', marginTop: space.md }}>
        <button type="button" className="tbtn" onClick={() => ir(-1)} disabled={i <= 0} aria-label="Hito anterior">
          ← Anterior
        </button>
        <button
          type="button"
          className="tbtn"
          onClick={() => ir(1)}
          disabled={i >= hitos.length - 1}
          aria-label="Hito siguiente"
        >
          Siguiente →
        </button>
        <span style={{ color: colors.textDim, fontSize: 13, fontFamily: 'var(--pd-font-mono)' }}>
          {i + 1} / {hitos.length}
        </span>
      </div>

      <div style={{ display: 'flex', gap: space.lg, flexWrap: 'wrap', fontSize: 13, color: colors.textMuted, marginTop: space.md }}>
        {eras.map((e) => (
          <span key={e.id}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: radius.pill,
                background: COLOR_ERA[e.id],
                verticalAlign: 'middle',
              }}
            />{' '}
            {e.nombre}
          </span>
        ))}
      </div>

      <p style={{ color: colors.textDim, fontSize: 12, margin: `${space.md}px 0 0` }}>fuente: {meta.source}</p>
    </Ejercicio>
  )
}
