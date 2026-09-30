import { Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { Loading } from '../components/ui'
import { hrefFor, type Route } from '../router'

// Pages outside the eight sessions (cohort questions, cloud agents). The body
// is MDX in src/content/ so scripts/check_links.py checks its links like a
// session's.
export function ExtraPage({
  kicker,
  titulo,
  Cuerpo,
  anterior,
  siguiente,
}: {
  kicker: string
  titulo: string
  Cuerpo: LazyExoticComponent<ComponentType>
  anterior: { route: Route; label: string }
  siguiente: { route: Route; label: string }
}) {
  return (
    <div className="wrap">
      <header className="sess-head">
        <p className="kicker">{kicker}</p>
        <h1>{titulo}</h1>
      </header>

      <article className="prose">
        <Suspense fallback={<Loading what="la página" />}>
          <Cuerpo />
        </Suspense>
      </article>

      <nav className="sess-nav" aria-label="Navegación">
        <a href={hrefFor(anterior.route)}>
          <span className="arw">←</span> {anterior.label}
        </a>
        <a href={hrefFor(siguiente.route)}>
          {siguiente.label} <span className="arw">→</span>
        </a>
      </nav>
    </div>
  )
}
