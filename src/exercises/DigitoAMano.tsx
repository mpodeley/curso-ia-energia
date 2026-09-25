import { useEffect, useMemo, useRef, useState } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading } from '../components/ui'
import { LADO, decodificar, masProbable, pixelesDeMuestra, predecir, preprocesar } from '../engine/digitos'
import { useRedDigitos } from '../hooks/useData'
import { chart, colors, radius, space } from '../theme'

// Draw a digit, a small MNIST network reads it. Everything runs in the page:
// the canvas ink goes through the same preparation MNIST used (engine/digitos.ts)
// and a 784 -> 64 -> 10 forward pass. The 28x28 thumbnail shows what the network
// actually receives.

const LIENZO = 280 // internal canvas resolution; CSS may shrink it on a phone
const TRAZO = 20 // stroke width that lands near MNIST's 2-3 px after the 20x20 fit

const fmtPct = (p: number) => `${Math.round(p * 100)}%`

export function DigitoAMano({ sesion = 1 }: { sesion?: number }) {
  const { data, meta, loading, error } = useRedDigitos()
  const red = useMemo(() => (data ? decodificar(data) : null), [data])
  const lienzoRef = useRef<HTMLCanvasElement>(null)
  const miniRef = useRef<HTMLCanvasElement>(null)
  const dibujando = useRef(false)
  const ultimo = useRef<{ x: number; y: number } | null>(null)
  const pendiente = useRef(false)
  const [entrada, setEntrada] = useState<Float32Array | null>(null)

  const probs = useMemo(() => (red && entrada ? predecir(red, entrada) : null), [red, entrada])
  const lectura = probs ? masProbable(probs) : null

  useEffect(() => {
    const c = miniRef.current
    const ctx = c?.getContext('2d')
    if (!ctx) return
    ctx.putImageData(aImagen(entrada ?? new Float32Array(LADO * LADO)), 0, 0)
  }, [entrada])

  const leer = () => {
    const ctx = lienzoRef.current?.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    const { data: rgba } = ctx.getImageData(0, 0, LIENZO, LIENZO)
    const tinta = new Float32Array(LIENZO * LIENZO)
    for (let i = 0; i < tinta.length; i++) tinta[i] = rgba[i * 4 + 3] / 255
    setEntrada(preprocesar(tinta, LIENZO, LIENZO))
  }

  const leerEnElProximoCuadro = () => {
    if (pendiente.current) return
    pendiente.current = true
    requestAnimationFrame(() => {
      pendiente.current = false
      leer()
    })
  }

  const punto = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * LIENZO, y: ((e.clientY - r.top) / r.height) * LIENZO }
  }

  const trazar = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const ctx = lienzoRef.current?.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    ctx.strokeStyle = colors.accent.blue
    ctx.lineWidth = TRAZO
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dibujando.current = true
    const p = punto(e)
    ultimo.current = p
    trazar(p, p)
    leerEnElProximoCuadro()
  }

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dibujando.current || !ultimo.current) return
    const p = punto(e)
    trazar(ultimo.current, p)
    ultimo.current = p
    leerEnElProximoCuadro()
  }

  const onUp = () => {
    dibujando.current = false
    ultimo.current = null
    leer()
  }

  const borrar = () => {
    lienzoRef.current?.getContext('2d')?.clearRect(0, 0, LIENZO, LIENZO)
    setEntrada(null)
  }

  if (loading) return <Loading what="la red" />
  if (error || !data || !red) return <div style={{ color: colors.status.err }}>No se pudo cargar la red.</div>

  return (
    <Ejercicio
      titulo="Una red que lee dígitos"
      sesion={sesion}
      intro={`Dibujá un dígito del 0 al 9 con el mouse o con el dedo. Una red neuronal chica, entrenada con ${data.n_entrenamiento.toLocaleString('en-US')} dígitos escritos a mano, dice cuál es y con qué probabilidad. Corre en tu navegador: el dibujo no sale de esta página.`}
    >
      <div style={{ display: 'flex', gap: space.xl, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ width: LIENZO, maxWidth: '100%' }}>
          <canvas
            ref={lienzoRef}
            width={LIENZO}
            height={LIENZO}
            aria-label="Recuadro para dibujar un dígito"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            style={{
              width: '100%',
              aspectRatio: '1',
              display: 'block',
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              touchAction: 'none',
              cursor: 'crosshair',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: space.sm }}>
            <button type="button" className="tbtn" onClick={borrar}>
              Borrar
            </button>
            <span style={{ fontSize: 13, color: colors.textMuted }}>
              {lectura === null ? 'Dibujá un dígito en el recuadro.' : `Lee un ${lectura}, con ${fmtPct(probs![lectura])}.`}
            </span>
          </div>
        </div>

        <div style={{ flex: '1 1 220px', minWidth: 220 }}>
          <Barras probs={probs} lectura={lectura} />
          <div style={{ display: 'flex', gap: space.md, alignItems: 'center', marginTop: space.lg }}>
            <canvas
              ref={miniRef}
              width={LADO}
              height={LADO}
              aria-label="El dibujo como lo recibe la red, 28 por 28 cuadraditos"
              style={{
                width: 84,
                height: 84,
                imageRendering: 'pixelated',
                border: `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                flex: 'none',
              }}
            />
            <span style={{ fontSize: 13, color: colors.textMuted }}>
              Así lo ve la red: 28 × 28 cuadraditos, 784 números entre 0 y 1.
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: space.xl }}>
        <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: space.sm }}>
          Así son los dígitos de MNIST, escritos a mano por empleados de la oficina de censos y por estudiantes
          secundarios de Estados Unidos:
        </div>
        <div style={{ display: 'flex', gap: space.xs, flexWrap: 'wrap' }}>
          {data.muestras.map((m, i) => (
            <Muestra key={i} pixeles={m.pixeles} digito={m.digito} />
          ))}
        </div>
      </div>

      <Solucion>
        Nadie le escribió a la red qué forma tiene un 3. Ajustó casi 51,000 números, sus pesos, mirando{' '}
        {data.n_entrenamiento.toLocaleString('en-US')} dígitos que traían su respuesta: es aprendizaje supervisado,
        como el duelo de declinación, pero acá la red arma también la forma de la función. En{' '}
        {data.n_test.toLocaleString('en-US')} dígitos que no vio al entrenar acierta el{' '}
        {(data.exactitud_test * 100).toFixed(1)}%. Antes de leer tu dibujo, la página lo prepara como se preparó el
        conjunto original: lo recorta, lo lleva a una caja de 20 × 20 y lo centra. Por eso da lo mismo dónde
        dibujes y de qué tamaño.
      </Solucion>

      <p style={{ color: colors.textDim, fontSize: 12, margin: `${space.md}px 0 0` }}>
        fuente: {meta.source}. Red entrenada para este curso con scikit-learn.
      </p>
    </Ejercicio>
  )
}

function Barras({ probs, lectura }: { probs: number[] | null; lectura: number | null }) {
  return (
    <div role="list" aria-label="Probabilidad de cada dígito">
      {Array.from({ length: 10 }, (_, d) => {
        const p = probs?.[d] ?? 0
        return (
          <div key={d} role="listitem" style={{ display: 'flex', alignItems: 'center', gap: space.sm, height: 22 }}>
            <span
              style={{
                width: 14,
                fontFamily: 'var(--pd-font-mono)',
                fontWeight: d === lectura ? 700 : 400,
                color: d === lectura ? colors.textPrimary : colors.textMuted,
              }}
            >
              {d}
            </span>
            <div style={{ flex: 1, height: 12, background: chart.grid, borderRadius: radius.sm, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${p * 100}%`,
                  height: '100%',
                  background: d === lectura ? chart.line[1] : chart.fill[0],
                  transition: 'width 120ms linear',
                }}
              />
            </div>
            <span style={{ width: 40, textAlign: 'right', fontSize: 12, color: colors.textMuted }}>
              {probs ? fmtPct(p) : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Muestra({ pixeles, digito }: { pixeles: string; digito: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    ref.current?.getContext('2d')?.putImageData(aImagen(pixelesDeMuestra(pixeles)), 0, 0)
  }, [pixeles])
  return (
    <canvas
      ref={ref}
      width={LADO}
      height={LADO}
      aria-label={`Un ${digito} del conjunto MNIST`}
      style={{ width: 42, height: 42, imageRendering: 'pixelated', border: `1px solid ${colors.border}`, borderRadius: radius.sm }}
    />
  )
}

/** Ink in [0, 1] → grey pixels, dark ink on white paper. */
function aImagen(x: Float32Array): ImageData {
  const img = new ImageData(LADO, LADO)
  for (let i = 0; i < x.length; i++) {
    const v = Math.round(255 * (1 - x[i]))
    img.data.set([v, v, v, 255], i * 4)
  }
  return img
}
