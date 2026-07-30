import { DeclineChart, type PuntoDeclinacion } from '../components/charts'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Slider, Stat, StatRow } from '../components/ui'
import {
  ajustar,
  declinacionAnual,
  diasDelMes,
  errorRelativo,
  eur,
  serieModelo,
} from '../engine/decline'
import { useDeclineWells } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'
import type { Fluido, PozoDeclinacion } from '../types'

type LabState = {
  pozo: string
  fluido: Fluido
  porDia: boolean
  log: boolean
  qi: number
  Di: number
  b: number
  /** Whether the sliders were ever touched for the current well. */
  tocado: boolean
}

const FLUIDOS: { value: Fluido; label: string; unidad: string }[] = [
  { value: 'gas', label: 'Gas', unidad: 'Mm³' },
  { value: 'pet', label: 'Petróleo', unidad: 'm³' },
  { value: 'agua', label: 'Agua', unidad: 'm³' },
]

const HORIZONTE_MESES = 360 // 30 años

/** Observed series in the chosen fluid and unit; months with no report are null
 *  rather than zero, so they neither drag the fit nor break the log axis. */
function observado(pozo: PozoDeclinacion, fluido: Fluido, porDia: boolean): (number | null)[] {
  return pozo.serie.map((d) => {
    const v = d[fluido]
    if (!(v > 0)) return null
    return porDia ? v / diasDelMes(d.ym) : v
  })
}

export function DeclineLab({ sesion = 4 }: { sesion?: number }) {
  const { data: pozos, meta, loading, error } = useDeclineWells()
  const [state, patch, reset] = useExerciseState<LabState>('decline-lab', {
    pozo: '',
    fluido: 'gas',
    porDia: false,
    log: false,
    qi: 0,
    Di: 0.01,
    b: 0.5,
    tocado: false,
  })

  if (loading) return <Loading what="las series de producción" />
  if (error || !pozos || pozos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar los pozos.</div>

  const pozo = pozos.find((p) => p.id === state.pozo) ?? pozos[0]
  const fluido = FLUIDOS.find((f) => f.value === state.fluido) ?? FLUIDOS[0]
  const obs = observado(pozo, state.fluido, state.porDia)

  const primero = obs.find((v): v is number => v !== null) ?? 1
  const qi = state.tocado && state.qi > 0 ? state.qi : primero
  const modelo = serieModelo(qi, state.Di, state.b, obs.length)

  const err = errorRelativo(obs, modelo)
  const acumulada = eur(qi, state.Di, state.b, HORIZONTE_MESES)
  // EUR is an integral of a rate: in monthly mode each point already covers a
  // month, in daily mode it must be multiplied by the days it stands for.
  const eurTotal = state.porDia ? acumulada * 30.4 : acumulada

  const datos: PuntoDeclinacion[] = pozo.serie.map((d, t) => ({
    t,
    ym: d.ym,
    observado: obs[t],
    modelo: modelo[t],
  }))

  const cambiarPozo = (id: string) => patch({ pozo: id, tocado: false, qi: 0 })

  const aplicarAjuste = () => {
    const a = ajustar(obs)
    patch({ qi: a.qi, Di: a.Di, b: a.b, tocado: true })
  }

  const maxQi = Math.max(...obs.filter((v): v is number => v !== null), 1)

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    font: 'inherit',
    fontSize: 13,
    fontWeight: 600,
    padding: `${space.xs}px ${space.md}px`,
    borderRadius: radius.pill,
    border: `1px solid ${active ? colors.accent.blue : colors.border}`,
    background: active ? colors.accent.blue + '15' : colors.surface,
    color: active ? colors.accent.blue : colors.textMuted,
    cursor: 'pointer',
  })

  return (
    <Ejercicio
      titulo="Ajustá la curva de declinación"
      sesion={sesion}
      intro="Producción real de pozos de gas de Salta, de los mismos reservorios del subandino que se producen en Bolivia. Movés tres perillas hasta que la curva se pegue a los puntos: eso es ajustar un modelo a datos."
      onReset={reset}
    >
      <Field label="Pozo">
        <Select
          value={pozo.id}
          options={pozos.map((p) => ({
            value: p.id,
            label: `${p.sigla} — ${p.area} (${p.formacion})`,
          }))}
          onChange={cambiarPozo}
        />
      </Field>

      <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap', marginBottom: space.lg }}>
        {FLUIDOS.map((f) => (
          <button
            key={f.value}
            type="button"
            style={toggleStyle(state.fluido === f.value)}
            onClick={() => patch({ fluido: f.value, tocado: false, qi: 0 })}
          >
            {f.label}
          </button>
        ))}
        <span style={{ width: space.lg }} />
        <button type="button" style={toggleStyle(state.porDia)} onClick={() => patch({ porDia: !state.porDia, tocado: false, qi: 0 })}>
          {state.porDia ? `${fluido.unidad}/día` : `${fluido.unidad}/mes`}
        </button>
        <button type="button" style={toggleStyle(state.log)} onClick={() => patch({ log: !state.log })}>
          Eje log
        </button>
      </div>

      {obs.every((v) => v === null) ? (
        <p style={{ color: colors.textMuted, fontSize: 'var(--pd-fs-sm)' }}>
          Este pozo no reporta {fluido.label.toLowerCase()}. Probá con otro fluido.
        </p>
      ) : (
        <>
          <DeclineChart data={datos} log={state.log} unidad={state.porDia ? `${fluido.unidad}/d` : `${fluido.unidad}/mes`} />

          <div style={{ marginTop: space.lg }}>
            <Slider
              label={`Caudal inicial qi (${state.porDia ? fluido.unidad + '/día' : fluido.unidad + '/mes'})`}
              value={Math.round(qi)}
              min={0}
              max={Math.round(maxQi * 1.4)}
              step={Math.max(1, Math.round(maxQi / 200))}
              onChange={(v) => patch({ qi: v, tocado: true })}
              format={(v) => v.toLocaleString('en-US')}
            />
            <Slider
              label="Tasa de declinación Di"
              value={state.Di}
              min={0}
              max={0.08}
              step={0.0005}
              onChange={(v) => patch({ Di: v, tocado: true })}
              format={(v) => `${(v * 100).toFixed(2)} %/mes · ${(declinacionAnual(v) * 100).toFixed(0)} %/año`}
            />
            <Slider
              label="Exponente b"
              value={state.b}
              min={0}
              max={1.2}
              step={0.05}
              onChange={(v) => patch({ b: v, tocado: true })}
              format={(v) => (v < 0.03 ? '0.00 — exponencial' : Math.abs(v - 1) < 0.03 ? '1.00 — armónica' : v.toFixed(2))}
            />
          </div>

          <StatRow>
            <Stat
              label="Error del ajuste"
              value={Number.isFinite(err) ? `${(err * 100).toFixed(1)}%` : '—'}
              accent={err < 0.06 ? colors.status.ok : err < 0.12 ? colors.status.warn : colors.status.err}
              hint="Cuánto se aparta el modelo de un mes típico. Abajo de 6% el ajuste es bueno."
            />
            <Stat
              label="Acumulada a 30 años"
              value={(eurTotal / 1000).toFixed(0)}
              unit={`miles de ${fluido.unidad}`}
              hint="Lo que el modelo predice que va a producir el pozo. Depende muchísimo de b."
            />
          </StatRow>

          <div style={{ display: 'flex', gap: space.md, alignItems: 'center', flexWrap: 'wrap', marginTop: space.lg }}>
            <button type="button" className="tbtn" onClick={aplicarAjuste}>
              Buscar el mejor ajuste
            </button>
            <span style={{ fontSize: 13, color: colors.textMuted }}>
              Probá vos primero. El botón hace la búsqueda por fuerza bruta.
            </span>
          </div>

          <Solucion titulo="¿Qué mirar en este pozo?">{pozo.nota}</Solucion>

          <Solucion titulo="Por qué febrero siempre parece un mal mes">
            En metros cúbicos por mes vas a ver un serrucho: cada febrero cae y cada mes de 31 días sube. No es el
            reservorio, son los días del calendario. La declinación describe un caudal, así que el serrucho desaparece
            en cuanto pasás a {fluido.unidad}/día — y el error del ajuste baja sin que toques ninguna perilla. Es el
            error más común al mirar datos de producción crudos.
          </Solucion>

          <Solucion titulo="Qué significa cada perilla">
            <strong>qi</strong> es dónde arranca la curva: subirlo o bajarlo la mueve entera. <strong>Di</strong> es
            cuán rápido cae al principio. <strong>b</strong> es la forma de la cola: en 0 la caída es exponencial y el
            pozo se apaga rápido; en 1 es armónica y la cola se estira. Cambiar b casi no mueve los primeros meses,
            pero cambia enormemente la acumulada a 30 años — por eso una reserva estimada con pocos años de historia
            es un número frágil.
          </Solucion>
        </>
      )}

      {meta.source && (
        <div
          style={{
            marginTop: space.md,
            fontFamily: 'var(--pd-font-mono)',
            fontSize: 'var(--pd-fs-cap)',
            color: colors.textDim,
          }}
        >
          fuente: {meta.source}
          {meta.source_date && ` · datos hasta ${meta.source_date}`}
        </div>
      )}
    </Ejercicio>
  )
}
