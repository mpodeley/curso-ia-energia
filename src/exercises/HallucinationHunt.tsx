import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Stat, StatRow } from '../components/ui'
import { puntuar, veredicto } from '../engine/hunt'
import { useAlucinaciones } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

type LabState = {
  informe: string
  /** informe id -> marked segment indices. Arrays, because Sets do not survive JSON. */
  marcados: Record<string, number[]>
  corregidos: string[]
}

export function HallucinationHunt({ sesion = 7 }: { sesion?: number }) {
  const { data: informes, meta, loading, error } = useAlucinaciones()
  const [state, patch, reset] = useExerciseState<LabState>('hallucination-hunt', {
    informe: '',
    marcados: {},
    corregidos: [],
  })

  if (loading) return <Loading what="los informes" />
  if (error || !informes || informes.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudieron cargar los informes.</div>

  const informe = informes.find((i) => i.id === state.informe) ?? informes[0]
  const marcados = new Set(state.marcados[informe.id] ?? [])
  const corregido = state.corregidos.includes(informe.id)

  const alternar = (i: number) => {
    if (corregido) return
    const actual = new Set(marcados)
    if (actual.has(i)) actual.delete(i)
    else actual.add(i)
    patch({ marcados: { ...state.marcados, [informe.id]: [...actual] } })
  }

  const corregir = () => patch({ corregidos: [...state.corregidos, informe.id] })

  const p = puntuar(informe.segmentos, marcados)

  /** Before checking: blue if marked. After: green for a hit, red for a miss,
   *  amber for a false alarm. */
  const estilo = (i: number): React.CSSProperties => {
    const s = informe.segmentos[i]
    const marcado = marcados.has(i)
    let borde: string = colors.border
    let fondo: string = 'transparent'
    if (!corregido) {
      if (marcado) {
        borde = colors.accent.blue
        fondo = colors.accent.blue + '12'
      }
    } else if (s.inventada && marcado) {
      borde = colors.status.ok
      fondo = colors.status.ok + '12'
    } else if (s.inventada && !marcado) {
      borde = colors.status.err
      fondo = colors.status.err + '12'
    } else if (!s.inventada && marcado) {
      borde = colors.status.warn
      fondo = colors.status.warn + '12'
    }
    return {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      font: 'inherit',
      fontSize: 'var(--pd-fs-sm)',
      color: colors.textPrimary,
      lineHeight: 1.6,
      padding: `${space.sm}px ${space.md}px`,
      marginBottom: space.sm,
      border: `1px solid ${borde}`,
      borderLeftWidth: 3,
      borderRadius: radius.md,
      background: fondo,
      cursor: corregido ? 'default' : 'pointer',
    }
  }

  const marca = (i: number) => {
    const s = informe.segmentos[i]
    if (!corregido) return marcados.has(i) ? 'marcada' : ''
    if (s.inventada && marcados.has(i)) return 'inventada — la encontraste'
    if (s.inventada) return 'inventada — se te pasó'
    if (marcados.has(i)) return 'era correcta — falsa alarma'
    return 'correcta'
  }

  const colorMarca = (i: number) => {
    const s = informe.segmentos[i]
    if (!corregido) return colors.accent.blue
    if (s.inventada && marcados.has(i)) return colors.status.ok
    if (s.inventada) return colors.status.err
    if (marcados.has(i)) return colors.status.warn
    return colors.textDim
  }

  return (
    <Ejercicio
      titulo="Cacería de alucinaciones"
      sesion={sesion}
      intro="Tres textos generados por un modelo. Algunas afirmaciones son sólidas y otras están inventadas con total seguridad. Marcá las que no usarías sin verificar antes — y ojo, marcar todo no cuenta como acertar."
      onReset={reset}
      done={corregido}
    >
      <Field label="Informe">
        <Select
          value={informe.id}
          options={informes.map((i) => ({ value: i.id, label: i.label }))}
          onChange={(v) => patch({ informe: v })}
        />
      </Field>

      <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textSecondary, margin: `0 0 ${space.lg}px`, maxWidth: '70ch' }}>
        {informe.contexto}
      </p>

      {informe.segmentos.map((s, i) => (
        <div key={i}>
          <button type="button" style={estilo(i)} onClick={() => alternar(i)} disabled={corregido}>
            {s.texto}
          </button>
          {(corregido || marcados.has(i)) && (
            <div
              style={{
                fontFamily: 'var(--pd-font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: colorMarca(i),
                margin: `-4px 0 ${space.sm}px ${space.md}px`,
              }}
            >
              {marca(i)}
            </div>
          )}
          {corregido && (
            <div style={{ margin: `0 0 ${space.lg}px ${space.md}px`, maxWidth: '70ch' }}>
              <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{s.porque}</p>
              {s.comoVerificar && (
                <p style={{ fontSize: 13, color: colors.textPrimary, margin: `${space.xs}px 0 0` }}>
                  <strong>Cómo verificarlo:</strong> {s.comoVerificar}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {!corregido ? (
        <div style={{ display: 'flex', gap: space.md, alignItems: 'center', flexWrap: 'wrap', marginTop: space.lg }}>
          <button type="button" className="btn btn--primary" disabled={marcados.size === 0} onClick={corregir}>
            Corregir
          </button>
          <span style={{ fontSize: 13, color: colors.textMuted }}>
            {marcados.size === 0
              ? 'Marcá al menos una afirmación.'
              : `${marcados.size} marcada${marcados.size > 1 ? 's' : ''} de ${informe.segmentos.length}.`}
          </span>
        </div>
      ) : (
        <>
          <div style={{ margin: `${space.lg}px 0` }}>
            <StatRow>
              <Stat
                label="Encontradas"
                value={`${p.encontradas} / ${p.totalInventadas}`}
                accent={p.encontradas === p.totalInventadas ? colors.status.ok : colors.status.err}
              />
              <Stat
                label="Falsas alarmas"
                value={p.falsasAlarmas}
                accent={p.falsasAlarmas === 0 ? colors.status.ok : colors.status.warn}
                hint="Afirmaciones correctas que marcaste como sospechosas"
              />
              <Stat
                label="Precisión"
                value={`${Math.round(p.precision * 100)}%`}
                hint="De todo lo que marcaste, cuánto estaba realmente mal"
              />
            </StatRow>
          </div>
          <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textPrimary, maxWidth: '70ch' }}>{veredicto(p)}</p>
          {informe.note && <Solucion titulo="El patrón detrás de este informe">{informe.note}</Solucion>}
        </>
      )}

      <Solucion titulo="El protocolo, en cuatro preguntas">
        Es lo que te llevás de esta sesión, más que el puntaje. Ante cualquier afirmación de un modelo, preguntate:
        ¿esto se puede derivar de lo que le di, o lo completó por su cuenta? ¿Qué fuente primaria lo confirmaría, y
        cuánto tardo en abrirla? ¿Qué pasa si es falso y nadie lo nota? Y la más útil: ¿por qué sonaba creíble? Las
        invenciones peligrosas no son las absurdas, son las que tienen la forma exacta de un dato verdadero.
      </Solucion>

      <Solucion titulo="Por qué marcar todo tampoco sirve">
        Si desconfiás de cada frase, la herramienta deja de ahorrarte tiempo y volvés a escribir todo a mano. El
        objetivo no es la desconfianza, es la puntería: saber qué clase de afirmación exige fuente. Las cifras que
        salen de datos que vos entregaste casi siempre están bien; las causas, las citas, la normativa y las
        estimaciones de beneficio casi nunca.
      </Solucion>

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
        </div>
      )}
    </Ejercicio>
  )
}
