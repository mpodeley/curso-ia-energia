// Chart building blocks in the style ported from simulador-subastas-peru:
// ResponsiveContainer wrapper, static tooltips, no animations (screen-share
// friendly). Colors come from theme.chart — literal hex because Recharts
// writes them into SVG attributes where var() does not resolve.
import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chart, colors } from '../theme'
import type { NextTokenOption } from '../types'

export function ChartBox({ height = 260, children }: { height?: number; children: ReactNode }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>{children as React.ReactElement}</ResponsiveContainer>
    </div>
  )
}

export const tooltipStyle: React.CSSProperties = {
  background: '#ffffff',
  border: `1px solid ${chart.grid}`,
  borderRadius: 8,
  fontSize: 12,
  color: '#16181d',
}

export const axisTick = { fill: chart.tick, fontSize: 12 }

const pct = (v: number) => `${(v * 100).toFixed(1)} %`

/**
 * Horizontal probability bars for the next-token exercise. `highlight` marks
 * one token (e.g. the user's guess or the sampled token) in orange.
 */
export function ProbBarChart({
  data,
  highlight,
}: {
  data: NextTokenOption[]
  highlight?: string
}) {
  const sorted = [...data].sort((a, b) => b.p - a.p)
  return (
    <ChartBox height={sorted.length * 34 + 40}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 44, bottom: 4, left: 8 }}>
        <CartesianGrid stroke={chart.grid} horizontal={false} />
        <XAxis type="number" domain={[0, 1]} tickFormatter={pct} tick={axisTick} stroke={chart.grid} />
        <YAxis
          type="category"
          dataKey="token"
          width={110}
          tick={{ ...axisTick, fontFamily: 'var(--pd-font-mono)' }}
          stroke={chart.grid}
          tickFormatter={(t: string) => `«${t}»`}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number) => [pct(v), 'probabilidad']}
          labelFormatter={(t: string) => `token «${t}»`}
        />
        <Bar dataKey="p" isAnimationActive={false} radius={[0, 4, 4, 0]}>
          {sorted.map((o) => (
            <Cell key={o.token} fill={o.token === highlight ? chart.fill[1] : chart.fill[0]} />
          ))}
        </Bar>
      </BarChart>
    </ChartBox>
  )
}

/**
 * Decline curve: real monthly points as a scatter, the Arps model as a line.
 * The log toggle matters — a decline that is a curve on a linear axis becomes a
 * straight line in log, which is how the shape is actually read.
 */
export type PuntoDeclinacion = { t: number; ym: string; observado: number | null; modelo: number }

export function DeclineChart({
  data,
  log,
  unidad,
}: {
  data: PuntoDeclinacion[]
  log: boolean
  unidad: string
}) {
  // A log axis cannot show zero, and shut-in months legitimately report zero.
  const positivos = data.flatMap((d) => (d.observado && d.observado > 0 ? [d.observado] : []))
  const minimo = positivos.length ? Math.min(...positivos) : 1
  const dominio: [number | string, number | string] = log
    ? [Math.max(0.1, minimo * 0.6), 'auto']
    : [0, 'auto']

  const etiqueta = (t: number) => data.find((d) => d.t === t)?.ym ?? String(t)

  return (
    <ChartBox height={320}>
      <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
        <CartesianGrid stroke={chart.grid} />
        <XAxis
          dataKey="t"
          type="number"
          domain={['dataMin', 'dataMax']}
          tick={axisTick}
          stroke={chart.grid}
          tickFormatter={etiqueta}
          minTickGap={40}
        />
        <YAxis
          scale={log ? 'log' : 'linear'}
          domain={dominio}
          allowDataOverflow={log}
          tick={axisTick}
          stroke={chart.grid}
          width={62}
          tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(Math.round(v)))}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelFormatter={etiqueta}
          formatter={(v: number, name: string) => [
            v === null ? 'sin dato' : `${Math.round(v).toLocaleString('en-US')} ${unidad}`,
            name === 'observado' ? 'medido' : 'modelo',
          ]}
        />
        <Scatter dataKey="observado" fill={chart.fill[0]} isAnimationActive={false} />
        <Line
          dataKey="modelo"
          stroke={chart.line[1]}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartBox>
  )
}

/** Six chart hues plus two accents — enough for the term families without
 *  repeating a color, which would read as "these two belong together". */
export const PALETA_FAMILIAS = [
  chart.fill[0],
  chart.fill[1],
  chart.fill[2],
  chart.fill[3],
  '#9B7EDE',
  '#5BC0BE',
  '#B3261E',
] as const

export type PuntoTerminoChart = {
  id: string
  termino: string
  familia: string
  x: number
  y: number
}

const VB = { ancho: 1000, alto: 620, borde: 46 }

/**
 * The 2D term map. Hand-rolled SVG rather than Recharts: this plot has no axes
 * and needs reliable per-point clicks, and Recharts drops the click handler
 * when a custom shape is used. Plain SVG is smaller and does exactly this.
 *
 * The selected term and its true neighbors (computed in the full 384-dim
 * space) are labeled, so it is visible when a real neighbor lands far away on
 * the projection.
 */
export function EmbeddingScatter({
  puntos,
  colorPorFamilia,
  seleccionado,
  vecinos,
  onSelect,
}: {
  puntos: PuntoTerminoChart[]
  colorPorFamilia: Record<string, string>
  seleccionado?: string
  vecinos?: Set<string>
  onSelect?: (id: string) => void
}) {
  if (puntos.length === 0) return null

  const xs = puntos.map((p) => p.x)
  const ys = puntos.map((p) => p.y)
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)]
  const [y0, y1] = [Math.min(...ys), Math.max(...ys)]
  const escalaX = (x: number) =>
    VB.borde + ((x - x0) / (x1 - x0 || 1)) * (VB.ancho - 2 * VB.borde)
  // Flip y: SVG grows downward, the projection does not.
  const escalaY = (y: number) =>
    VB.alto - VB.borde - ((y - y0) / (y1 - y0 || 1)) * (VB.alto - 2 * VB.borde)

  // Draw the highlighted ones last so their labels are not covered.
  const orden = [...puntos].sort((a, b) => {
    const peso = (p: PuntoTerminoChart) =>
      p.id === seleccionado ? 2 : (vecinos?.has(p.termino) ?? false) ? 1 : 0
    return peso(a) - peso(b)
  })

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${VB.ancho} ${VB.alto}`}
        style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'manipulation' }}
        role="img"
        aria-label="Mapa de términos proyectado a dos dimensiones"
      >
        <rect x={0} y={0} width={VB.ancho} height={VB.alto} fill="none" stroke={chart.grid} rx={8} />
        {orden.map((p) => {
          const cx = escalaX(p.x)
          const cy = escalaY(p.y)
          const esSel = p.id === seleccionado
          const esVecino = vecinos?.has(p.termino) ?? false
          const color = colorPorFamilia[p.familia] ?? chart.fill[0]
          return (
            <g
              key={p.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect?.(p.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect?.(p.id)
                }
              }}
            >
              <title>{`${p.termino} · ${p.familia}`}</title>
              {/* Generous invisible hit area: a 7px dot is a hard target on a phone. */}
              <circle cx={cx} cy={cy} r={18} fill="transparent" />
              <circle
                cx={cx}
                cy={cy}
                r={esSel ? 11 : esVecino ? 9 : 7}
                fill={color}
                fillOpacity={esSel || esVecino || !seleccionado ? 0.95 : 0.3}
                stroke={esSel ? '#16181d' : esVecino ? color : 'none'}
                strokeWidth={esSel ? 3 : esVecino ? 3 : 0}
              />
              {(esSel || esVecino) && (
                <text
                  x={cx}
                  y={cy - (esSel ? 18 : 16)}
                  textAnchor="middle"
                  fontSize={17}
                  fill="#16181d"
                  fontWeight={esSel ? 700 : 500}
                  style={{ pointerEvents: 'none' }}
                >
                  {p.termino}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export { colors as themeColors }
