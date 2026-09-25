import { useEffect, useMemo, useRef } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading } from '../components/ui'
import {
  LADO,
  decodificar,
  decodificarGenerativa,
  estilosAlAzar,
  imaginar,
  masProbable,
  predecir,
} from '../engine/digitos'
import { makeRng } from '../engine/sampling'
import { useRedDigitos, useRedGenerativa } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

// The network in reverse: pick a digit and a generator network draws sixteen
// new ones, each from two random "style" numbers (seeded, so a screen-shared
// run reproduces). The reading network from the exercise above checks each
// drawing and says what it reads.

const CANTIDAD = 16

export function RedAlReves({ sesion = 1 }: { sesion?: number }) {
  const gen = useRedGenerativa()
  const lectora = useRedDigitos()
  const [st, patch, reset] = useExerciseState('red-al-reves', { digito: 3, semilla: 1 })

  const g = useMemo(() => (gen.data ? decodificarGenerativa(gen.data) : null), [gen.data])
  const red = useMemo(() => (lectora.data ? decodificar(lectora.data) : null), [lectora.data])

  const dibujos = useMemo(() => {
    if (!g) return []
    return estilosAlAzar(makeRng(st.semilla * 1009 + st.digito), CANTIDAD, g.estilo).map((e) => {
      const img = imaginar(g, st.digito, e)
      return { img, lee: red ? masProbable(predecir(red, img)) : null }
    })
  }, [g, red, st.digito, st.semilla])

  if (gen.loading || lectora.loading) return <Loading what="la red" />
  if (gen.error || !g) return <div style={{ color: colors.status.err }}>No se pudo cargar la red.</div>

  const boton = (activo: boolean): React.CSSProperties => ({
    minWidth: 36,
    borderColor: activo ? colors.accent.orange : colors.border,
    color: activo ? colors.accent.orange : colors.textSecondary,
  })

  return (
    <Ejercicio
      titulo="La red al revés: pedile un dígito y lo dibuja"
      sesion={sesion}
      intro="Elegí un dígito. Otra red, entrenada con los mismos 60,000 dígitos, lo dibuja dieciséis veces, cada vez con una letra distinta, y la red del ejercicio de arriba lee cada dibujo."
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.xs, flexWrap: 'wrap', marginBottom: space.md }}>
        {Array.from({ length: 10 }, (_, d) => (
          <button key={d} type="button" className="tbtn" style={boton(st.digito === d)} onClick={() => patch({ digito: d })}>
            {d}
          </button>
        ))}
        <button
          type="button"
          className="tbtn"
          style={{ marginLeft: space.md }}
          onClick={() => patch({ semilla: st.semilla + 1 })}
        >
          Imaginar otros
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: space.sm }}>
        {dibujos.map((d, i) => (
          <figure key={i} style={{ margin: 0, textAlign: 'center' }}>
            <Dibujo img={d.img} />
            {d.lee !== null && (
              <figcaption
                style={{ fontSize: 12, color: d.lee === st.digito ? colors.textMuted : colors.status.err, marginTop: 2 }}
              >
                lee {d.lee}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Solucion>
        Esta red recibe el dígito y dos números al azar, y con eso dibuja. Al entrenarla, otra red comprimía cada
        dígito de MNIST en esos dos números y esta aprendía a redibujarlo a partir de ellos, así que los dos números
        terminaron guardando la manera de escribirlo: la inclinación, el ancho, el grosor del trazo. Ninguno de estos
        dibujos está en MNIST. Es IA generativa en miniatura. Un modelo de lenguaje hace lo mismo con texto: recibe
        un pedido, sortea, y escribe algo nuevo con la forma de lo que vio al entrenar.
      </Solucion>

      <p style={{ color: colors.textDim, fontSize: 12, margin: `${space.md}px 0 0` }}>
        fuente: {gen.meta.source}. Autoencoder variacional condicional entrenado para este curso con PyTorch.
      </p>
    </Ejercicio>
  )
}

function Dibujo({ img }: { img: Float32Array }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    const data = new ImageData(LADO, LADO)
    for (let i = 0; i < img.length; i++) {
      const v = Math.round(255 * (1 - img[i]))
      data.data.set([v, v, v, 255], i * 4)
    }
    ctx.putImageData(data, 0, 0)
  }, [img])
  return (
    <canvas
      ref={ref}
      width={LADO}
      height={LADO}
      aria-label="Un dígito dibujado por la red"
      style={{
        width: '100%',
        aspectRatio: '1',
        imageRendering: 'pixelated',
        border: `1px solid ${colors.border}`,
        borderRadius: radius.sm,
        display: 'block',
      }}
    />
  )
}
