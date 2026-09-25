// Canvas helpers shared by the two MNIST network diagrams. Canvas fill and
// stroke styles can't resolve var(), so colours come from theme.chart hex.
import { chart } from '../theme'

export type Rgb = [number, number, number]

export function rgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export const AZUL = rgb(chart.line[0])
export const NARANJA = rgb(chart.line[1])
export const GRIS = rgb(chart.tick)
export const TINTA: Rgb = [20, 20, 20]

export const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a})`

/** White paper → full colour at t = 1. */
export const tinte = ([r, g, b]: Rgb, t: number) =>
  `rgb(${Math.round(255 + (r - 255) * t)},${Math.round(255 + (g - 255) * t)},${Math.round(255 + (b - 255) * t)})`

/** Size a canvas for its logical dimensions at the screen's pixel density and return its context. */
export function prepararLienzo(c: HTMLCanvasElement, ancho: number, alto: number): CanvasRenderingContext2D | null {
  const ctx = c.getContext('2d')
  if (!ctx) return null
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  if (c.width !== ancho * dpr) {
    c.width = ancho * dpr
    c.height = alto * dpr
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, ancho, alto)
  return ctx
}

/** Pointer position in the canvas's logical coordinates. */
export function enLienzo(e: React.PointerEvent<HTMLCanvasElement>, ancho: number, alto: number) {
  const r = e.currentTarget.getBoundingClientRect()
  return { x: ((e.clientX - r.left) / r.width) * ancho, y: ((e.clientY - r.top) / r.height) * alto }
}
