import { ErrorBoundary } from './components/ErrorBoundary'
import { apiHabilitada } from './lib/config'
import { IdentidadProvider } from './lib/identidad'
import { AgentesNubePage } from './pages/AgentesNubePage'
import { GuiaAgentesPage } from './pages/GuiaAgentesPage'
import { HomePage } from './pages/HomePage'
import { IaReservoriosPage } from './pages/IaReservoriosPage'
import { PanelPage } from './pages/PanelPage'
import { PreguntasPage } from './pages/PreguntasPage'
import { RecursosPage } from './pages/RecursosPage'
import { RepasoPage } from './pages/RepasoPage'
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
            <a href={hrefFor({ page: 'repaso' })}>Repaso</a>
            <a href={hrefFor({ page: 'recursos' })}>Recursos</a>
            <a href={hrefFor({ page: 'preguntas' })}>Preguntas</a>
            <a href={hrefFor({ page: 'agentes-nube' })}>Agentes en la nube</a>
            <a href={hrefFor({ page: 'ia-reservorios' })}>IA en reservorios</a>
          </nav>
        </div>
      </header>

      <main>
        <ErrorBoundary que="esta página">
          {route.page === 'home' && <HomePage />}
          {route.page === 'sesion' && <SesionPage n={route.n} />}
          {route.page === 'recursos' && <RecursosPage />}
          {route.page === 'preguntas' && <PreguntasPage />}
          {route.page === 'agentes-nube' && <AgentesNubePage />}
          {route.page === 'ia-reservorios' && <IaReservoriosPage />}
          {route.page === 'guia-agentes' && <GuiaAgentesPage />}
          {route.page === 'repaso' && <RepasoPage />}
          {route.page === 'panel' && <PanelPage />}
        </ErrorBoundary>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          {apiHabilitada ? (
            <p className="footer-note">
              Curso dictado por Matías Podeley, con Martín Alvarado. Los ejercicios de este sitio corren enteros en tu
              navegador. Lo único que viaja al servidor del curso es lo que enviás a propósito (la
              encuesta, los pulsos en vivo y las respuestas abiertas) junto con el nombre que
              escribiste al entrar con el PIN.
            </p>
          ) : (
            <p className="footer-note">
              Curso dictado por Matías Podeley, con Martín Alvarado. Todo este sitio corre en tu
              navegador: lo que escribís en los ejercicios queda guardado en tu computadora y no se
              manda a ningún servidor.
            </p>
          )}
        </div>
      </footer>
    </IdentidadProvider>
  )
}
