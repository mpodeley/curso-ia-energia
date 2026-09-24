import { useMemo, useRef } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading, Slider, Stat, StatRow } from '../components/ui'
import {
  aciertosDejandoUnoAfuera,
  coincidencias,
  enElPlano,
  kmeans,
  tablaCruzada,
  vecinos,
  votar,
  type Pozo,
  type Tipo,
} from '../engine/aprendizaje'
import { usePozosAprendizaje } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { chart, colors, radius, space } from '../theme'

// Supervised vs unsupervised on the same real wells. With labels, a new well is
// classified by its five nearest neighbours; without them, k-means paints the
// groups it finds and only afterwards the room compares them with the labels.
// Oil green and gas red-orange, as on a production chart.

const K_VECINOS = 5
const COLOR_TIPO: Record<Tipo, string> = { petrolifero: chart.line[2], gasifero: chart.line[1] }
const NOMBRE_TIPO: Record<Tipo, string> = { petrolifero: 'petrolífero', gasifero: 'gasífero' }
const COLOR_GRUPO = [chart.line[0], chart.line[3], chart.tick]
const GRIS = chart.tick

const VB = { ancho: 760, alto: 470, izq: 84, der: 44, arr: 20, aba: 66 }
const X_MAX = 5 // 10^5 m3/m3: every well of the set fits

type Modo = 'supervisado' | 'no-supervisado'
type Estado = {
  modo: Modo
  /** New well for the supervised half, in chart units: log10(RGP) and water cut. */
  nuevoX: number
  nuevoY: number
  grupos: 0 | 2 | 3
  comparar: boolean
}

const fmtRgp = (x: number) => {
  const v = 10 ** x
  return v >= 100 ? Math.round(v).toLocaleString('en-US') : v.toFixed(v < 10 ? 1 : 0)
}
const fmtPct = (y: number) => `${Math.round(y * 100)}%`

export function ConYSinEtiquetas({ sesion = 1 }: { sesion?: number }) {
  const { data: pozos, meta, loading, error } = usePozosAprendizaje()
  const [st, patch, reset] = useExerciseState<Estado>('con-y-sin-etiquetas', {
    modo: 'supervisado',
    nuevoX: 3,
    nuevoY: 0.5,
    grupos: 0,
    comparar: false,
  })
  const svgRef = useRef<SVGSVGElement>(null)

  const plano = useMemo(() => enElPlano(pozos ?? []), [pozos])
  const loo = useMemo(() => aciertosDejandoUnoAfuera(plano, K_VECINOS), [plano])
  const agrupamiento = useMemo(() => (st.grupos ? kmeans(plano, st.grupos) : null), [plano, st.grupos])

  if (loading) return <Loading what="los pozos" />
  if (error || !pozos || pozos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar los pozos.</div>

  const porId = new Map<string, Pozo>(pozos.map((p) => [p.id, p]))
  const sx = (x: number) => VB.izq + (Math.min(Math.max(x, 0), X_MAX) / X_MAX) * (VB.ancho - VB.izq - VB.der)
  const sy = (y: number) => VB.alto - VB.aba - y * (VB.alto - VB.arr - VB.aba)

  const nuevo = { x: st.nuevoX, y: st.nuevoY }
  const cercanos = st.modo === 'supervisado' ? vecinos(plano, nuevo, K_VECINOS) : []
  const voto = votar(cercanos)
  const cercanosIds = new Set(cercanos.map((c) => c.id))

  const tipos = plano.map((p) => p.tipo)
  const tabla = agrupamiento ? tablaCruzada(agrupamiento.grupos, tipos, st.grupos) : []
  const acuerdo = agrupamiento && st.grupos === 2 ? coincidencias(agrupamiento.grupos, tipos, 2) : null
  const grupoDe = new Map(plano.map((p, i) => [p.id, agrupamiento?.grupos[i]]))
  // With labels shown, a well whose declared type is not its group's majority
  // gets a ring in its own label colour: those are the ones worth asking about.
  const mayoria = tabla.map((f): Tipo => (f.gasifero > f.petrolifero ? 'gasifero' : 'petrolifero'))
  const discrepa = (id: string, tipo: Tipo) => {
    const g = grupoDe.get(id)
    return st.modo === 'no-supervisado' && st.comparar && g !== undefined && mayoria[g] !== tipo
  }

  const colorDe = (id: string, tipo: Tipo) => {
    if (st.modo === 'supervisado') return COLOR_TIPO[tipo]
    const g = grupoDe.get(id)
    return g === undefined ? GRIS : COLOR_GRUPO[g % COLOR_GRUPO.length]
  }

  // Click on the chart = drop the new well there (supervised half only).
  const soltar = (e: React.MouseEvent<SVGSVGElement>) => {
    if (st.modo !== 'supervisado' || !svgRef.current) return
    const ctm = svgRef.current.getScreenCTM()
    if (!ctm) return
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    const x = ((pt.x - VB.izq) / (VB.ancho - VB.izq - VB.der)) * X_MAX
    const y = (VB.alto - VB.aba - pt.y) / (VB.alto - VB.arr - VB.aba)
    if (x < 0 || x > X_MAX || y < 0 || y > 1) return
    patch({ nuevoX: Math.round(x * 100) / 100, nuevoY: Math.round(y * 100) / 100 })
  }

  const boton = (activo: boolean): React.CSSProperties => ({
    borderColor: activo ? colors.accent.orange : colors.border,
    color: activo ? colors.accent.orange : colors.textSecondary,
  })

  return (
    <Ejercicio
      titulo="Los mismos pozos, con etiquetas y sin etiquetas"
      sesion={sesion}
      intro={`Cada punto es un pozo activo de la cuenca Noroeste, con dos números de sus últimos doce meses: la relación gas-petróleo (RGP) y el corte de agua. Con etiquetas, la máquina aprende del tipo de pozo que declaró la operadora. Sin etiquetas, busca grupos por su cuenta.`}
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap', marginBottom: space.md }}>
        <button type="button" className="tbtn" style={boton(st.modo === 'supervisado')} onClick={() => patch({ modo: 'supervisado' })}>
          Con etiquetas (supervisado)
        </button>
        <button
          type="button"
          className="tbtn"
          style={boton(st.modo === 'no-supervisado')}
          onClick={() => patch({ modo: 'no-supervisado' })}
        >
          Sin etiquetas (no supervisado)
        </button>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB.ancho} ${VB.alto}`}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          touchAction: 'manipulation',
          cursor: st.modo === 'supervisado' ? 'crosshair' : 'default',
        }}
        role="img"
        aria-label="Pozos según su relación gas-petróleo, en escala logarítmica, y su corte de agua"
        onClick={soltar}
      >
        {/* Grid and axes: one line per decade of RGP, one per 25% of water. */}
        {Array.from({ length: X_MAX + 1 }, (_, d) => (
          <g key={`x${d}`}>
            <line x1={sx(d)} x2={sx(d)} y1={VB.arr} y2={VB.alto - VB.aba} stroke={chart.grid} />
            <text x={sx(d)} y={VB.alto - VB.aba + 26} textAnchor="middle" fontSize={19} fill={chart.tick}>
              {(10 ** d).toLocaleString('en-US')}
            </text>
          </g>
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((y) => (
          <g key={`y${y}`}>
            <line x1={VB.izq} x2={VB.ancho - VB.der} y1={sy(y)} y2={sy(y)} stroke={chart.grid} />
            <text x={VB.izq - 10} y={sy(y) + 6} textAnchor="end" fontSize={19} fill={chart.tick}>
              {fmtPct(y)}
            </text>
          </g>
        ))}
        <text x={(VB.izq + VB.ancho - VB.der) / 2} y={VB.alto - 8} textAnchor="middle" fontSize={19} fill={chart.tick}>
          Relación gas-petróleo, m³/m³ (escala logarítmica)
        </text>
        <text
          x={18}
          y={(VB.arr + VB.alto - VB.aba) / 2}
          textAnchor="middle"
          fontSize={19}
          fill={chart.tick}
          transform={`rotate(-90 18 ${(VB.arr + VB.alto - VB.aba) / 2})`}
        >
          Corte de agua
        </text>

        {/* Lines from the new well to its neighbours, under the dots. */}
        {st.modo === 'supervisado' &&
          cercanos.map((c) => (
            <line
              key={`l${c.id}`}
              x1={sx(nuevo.x)}
              y1={sy(nuevo.y)}
              x2={sx(c.x)}
              y2={sy(c.y)}
              stroke={COLOR_TIPO[c.tipo]}
              strokeWidth={2}
              strokeOpacity={0.6}
              style={{ pointerEvents: 'none' }}
            />
          ))}

        {plano.map((p) => {
          const pozo = porId.get(p.id)
          const destacado = cercanosIds.has(p.id)
          const raro = discrepa(p.id, p.tipo)
          const muestraTipo = st.modo === 'supervisado' || st.comparar
          return (
            <circle
              key={p.id}
              cx={sx(p.x)}
              cy={sy(p.y)}
              r={destacado || raro ? 9 : 7}
              fill={colorDe(p.id, p.tipo)}
              fillOpacity={st.modo === 'no-supervisado' && !st.grupos ? 0.45 : 0.85}
              stroke={raro ? COLOR_TIPO[p.tipo] : undefined}
              style={raro ? undefined : { stroke: destacado ? colors.textPrimary : colors.bg }}
              strokeWidth={raro ? 4 : destacado ? 2 : 1}
            >
              <title>
                {`${pozo?.sigla ?? p.id} · ${pozo?.area ?? ''} · RGP ${fmtRgp(p.x)} m³/m³ · agua ${fmtPct(p.y)}` +
                  (muestraTipo ? ` · ${NOMBRE_TIPO[p.tipo]}` : '')}
              </title>
            </circle>
          )
        })}

        {st.modo === 'supervisado' && (
          <g style={{ pointerEvents: 'none' }}>
            <circle
              cx={sx(nuevo.x)}
              cy={sy(nuevo.y)}
              r={12}
              style={{ fill: colors.bg }}
              stroke={COLOR_TIPO[voto.prediccion]}
              strokeWidth={4}
            />
            <text
              x={sx(nuevo.x)}
              y={sy(nuevo.y) - 20}
              textAnchor="middle"
              fontSize={17}
              fontWeight={700}
              strokeWidth={4}
              style={{ fill: colors.textPrimary, stroke: colors.bg, paintOrder: 'stroke' }}
            >
              {`pozo nuevo: ¿${NOMBRE_TIPO[voto.prediccion]}?`}
            </text>
          </g>
        )}
      </svg>

      <Leyenda modo={st.modo} grupos={st.grupos} comparar={st.comparar} />

      {st.modo === 'supervisado' ? (
        <>
          <p style={{ color: colors.textMuted, fontSize: 14, margin: `${space.md}px 0` }}>
            Tocá el gráfico para ubicar un pozo nuevo, o movelo con los controles.
          </p>
          <Slider
            label="RGP del pozo nuevo"
            value={st.nuevoX}
            min={0}
            max={X_MAX}
            step={0.05}
            onChange={(v) => patch({ nuevoX: v })}
            format={fmtRgp}
            unit="m³/m³"
          />
          <Slider
            label="Corte de agua del pozo nuevo"
            value={st.nuevoY}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => patch({ nuevoY: v })}
            format={fmtPct}
          />
          <StatRow>
            <Stat
              label="los 5 vecinos votan"
              value={NOMBRE_TIPO[voto.prediccion]}
              accent={COLOR_TIPO[voto.prediccion]}
              hint={`${voto.votos.petrolifero} petrolíferos, ${voto.votos.gasifero} gasíferos`}
            />
            <Stat
              label="aciertos tapando cada etiqueta"
              value={`${loo.aciertos} de ${loo.total}`}
              hint="Se tapa el tipo de cada pozo y se predice con los demás."
            />
          </StatRow>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap', margin: `${space.md}px 0` }}>
            <button type="button" className="tbtn" style={boton(st.grupos === 2)} onClick={() => patch({ grupos: 2 })}>
              Buscar 2 grupos
            </button>
            <button type="button" className="tbtn" style={boton(st.grupos === 3)} onClick={() => patch({ grupos: 3 })}>
              Buscar 3 grupos
            </button>
            <button
              type="button"
              className="tbtn"
              style={boton(st.comparar)}
              disabled={!st.grupos}
              onClick={() => patch({ comparar: !st.comparar })}
            >
              {st.comparar ? 'Ocultar las etiquetas' : 'Comparar con las etiquetas'}
            </button>
          </div>

          {!st.grupos && (
            <p style={{ color: colors.textMuted, fontSize: 14, margin: 0 }}>
              Sin etiquetas, los puntos son todos grises. Pedile a la máquina que busque grupos.
            </p>
          )}

          {agrupamiento && st.comparar && (
            <table style={{ borderCollapse: 'collapse', fontSize: 14, margin: `${space.sm}px 0` }}>
              <thead>
                <tr>
                  <th style={celda(true)}>Grupo</th>
                  <th style={celda(true)}>Petrolíferos</th>
                  <th style={celda(true)}>Gasíferos</th>
                </tr>
              </thead>
              <tbody>
                {tabla.map((fila, g) => (
                  <tr key={g}>
                    <td style={celda()}>
                      <span style={{ ...punto, background: COLOR_GRUPO[g % COLOR_GRUPO.length] }} /> {g + 1}
                    </td>
                    <td style={celda()}>{fila.petrolifero}</td>
                    <td style={celda()}>{fila.gasifero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {agrupamiento && (
            <StatRow>
              <Stat label="grupos" value={st.grupos} />
              <Stat label="vueltas hasta estabilizarse" value={agrupamiento.iteraciones} />
              {acuerdo && st.comparar && (
                <Stat
                  label="coinciden con la etiqueta"
                  value={`${acuerdo.coinciden} de ${acuerdo.total}`}
                  accent={colors.accent.orange}
                />
              )}
            </StatRow>
          )}
        </>
      )}

      <Solucion titulo="Qué hizo la máquina en cada caso">
        <p style={{ marginTop: 0 }}>
          Con etiquetas, alguien ya había hecho el trabajo de decir qué es cada pozo, y la máquina aprendió
          a repetir ese criterio en un pozo que no vio: eso es aprendizaje supervisado. El criterio que
          encontró es casi una línea vertical: la RGP sola separa los dos tipos, y el agua casi no pesa.
        </p>
        <p>
          Sin etiquetas, la máquina solo ve puntos y busca los que están cerca entre sí. Con dos grupos
          encuentra la misma división que declaró la operadora, sin haberla visto nunca: eso es
          aprendizaje no supervisado. Ponerle nombre a cada grupo sigue siendo trabajo de una persona.
        </p>
        <p>
          Los pozos que caen en el grupo equivocado son los interesantes: petrolíferos con RGP de pozo de
          gas. ¿Casquete de gas, una etiqueta vieja que nadie actualizó, un pozo que cambió con los años?
          Para responderlo hace falta conocer el yacimiento. Un detalle más: los grupos dependen de
          cómo se mide la distancia. Acá una década de RGP pesa lo mismo que todo el rango del agua; con
          otra escala, los grupos cambian.
        </p>
      </Solucion>

      <p style={{ color: colors.textDim, fontSize: 12, margin: `${space.md}px 0 0` }}>
        fuente: {meta.source} Datos hasta {meta.source_date}.
      </p>
    </Ejercicio>
  )
}

function Leyenda({ modo, grupos, comparar }: { modo: Modo; grupos: number; comparar: boolean }) {
  const items =
    modo === 'supervisado'
      ? [
          { color: COLOR_TIPO.petrolifero, texto: 'petrolífero (etiqueta declarada)' },
          { color: COLOR_TIPO.gasifero, texto: 'gasífero (etiqueta declarada)' },
        ]
      : grupos
        ? [
            ...Array.from({ length: grupos }, (_, g) => ({ color: COLOR_GRUPO[g], texto: `grupo ${g + 1}` })),
            ...(comparar
              ? [{ color: COLOR_TIPO.petrolifero, texto: 'con borde: su etiqueta no es la de la mayoría del grupo' }]
              : []),
          ]
        : [{ color: GRIS, texto: 'pozo sin etiqueta' }]
  return (
    <div style={{ display: 'flex', gap: space.lg, flexWrap: 'wrap', fontSize: 13, color: colors.textMuted, marginTop: space.sm }}>
      {items.map((i) => (
        <span key={i.texto}>
          <span style={{ ...punto, background: i.color }} /> {i.texto}
        </span>
      ))}
    </div>
  )
}

const punto: React.CSSProperties = {
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: radius.pill,
  verticalAlign: 'middle',
}

const celda = (encabezado = false): React.CSSProperties => ({
  padding: '4px 14px 4px 0',
  textAlign: 'left',
  fontWeight: encabezado ? 600 : 400,
  borderBottom: `1px solid ${colors.border}`,
})

