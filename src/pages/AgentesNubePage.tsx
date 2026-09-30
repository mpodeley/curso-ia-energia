import { lazy } from 'react'
import { ExtraPage } from './ExtraPage'

const Cuerpo = lazy(() => import('../content/agentes-nube.mdx'))

export function AgentesNubePage() {
  return (
    <ExtraPage
      kicker="Preguntas de la cohorte · septiembre de 2026"
      titulo="Agentes en la nube, gratis o baratos, sin instalar nada"
      Cuerpo={Cuerpo}
      anterior={{ route: { page: 'preguntas' }, label: 'Preguntas' }}
      siguiente={{ route: { page: 'ia-reservorios' }, label: 'IA en reservorios' }}
    />
  )
}
