import { ErrorBoundary } from './components/ErrorBoundary'
import { IdentidadProvider } from './lib/identidad'
import { HomePage } from './pages/HomePage'
import { PanelPage } from './pages/PanelPage'
import { RecursosPage } from './pages/RecursosPage'
import { SesionPage } from './pages/SesionPage'
import { hrefFor, useHashRoute } from './router'

export default function App() {
  const route = useHashRoute()
  return (
    <IdentidadProvider>
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
        <ErrorBoundary que="esta página">
          {route.page === 'home' && <HomePage />}
          {route.page === 'sesion' && <SesionPage n={route.n} />}
          {route.page === 'recursos' && <RecursosPage />}
          {route.page === 'panel' && <PanelPage />}
        </ErrorBoundary>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p className="footer-note">
            Curso dictado por Matías Podeley. Los ejercicios de este sitio corren enteros en tu
            navegador. Lo único que viaja al servidor del curso es lo que enviás a propósito: la
            encuesta, los pulsos en vivo y las respuestas abiertas.
          </p>
        </div>
      </footer>
    </IdentidadProvider>
  )
}
