import { SESIONES } from '../content/programa'
import { hrefFor } from '../router'

export function HomePage() {
  return (
    <>
      <section className="hero wrap">
        <p className="kicker">Curso en vivo · 4 sesiones × 4 h · online</p>
        <h1>IA generativa para la industria del petróleo y gas</h1>
        <p className="hero-sub">
          LLMs y agentes desde cero, con los pies en la industria: qué son, cómo usarlos bien en el
          trabajo diario, dónde fallan, y un caso real de campo maduro recorrido de punta a punta
          sobre datos públicos.
        </p>
        <div className="hero-cta">
          <a className="btn btn--primary" href={hrefFor({ page: 'sesion', n: 1 })}>
            Empezar por el día 1 <span className="arw">→</span>
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
          <h2>Cuatro días, un arco</h2>
          <p className="intro">
            Este es un curso de conducir, no de mecánica: el objetivo es dar los primeros pasos con la
            IA generativa en el trabajo, y de cómo funciona por dentro se ve solo lo que ayuda a
            manejar mejor. El arco: entender qué es esto (día 1), usarlo bien con datos y documentos
            propios (días 2 y 3), y usarlo con cabeza, cerrando con el caso real (día 4).
          </p>
        </div>
        <div className="prog-grid">
          {SESIONES.map((s) => (
            <a key={s.n} className="sess-card" href={hrefFor({ page: 'sesion', n: s.n })}>
              <span className="sess-num">D{s.n}</span>
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
            <h3>La página de cada sesión</h3>
            <p>
              Todo lo esencial pasa en vivo: no hace falta llegar con nada leído. La página de cada
              sesión guarda los ejercicios interactivos y el material para repasar o profundizar
              después, en tu navegador y sin instalar nada.
            </p>
          </div>
          <div className="how-item">
            <h3>4 horas en vivo por día</h3>
            <p>
              Por videollamada, con dos pausas: exposición con demos en vivo, taller hands-on con las
              herramientas y discusión estructurada. Solo hace falta una cuenta gratuita de chatbot
              y una de Google para NotebookLM.
            </p>
          </div>
          <div className="how-item">
            <h3>Un caso real al final</h3>
            <p>
              El día 4 se recorre y se critica un screening de waterflooding hecho sobre datos
              públicos de producción. Y el día 3 cada empresa escribe su propio caso en una página,
              que pasa por las mismas reglas.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
