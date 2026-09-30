import { lazy } from 'react'
import { ExtraPage } from './ExtraPage'

const Cuerpo = lazy(() => import('../content/preguntas.mdx'))

export function PreguntasPage() {
  return (
    <ExtraPage
      kicker="Preguntas de la cohorte · septiembre de 2026"
      titulo="Un agente en la PC de la empresa, sin permiso de administrador"
      Cuerpo={Cuerpo}
      anterior={{ route: { page: 'home' }, label: 'Programa' }}
      siguiente={{ route: { page: 'agentes-nube' }, label: 'Agentes en la nube' }}
    />
  )
}
