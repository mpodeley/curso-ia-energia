import { lazy } from 'react'
import { ExtraPage } from './ExtraPage'

const Cuerpo = lazy(() => import('../content/guia-agentes.mdx'))

export function GuiaAgentesPage() {
  return (
    <ExtraPage
      kicker="Guía para llevarse · sesión 7"
      titulo="IA y agentes en el trabajo: guía práctica de riesgos y controles"
      Cuerpo={Cuerpo}
      anterior={{ route: { page: 'home' }, label: 'Programa' }}
      siguiente={{ route: { page: 'sesion', n: 7 }, label: 'Sesión 7' }}
    />
  )
}
