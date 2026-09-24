import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Stat, StatRow } from '../components/ui'
import { conUnidad, formatoGrande } from '../engine/autosupervisado'
import {
  anioDecimal,
  decadas,
  dominios,
  factor,
  formatoFlop,
  porDominio,
  ubicarEtiquetas,
  type ModeloEscala,
} from '../engine/escala'
import { useEscala } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { chart, colors, radius, space } from '../theme'

type LabState = { dominio: string; seleccionado: string }

// Hand-rolled SVG, same reasons as EmbeddingScatter in charts.tsx: a log axis,
// labels that must not collide, and reliable per-point clicks.
const VB = { ancho: 680, alto: 420, izq: 70, der: 18, arr: 18, abj: 44 }
const FUENTE_ETIQUETA = 15
const ANCHO_LETRA = 8.2 // rough advance of a 15px label glyph, for placement only
const TENDENCIA = 'https://epoch.ai/trends'

export function EscalaDeLosModelos({ sesion = 2 }: { sesion?: number }) {
  const { data: filas, meta, loading, error } = useEscala()
  const [state, patch, reset] = useExerciseState<LabState>('escala-modelos', { dominio: 'todos', seleccionado: '' })

  if (loading) return <Loading what="los modelos de Epoch AI" />
  if (error || !filas || filas.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar los datos de Epoch AI.</div>

  const doms = dominios(filas)
  const dominio = state.dominio === 'todos' || doms.includes(state.dominio) ? state.dominio : 'todos'
  const visibles = porDominio(filas, dominio)
  const sel = visibles.find((f) => f.modelo === state.seleccionado)

  // --- scales ---------------------------------------------------------------
  const anios = visibles.map((f) => anioDecimal(f.fecha))
  const x0 = Math.floor(Math.min(...anios) / 10) * 10
  // Two spare years on the right and a decade and a half of headroom on top:
  // the newest models crowd the top-right corner, and their labels need room.
  const x1 = Math.ceil(Math.max(...anios)) + 2
  const flops = visibles.map((f) => f.flop)
  const grid = decadas(Math.min(...flops), Math.max(...flops))
  const e0 = Math.log10(grid[0])
  const e1 = Math.log10(grid[grid.length - 1]) + 1.5
  const anchoPlot = VB.ancho - VB.izq - VB.der
  const altoPlot = VB.alto - VB.arr - VB.abj
  const sx = (anio: number) => VB.izq + ((anio - x0) / (x1 - x0 || 1)) * anchoPlot
  const sy = (flop: number) => VB.arr + altoPlot - ((Math.log10(flop) - e0) / (e1 - e0 || 1)) * altoPlot
  const cadaCuantas = Math.max(1, Math.ceil(grid.length / 8))
  const aniosTick: number[] = []
  for (let a = x0; a <= x1; a += 10) aniosTick.push(a)

  const destacados = visibles.filter((f) => f.destacado && f.etiqueta)
  const etiquetas = ubicarEtiquetas(
    destacados.map((f) => ({
      id: f.modelo,
      x: sx(anioDecimal(f.fecha)),
      y: sy(f.flop),
      ancho: (f.etiqueta ?? '').length * ANCHO_LETRA,
      alto: FUENTE_ETIQUETA,
    })),
    { x: VB.izq, y: VB.arr, ancho: anchoPlot, alto: altoPlot },
    10,
    [1, 3, 5, 7, 9, 12],
  )
  const etiquetaDe = new Map(etiquetas.map((e) => [e.id, e]))

  const especulativas = visibles.filter((f) => f.confianza === 'especulativa').length
  const desde = visibles.reduce((a, f) => (f.fecha < a ? f.fecha : a), visibles[0].fecha).slice(0, 4)
  const hasta = visibles.reduce((a, f) => (f.fecha > a ? f.fecha : a), visibles[0].fecha).slice(0, 4)

  // The story in the comment uses the full data set, whatever the filter.
  const lenet = filas.find((f) => f.destacado && f.etiqueta?.startsWith('LeNet'))
  const gpt4 = filas.find((f) => f.destacado && f.etiqueta === 'GPT-4')
  const especulativasTotal = filas.filter((f) => f.confianza === 'especulativa').length

  // Draw highlighted and selected dots last so nothing covers them.
  const orden = [...visibles].sort((a, b) => {
    const peso = (f: ModeloEscala) => (f.modelo === state.seleccionado ? 2 : f.destacado ? 1 : 0)
    return peso(a) - peso(b)
  })

  return (
    <Ejercicio
      titulo="Cuánto cómputo hizo falta para entrenar cada modelo"
      sesion={sesion}
      intro="Cada punto es un modelo de IA notable según Epoch AI, ubicado por su fecha y por el cómputo que usó su entrenamiento, en operaciones de punto flotante (FLOP). El eje vertical es logarítmico. Tocá un punto para ver sus datos."
      onReset={reset}
    >
      <div style={{ maxWidth: 340 }}>
        <Field label="Qué modelos mostrar">
          <Select
            value={dominio}
            options={[
              { value: 'todos', label: `Todos (${filas.length})` },
              ...doms.map((d) => ({ value: d, label: `${d} (${porDominio(filas, d).length})` })),
            ]}
            onChange={(v) => patch({ dominio: v, seleccionado: '' })}
          />
        </Field>
      </div>

      <div
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.sm,
        }}
      >
        <svg
          viewBox={`0 0 ${VB.ancho} ${VB.alto}`}
          style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'manipulation' }}
          role="img"
          aria-label="Cómputo de entrenamiento de modelos de IA notables según su fecha, en escala logarítmica"
        >
          {grid.map((g, i) => (
            <g key={g}>
              <line x1={VB.izq} x2={VB.ancho - VB.der} y1={sy(g)} y2={sy(g)} stroke={chart.grid} strokeWidth={1} />
              {i % cadaCuantas === 0 && (
                <text x={VB.izq - 8} y={sy(g) + 5} textAnchor="end" fontSize={14} fill={chart.tick}>
                  {formatoFlop(g)}
                </text>
              )}
            </g>
          ))}
          {aniosTick.map((a) => (
            <text key={a} x={sx(a)} y={VB.alto - VB.abj + 22} textAnchor="middle" fontSize={14} fill={chart.tick}>
              {a}
            </text>
          ))}
          <text x={VB.izq} y={VB.alto - 6} fontSize={13} fill={chart.tick}>
            año de publicación
          </text>

          {orden.map((f) => {
            const cx = sx(anioDecimal(f.fecha))
            const cy = sy(f.flop)
            const esSel = f.modelo === state.seleccionado
            const color = f.destacado ? colors.accent.orange : chart.tick
            const elegir = () => patch({ seleccionado: esSel ? '' : f.modelo })
            return (
              <g
                key={f.modelo}
                style={{ cursor: 'pointer' }}
                onClick={elegir}
                tabIndex={f.destacado ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    elegir()
                  }
                }}
              >
                <title>{`${f.modelo} · ${f.organizacion} · ${f.fecha} · ${formatoFlop(f.flop)} FLOP · confianza ${f.confianza}`}</title>
                <circle cx={cx} cy={cy} r={9} fill="transparent" />
                <circle
                  cx={cx}
                  cy={cy}
                  r={esSel ? 7 : f.destacado ? 5.5 : 3.2}
                  fill={color}
                  fillOpacity={f.destacado || esSel ? 0.95 : 0.35}
                  stroke={esSel ? '#16181d' : 'none'}
                  strokeWidth={esSel ? 2.5 : 0}
                />
              </g>
            )
          })}

          {destacados.map((f) => {
            const e = etiquetaDe.get(f.modelo)
            if (!e?.guia) return null
            return (
              <line
                key={`g-${f.modelo}`}
                x1={e.guia.x1}
                y1={e.guia.y1}
                x2={e.guia.x2}
                y2={e.guia.y2}
                stroke={colors.accent.orange}
                strokeWidth={1.2}
                strokeOpacity={0.7}
                style={{ pointerEvents: 'none' }}
              />
            )
          })}
          {destacados.map((f) => {
            const e = etiquetaDe.get(f.modelo)
            if (!e) return null
            return (
              <text
                key={`t-${f.modelo}`}
                x={e.tx}
                y={e.ty}
                textAnchor={e.anchor}
                fontSize={FUENTE_ETIQUETA}
                fontWeight={600}
                fill="#16181d"
                stroke="#ffffff"
                strokeWidth={4}
                style={{ pointerEvents: 'none', paintOrder: 'stroke' }}
              >
                {f.etiqueta}
              </text>
            )
          })}
        </svg>
      </div>

      {sel && (
        <div
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: space.md,
            marginTop: space.md,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <strong>{sel.modelo}</strong> · {sel.organizacion}
          <br />
          {sel.fecha} · {formatoFlop(sel.flop)} FLOP
          {sel.parametros ? ` · ${conUnidad(sel.parametros, 'parámetros')}` : ''} · {sel.dominio}
          <br />
          <span style={{ color: colors.textDim }}>Confianza de Epoch en el cómputo: {sel.confianza}</span>
        </div>
      )}

      <div style={{ marginTop: space.md }}>
        <StatRow>
          <Stat label="modelos en el gráfico" value={visibles.length} />
          <Stat label="años" value={`${desde}–${hasta}`} />
          <Stat label="estimaciones especulativas" value={especulativas} accent={colors.accent.gold} />
        </StatRow>
      </div>

      <p style={{ color: colors.textMuted, fontSize: 14, margin: `${space.md}px 0 0` }}>
        Según Epoch AI, desde 2010 el cómputo para entrenar modelos notables creció 4.5 veces por año.{' '}
        <a href={TENDENCIA} target="_blank" rel="noopener">
          Ver la tendencia
        </a>
      </p>

      <Solucion titulo="Qué se lee en este gráfico">
        <p style={{ margin: 0 }}>
          El eje vertical es logarítmico: cada línea horizontal multiplica por 10 a la de abajo.
          {lenet && gpt4 && (
            <>
              {' '}
              LeNet, en {lenet.fecha.slice(0, 4)}, usó unas {formatoFlop(lenet.flop)} operaciones; GPT-4, en{' '}
              {gpt4.fecha.slice(0, 4)}, unas {formatoFlop(gpt4.flop)}. Son unos {formatoGrande(factor(lenet, gpt4))}{' '}
              de veces más.
            </>
          )}{' '}
          Ese crecimiento, sumado a la enorme cantidad de texto que se puede usar sin etiquetar, es lo que hizo
          posibles los modelos de propósito general. Las cifras son estimaciones de Epoch AI y cada una trae su nivel de
          confianza: {especulativasTotal} de los {filas.length} modelos tienen una estimación especulativa.
        </p>
      </Solucion>

      <div style={{ marginTop: space.md, fontSize: 12, color: colors.textDim }}>fuente: {meta.source}</div>
    </Ejercicio>
  )
}
