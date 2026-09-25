import { useEffect, useMemo, useRef, useState } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading } from '../components/ui'
import {
  LADO,
  activar,
  decodificar,
  masProbable,
  pesoDeSalida,
  pesosDeNeurona,
  pixelesDeMuestra,
  preprocesar,
  type Activaciones,
  type Red,
} from '../engine/digitos'
import { useRedDigitos } from '../hooks/useData'
import { chart, colors, radius, space } from '../theme'

// Draw a digit, a small MNIST network reads it. Everything runs in the page:
// the canvas ink goes through the same preparation MNIST used (engine/digitos.ts)
// and a 784 -> 64 -> 10 forward pass. Below the drawing, the network itself:
// the 28x28 input, the 64 hidden neurons lighting up and the ten outputs,
// redrawn on every stroke. Touching a hidden neuron shows the pattern it
// responds to (its 784 incoming weights).

const LIENZO = 280 // internal canvas resolution; CSS may shrink it on a phone
const TRAZO = 20 // stroke width that lands near MNIST's 2-3 px after the 20x20 fit

const fmtPct = (p: number) => `${Math.round(p * 100)}%`

export function DigitoAMano({ sesion = 1 }: { sesion?: number }) {
  const { data, meta, loading, error } = useRedDigitos()
  const red = useMemo(() => (data ? decodificar(data) : null), [data])
  const lienzoRef = useRef<HTMLCanvasElement>(null)
  const dibujando = useRef(false)
  const ultimo = useRef<{ x: number; y: number } | null>(null)
  const pendiente = useRef(false)
  const [entrada, setEntrada] = useState<Float32Array | null>(null)
  const [neurona, setNeurona] = useState<number | null>(null)

  const act = useMemo(() => (red && entrada ? activar(red, entrada) : null), [red, entrada])
  const probs = act?.probs ?? null
  const lectura = probs ? masProbable(probs) : null

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
      intro={`Dibujá un dígito del 0 al 9 con el mouse o con el dedo. Una red neuronal chica, entrenada con ${data.n_entrenamiento.toLocaleString('en-US')} dígitos escritos a mano, dice cuál es y con qué probabilidad, y abajo se ve cómo se encienden sus neuronas. Corre en tu navegador: el dibujo no sale de esta página.`}
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
        </div>
      </div>

      <div style={{ marginTop: space.xl }}>
        <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: space.sm, maxWidth: '64ch' }}>
          Adentro de la red. A la izquierda, tu dibujo como lo recibe: 784 números entre 0 y 1. Cada uno llega a
          las 64 neuronas del medio, y las que se encienden pasan su señal a los diez dígitos de la derecha. Las
          líneas azules empujan hacia un dígito y las naranjas lo frenan.
        </div>
        <DiagramaRed red={red} entrada={entrada} act={act} neurona={neurona} onNeurona={setNeurona} />
        <Neurona red={red} act={act} neurona={neurona} />
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
        {(data.exactitud_test * 100).toFixed(1)}%. Las neuronas del medio tampoco las diseñó nadie: cada una terminó
        respondiendo a un patrón de trazos, y ninguna equivale a un dígito. Antes de leer tu dibujo, la página lo
        prepara como se preparó el conjunto original: lo recorta, lo lleva a una caja de 20 × 20 y lo centra. Por
        eso da lo mismo dónde dibujes y de qué tamaño.
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

// ---- network diagram --------------------------------------------------------

// Logical coordinates; the canvas scales to its CSS width.
const D = { ancho: 760, alto: 400 }
const CELDA = 10
const GRILLA = { x: 20, y: 70 } // top-left of the 28x28 input
const OCULTA = { xs: [440, 464], y0: 44, y1: 384, r: 4.5 }
const SALIDA = { x: 640, y0: 62, paso: 32, r: 12 }

const AZUL = rgb(chart.line[0])
const NARANJA = rgb(chart.line[1])
const GRIS = rgb(chart.tick)

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgba = ([r, g, b]: [number, number, number], a: number) => `rgba(${r},${g},${b},${a})`
/** White paper → full colour, for neuron fills. */
const tinte = ([r, g, b]: [number, number, number], t: number) =>
  `rgb(${Math.round(255 + (r - 255) * t)},${Math.round(255 + (g - 255) * t)},${Math.round(255 + (b - 255) * t)})`

function posOculta(j: number) {
  const col = j % 2
  const fila = Math.floor(j / 2)
  return { x: OCULTA.xs[col], y: OCULTA.y0 + (fila * (OCULTA.y1 - OCULTA.y0)) / 31 }
}
const posSalida = (k: number) => ({ x: SALIDA.x, y: SALIDA.y0 + k * SALIDA.paso })

function DiagramaRed({
  red,
  entrada,
  act,
  neurona,
  onNeurona,
}: {
  red: Red
  entrada: Float32Array | null
  act: Activaciones | null
  neurona: number | null
  onNeurona: (j: number | null) => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    if (c.width !== D.ancho * dpr) {
      c.width = D.ancho * dpr
      c.height = D.alto * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    dibujarRed(ctx, red, entrada, act, neurona, getComputedStyle(c).fontFamily)
  }, [red, entrada, act, neurona])

  const elegir = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * D.ancho
    const y = ((e.clientY - r.top) / r.height) * D.alto
    let mejor: number | null = null
    let dmin = 9
    for (let j = 0; j < red.oculta; j++) {
      const p = posOculta(j)
      const d = Math.hypot(p.x - x, p.y - y)
      if (d < dmin) {
        dmin = d
        mejor = j
      }
    }
    if (mejor !== null) onNeurona(mejor)
  }

  return (
    <canvas
      ref={ref}
      aria-label="Diagrama de la red: 784 entradas, 64 neuronas ocultas y 10 salidas, con sus activaciones"
      onPointerDown={elegir}
      onPointerMove={(e) => e.pointerType === 'mouse' && elegir(e)}
      style={{
        width: '100%',
        aspectRatio: `${D.ancho} / ${D.alto}`,
        display: 'block',
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
      }}
    />
  )
}

function dibujarRed(
  ctx: CanvasRenderingContext2D,
  red: Red,
  entrada: Float32Array | null,
  act: Activaciones | null,
  sel: number | null,
  fuente: string,
) {
  ctx.clearRect(0, 0, D.ancho, D.alto)
  const h = act?.oculta
  const maxH = h ? Math.max(1e-6, ...h) : 1

  // Titles
  ctx.fillStyle = rgba(GRIS, 1)
  ctx.font = `13px ${fuente}`
  ctx.textAlign = 'center'
  ctx.fillText('Entrada · 784 números', GRILLA.x + (LADO * CELDA) / 2, 50)
  ctx.fillText('Capa oculta · 64 neuronas', (OCULTA.xs[0] + OCULTA.xs[1]) / 2, 24)
  ctx.fillText('Salida · 10 dígitos', SALIDA.x + 22, 24)

  // Input grid
  const borde = GRILLA.x + LADO * CELDA
  for (let y = 0; y < LADO; y++)
    for (let x = 0; x < LADO; x++) {
      const v = entrada ? entrada[y * LADO + x] : 0
      ctx.fillStyle = tinte([20, 20, 20], v)
      ctx.fillRect(GRILLA.x + x * CELDA, GRILLA.y + y * CELDA, CELDA, CELDA)
    }
  ctx.strokeStyle = rgba(GRIS, 0.4)
  ctx.lineWidth = 1
  ctx.strokeRect(GRILLA.x + 0.5, GRILLA.y + 0.5, LADO * CELDA - 1, LADO * CELDA - 1)

  // Input → hidden: every pixel feeds every neuron; four anchors stand for the bundle.
  const anclas = [0, 1 / 3, 2 / 3, 1].map((t) => GRILLA.y + t * LADO * CELDA)
  for (let j = 0; j < red.oculta; j++) {
    const p = posOculta(j)
    const a = h ? h[j] / maxH : 0
    ctx.strokeStyle = a > 0 ? rgba(AZUL, 0.05 + 0.3 * a) : rgba(GRIS, 0.05)
    ctx.lineWidth = a > 0 ? 0.6 + a : 0.5
    for (const y of anclas) {
      ctx.beginPath()
      ctx.moveTo(borde, y)
      ctx.lineTo(p.x - OCULTA.r, p.y)
      ctx.stroke()
    }
  }

  // Hidden → output, weighted by what each active neuron actually contributes.
  if (h) {
    let maxC = 1e-6
    for (let j = 0; j < red.oculta; j++)
      for (let k = 0; k < red.salida; k++) maxC = Math.max(maxC, Math.abs(h[j] * pesoDeSalida(red, j, k)))
    for (let j = 0; j < red.oculta; j++) {
      if (h[j] === 0) continue
      const p = posOculta(j)
      for (let k = 0; k < red.salida; k++) {
        const c = h[j] * pesoDeSalida(red, j, k)
        const a = Math.abs(c) / maxC
        if (a < 0.04) continue
        const q = posSalida(k)
        ctx.strokeStyle = rgba(c > 0 ? AZUL : NARANJA, 0.1 + 0.7 * a)
        ctx.lineWidth = 0.5 + 2 * a
        ctx.beginPath()
        ctx.moveTo(p.x + OCULTA.r, p.y)
        ctx.lineTo(q.x - SALIDA.r, q.y)
        ctx.stroke()
      }
    }
  } else {
    ctx.strokeStyle = rgba(GRIS, 0.06)
    ctx.lineWidth = 0.5
    for (let j = 0; j < red.oculta; j++)
      for (let k = 0; k < red.salida; k++) {
        const p = posOculta(j)
        const q = posSalida(k)
        ctx.beginPath()
        ctx.moveTo(p.x + OCULTA.r, p.y)
        ctx.lineTo(q.x - SALIDA.r, q.y)
        ctx.stroke()
      }
  }

  // Hidden neurons
  for (let j = 0; j < red.oculta; j++) {
    const p = posOculta(j)
    ctx.beginPath()
    ctx.arc(p.x, p.y, j === sel ? OCULTA.r + 1.5 : OCULTA.r, 0, 2 * Math.PI)
    ctx.fillStyle = tinte(AZUL, h ? h[j] / maxH : 0)
    ctx.fill()
    ctx.strokeStyle = j === sel ? rgba(NARANJA, 1) : rgba(GRIS, 0.6)
    ctx.lineWidth = j === sel ? 2 : 0.8
    ctx.stroke()
  }

  // Outputs
  const ganador = act ? masProbable(act.probs) : -1
  ctx.textAlign = 'left'
  for (let k = 0; k < red.salida; k++) {
    const q = posSalida(k)
    const p = act ? act.probs[k] : 0
    ctx.beginPath()
    ctx.arc(q.x, q.y, SALIDA.r, 0, 2 * Math.PI)
    ctx.fillStyle = tinte(NARANJA, p)
    ctx.fill()
    ctx.strokeStyle = rgba(GRIS, 0.7)
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = rgba(k === ganador ? [20, 20, 20] : GRIS, 1)
    ctx.font = `${k === ganador ? 'bold ' : ''}15px ${fuente}`
    ctx.fillText(String(k), q.x + SALIDA.r + 10, q.y + 5)
    if (act) {
      ctx.font = `13px ${fuente}`
      ctx.fillText(fmtPct(p), q.x + SALIDA.r + 30, q.y + 5)
    }
  }
}

/** What one hidden neuron responds to: its 784 incoming weights as a 28x28 map. */
function Neurona({ red, act, neurona }: { red: Red; act: Activaciones | null; neurona: number | null }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx || neurona === null) return
    const w = pesosDeNeurona(red, neurona)
    const max = Math.max(1e-6, ...Array.from(w, Math.abs))
    const img = new ImageData(LADO, LADO)
    for (let i = 0; i < w.length; i++) {
      const t = Math.min(1, Math.abs(w[i]) / max)
      const [r, g, b] = w[i] > 0 ? AZUL : NARANJA
      img.data.set([255 + (r - 255) * t, 255 + (g - 255) * t, 255 + (b - 255) * t, 255], i * 4)
    }
    ctx.putImageData(img, 0, 0)
  }, [red, neurona])

  if (neurona === null)
    return (
      <p style={{ fontSize: 13, color: colors.textMuted, margin: `${space.sm}px 0 0` }}>
        Tocá una neurona de la capa oculta para ver a qué patrón responde.
      </p>
    )

  const a = act?.oculta[neurona] ?? 0
  return (
    <div style={{ display: 'flex', gap: space.md, alignItems: 'center', marginTop: space.md }}>
      <canvas
        ref={ref}
        width={LADO}
        height={LADO}
        aria-label={`Pesos de entrada de la neurona ${neurona + 1}`}
        style={{
          width: 84,
          height: 84,
          imageRendering: 'pixelated',
          border: `1px solid ${colors.border}`,
          borderRadius: radius.sm,
          flex: 'none',
        }}
      />
      <span style={{ fontSize: 13, color: colors.textMuted, maxWidth: '52ch' }}>
        Neurona {neurona + 1} de 64. Se enciende cuando hay tinta en las zonas azules y se apaga con tinta en las
        naranjas. {act ? (a > 0 ? 'Con tu dibujo está encendida.' : 'Con tu dibujo está apagada.') : ''}
      </span>
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
