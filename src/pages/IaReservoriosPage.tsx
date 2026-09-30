import { lazy } from 'react'
import { ExtraPage } from './ExtraPage'

const Cuerpo = lazy(() => import('../content/ia-reservorios.mdx'))

export function IaReservoriosPage() {
  return (
    <ExtraPage
      kicker="Preguntas de la cohorte · septiembre de 2026"
      titulo="IA dentro de tNavigator, Petrel e INTERSECT"
      Cuerpo={Cuerpo}
      anterior={{ route: { page: 'agentes-nube' }, label: 'Agentes en la nube' }}
      siguiente={{ route: { page: 'recursos' }, label: 'Recursos' }}
    />
  )
}
