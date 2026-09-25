import { DIAS, SESIONES } from '../content/programa'
import { hrefFor } from '../router'

export function HomePage() {
  return (
    <>
      <section className="hero wrap">
        <p className="kicker">
          Curso en vivo · 8 sesiones × 2 h · del lunes 28 de septiembre al jueves 1 de octubre de 2026
          · online
        </p>
        <h1>IA generativa para la industria del petróleo y gas</h1>
        <p className="hero-sub">
          LLMs y agentes desde cero, con los pies en la industria: qué son, cómo usarlos bien en el
          trabajo diario, dónde fallan, y un caso real de campo maduro recorrido de punta a punta
          sobre datos públicos.
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
            Es un curso para aprender a manejar: del motor vemos solo lo que ayuda a manejar mejor.
            El objetivo es dar los primeros pasos con la IA generativa en el trabajo. El arco:
            entender qué es esto (sesiones 1–2), usarlo bien con datos públicos y documentos del rubro
            (3–6), y usarlo con cabeza, cerrando con el caso real (7–8).
          </p>
        </div>
        {Object.keys(DIAS).map(Number).map((dia) => (
          <div key={dia}>
            <p className="prog-dia">
              Día {dia} · {DIAS[dia]}
            </p>
            <div className="prog-grid">
              {SESIONES.filter((s) => s.dia === dia).map((s) => (
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
          </div>
        ))}
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="eyebrow">Qué te llevás</p>
          <h2>Lo que queda después del jueves</h2>
        </div>
        <div className="how-grid">
          <div className="how-item">
            <h3>Criterio, por escrito</h3>
            <p>
              Qué delegar hoy a un chatbot o a un agente, cuánto verificar según el costo del error, y
              un borrador de política de uso de una página para tu empresa.
            </p>
          </div>
          <div className="how-item">
            <h3>Un cuaderno propio</h3>
            <p>
              Un cuaderno de Gemini Notebook (antes NotebookLM) con documentos públicos del rubro y uno
              de tu empresa, que responde citando la fuente de cada respuesta.
            </p>
          </div>
          <div className="how-item">
            <h3>El caso de tu empresa</h3>
            <p>
              Escrito en una página en la sesión 6 y criticado en la sesión 8 con las mismas reglas que
              el caso real de waterflooding.
            </p>
          </div>
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
              sesión guarda los ejercicios interactivos, un quiz y el material para repasar o
              profundizar después, en tu navegador y sin instalar nada. Entre día y día hay una sola
              tarea, de unos cinco minutos.
            </p>
          </div>
          <div className="how-item">
            <h3>Dos sesiones de 2 h por día</h3>
            <p>
              Por videollamada, de 10:00 a 14:00 de Argentina (8:00 a 12:00 en Ecuador y Colombia),
              con una pausa entre sesiones y otra a mitad de la segunda: exposición con demos en
              vivo, taller hands-on con las herramientas y discusión estructurada. Solo hace falta
              una cuenta gratuita de chatbot y una de Google para Gemini Notebook.
            </p>
          </div>
          <div className="how-item">
            <h3>Un caso real al final</h3>
            <p>
              La sesión 8 recorre y critica un screening de waterflooding hecho sobre datos públicos
              de producción. Y en la sesión 6 cada empresa escribe su propio caso en una página,
              que pasa por las mismas reglas.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
