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
  ResponsiveContainer,
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

export { colors as themeColors }
