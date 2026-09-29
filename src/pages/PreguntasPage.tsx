import { lazy, Suspense } from 'react'
import { Loading } from '../components/ui'
import { hrefFor } from '../router'

// Questions the cohort left open, answered after the session. The body is MDX
// in src/content/ so scripts/check_links.py checks its links like a session's.
const Cuerpo = lazy(() => import('../content/preguntas.mdx'))

export function PreguntasPage() {
  return (
    <div className="wrap">
      <header className="sess-head">
        <p className="kicker">Preguntas de la cohorte · septiembre de 2026</p>
        <h1>Agentes en la PC de la empresa, e IA dentro del software de reservorios</h1>
      </header>

      <article className="prose">
        <Suspense fallback={<Loading what="la página" />}>
          <Cuerpo />
        </Suspense>
      </article>

      <nav className="sess-nav" aria-label="Navegación">
        <a href={hrefFor({ page: 'home' })}>
          <span className="arw">←</span> Programa
        </a>
        <a href={hrefFor({ page: 'recursos' })}>
          Recursos <span className="arw">→</span>
        </a>
      </nav>
    </div>
  )
}
