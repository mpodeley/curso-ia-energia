import { useEffect, useMemo, useRef, useState } from 'react'
import { Ejercicio, Solucion } from '../components/Ejercicio'
import { Loading } from '../components/ui'
import { AZUL, GRIS, NARANJA, TINTA, enLienzo, prepararLienzo, rgba, tinte } from '../components/lienzo'
import {
  LADO,
  decodificar,
  decodificarGenerativa,
  estilosAlAzar,
  imaginar,
  imaginarPorDentro,
  masProbable,
  predecir,
  trazoDeNeurona,
  type Dibujo,
  type Generadora,
} from '../engine/digitos'
import { makeRng } from '../engine/sampling'
import { useRedDigitos, useRedGenerativa } from '../hooks/useData'
import { useExerciseState } from '../hooks/useExerciseState'
import { colors, radius, space } from '../theme'

// The network in reverse. Pick a digit and move a point on the style square:
// the generator draws it live, and the diagram below shows the twelve inputs,
// the 256 hidden neurons lighting up and the 784 output pixels. The square's
// background is the map itself: the same digit drawn at a 10x10 grid of styles.
// Sixteen random styles (seeded, so a screen-shared run reproduces) sit below;
// the reading network from the exercise above checks every drawing.

const CANTIDAD = 16
const PAD = 280 // style square, logical px
const RANGO = 2.5 // style numbers shown from -RANGO to +RANGO
const TESELAS = 10 // 10 x 10 tiles of 28 px = 280

const aEstilo = (x: number, y: number) => [(x / PAD) * 2 * RANGO - RANGO, RANGO - (y / PAD) * 2 * RANGO]
const aPad = (e1: number, e2: number) => ({ x: ((e1 + RANGO) / (2 * RANGO)) * PAD, y: ((RANGO - e2) / (2 * RANGO)) * PAD })
const fmtPct = (p: number) => `${Math.round(p * 100)}%`
const fmtNum = (v: number) => (v >= 0 ? '+' : '') + v.toFixed(1)

export function RedAlReves({ sesion = 1 }: { sesion?: number }) {
  const gen = useRedGenerativa()
  const lectora = useRedDigitos()
  const [st, patch, reset] = useExerciseState('red-al-reves', { digito: 3, semilla: 1, e1: 0, e2: 0 })
  const [neurona, setNeurona] = useState<number | null>(null)

  const g = useMemo(() => (gen.data ? decodificarGenerativa(gen.data) : null), [gen.data])
  const red = useMemo(() => (lectora.data ? decodificar(lectora.data) : null), [lectora.data])

  const actual = useMemo(() => (g ? imaginarPorDentro(g, st.digito, [st.e1, st.e2]) : null), [g, st.digito, st.e1, st.e2])
  const lectura = useMemo(() => {
    if (!red || !actual) return null
    const p = predecir(red, actual.img)
    const d = masProbable(p)
    return { d, p: p[d] }
  }, [red, actual])

  const muestras = useMemo(() => {
    if (!g) return []
    return estilosAlAzar(makeRng(st.semilla * 1009 + st.digito), CANTIDAD, g.estilo).map((e) => {
      const img = imaginar(g, st.digito, e)
      return { e, img, lee: red ? masProbable(predecir(red, img)) : null }
    })
  }, [g, red, st.digito, st.semilla])

  if (gen.loading || lectora.loading) return <Loading what="la red" />
  if (gen.error || !g || !actual) return <div style={{ color: colors.status.err }}>No se pudo cargar la red.</div>

  const boton = (activo: boolean): React.CSSProperties => ({
    minWidth: 36,
    borderColor: activo ? colors.accent.orange : colors.border,
    color: activo ? colors.accent.orange : colors.textSecondary,
  })

  return (
    <Ejercicio
      titulo="La red al revés: pedile un dígito y lo dibuja"
      sesion={sesion}
      intro="Elegí un dígito y mové el punto en el cuadrado de estilos. Otra red, entrenada con los mismos 60,000 dígitos, lo dibuja en vivo, y abajo se ve cómo se encienden sus neuronas. La red del ejercicio de arriba lee cada dibujo."
      onReset={reset}
    >
      <div style={{ display: 'flex', gap: space.xs, flexWrap: 'wrap', marginBottom: space.md }}>
        {Array.from({ length: 10 }, (_, d) => (
          <button key={d} type="button" className="tbtn" style={boton(st.digito === d)} onClick={() => patch({ digito: d })}>
            {d}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: space.xl, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ width: PAD, maxWidth: '100%' }}>
          <CuadradoDeEstilos g={g} digito={st.digito} e1={st.e1} e2={st.e2} onMover={(e1, e2) => patch({ e1, e2 })} />
          <div style={{ fontSize: 13, color: colors.textMuted, marginTop: space.sm }}>
            Cuadrado de estilos: cada punto es una manera de escribir el {st.digito}.
          </div>
        </div>
        <div style={{ width: PAD, maxWidth: '100%' }}>
          <Imagen img={actual.img} etiqueta={`El ${st.digito} que dibujó la red`} />
          <div style={{ fontSize: 13, color: colors.textMuted, marginTop: space.sm }}>
            {lectura ? `La red de arriba lo lee como un ${lectura.d}, con ${fmtPct(lectura.p)}.` : 'Lo que dibujó la red.'}
          </div>
        </div>
      </div>

      <div style={{ marginTop: space.xl }}>
        <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: space.sm, maxWidth: '64ch' }}>
          Adentro de la red. A la izquierda, lo que recibe: los dos números de estilo y el dígito, marcado con un 1
          entre diez ceros. En el medio, las 256 neuronas que se encienden. A la derecha, los 784 píxeles que salen.
        </div>
        <DiagramaGenerativa
          g={g}
          digito={st.digito}
          e1={st.e1}
          e2={st.e2}
          dibujo={actual}
          neurona={neurona}
          onNeurona={setNeurona}
        />
        <TrazoDeNeurona g={g} dibujo={actual} neurona={neurona} />
      </div>

      <div style={{ marginTop: space.xl }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: space.md, flexWrap: 'wrap', marginBottom: space.sm }}>
          <span style={{ fontSize: 13, color: colors.textMuted }}>
            Dieciséis a la vez, con estilos al azar. Tocá uno para llevar el punto ahí.
          </span>
          <button type="button" className="tbtn" onClick={() => patch({ semilla: st.semilla + 1 })}>
            Imaginar otros
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: space.sm }}>
          {muestras.map((m, i) => (
            <figure
              key={i}
              style={{ margin: 0, textAlign: 'center', cursor: 'pointer' }}
              onClick={() => patch({ e1: m.e[0], e2: m.e[1] })}
            >
              <Imagen img={m.img} etiqueta={`Un ${st.digito} dibujado por la red`} />
              {m.lee !== null && (
                <figcaption
                  style={{ fontSize: 12, color: m.lee === st.digito ? colors.textMuted : colors.status.err, marginTop: 2 }}
                >
                  lee {m.lee}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      <Solucion>
        Esta red recibe doce números: dos de estilo, que son las coordenadas del punto en el cuadrado, y el dígito,
        marcado con un 1 entre diez ceros. Al entrenarla, otra red comprimía cada dígito de MNIST en esos dos
        números y esta aprendía a redibujarlo a partir de ellos, así que el cuadrado terminó ordenando las maneras
        de escribir cada dígito. Ninguno de estos dibujos está en MNIST. Es IA generativa en miniatura. Un modelo de
        lenguaje hace lo mismo con texto: recibe un pedido, sortea, y escribe algo nuevo con la forma de lo que vio
        al entrenar.
      </Solucion>

      <p style={{ color: colors.textDim, fontSize: 12, margin: `${space.md}px 0 0` }}>
        fuente: {gen.meta.source}. Autoencoder variacional condicional entrenado para este curso con PyTorch.
      </p>
    </Ejercicio>
  )
}

function CuadradoDeEstilos({
  g,
  digito,
  e1,
  e2,
  onMover,
}: {
  g: Generadora
  digito: number
  e1: number
  e2: number
  onMover: (e1: number, e2: number) => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const arrastrando = useRef(false)

  // The map: the digit drawn at the centre of each of 10 x 10 tiles.
  const fondo = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = PAD
    c.height = PAD
    const ctx = c.getContext('2d')
    if (!ctx) return c
    const img = new ImageData(PAD, PAD)
    const paso = PAD / TESELAS
    for (let ty = 0; ty < TESELAS; ty++)
      for (let tx = 0; tx < TESELAS; tx++) {
        const d = imaginar(g, digito, aEstilo((tx + 0.5) * paso, (ty + 0.5) * paso))
        for (let y = 0; y < LADO; y++)
          for (let x = 0; x < LADO; x++) {
            const v = Math.round(255 * (1 - d[y * LADO + x]))
            img.data.set([v, v, v, 255], ((ty * paso + y) * PAD + tx * paso + x) * 4)
          }
      }
    ctx.putImageData(img, 0, 0)
    return c
  }, [g, digito])

  useEffect(() => {
    const c = ref.current
    const ctx = c && prepararLienzo(c, PAD, PAD)
    if (!c || !ctx) return
    ctx.globalAlpha = 0.45
    ctx.drawImage(fondo, 0, 0, PAD, PAD)
    ctx.globalAlpha = 1
    const { x, y } = aPad(e1, e2)
    ctx.strokeStyle = rgba(NARANJA, 0.5)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, PAD)
    ctx.moveTo(0, y)
    ctx.lineTo(PAD, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y, 9, 0, 2 * Math.PI)
    ctx.fillStyle = rgba(NARANJA, 0.9)
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [fondo, e1, e2])

  const mover = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = enLienzo(e, PAD, PAD)
    const [a, b] = aEstilo(Math.min(PAD, Math.max(0, x)), Math.min(PAD, Math.max(0, y)))
    onMover(Math.round(a * 100) / 100, Math.round(b * 100) / 100)
  }

  return (
    <canvas
      ref={ref}
      aria-label="Cuadrado de estilos: mové el punto para cambiar la manera de escribir el dígito"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        arrastrando.current = true
        mover(e)
      }}
      onPointerMove={(e) => arrastrando.current && mover(e)}
      onPointerUp={() => (arrastrando.current = false)}
      onPointerCancel={() => (arrastrando.current = false)}
      style={{
        width: '100%',
        aspectRatio: '1',
        display: 'block',
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        touchAction: 'none',
        cursor: 'grab',
      }}
    />
  )
}

// ---- network diagram --------------------------------------------------------

const D = { ancho: 760, alto: 310 }
const ENTRADA = { x: 110, y0: 48, paso: 22, r: 8 }
const OCULTA = { x0: 290, y0: 70, paso: 11, lado: 16, r: 4.2 }
const SALIDA = { x0: 520, y0: 48, celda: 8 }

const posEntrada = (i: number) => ({ x: ENTRADA.x, y: ENTRADA.y0 + i * ENTRADA.paso })
const posOculta = (j: number) => ({
  x: OCULTA.x0 + (j % OCULTA.lado) * OCULTA.paso,
  y: OCULTA.y0 + Math.floor(j / OCULTA.lado) * OCULTA.paso,
})

function DiagramaGenerativa({
  g,
  digito,
  e1,
  e2,
  dibujo,
  neurona,
  onNeurona,
}: {
  g: Generadora
  digito: number
  e1: number
  e2: number
  dibujo: Dibujo
  neurona: number | null
  onNeurona: (j: number) => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c && prepararLienzo(c, D.ancho, D.alto)
    if (!c || !ctx) return
    dibujarGenerativa(ctx, g, digito, [e1, e2], dibujo, neurona, getComputedStyle(c).fontFamily)
  }, [g, digito, e1, e2, dibujo, neurona])

  const elegir = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = enLienzo(e, D.ancho, D.alto)
    const col = Math.round((x - OCULTA.x0) / OCULTA.paso)
    const fila = Math.round((y - OCULTA.y0) / OCULTA.paso)
    if (col < 0 || col >= OCULTA.lado || fila < 0 || fila >= OCULTA.lado) return
    const j = fila * OCULTA.lado + col
    const p = posOculta(j)
    if (Math.hypot(p.x - x, p.y - y) < OCULTA.paso * 0.7) onNeurona(j)
  }

  return (
    <canvas
      ref={ref}
      aria-label="Diagrama de la red que dibuja: 12 entradas, 256 neuronas ocultas y 784 píxeles de salida, con sus activaciones"
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

function dibujarGenerativa(
  ctx: CanvasRenderingContext2D,
  g: Generadora,
  digito: number,
  estilo: number[],
  dibujo: Dibujo,
  sel: number | null,
  fuente: string,
) {
  const h = dibujo.oculta
  const maxH = Math.max(1e-6, ...h)
  const ladoOculta = (OCULTA.lado - 1) * OCULTA.paso
  const ladoSalida = LADO * SALIDA.celda

  ctx.fillStyle = rgba(GRIS, 1)
  ctx.font = `13px ${fuente}`
  ctx.textAlign = 'center'
  ctx.fillText('Entrada · 12 números', 70, 24)
  ctx.fillText('Capa oculta · 256 neuronas', OCULTA.x0 + ladoOculta / 2, 24)
  ctx.fillText('Salida · 784 píxeles', SALIDA.x0 + ladoSalida / 2, 24)

  // Inputs: the two style numbers, then the ten digits (one of them set to 1).
  const valores = [...estilo, ...Array.from({ length: 10 }, (_, d) => (d === digito ? 1 : 0))]
  const fuerza = (i: number) => (i < 2 ? Math.min(1, Math.abs(valores[i]) / RANGO) : valores[i])

  // Input → hidden: each input reaches all 256 neurons; six anchors stand for the bundle.
  const anclas = Array.from({ length: 6 }, (_, k) => OCULTA.y0 + (k * ladoOculta) / 5)
  valores.forEach((v, i) => {
    const p = posEntrada(i)
    const f = fuerza(i)
    ctx.strokeStyle = f > 0 ? rgba(i < 2 && v < 0 ? NARANJA : AZUL, 0.08 + 0.45 * f) : rgba(GRIS, 0.05)
    ctx.lineWidth = f > 0 ? 0.6 + 1.2 * f : 0.5
    for (const y of anclas) {
      ctx.beginPath()
      ctx.moveTo(p.x + ENTRADA.r, p.y)
      ctx.lineTo(OCULTA.x0 - OCULTA.r - 4, y)
      ctx.stroke()
    }
  })

  // Hidden → output: one bundle per row of neurons, as strong as the row is on.
  const filas = Array.from({ length: OCULTA.lado }, (_, f) => {
    let s = 0
    for (let c = 0; c < OCULTA.lado; c++) s += h[f * OCULTA.lado + c]
    return s
  })
  const maxFila = Math.max(1e-6, ...filas)
  const destinos = Array.from({ length: 5 }, (_, k) => SALIDA.y0 + (k * ladoSalida) / 4)
  filas.forEach((s, f) => {
    const y = OCULTA.y0 + f * OCULTA.paso
    const a = s / maxFila
    ctx.strokeStyle = rgba(AZUL, 0.04 + 0.35 * a)
    ctx.lineWidth = 0.5 + a
    for (const yd of destinos) {
      ctx.beginPath()
      ctx.moveTo(OCULTA.x0 + ladoOculta + OCULTA.r + 4, y)
      ctx.lineTo(SALIDA.x0 - 4, yd)
      ctx.stroke()
    }
  })

  // Input neurons, with their labels
  ctx.textAlign = 'right'
  valores.forEach((v, i) => {
    const p = posEntrada(i)
    ctx.beginPath()
    ctx.arc(p.x, p.y, ENTRADA.r, 0, 2 * Math.PI)
    ctx.fillStyle = i < 2 ? tinte(v < 0 ? NARANJA : AZUL, fuerza(i)) : tinte(NARANJA, v)
    ctx.fill()
    ctx.strokeStyle = rgba(GRIS, 0.7)
    ctx.lineWidth = 1
    ctx.stroke()
    const activo = i >= 2 && v === 1
    ctx.fillStyle = rgba(activo ? TINTA : GRIS, 1)
    ctx.font = `${activo ? 'bold ' : ''}13px ${fuente}`
    ctx.fillText(i < 2 ? `estilo ${i + 1}: ${fmtNum(v)}` : String(i - 2), p.x - ENTRADA.r - 8, p.y + 4)
  })

  // Hidden neurons
  for (let j = 0; j < g.oculta; j++) {
    const p = posOculta(j)
    ctx.beginPath()
    ctx.arc(p.x, p.y, j === sel ? OCULTA.r + 1.5 : OCULTA.r, 0, 2 * Math.PI)
    ctx.fillStyle = tinte(AZUL, h[j] / maxH)
    ctx.fill()
    ctx.strokeStyle = j === sel ? rgba(NARANJA, 1) : rgba(GRIS, 0.5)
    ctx.lineWidth = j === sel ? 2 : 0.7
    ctx.stroke()
  }

  // Output pixels
  for (let y = 0; y < LADO; y++)
    for (let x = 0; x < LADO; x++) {
      ctx.fillStyle = tinte(TINTA, dibujo.img[y * LADO + x])
      ctx.fillRect(SALIDA.x0 + x * SALIDA.celda, SALIDA.y0 + y * SALIDA.celda, SALIDA.celda, SALIDA.celda)
    }
  ctx.strokeStyle = rgba(GRIS, 0.4)
  ctx.lineWidth = 1
  ctx.strokeRect(SALIDA.x0 + 0.5, SALIDA.y0 + 0.5, ladoSalida - 1, ladoSalida - 1)
}

/** What one hidden neuron paints: its 784 outgoing weights as a 28x28 map. */
function TrazoDeNeurona({ g, dibujo, neurona }: { g: Generadora; dibujo: Dibujo; neurona: number | null }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx || neurona === null) return
    const w = trazoDeNeurona(g, neurona)
    const max = Math.max(1e-6, ...Array.from(w, Math.abs))
    const img = new ImageData(LADO, LADO)
    for (let i = 0; i < w.length; i++) {
      const t = Math.min(1, Math.abs(w[i]) / max)
      const [r, gg, b] = w[i] > 0 ? AZUL : NARANJA
      img.data.set([255 + (r - 255) * t, 255 + (gg - 255) * t, 255 + (b - 255) * t, 255], i * 4)
    }
    ctx.putImageData(img, 0, 0)
  }, [g, neurona])

  if (neurona === null)
    return (
      <p style={{ fontSize: 13, color: colors.textMuted, margin: `${space.sm}px 0 0` }}>
        Tocá una neurona de la capa oculta para ver qué trazo agrega al dibujo.
      </p>
    )

  const a = dibujo.oculta[neurona]
  return (
    <div style={{ display: 'flex', gap: space.md, alignItems: 'center', marginTop: space.md }}>
      <canvas
        ref={ref}
        width={LADO}
        height={LADO}
        aria-label={`Trazo que pinta la neurona ${neurona + 1}`}
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
        Neurona {neurona + 1} de 256. Cuando se enciende, suma tinta en las zonas azules y borra en las naranjas.{' '}
        {a > 0 ? 'Con este dígito y este estilo está encendida.' : 'Con este dígito y este estilo está apagada.'}
      </span>
    </div>
  )
}

function Imagen({ img, etiqueta }: { img: Float32Array; etiqueta: string }) {
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
      aria-label={etiqueta}
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
