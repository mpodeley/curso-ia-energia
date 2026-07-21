import { Suspense } from 'react'
import { Loading } from '../components/ui'
import { MDX_SESIONES, SESIONES } from '../content/programa'
import { hrefFor } from '../router'

export function SesionPage({ n }: { n: number }) {
  const sesion = SESIONES.find((s) => s.n === n)
  if (!sesion) return null
  const Cuerpo = MDX_SESIONES[n]
  const prev = SESIONES.find((s) => s.n === n - 1)
  const next = SESIONES.find((s) => s.n === n + 1)

  return (
    <div className="wrap">
      <header className="sess-head">
        <p className="kicker">
          Sesión {sesion.n} de {SESIONES.length} · 2 h en vivo
          {sesion.estado === 'en-preparacion' && <span className="tag t-status">en preparación</span>}
        </p>
        <h1>{sesion.titulo}</h1>
        <div className="objetivos">
          <p className="eyebrow">Al final de esta sesión vas a poder</p>
          <ul>
            {sesion.objetivos.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      </header>

      <article className="prose">
        <Suspense fallback={<Loading what="la sesión" />}>
          <Cuerpo />
        </Suspense>
      </article>

      <nav className="sess-nav" aria-label="Navegación entre sesiones">
        {prev ? (
          <a href={hrefFor({ page: 'sesion', n: prev.n })}>
            <span className="arw">←</span> S{prev.n} · {prev.titulo}
          </a>
        ) : (
          <a href={hrefFor({ page: 'home' })}>
            <span className="arw">←</span> Programa
          </a>
        )}
        {next && (
          <a href={hrefFor({ page: 'sesion', n: next.n })}>
            S{next.n} · {next.titulo} <span className="arw">→</span>
          </a>
        )}
      </nav>
    </div>
  )
}
