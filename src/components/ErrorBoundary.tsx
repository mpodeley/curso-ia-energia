// Corta la propagación de un error de render.
//
// Existe por una razón concreta: la página de la sesión se proyecta en vivo. Un
// bug en un formulario nuevo no puede dejar en blanco la prosa, el quiz y los
// nueve ejercicios que sí funcionan.

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { colors, radius, space } from '../theme'

type Props = { children: ReactNode; que?: string }
type State = { fallo: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { fallo: false }

  static getDerivedStateFromError(): State {
    return { fallo: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary', this.props.que ?? '', error, info)
  }

  render() {
    if (!this.state.fallo) return this.props.children
    return (
      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: space.lg,
          margin: `${space.lg}px 0`,
          color: colors.textMuted,
          fontSize: 14,
        }}
      >
        No pude mostrar {this.props.que ?? 'esta parte'}. El resto de la página sigue funcionando;
        recargá si querés reintentar.
      </div>
    )
  }
}
