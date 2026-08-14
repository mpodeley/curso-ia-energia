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
import type { PalabraUbicada } from '../engine/pulso'
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
 *
 * A second model curve is optional: session 1 puts the student's hand fit and
 * the machine's side by side, and the whole point lands visually or not at all.
 */
export type PuntoDeclinacion = {
  t: number
  ym: string
  observado: number | null
  modelo: number
  modelo2?: number
}

export function DeclineChart({
  data,
  log,
  unidad,
  etiquetas,
}: {
  data: PuntoDeclinacion[]
  log: boolean
  unidad: string
  /** Tooltip names for the two model curves. Defaults to "modelo". */
  etiquetas?: { modelo?: string; modelo2?: string }
}) {
  const haySegunda = data.some((d) => d.modelo2 !== undefined)
  const nombre = (key: string) =>
    key === 'observado'
      ? 'medido'
      : key === 'modelo2'
        ? (etiquetas?.modelo2 ?? 'modelo')
        : (etiquetas?.modelo ?? 'modelo')

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
            nombre(name),
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
        {haySegunda && (
          <Line
            dataKey="modelo2"
            stroke={chart.line[2]}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        )}
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

  // The data is centered PCA, so (0,0) in data coords is the mean of every
  // term: the tail all the vectors share.
  const ox = escalaX(0)
  const oy = escalaY(0)

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${VB.ancho} ${VB.alto}`}
        style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'manipulation' }}
        role="img"
        aria-label="Mapa de términos proyectado a dos dimensiones; cada término es un vector que sale del promedio de todos"
      >
        <rect x={0} y={0} width={VB.ancho} height={VB.alto} fill="none" stroke={chart.grid} rx={8} />
        {/* Faint spokes keep the vector reading without covering the dots; the
            selected term and its neighbors get a strong arrow further down. */}
        {puntos.map((p) => (
          <line
            key={`v-${p.id}`}
            x1={ox}
            y1={oy}
            x2={escalaX(p.x)}
            y2={escalaY(p.y)}
            stroke={colorPorFamilia[p.familia] ?? chart.fill[0]}
            strokeWidth={1.5}
            strokeOpacity={
              !seleccionado
                ? 0.2
                : p.id === seleccionado || (vecinos?.has(p.termino) ?? false)
                  ? 0
                  : 0.07
            }
          />
        ))}
        <circle cx={ox} cy={oy} r={3.5} fill="#16181d" fillOpacity={0.5} />
        <text
          x={ox + 9}
          y={oy - 7}
          fontSize={12}
          fill="#16181d"
          fillOpacity={0.5}
          stroke="#ffffff"
          strokeWidth={3}
          style={{ pointerEvents: 'none', paintOrder: 'stroke' }}
        >
          promedio
        </text>
        {orden.map((p) => {
          const cx = escalaX(p.x)
          const cy = escalaY(p.y)
          const esSel = p.id === seleccionado
          const esVecino = vecinos?.has(p.termino) ?? false
          const color = colorPorFamilia[p.familia] ?? chart.fill[0]
          const dx = cx - ox
          const dy = cy - oy
          const len = Math.hypot(dx, dy)
          // Arrow stops at the dot's edge so the head stays visible; a vector
          // too short to fit a head keeps only its ring and label.
          const conFlecha = (esSel || esVecino) && len > 26
          const ux = dx / (len || 1)
          const uy = dy / (len || 1)
          const punta = len - (esSel ? 11 : 9) - 3
          const px = ox + ux * punta
          const py = oy + uy * punta
          const bx = px - ux * 10
          const by = py - uy * 10
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
              {conFlecha && (
                <g style={{ pointerEvents: 'none' }}>
                  <line x1={ox} y1={oy} x2={bx} y2={by} stroke={color} strokeWidth={2.5} strokeOpacity={0.85} />
                  <polygon
                    points={`${px},${py} ${bx - uy * 4.5},${by + ux * 4.5} ${bx + uy * 4.5},${by - ux * 4.5}`}
                    fill={color}
                    fillOpacity={0.85}
                  />
                </g>
              )}
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

/**
 * Count bars for the live pulso panel. Two differences with ProbBarChart, both
 * because this one gets projected while it fills:
 *   - Keeps the order it is given (the options are a scale, not a ranking).
 *   - `grande` bumps every size for the proyección mode.
 */
export function ConteoBarChart({
  data,
  grande = false,
}: {
  data: { etiqueta: string; n: number }[]
  grande?: boolean
}) {
  const fuente = grande ? 20 : 13
  const alturaFila = grande ? 54 : 38
  const corte = grande ? 34 : 44
  return (
    <ChartBox height={data.length * alturaFila + 40}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, bottom: 4, left: 8 }}>
        <CartesianGrid stroke={chart.grid} horizontal={false} />
        {/* dataMax y no el dominio "lindo" de Recharts: con una sola respuesta,
            el default dibuja un eje que llega a 4 y la barra parece diminuta. */}
        <XAxis
          type="number"
          domain={[0, (max: number) => Math.max(1, max)]}
          allowDecimals={false}
          tick={{ ...axisTick, fontSize: fuente }}
          stroke={chart.grid}
        />
        <YAxis
          type="category"
          dataKey="etiqueta"
          width={grande ? 330 : 270}
          tick={{ ...axisTick, fontSize: fuente }}
          stroke={chart.grid}
          // Recortar en vez de dejar que envuelva a tres líneas y se pisen las
          // filas. El texto completo sigue estando en el tooltip.
          tickFormatter={(t: string) => (t.length > corte ? `${t.slice(0, corte - 1)}…` : t)}
        />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [String(v), 'respuestas']} />
        <Bar dataKey="n" isAnimationActive={false} radius={[0, 4, 4, 0]} fill={chart.fill[1]} />
      </BarChart>
    </ChartBox>
  )
}

/**
 * Word cloud for free-word pulsos. Hand-rolled SVG in the EmbeddingScatter idiom
 * rather than a library, because the positions have to come from
 * engine/pulso.ts `layoutNube` — deterministic row packing, so the words do not
 * jump around between two-second polls while the room is watching.
 */
export function NubeDePalabras({
  palabras,
  ancho = 860,
  alto = 320,
}: {
  palabras: PalabraUbicada[]
  ancho?: number
  alto?: number
}) {
  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} width="100%" style={{ display: 'block' }} role="img">
      {palabras.map((p) => (
        <text
          key={p.palabra}
          x={p.x}
          y={p.y}
          fontSize={p.size}
          fontFamily="var(--pd-font-display)"
          fontWeight={500}
          // Rota los cuatro acentos de la identidad por frecuencia, igual que
          // .three del brochure: el más dicho queda en naranja.
          fill={chart.line[Math.min(3, Math.max(0, 4 - Math.ceil((p.size / 64) * 4)))]}
        >
          {p.palabra}
        </text>
      ))}
    </svg>
  )
}
