import { lazy } from 'react'
import { ExtraPage } from './ExtraPage'

const Cuerpo = lazy(() => import('../content/repaso.mdx'))

export function RepasoPage() {
  return (
    <ExtraPage
      kicker="Repaso · días 1 y 2"
      titulo="De los LLM a los agentes, en un recorrido"
      Cuerpo={Cuerpo}
      anterior={{ route: { page: 'sesion', n: 4 }, label: 'Sesión 4' }}
      siguiente={{ route: { page: 'sesion', n: 5 }, label: 'Sesión 5' }}
    />
  )
}
