// Controles de formulario. Complementa ui.tsx en vez de engordarlo: ui.tsx es un
// port de simulador-subastas-peru y conviene que siga pareciéndose al original.
// Mismo idiom: estilos inline desde theme.ts, cero hex literal.

import type { ReactNode } from 'react'
import { colors, radius, space } from '../theme'

const etiqueta: React.CSSProperties = {
  display: 'block',
  color: colors.textPrimary,
  fontSize: 15,
  lineHeight: 1.5,
  marginBottom: space.xs,
}

const ayudaStyle: React.CSSProperties = {
  color: colors.textDim,
  fontSize: 13,
  lineHeight: 1.5,
  marginBottom: space.sm,
}

export function Campo({
  label,
  ayuda,
  requerido,
  children,
}: {
  label: string
  ayuda?: string
  requerido?: boolean
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: space.xl }}>
      <span style={etiqueta}>
        {label}
        {!requerido && (
          <span style={{ color: colors.textDim, fontSize: 13, fontWeight: 400 }}> (opcional)</span>
        )}
      </span>
      {ayuda && <p style={ayudaStyle}>{ayuda}</p>}
      {children}
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength = 300,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  maxLength?: number
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%' }}
    />
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  filas = 3,
  maxLength = 2000,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  filas?: number
  maxLength?: number
}) {
  return (
    <textarea
      value={value}
      rows={filas}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit' }}
    />
  )
}

const opcionStyle = (elegida: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: space.sm,
  padding: `${space.sm}px ${space.md}px`,
  marginBottom: space.xs,
  border: `1px solid ${elegida ? colors.accent.orange : colors.border}`,
  borderRadius: radius.md,
  background: elegida ? colors.surfaceAlt : colors.surface,
  cursor: 'pointer',
  fontSize: 15,
  lineHeight: 1.45,
})

export function RadioGroup({
  name,
  opciones,
  value,
  onChange,
}: {
  name: string
  opciones: string[]
  value: number | undefined
  onChange: (i: number) => void
}) {
  return (
    <div role="radiogroup">
      {opciones.map((texto, i) => (
        <label key={i} style={opcionStyle(value === i)}>
          <input
            type="radio"
            name={name}
            checked={value === i}
            onChange={() => onChange(i)}
            style={{ margin: 0 }}
          />
          <span>{texto}</span>
        </label>
      ))}
    </div>
  )
}

export function CheckboxGroup({
  opciones,
  value = [],
  onChange,
}: {
  opciones: string[]
  value: number[] | undefined
  onChange: (v: number[]) => void
}) {
  const alternar = (i: number) =>
    onChange(value.includes(i) ? value.filter((x) => x !== i) : [...value, i].sort((a, b) => a - b))

  return (
    <div>
      {opciones.map((texto, i) => (
        <label key={i} style={opcionStyle(value.includes(i))}>
          <input
            type="checkbox"
            checked={value.includes(i)}
            onChange={() => alternar(i)}
            style={{ margin: 0 }}
          />
          <span>{texto}</span>
        </label>
      ))}
    </div>
  )
}

/** What a live-form component renders in a build without VITE_API_URL. Never
 *  return null there: the surrounding MDX prose introduces the form, and prose
 *  that points at nothing reads as a broken page. */
export function NotaSinServidor({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div
      style={{
        background: colors.surfaceAlt,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding: space.lg,
        margin: `${space.xxl}px 0`,
      }}
    >
      <p style={{ margin: 0, color: colors.textMuted, fontSize: 14, lineHeight: 1.5 }}>
        <strong style={{ color: colors.textPrimary }}>{titulo}</strong> {children}
      </p>
    </div>
  )
}

export type EstadoEnvio = 'listo' | 'enviando' | 'enviado' | 'local' | 'error'

/** El cartel de estado. "local" no es un error y no se muestra como tal: la
 *  respuesta está a salvo en el navegador y se va a reintentar sola. */
export function Aviso({ estado, mensaje }: { estado: EstadoEnvio; mensaje?: string }) {
  if (estado === 'listo' || estado === 'enviando') return null

  const color =
    estado === 'enviado' ? colors.status.ok : estado === 'local' ? colors.status.warn : colors.status.err
  const texto =
    estado === 'enviado'
      ? 'Listo, lo recibí.'
      : estado === 'local'
        ? 'Guardado en tu navegador, todavía sin enviar. Lo reintento solo.'
        : (mensaje ?? 'No se pudo enviar.')

  return (
    <p
      role="status"
      style={{
        color,
        fontSize: 14,
        lineHeight: 1.5,
        margin: `${space.sm}px 0 0`,
        display: 'flex',
        gap: space.sm,
      }}
    >
      <span aria-hidden="true">{estado === 'enviado' ? '✓' : '·'}</span>
      <span>{texto}</span>
    </p>
  )
}

export function EnviarButton({
  estado,
  onClick,
  children = 'Enviar',
  disabled,
}: {
  estado: EstadoEnvio
  onClick: () => void
  children?: ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      className="btn"
      onClick={onClick}
      disabled={disabled || estado === 'enviando'}
      style={{ opacity: disabled ? 0.55 : 1 }}
    >
      {estado === 'enviando' ? 'Enviando…' : children}
    </button>
  )
}
