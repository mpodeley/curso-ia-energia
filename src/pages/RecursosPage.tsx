const GRUPOS: { titulo: string; items: { nombre: string; href: string; nota: string }[] }[] = [
  {
    titulo: 'Las herramientas del curso (todas gratuitas)',
    items: [
      { nombre: 'ChatGPT', href: 'https://chatgpt.com', nota: 'chatbot de OpenAI; el nivel gratuito alcanza para todo el curso' },
      { nombre: 'Claude', href: 'https://claude.ai', nota: 'chatbot de Anthropic, fuerte en documentos largos y redacción' },
      { nombre: 'Gemini', href: 'https://gemini.google.com', nota: 'chatbot de Google, integrado con el ecosistema Google' },
      { nombre: 'NotebookLM', href: 'https://notebooklm.google.com', nota: 'conversar con tus propios documentos, con citas (sesión 5)' },
    ],
  },
  {
    titulo: 'Datos abiertos de la industria',
    items: [
      {
        nombre: 'Producción por pozo — Argentina (Capítulo IV)',
        href: 'https://datos.energia.gob.ar/dataset/produccion-de-petroleo-y-gas-por-pozo',
        nota: 'el dataset abierto que usamos como sandbox: producción mensual pozo por pozo',
      },
      {
        nombre: 'Reporte diario de producción — Ecuador (ARCH)',
        href: 'https://controlhidrocarburos.gob.ec/cifras-del-sector-hidrocarburifero/',
        nota: 'un PDF de una página por día: producción por compañía y por bloque, estado de pozos y novedades con causa de cierre (de ahí el ejercicio de la sesión 4)',
      },
    ],
  },
  {
    titulo: 'Para profundizar (opcional)',
    items: [
      {
        nombre: '3Blue1Brown — redes neuronales y modelos de lenguaje',
        href: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
        nota: 'la mejor visualización de cómo funciona esto por dentro; varios capítulos tienen audio doblado al español, elegible en el reproductor',
      },
      {
        nombre: '3Blue1Brown Español — la serie doblada',
        href: 'https://www.youtube.com/@3blue1brownespanol',
        nota: 'el canal oficial en español, con la serie de aprendizaje profundo completa',
      },
      {
        nombre: 'Anthropic — Prompt engineering overview',
        href: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
        nota: 'la guía oficial de escritura de prompts (sesión 3); pensada para programadores, las técnicas sirven en cualquier chatbot, en inglés',
      },
      {
        nombre: 'Anthropic — Building effective agents',
        href: 'https://www.anthropic.com/engineering/building-effective-agents',
        nota: 'qué es un agente y cuándo no conviene armar uno (sesión 6); sirve para separar lo que funciona del humo, en inglés',
      },
      {
        nombre: 'BlueDot — Future of AI (curso corto)',
        href: 'https://bluedot.org/courses/future-of-ai',
        nota: 'panorama de hacia dónde va la IA, en inglés; inspiró el formato de este curso',
      },
      {
        nombre: 'Anthropic — The four properties of AI',
        href: 'https://claude.com/resources/tutorials/the-4-properties-of-ai',
        nota: 'las cuatro propiedades de la tabla de la sesión 7, en cinco minutos, en inglés y sin registrarse',
      },
      {
        nombre: 'Anthropic — AI Capabilities and Limitations (curso corto)',
        href: 'https://anthropic.skilljar.com/ai-capabilities-and-limitations',
        nota: 'el curso completo del que sale esa forma de ordenar los errores por su causa; gratuito, en inglés, pide crear una cuenta',
      },
    ],
  },
  {
    titulo: 'Mirar adentro del modelo (sesión 2)',
    items: [
      {
        nombre: 'LeNet leyendo números escritos a mano, 1989',
        href: 'https://www.youtube.com/watch?v=H0oEr40YhrQ',
        nota: 'un minuto de Yann LeCun mostrando el antecedente directo de todo esto, restaurado',
      },
      {
        nombre: 'The moment we stopped understanding AI [AlexNet] — Welch Labs',
        href: 'https://www.youtube.com/watch?v=UZDiGooFs54',
        nota: 'AlexNet (2012): cuando la escala hizo que el rendimiento le ganara a la legibilidad, en inglés',
      },
      {
        nombre: 'Feature Visualization — Distill',
        href: 'https://distill.pub/2017/feature-visualization/',
        nota: 'el artículo de referencia, en inglés; se puede recorrer mirando solo las figuras',
      },
      {
        nombre: 'Zoom In: An Introduction to Circuits — Distill',
        href: 'https://distill.pub/2020/circuits/zoom-in/',
        nota: 'cómo esas piezas se conectan entre sí para formar un detector, en inglés',
      },
      {
        nombre: 'Mapping the Mind of a Large Language Model — Anthropic',
        href: 'https://www.anthropic.com/research/mapping-mind-language-model',
        nota: 'lo mismo dentro de un modelo de lenguaje actual: millones de conceptos identificados, en inglés',
      },
    ],
  },
]

export function RecursosPage() {
  return (
    <div className="wrap">
      <header className="sess-head">
        <p className="kicker">Recursos</p>
        <h1>Herramientas, datos y lecturas</h1>
      </header>
      <div className="prose">
        {GRUPOS.map((g) => (
          <section key={g.titulo}>
            <h2>{g.titulo}</h2>
            <ul>
              {g.items.map((it) => (
                <li key={it.nombre}>
                  <a href={it.href} target="_blank" rel="noreferrer">
                    {it.nombre}
                  </a>{' '}
                  — {it.nota}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
