// Session 1, layers 1 and 2 of the map made physical: the student fits an Arps
// curve by hand (data science), then the same search the machine runs finds
// better parameters without being told any of them (machine learning).
//
// Deliberately smaller than DeclineLab: one teaching well, two knobs, coarse
// steps, no log axis and no EUR. The real wells and "what the curve does not
// say" are session 4's, and this exercise must not spend them.
import { DeclineChart, type PuntoDeclinacion } from '../components/charts'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading, Slider, Stat, StatRow } from '../components/ui'
import {
  type Ajuste,
  PERILLAS_A_MANO,
  ajustar,
  declinacionAnual,
  diasDelMes,
  errorRelativo,
  serieModelo,
} from '../engine/decline'
import { useDeclineWells } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { chart, colors, radius, space } from '../theme'

const POZO = 'escuela-exp'
const B_FIJO = 0
const UNIDAD = 'Mm³/día'

type DuelState = {
  qi: number
  Di: number
  /** Whether either slider was ever moved. */
  tocado: boolean
  /** The student's attempt, frozen the moment they hand it in. */
  mano: { qi: number; Di: number } | null
  maquina: Ajuste | null
}

// A flat line: the dumbest possible model, wrong enough to be obvious from the
// back of the room, and it teaches what each knob does on the way out of it.
const INICIAL: DuelState = { qi: 250, Di: 0, tocado: false, mano: null, maquina: null }

const pct = (v: number) => (Number.isFinite(v) ? `${(v * 100).toFixed(2)}%` : '—')

function acento(err: number): string {
  if (err < 0.03) return colors.status.ok
  if (err < 0.12) return colors.status.warn
  return colors.status.err
}

function veredicto(errMano: number, errMaquina: number): string {
  const ratio = errMano / errMaquina
  if (ratio > 1.1) {
    return `Te ganó. Tu curva se aparta ${pct(errMano)} de un mes típico, la suya ${pct(errMaquina)}.`
  }
  if (ratio >= 0.9) {
    return `Empataron: ${pct(errMano)} contra ${pct(errMaquina)}. Vos tardaste unos minutos, ella lo que dura un parpadeo.`
  }
  return `Le ganaste, ${pct(errMano)} contra ${pct(errMaquina)}. Barre una grilla finita, y esta vez se quedó del lado de afuera.`
}

/** Legend swatch. Dots for the measured points, a bar for the fitted curves —
 *  the same shapes the chart draws, or the legend lies about what is what. */
function Muestra({ color, punto, children }: { color: string; punto?: boolean; children: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textSecondary }}>
      <span
        style={{
          width: punto ? 8 : 14,
          height: punto ? 8 : 3,
          background: color,
          borderRadius: punto ? '50%' : 2,
        }}
      />
      {children}
    </span>
  )
}

export function DeclineDuel({ sesion = 1 }: { sesion?: number }) {
  const { data: pozos, meta, loading, error } = useDeclineWells()
  const [state, patch, reset] = useExerciseState<DuelState>('decline-duel', INICIAL)

  if (loading) return <Loading what="la serie del pozo" />
  const pozo = pozos?.find((p) => p.id === POZO)
  if (error || !pozo) {
    return <div style={{ color: colors.status.err }}>No se pudo cargar el pozo de escuela.</div>
  }

  // Arps describes a rate, and the series carries monthly volume. Fixed here
  // rather than offered as a toggle: the calendar sawtooth is session 4's.
  const obs = pozo.serie.map((d) => (d.gas > 0 ? d.gas / diasDelMes(d.ym) : null))
  const errorDe = (qi: number, Di: number) =>
    errorRelativo(obs, serieModelo(qi, Di, B_FIJO, obs.length))

  const mano = state.mano ?? { qi: state.qi, Di: state.Di }
  const errMano = errorDe(mano.qi, mano.Di)
  const curvaMano = serieModelo(mano.qi, mano.Di, B_FIJO, obs.length)

  const maq = state.maquina
  const errMaquina = maq ? errorDe(maq.qi, maq.Di) : Number.NaN
  const curvaMaquina = maq ? serieModelo(maq.qi, maq.Di, B_FIJO, obs.length) : null

  const datos: PuntoDeclinacion[] = pozo.serie.map((d, t) => ({
    t,
    ym: d.ym,
    observado: obs[t],
    modelo: curvaMano[t],
    modelo2: curvaMaquina?.[t],
  }))

  const entregar = () => patch({ mano: { qi: state.qi, Di: state.Di } })
  const correrMaquina = () => patch({ maquina: ajustar(obs, B_FIJO) })

  // The nearest hand-slider notches around the true Di, derived from the real
  // step so the "your knobs could not get there" sentence stays true if the
  // knobs ever change. decline.test.ts guards that the true Di is off-grid.
  const pasoDiPct = PERILLAS_A_MANO.pasoDi * 100
  const diVerdadPct = (pozo.verdad?.Di ?? 0) * 100
  const vecinoDiAbajo = Math.floor(diVerdadPct / pasoDiPct + 1e-9) * pasoDiPct
  const vecinoDiArriba = vecinoDiAbajo + pasoDiPct

  const celda: React.CSSProperties = { padding: `${space.xs}px ${space.md}px`, textAlign: 'right' }
  const encabezado: React.CSSProperties = {
    ...celda,
    fontFamily: 'var(--pd-font-mono)',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textDim,
    fontWeight: 400,
  }

  return (
    <Ejercicio
      titulo="Ajustala vos, después que la busque la máquina"
      sesion={sesion}
      intro="Un pozo, dos perillas y un número que tiene que bajar: el error. Primero movelas vos. Después apretás un botón y la máquina hace la misma búsqueda, sin que nadie le diga los valores."
      onReset={reset}
      done={Boolean(state.maquina)}
    >
      <DeclineChart
        data={datos}
        log={false}
        unidad={UNIDAD}
        etiquetas={{ modelo: 'tu ajuste', modelo2: 'la máquina' }}
      />

      <div style={{ display: 'flex', gap: space.lg, flexWrap: 'wrap', margin: `${space.xs}px 0 ${space.lg}px` }}>
        <Muestra color={chart.fill[0]} punto>
          medido
        </Muestra>
        <Muestra color={chart.line[1]}>tu ajuste</Muestra>
        {curvaMaquina && <Muestra color={chart.line[2]}>la máquina</Muestra>}
      </div>

      {!state.mano ? (
        <>
          <Slider
            label={`Caudal inicial qi (${UNIDAD})`}
            value={state.qi}
            min={0}
            max={PERILLAS_A_MANO.maxQi}
            step={PERILLAS_A_MANO.pasoQi}
            onChange={(v) => patch({ qi: v, tocado: true })}
            format={(v) => v.toLocaleString('en-US')}
          />
          <Slider
            label="Tasa de declinación Di"
            value={state.Di}
            min={0}
            max={PERILLAS_A_MANO.maxDi}
            step={PERILLAS_A_MANO.pasoDi}
            onChange={(v) => patch({ Di: v, tocado: true })}
            format={(v) => `${(v * 100).toFixed(1)}%/mes · ${(declinacionAnual(v) * 100).toFixed(0)}%/año`}
          />

          <StatRow>
            <Stat
              label="Error de tu ajuste"
              value={pct(errMano)}
              accent={acento(errMano)}
              hint="Cuánto se aparta tu curva de un mes típico. Cuanto más chico, mejor."
            />
          </StatRow>

          <div style={{ display: 'flex', gap: space.md, alignItems: 'center', flexWrap: 'wrap', marginTop: space.lg }}>
            <button type="button" className="tbtn" onClick={entregar} disabled={!state.tocado}>
              Listo, este es mi ajuste
            </button>
            <span style={{ fontSize: 13, color: colors.textMuted }}>
              {state.tocado ? 'Después no se puede volver a tocar.' : 'Mové alguna perilla para poder entregar.'}
            </span>
          </div>
        </>
      ) : (
        <>
          <table style={{ borderCollapse: 'collapse', fontSize: 14, marginBottom: space.lg }}>
            <thead>
              <tr>
                <th style={{ ...encabezado, textAlign: 'left' }}>Quién</th>
                <th style={encabezado}>qi</th>
                <th style={encabezado}>Di</th>
                <th style={encabezado}>Error</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: `1px solid ${colors.border}` }}>
                <td style={{ ...celda, textAlign: 'left', color: chart.line[1], fontWeight: 700 }}>Vos</td>
                <td style={celda}>{mano.qi.toLocaleString('en-US')}</td>
                <td style={celda}>{(mano.Di * 100).toFixed(2)}%/mes</td>
                <td style={{ ...celda, fontWeight: 700 }}>{pct(errMano)}</td>
              </tr>
              {maq && (
                <tr style={{ borderTop: `1px solid ${colors.border}` }}>
                  <td style={{ ...celda, textAlign: 'left', color: chart.line[2], fontWeight: 700 }}>La máquina</td>
                  <td style={celda}>{maq.qi.toLocaleString('en-US')}</td>
                  <td style={celda}>{(maq.Di * 100).toFixed(2)}%/mes</td>
                  <td style={{ ...celda, fontWeight: 700 }}>{pct(errMaquina)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {!maq ? (
            <div style={{ display: 'flex', gap: space.md, alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="tbtn" onClick={correrMaquina}>
                Que la busque la máquina
              </button>
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                No sabe nada de reservorios. Tiene los puntos y un criterio: que el error sea el menor posible.
              </span>
            </div>
          ) : (
            <>
              <div
                style={{
                  padding: space.md,
                  borderLeft: `3px solid ${colors.accent.blue}`,
                  background: colors.surface,
                  borderRadius: radius.sm,
                  maxWidth: '72ch',
                }}
              >
                <p style={{ margin: 0, fontSize: 'var(--pd-fs-sm)', color: colors.textPrimary }}>
                  {veredicto(errMano, errMaquina)}
                </p>
                <p style={{ margin: `${space.sm}px 0 0`, fontSize: 13, color: colors.textSecondary }}>
                  Nadie le dijo cuáles eran los valores: los encontró probando, y le alcanzó con menos de setecientas
                  combinaciones. Eso es la capa 2 del mapa. En vez de escribir la fórmula, mostrás ejemplos y la
                  máquina encuentra el patrón.
                </p>
              </div>

              <Solucion titulo="Los valores con los que se generó esta curva">
                <p style={{ margin: 0 }}>
                  Esta serie no salió de ningún pozo: se generó con{' '}
                  <strong>
                    qi = {pozo.verdad?.qi.toLocaleString('en-US')} {UNIDAD} y Di ={' '}
                    {((pozo.verdad?.Di ?? 0) * 100).toFixed(1)}%/mes
                  </strong>
                  , y después se le sumó un ruido de medición de hasta ±2%. Compará esos dos números con los que
                  encontró la máquina.
                </p>
                <p style={{ margin: `${space.sm}px 0 0` }}>
                  Fijate en algo más: ni siquiera con los valores exactos el error da cero. Queda{' '}
                  {pct(errorDe(pozo.verdad?.qi ?? 0, pozo.verdad?.Di ?? 0))}, el residuo que deja ese ruido. Ese es el piso, y
                  abajo no hay nada que ganar. Un modelo que llega a cero contra datos con ruido no entendió mejor el
                  pozo: está copiando el ruido.
                </p>
              </Solucion>

              <Solucion titulo="¿Y esto ya es machine learning?">
                <p style={{ margin: 0 }}>
                  Es la bisagra, así que conviene decirla completa. La fórmula de la declinación se la dimos nosotros,
                  y es de 1945: lo único que hizo sola fue elegir los parámetros contra un criterio. Un criterio,
                  muchos intentos y quedarse con el mejor es el motor de todo lo que viene después.
                </p>
                <p style={{ margin: `${space.sm}px 0 0` }}>
                  Lo que cambia al subir de capa es qué se aprende. Acá, tres números dentro de una fórmula que ya
                  existía. En la capa 3, con redes neuronales, lo que se aprende de los datos es la forma misma de la
                  función, porque nadie sabe escribirla.
                </p>
              </Solucion>

              <Solucion titulo="Por qué tus perillas no podían llegar">
                <p style={{ margin: 0 }}>
                  La perilla de Di se mueve de a {pasoDiPct.toFixed(1)}%/mes, así que sus
                  posiciones cercanas al valor verdadero son {vecinoDiAbajo.toFixed(1)}% y{' '}
                  {vecinoDiArriba.toFixed(1)}%. El valor con el que se generó la curva no está
                  entre ellas: no hay forma de acertarlo con esta perilla.
                </p>
                <p style={{ margin: `${space.sm}px 0 0` }}>
                  La máquina tampoco probó todo. Probó grueso, miró dónde caía el mejor resultado y volvió a probar
                  fino alrededor: tres pasadas, y en cada una la grilla se cierra. No es más inteligente que vos, es
                  incansable. Y ese es el punto, porque el problema real no es este pozo. Es el mismo trabajo sobre
                  todos los pozos de un área, todos los meses.
                </p>
              </Solucion>
            </>
          )}
        </>
      )}

      {/* Per-well provenance: the envelope source covers the whole file (school
          wells AND the real Capítulo IV ones), and crediting a government
          dataset under a purely synthetic curve would be the wrong lesson in a
          course that teaches verification. */}
      {(pozo.fuente ?? meta.source) && (
        <div
          style={{
            marginTop: space.md,
            fontFamily: 'var(--pd-font-mono)',
            fontSize: 'var(--pd-fs-cap)',
            color: colors.textDim,
          }}
        >
          fuente: {pozo.fuente ?? meta.source}
        </div>
      )}
    </Ejercicio>
  )
}
