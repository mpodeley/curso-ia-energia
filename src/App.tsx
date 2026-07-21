import { HomePage } from './pages/HomePage'
import { RecursosPage } from './pages/RecursosPage'
import { SesionPage } from './pages/SesionPage'
import { hrefFor, useHashRoute } from './router'

export default function App() {
  const route = useHashRoute()
  return (
    <>
      <header className="masthead">
        <div className="wrap masthead-inner">
          <a className="brand" href={hrefFor({ page: 'home' })}>
            <span className="name">IA generativa · petróleo y gas</span>
          </a>
          <nav className="nav" aria-label="Principal">
            <a href={hrefFor({ page: 'home' })}>Programa</a>
            <a href={hrefFor({ page: 'recursos' })}>Recursos</a>
          </nav>
        </div>
      </header>

      <main>
        {route.page === 'home' && <HomePage />}
        {route.page === 'sesion' && <SesionPage n={route.n} />}
        {route.page === 'recursos' && <RecursosPage />}
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p className="footer-note">
            Curso dictado por Matías Podeley —{' '}
            <a href="https://podeley.ar" target="_blank" rel="noreferrer">
              podeley.ar
            </a>
            . Los ejercicios de este sitio corren enteros en tu navegador: no envían datos a ningún lado.
          </p>
        </div>
      </footer>
    </>
  )
}
