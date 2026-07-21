import { SESIONES } from '../content/programa'
import { hrefFor } from '../router'

export function HomePage() {
  return (
    <>
      <section className="hero wrap">
        <p className="kicker">Curso en vivo · 8 sesiones × 2 h · online</p>
        <h1>IA generativa para la industria del petróleo y gas</h1>
        <p className="hero-sub">
          LLMs y agentes desde cero, con los pies en la industria: qué son, cómo usarlos bien en el
          trabajo diario, dónde fallan — y un caso real construido con las necesidades y los datos de
          los propios asistentes.
        </p>
        <div className="hero-cta">
          <a className="btn btn--primary" href={hrefFor({ page: 'sesion', n: 1 })}>
            Empezar por la sesión 1 <span className="arw">→</span>
          </a>
          <a className="link-plain" href={hrefFor({ page: 'recursos' })}>
            Herramientas y recursos <span className="arw">→</span>
          </a>
        </div>
      </section>

      <div className="rule" role="presentation" />

      <section className="section wrap" id="programa">
        <div className="section-head">
          <p className="eyebrow">Programa</p>
          <h2>Ocho sesiones, un arco</h2>
          <p className="intro">
            De entender qué es esto (sesiones 1–2), a usarlo bien (3–5), a lo que viene (6), a usarlo con
            cabeza (7) — y cerrar con un caso real del propio equipo (8). Cada sesión tiene materiales
            previos y ejercicios interactivos en este sitio.
          </p>
        </div>
        <div className="prog-grid">
          {SESIONES.map((s) => (
            <a key={s.n} className="sess-card" href={hrefFor({ page: 'sesion', n: s.n })}>
              <span className="sess-num">S{s.n}</span>
              <span className="sess-body">
                <span className="sess-title">{s.titulo}</span>
                <span className="sess-resumen">{s.resumen}</span>
              </span>
              {s.estado === 'en-preparacion' && <span className="tag t-status">en preparación</span>}
            </a>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="eyebrow">Cómo funciona</p>
          <h2>Formato del curso</h2>
        </div>
        <div className="how-grid">
          <div className="how-item">
            <h3>Antes de cada sesión</h3>
            <p>
              30–45 minutos auto-guiados en este sitio: una lectura o video corto y ejercicios
              interactivos que corren en tu navegador. Sin instalar nada.
            </p>
          </div>
          <div className="how-item">
            <h3>2 horas en vivo</h3>
            <p>
              Por videollamada: exposición con demos en vivo, taller hands-on con las herramientas y
              discusión estructurada. Solo hace falta una cuenta gratuita de chatbot.
            </p>
          </div>
          <div className="how-item">
            <h3>Un caso real al final</h3>
            <p>
              Desde la sesión 1 se relevan las necesidades del grupo. En la sesión 5 se elige un caso;
              en la 8 se presenta resuelto de punta a punta, con sus datos o con análogos públicos.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
