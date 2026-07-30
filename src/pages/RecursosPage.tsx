const GRUPOS: { titulo: string; items: { nombre: string; href: string; nota: string }[] }[] = [
  {
    titulo: 'Las herramientas del curso (todas gratuitas)',
    items: [
      { nombre: 'ChatGPT', href: 'https://chatgpt.com', nota: 'chatbot de OpenAI — el nivel gratuito alcanza para todo el curso' },
      { nombre: 'Claude', href: 'https://claude.ai', nota: 'chatbot de Anthropic — fuerte en documentos largos y redacción' },
      { nombre: 'Gemini', href: 'https://gemini.google.com', nota: 'chatbot de Google — integrado con el ecosistema Google' },
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
        nombre: 'YPFB — estadísticas e informes',
        href: 'https://www.ypfb.gob.bo',
        nota: 'boletines con producción por campo (en PDF — de ahí el ejercicio de la sesión 4)',
      },
      {
        nombre: 'ANH Bolivia',
        href: 'https://www.anh.gob.bo',
        nota: 'regulador: informes y estadísticas del sector hidrocarburos boliviano',
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
        nombre: 'Dot CSV',
        href: 'https://www.youtube.com/@DotCSV',
        nota: 'divulgación en español, de lo mejor que hay; de acá salen varios videos del material previo',
      },
      {
        nombre: 'Codificando Bits',
        href: 'https://www.youtube.com/@codificandobits',
        nota: 'explicaciones técnicas en español sobre tokens, embeddings y recuperación de documentos',
      },
      {
        nombre: 'BlueDot — Future of AI (curso corto)',
        href: 'https://bluedot.org/courses/future-of-ai',
        nota: 'panorama de hacia dónde va la IA, en inglés — inspiración del formato de este curso',
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
        nombre: 'Extraños patrones dentro de una red neuronal — Dot CSV',
        href: 'https://www.youtube.com/watch?v=ysqpl6w6Wzg',
        nota: 'una técnica de interpretabilidad que dibuja qué activa a cada neurona: bordes, después texturas, después objetos',
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
