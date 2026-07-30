import { EmbeddingScatter, PALETA_FAMILIAS } from '../components/charts'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Stat, StatRow } from '../components/ui'
import { fidelidadDelMapa, vecinosEnMapa } from '../engine/vecinos'
import { useEmbeddings } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

type LabState = { termino: string }

export function EmbeddingsMap({ sesion = 5 }: { sesion?: number }) {
  const { data: terminos, meta, loading, error } = useEmbeddings()
  const [state, patch, reset] = useExerciseState<LabState>('embeddings-map', { termino: '' })

  if (loading) return <Loading what="el mapa de términos" />
  if (error || !terminos || terminos.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudo cargar el mapa.</div>

  const familias = [...new Set(terminos.map((t) => t.familia))]
  const colorPorFamilia = Object.fromEntries(
    familias.map((f, i) => [f, PALETA_FAMILIAS[i % PALETA_FAMILIAS.length]]),
  )

  const sel = terminos.find((t) => t.id === state.termino)
  const vecinosReales = sel?.vecinos.map((v) => v.termino) ?? []
  const enMapa = sel ? vecinosEnMapa(sel, terminos).map((p) => p.termino) : []
  const fidelidad = sel ? fidelidadDelMapa(enMapa, vecinosReales) : 0

  return (
    <Ejercicio
      titulo="El mapa de significados"
      sesion={sesion}
      intro="Cada término de la industria convertido en un vector, y esos vectores proyectados a un plano. Clickeá cualquier punto para ver qué términos le quedan más cerca según el modelo. Buscá los de la familia «jerga»: ahí está lo interesante."
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.md, flexWrap: 'wrap', marginBottom: space.md }}>
        {familias.map((f) => (
          <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: colors.textSecondary }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: colorPorFamilia[f],
                display: 'inline-block',
              }}
            />
            {f}
          </span>
        ))}
      </div>

      <EmbeddingScatter
        puntos={terminos}
        colorPorFamilia={colorPorFamilia}
        seleccionado={sel?.id}
        vecinos={new Set(vecinosReales)}
        onSelect={(id) => patch({ termino: id })}
      />

      <Field label="O elegilo de la lista">
        <Select
          value={sel?.id ?? ''}
          options={[
            { value: '', label: '— ninguno —' },
            ...terminos.map((t) => ({ value: t.id, label: `${t.termino} · ${t.familia}` })),
          ]}
          onChange={(v) => patch({ termino: v })}
        />
      </Field>

      {sel ? (
        <>
          <div style={{ marginTop: space.lg }}>
            <div style={{ fontSize: 12, color: colors.textDim, fontFamily: 'var(--pd-font-mono)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Vecinos de «{sel.termino}», en las 384 dimensiones reales
            </div>
            <div style={{ display: 'flex', gap: space.sm, flexWrap: 'wrap', marginTop: space.sm }}>
              {sel.vecinos.map((v) => (
                <span
                  key={v.termino}
                  style={{
                    fontSize: 13,
                    padding: '3px 10px',
                    borderRadius: radius.pill,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                  }}
                >
                  {v.termino}{' '}
                  <span style={{ fontFamily: 'var(--pd-font-mono)', fontSize: 11, color: colors.textDim }}>
                    {v.sim.toFixed(2)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {sel.glosa && (
            <div
              style={{
                marginTop: space.md,
                padding: space.md,
                borderLeft: `3px solid ${colors.accent.orange}`,
                background: colors.surface,
                borderRadius: radius.sm,
                fontSize: 'var(--pd-fs-sm)',
                color: colors.textSecondary,
              }}
            >
              <strong>En el yugo:</strong> {sel.glosa} El modelo no tiene idea de esto: aprendió la palabra del
              lenguaje corriente, no de tu campo.
            </div>
          )}

          <div style={{ marginTop: space.lg }}>
            <StatRow>
              <Stat
                label="Fidelidad del mapa"
                value={`${Math.round(fidelidad * 100)}%`}
                accent={fidelidad >= 0.6 ? colors.status.ok : colors.status.warn}
                hint="Cuántos de los vecinos reales también aparecen entre los cinco más cercanos del dibujo"
              />
            </StatRow>
            <p style={{ fontSize: 13, color: colors.textMuted, marginTop: space.sm, maxWidth: '70ch' }}>
              Los vecinos reales están marcados con borde en el mapa. Si alguno quedó lejos del punto elegido, es
              porque aplastar 384 dimensiones en dos pierde información: en el dibujo dos puntos pueden verse juntos
              sin serlo.
            </p>
          </div>
        </>
      ) : (
        <p style={{ fontSize: 'var(--pd-fs-sm)', color: colors.textMuted, marginTop: space.lg }}>
          Clickeá un punto para ver sus vecinos.
        </p>
      )}

      <Solucion titulo="Qué es un embedding, sin metáforas de más">
        El modelo convierte cada palabra o frase en una lista de 384 números. Esa lista no significa nada por sí
        sola: lo único que importa es que dos textos con sentido parecido den listas parecidas. Todo lo que ves acá
        sale de una sola operación, medir cuán parecidas son dos listas. Y eso alcanza para buscar por significado en
        vez de por palabras, que es lo que hace posible el próximo ejercicio.
      </Solucion>

      <Solucion titulo="Dónde falla, y por qué te conviene saberlo">
        Dos límites, los dos visibles en este mapa. El primero: el modelo aprendió del lenguaje general, así que la
        jerga del yacimiento le suena a lo que significa afuera. Buscá «burro», «araña» o «pescado» y mirá con quién
        se juntan. El segundo, más sutil: a veces acerca palabras por cómo se escriben y no por lo que quieren decir
        — «derrame de hidrocarburo» y «regalías hidrocarburíferas» comparten raíz y poco más, y el modelo las pone
        cerca igual. Un buscador que se apoya en esto va a traer, cada tanto, algo que se parece pero no sirve. Por
        eso en la sesión que viene el fragmento recuperado se muestra siempre: para que lo puedas descartar.
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
