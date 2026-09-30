import { lazy } from 'react'
import { ExtraPage } from './ExtraPage'

const Cuerpo = lazy(() => import('../content/preguntas.mdx'))

export function PreguntasPage() {
  return (
    <ExtraPage
      kicker="Preguntas de la cohorte · septiembre de 2026"
      titulo="Agentes en la PC de la empresa, e IA dentro del software de reservorios"
      Cuerpo={Cuerpo}
      anterior={{ route: { page: 'home' }, label: 'Programa' }}
      siguiente={{ route: { page: 'agentes-nube' }, label: 'Agentes en la nube' }}
    />
  )
}
