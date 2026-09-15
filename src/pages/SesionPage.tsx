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
          Día {sesion.n} de {SESIONES.length} · 4 h en vivo
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
        {/* Rutas relativas sin barra inicial: es lo que resuelve bien con
            base:'./' bajo hash routing, tanto en Pages como en dev. */}
        {sesion.slides && (
          <p className="deck-links">
            <a href={`slides/sesion-${sesion.n}.html`} target="_blank" rel="noopener">
              Diapositivas de la sesión
            </a>
            <a href={`handouts/sesion-${sesion.n}.pdf`}>PDF para imprimir</a>
          </p>
        )}
      </header>

      <article className="prose">
        <Suspense fallback={<Loading what="la sesión" />}>
          <Cuerpo />
        </Suspense>
      </article>

      <nav className="sess-nav" aria-label="Navegación entre sesiones">
        {prev ? (
          <a href={hrefFor({ page: 'sesion', n: prev.n })}>
            <span className="arw">←</span> Día {prev.n} · {prev.titulo}
          </a>
        ) : (
          <a href={hrefFor({ page: 'home' })}>
            <span className="arw">←</span> Programa
          </a>
        )}
        {next && (
          <a href={hrefFor({ page: 'sesion', n: next.n })}>
            Día {next.n} · {next.titulo} <span className="arw">→</span>
          </a>
        )}
      </nav>
    </div>
  )
}
