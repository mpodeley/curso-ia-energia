import { useState } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Field, Loading, Select, Stat, StatRow } from '../components/ui'
import { buscarPorPalabras } from '../engine/lexical'
import { useRagCorpus } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'
import type { RagChunk } from '../types'

type LabState = {
  pregunta: string
  modo: 'semantica' | 'palabras'
  libre: string
}

const TOP_K = 3

/** What actually gets sent to the model: the question plus the retrieved
 *  fragments. Seeing this is the whole lesson — RAG is prompt stuffing. */
function promptAumentado(pregunta: string, recuperados: RagChunk[]): string {
  const fuentes = recuperados
    .map((c) => `[${c.id}] ${c.doc} — ${c.seccion}\n${c.texto}`)
    .join('\n\n')
  return `Respondé la pregunta usando únicamente los fragmentos de abajo. Si no alcanzan, decilo.
Citá el identificador del fragmento que uses.

FRAGMENTOS
${fuentes}

PREGUNTA
${pregunta}`
}

export function RagDemo({ sesion = 5 }: { sesion?: number }) {
  const { data, meta, loading, error } = useRagCorpus()
  const [state, patch, reset] = useExerciseState<LabState>('rag-demo', {
    pregunta: '',
    modo: 'semantica',
    libre: '',
  })
  const [copiado, setCopiado] = useState(false)

  if (loading) return <Loading what="el corpus" />
  if (error || !data || data.chunks.length === 0)
    return <div style={{ color: colors.status.err }}>No se pudo cargar el corpus.</div>

  const { chunks, preguntas } = data
  const porId = Object.fromEntries(chunks.map((c) => [c.id, c]))
  const esLibre = state.pregunta === '__libre'
  const pregunta = preguntas.find((p) => p.id === state.pregunta)
  const textoConsulta = esLibre ? state.libre : (pregunta?.texto ?? preguntas[0].texto)
  const actual = esLibre ? undefined : (pregunta ?? preguntas[0])

  // Free text has no precomputed embedding — there is no model in the browser,
  // so semantic mode is simply not available for it. Saying so is the lesson.
  const modo = esLibre ? 'palabras' : state.modo

  const lexico = buscarPorPalabras(textoConsulta, chunks.map((c) => ({ id: c.id, texto: c.texto })))

  const resultados: { chunk: RagChunk; score: number; terminos?: string[] }[] =
    modo === 'semantica' && actual
      ? actual.ranking.slice(0, TOP_K).map((r) => ({ chunk: porId[r.chunk], score: r.sim }))
      : lexico.slice(0, TOP_K).map((r) => ({ chunk: porId[r.id], score: r.score, terminos: r.terminos }))

  const acierta = actual ? resultados[0]?.chunk?.id === actual.esperado : undefined
  const prompt = promptAumentado(textoConsulta, resultados.map((r) => r.chunk))

  const copiar = () => {
    void navigator.clipboard?.writeText(prompt).then(() => {
      setCopiado(true)
      window.setTimeout(() => setCopiado(false), 1800)
    })
  }

  const tabStyle = (active: boolean, disabled = false): React.CSSProperties => ({
    font: 'inherit',
    fontSize: 'var(--pd-fs-sm)',
    fontWeight: 600,
    padding: `${space.sm}px ${space.lg}px`,
    borderRadius: radius.pill,
    border: `1px solid ${active ? colors.accent.blue : colors.border}`,
    background: active ? colors.accent.blue + '15' : colors.surface,
    color: disabled ? colors.textDim : active ? colors.accent.blue : colors.textMuted,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
  })

  return (
    <Ejercicio
      titulo="Buscar en tus documentos"
      sesion={sesion}
      intro="Un manual interno que ningún modelo pudo haber leído. Elegí una pregunta y compará las dos formas de buscar el fragmento que la responde: por palabras que coinciden, o por significado."
      onReset={reset}
    >
      <Field label="Pregunta">
        <Select
          value={esLibre ? '__libre' : (actual?.id ?? preguntas[0].id)}
          options={[
            ...preguntas.map((p) => ({ value: p.id, label: p.texto })),
            { value: '__libre', label: '— escribir la mía —' },
          ]}
          onChange={(v) => patch({ pregunta: v })}
        />
      </Field>

      {esLibre && (
        <Field label="Tu pregunta">
          <input
            type="text"
            value={state.libre}
            onChange={(e) => patch({ libre: e.target.value })}
            placeholder="¿Cada cuánto se revisan los compresores?"
            style={{
              width: '100%',
              font: 'inherit',
              fontSize: 14,
              padding: space.sm,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              background: colors.surface,
              color: colors.textPrimary,
            }}
          />
        </Field>
      )}

      <div style={{ display: 'flex', gap: space.sm, marginBottom: space.md, flexWrap: 'wrap' }}>
        <button
          type="button"
          style={tabStyle(modo === 'palabras')}
          onClick={() => patch({ modo: 'palabras' })}
        >
          Por palabras
        </button>
        <button
          type="button"
          disabled={esLibre}
          title={esLibre ? 'No hay modelo en el navegador para convertir tu texto en vector' : undefined}
          style={tabStyle(modo === 'semantica', esLibre)}
          onClick={() => !esLibre && patch({ modo: 'semantica' })}
        >
          Por significado
        </button>
      </div>

      {esLibre && (
        <p style={{ fontSize: 13, color: colors.status.warn, marginTop: 0, maxWidth: '70ch' }}>
          Para tu propia pregunta solo funciona la búsqueda por palabras: convertirla en vector necesita el modelo,
          y acá no hay ninguno corriendo. En un sistema de verdad esa conversión ocurre en el servidor.
        </p>
      )}

      {textoConsulta.trim() === '' ? (
        <p style={{ color: colors.textMuted, fontSize: 'var(--pd-fs-sm)' }}>Escribí una pregunta.</p>
      ) : (
        <>
          {resultados.map((r, i) => (
            <div
              key={r.chunk?.id ?? i}
              style={{
                border: `1px solid ${i === 0 ? colors.accent.blue : colors.border}`,
                borderLeftWidth: 3,
                borderRadius: radius.md,
                padding: space.md,
                marginBottom: space.sm,
                background: i === 0 ? colors.accent.blue + '08' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', gap: space.sm, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--pd-font-mono)', fontSize: 11, color: colors.textDim }}>
                  {r.chunk?.id} · {r.chunk?.doc} — {r.chunk?.seccion}
                </span>
                <span style={{ fontFamily: 'var(--pd-font-mono)', fontSize: 11, color: colors.accent.blue, fontWeight: 700 }}>
                  {modo === 'semantica' ? 'similitud' : 'coincidencia'} {r.score.toFixed(2)}
                </span>
              </div>
              <p style={{ margin: `${space.xs}px 0 0`, fontSize: 'var(--pd-fs-sm)', color: colors.textPrimary }}>
                {r.chunk?.texto}
              </p>
              {modo === 'palabras' && (
                <div style={{ fontSize: 12, color: colors.textDim, marginTop: 4 }}>
                  {r.terminos && r.terminos.length > 0
                    ? `coincide en: ${r.terminos.join(', ')}`
                    : 'no comparte ninguna palabra con la pregunta'}
                </div>
              )}
            </div>
          ))}

          {actual && (
            <div style={{ margin: `${space.lg}px 0` }}>
              <StatRow>
                <Stat
                  label={modo === 'semantica' ? 'Búsqueda por significado' : 'Búsqueda por palabras'}
                  value={acierta ? 'acertó' : 'falló'}
                  accent={acierta ? colors.status.ok : colors.status.err}
                  hint={`El fragmento que responde esta pregunta es ${actual.esperado}`}
                />
                <Stat
                  label="Palabras en común"
                  value={lexico.find((l) => l.id === actual.esperado)?.terminos.length ?? 0}
                  hint="Entre la pregunta y el fragmento correcto. Cuando es cero, buscar por palabras no tiene con qué."
                />
              </StatRow>
            </div>
          )}

          <div style={{ marginTop: space.lg }}>
            <div style={{ fontSize: 12, color: colors.textDim, fontFamily: 'var(--pd-font-mono)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
              Lo que se le manda al modelo
            </div>
            <pre
              style={{
                fontFamily: 'var(--pd-font-mono)',
                fontSize: 12,
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                padding: space.md,
                margin: 0,
                maxHeight: 260,
                overflowY: 'auto',
              }}
            >
              {prompt}
            </pre>
            <div style={{ display: 'flex', gap: space.md, alignItems: 'center', marginTop: space.sm, flexWrap: 'wrap' }}>
              <button type="button" className="tbtn" onClick={copiar}>
                Copiar prompt aumentado
              </button>
              <span style={{ fontSize: 13, color: copiado ? colors.status.ok : colors.textMuted }}>
                {copiado ? 'Copiado. Pegalo en tu chatbot y mirá la respuesta.' : 'Esto es todo lo que hace un sistema RAG.'}
              </span>
            </div>
          </div>
        </>
      )}

      <Solucion titulo="Entonces, ¿qué es RAG?">
        Tres pasos, ninguno mágico. Buscar los fragmentos de tus documentos que más se parecen a la pregunta; pegarlos
        arriba de la pregunta; mandarle todo eso al modelo. El modelo nunca "aprendió" tu manual: lo está leyendo en
        ese momento, como quien responde con el libro abierto. Por eso puede citar la fuente, y por eso si el buscador
        trae el fragmento equivocado la respuesta va a estar mal aunque el modelo sea excelente.
      </Solucion>

      <Solucion titulo="Por qué buscar por palabras no alcanza">
        Probá la pregunta sobre cuidarse los oídos, o la de que nadie arranque el equipo mientras lo reparás. Ninguna
        comparte palabras con el fragmento que la responde: el manual dice "protección auditiva" y "bloqueo y
        etiquetado". Un buscador de palabras no tiene con qué encontrarlas. Uno por significado sí, porque compara
        vectores y no letras. Esa es toda la diferencia, y es la razón por la que esta tecnología sirve sobre
        documentación técnica escrita en un vocabulario que nadie usa al preguntar.
      </Solucion>

      <Solucion titulo="Qué mirar cuando lo uses en serio">
        Fijate siempre en los fragmentos recuperados, no solo en la respuesta. Si el sistema no te los muestra,
        desconfiá: sin ver de dónde salió, una respuesta con RAG es tan verificable como una sin RAG. Y notá que la
        similitud nunca es cero — siempre hay un fragmento "más parecido", aunque ninguno sirva. Un buen sistema
        avisa cuando el mejor candidato es malo; uno malo responde igual.
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
