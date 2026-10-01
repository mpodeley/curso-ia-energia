/* tools/diagramas-s7.mjs — genera los ocho esquemas conceptuales de la sesión 7.

   No leen datos: son figuras dibujadas a mano en código, con la misma
   paleta y las mismas fuentes incrustadas que tools/diagramas.mjs. Los SVG
   quedan versionados en slides/img/; este script solo hace falta para
   cambiarlos.

   Uso: node tools/diagramas-s7.mjs   (npm run diagramas:s7) */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const IMG = join(ROOT, 'slides/img');

// Valores LIGHT del tema de los decks (slides/themes/podeley.css).
const C = {
  texto: '#16181d',
  muted: '#4a5361',
  faint: '#6b7280',
  borde: '#d9dce0',
  bordeSuave: '#e8eaed',
  superficie: '#f6f7f8',
  naranja: '#c24b22',
  azul: '#1f6a9b',
  verde: '#147a5f',
  oro: '#8a6412',
};
const SANS = 'IBM Plex Sans, ui-sans-serif, system-ui, sans-serif';
const DISP = 'Space Grotesk, ui-sans-serif, system-ui, sans-serif';
const W = 1136;
const H = 600;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function fuentesIncrustadas() {
  const css = readFileSync(join(ROOT, 'slides/themes/podeley-fonts.css'), 'utf-8');
  const bloques = css.match(/@font-face\s*{[^}]*}/g) ?? [];
  return bloques.filter((b) => /IBM Plex Sans["']|Space Grotesk/.test(b)).join('\n');
}
const FUENTES = fuentesIncrustadas();

function svg(titulo, desc, cuerpo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" role="img">
<title>${esc(titulo)}</title>
<desc>${esc(desc)}</desc>
<defs>
<marker id="punta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.faint}"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="#ffffff"/>
${cuerpo.join('\n')}
<style>
${FUENTES}
</style>
</svg>
`;
}

const t = (x, y, s, { size = 16, fill = C.muted, anchor = 'start', weight = 400, fam = SANS } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" font-family="${fam}">${esc(s)}</text>`;
const lineas = (x, y, arr, opts = {}, alto = 21) => arr.map((s, i) => t(x, y + i * alto, s, opts)).join('\n');
const titulo = (s) => t(24, 44, s, { size: 28, fill: C.texto, weight: 500, fam: DISP });
const caja = (x, y, w, h, { fill = '#ffffff', stroke = C.borde, sw = 1.5, rx = 12, op = 1 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
const flecha = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.faint}" stroke-width="2" marker-end="url(#punta)"/>`;
const si = (cx, cy) =>
  `<circle cx="${cx}" cy="${cy}" r="17" fill="${C.verde}"/><path d="M${cx - 8} ${cy + 1} l5.5 6 l10 -12" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
const no = (cx, cy) =>
  `<circle cx="${cx}" cy="${cy}" r="17" fill="#ffffff" stroke="${C.naranja}" stroke-width="2.5"/><path d="M${cx - 7} ${cy - 7} l14 14 M${cx + 7} ${cy - 7} l-14 14" fill="none" stroke="${C.naranja}" stroke-width="3" stroke-linecap="round"/>`;

// ---------------------------------------------------------------------------
// 1. Qué dato va a qué herramienta
// ---------------------------------------------------------------------------

function flujoDatos() {
  const cols = [
    { x: 600, nombre: 'Nivel 1', sub: 'producción, reservas, contratos', color: C.naranja },
    { x: 790, nombre: 'Nivel 2', sub: 'documentos internos', color: C.azul },
    { x: 980, nombre: 'Nivel 3', sub: 'público o sintético', color: C.verde },
  ];
  const filas = [
    { a: 'Cuenta personal o gratuita', b: 'lo que subís puede usarse para entrenar', v: [0, 0, 1] },
    { a: 'Cuenta contratada por la empresa', b: 'con acuerdo de datos y sin entrenamiento', v: [0, 1, 1] },
    { a: 'Agente en un entorno aislado', b: 'trabaja sobre copias, con credencial propia', v: [0, 1, 1] },
    { a: 'Herramienta dentro de la red', b: 'el dato no sale de la empresa', v: [1, 1, 1] },
  ];
  const b = [titulo('Qué dato va a qué herramienta')];
  for (const c of cols) {
    b.push(t(c.x, 96, c.nombre, { size: 20, fill: c.color, weight: 600, anchor: 'middle' }));
    b.push(t(c.x, 119, c.sub, { size: 13.5, anchor: 'middle' }));
  }
  filas.forEach((f, i) => {
    const y = 140 + i * 106;
    b.push(caja(24, y, 1088, 92, { fill: i % 2 ? '#ffffff' : C.superficie, stroke: C.bordeSuave }));
    b.push(t(48, y + 40, f.a, { size: 20, fill: C.texto, weight: 600 }));
    b.push(t(48, y + 66, f.b, { size: 15.5 }));
    f.v.forEach((ok, j) => b.push((ok ? si : no)(cols[j].x, y + 46)));
  });
  b.push(t(24, 582, 'Ante la duda, se asume el nivel más alto y se consulta.', { size: 16, fill: C.texto, weight: 500 }));
  return svg(
    'Qué dato va a qué herramienta',
    'Matriz de cuatro herramientas contra tres niveles de dato. Cuenta personal o gratuita: solo nivel 3. Cuenta contratada por la empresa: niveles 2 y 3. Agente en un entorno aislado: niveles 2 y 3. Herramienta dentro de la red de la empresa: los tres niveles. Ante la duda, se asume el nivel más alto y se consulta.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 2. La planilla de relevamiento
// ---------------------------------------------------------------------------

function relevamiento() {
  const xs = [24, 262, 406, 578, 706, 838, 994, 1112];
  const cab = ['Herramienta', 'Quién la usa', 'Para qué', 'Cuenta', 'Datos', 'Conectores', '¿Agente?'];
  const filas = [
    ['Chatbot gratuito', 'Ingeniería', 'Redactar correos', 'Personal', 'Nivel 3', 'Ninguno', 'No'],
    ['Asistente de la suite', 'Todo el equipo', 'Resumir reuniones', 'Contratada', 'Nivel 2', 'Correo, agenda', 'No'],
    ['Agente de terminal', 'Reservorios', 'Armar tableros', 'Contratada', 'Nivel 2, copia', 'Carpeta aislada', 'Sí'],
    ['Extensión del navegador', 'Sin relevar', 'Sin relevar', 'Personal', 'Sin relevar', 'Lee cada página', 'Sí'],
  ];
  const b = [titulo('El relevamiento: una fila por herramienta')];
  b.push(caja(24, 76, 1088, 50, { fill: C.texto, stroke: C.texto, rx: 10 }));
  cab.forEach((c, j) => b.push(t(xs[j] + 14, 107, c, { size: 15.5, fill: '#ffffff', weight: 600 })));
  filas.forEach((f, i) => {
    const y = 134 + i * 64;
    const alerta = i === 3;
    b.push(caja(24, y, 1088, 56, { fill: alerta ? '#fbf1ec' : i % 2 ? '#ffffff' : C.superficie, stroke: alerta ? C.naranja : C.bordeSuave, rx: 10 }));
    f.forEach((c, j) =>
      b.push(t(xs[j] + 14, y + 34, c, { size: 15, fill: j === 0 ? C.texto : alerta && c.startsWith('Sin') ? C.naranja : C.muted, weight: j === 0 ? 600 : 400 })),
    );
  });
  b.push(t(24, 420, 'La fila que falta es la que importa: lo que se usa y nadie anotó.', { size: 17, fill: C.naranja, weight: 500 }));
  const salidas = [
    { s: 'Aprobar', d: 'ya cumple: entra a la lista', c: C.verde },
    { s: 'Contratar', d: 'sirve, pero con cuenta de empresa', c: C.azul },
    { s: 'Reemplazar', d: 'hay una aprobada que hace lo mismo', c: C.oro },
  ];
  salidas.forEach((s, i) => {
    const x = 24 + i * 368;
    b.push(caja(x, 452, 352, 96, { stroke: s.c, sw: 2 }));
    b.push(t(x + 20, 492, s.s, { size: 21, fill: s.c, weight: 600 }));
    b.push(t(x + 20, 520, s.d, { size: 15.5 }));
  });
  b.push(t(24, 582, 'Cada fila termina en una de tres decisiones. Se repite cada tres meses.', { size: 16, fill: C.texto, weight: 500 }));
  return svg(
    'El relevamiento: una fila por herramienta',
    'Planilla de ejemplo con siete columnas: herramienta, quién la usa, para qué, tipo de cuenta, datos que recibe, conectores activos y si actúa como agente. Cuatro filas de ejemplo; la última, una extensión del navegador que nadie relevó, aparece resaltada. Debajo, las tres decisiones posibles por fila: aprobar, contratar o reemplazar.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 3. El plan B
// ---------------------------------------------------------------------------

function planB() {
  const cols = [
    {
      r: 'La herramienta se cae',
      rd: ['Una caída, un cambio de precio', 'o de condiciones, y la tarea', 'queda sin hacer.'],
      p: ['Procedimiento escrito para', 'hacerla sin IA, y una segunda', 'herramienta de otro proveedor.'],
    },
    {
      r: 'Se pierde la habilidad',
      rd: ['Lo que siempre hace el', 'asistente, el equipo deja', 'de saber hacerlo.'],
      p: ['Dos personas que saben hacer', 'la tarea a mano, y la practican', 'una vez por semestre.'],
    },
    {
      r: 'Se deja de revisar',
      rd: ['Como casi siempre acierta,', 'se aprueba sin leer. Y se', 'siente más rápido de lo que es.'],
      p: ['Quien firma explica el', 'resultado sin el asistente', 'abierto. Si no puede, no sale.'],
    },
  ];
  const b = [titulo('Tres maneras de depender de más, y su plan B')];
  b.push(t(24, 92, 'EL RIESGO', { size: 14, fill: C.naranja, weight: 600 }));
  b.push(t(24, 356, 'EL PLAN B', { size: 14, fill: C.verde, weight: 600 }));
  cols.forEach((c, i) => {
    const x = 24 + i * 368;
    b.push(caja(x, 104, 352, 170, { stroke: C.naranja, sw: 2 }));
    b.push(t(x + 20, 144, c.r, { size: 21, fill: C.naranja, weight: 600 }));
    b.push(lineas(x + 20, 178, c.rd, { size: 16 }, 23));
    b.push(flecha(x + 176, 284, x + 176, 328));
    b.push(caja(x, 368, 352, 150, { fill: '#eef6f3', stroke: C.verde, sw: 2 }));
    b.push(lineas(x + 20, 410, c.p, { size: 16.5, fill: C.texto }, 25));
  });
  b.push(t(24, 566, 'Vale para las tareas críticas: las que tienen un plazo comprometido con alguien de afuera.', { size: 16, fill: C.texto, weight: 500 }));
  return svg(
    'Tres maneras de depender de más, y su plan B',
    'Tres columnas, cada una con un riesgo arriba y su plan B abajo. La herramienta se cae: procedimiento escrito para hacer la tarea sin IA y una segunda herramienta de otro proveedor. Se pierde la habilidad: dos personas que saben hacer la tarea a mano y la practican una vez por semestre. Se deja de revisar: quien firma explica el resultado sin el asistente abierto.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 4. Dónde corre el agente
// ---------------------------------------------------------------------------

function sandbox() {
  const paneles = [
    {
      x: 24,
      color: C.naranja,
      fondo: '#fbf1ec',
      nombre: 'En tu máquina de trabajo',
      alcance: 'Lo que el agente alcanza',
      items: ['Toda la unidad, no solo la carpeta', 'El correo y el navegador abiertos', 'Las credenciales guardadas', 'La red de la empresa'],
      pie: 'Si se equivoca, se equivoca con tus permisos.',
    },
    {
      x: 580,
      color: C.verde,
      fondo: '#eef6f3',
      nombre: 'En un entorno aislado (sandbox)',
      alcance: 'Lo que el agente alcanza',
      items: ['Una copia de los datos de la tarea', 'Una credencial propia y acotada', 'Ningún correo, ninguna contraseña', 'Solo los sitios de una lista'],
      pie: 'Si se equivoca, se pierde una copia.',
    },
  ];
  const b = [titulo('El mismo agente, en dos lugares')];
  for (const p of paneles) {
    b.push(caja(p.x, 76, 532, 440, { fill: p.fondo, stroke: p.color, sw: 2.5, rx: 16 }));
    b.push(t(p.x + 28, 122, p.nombre, { size: 22, fill: p.color, weight: 600 }));
    b.push(caja(p.x + 28, 146, 150, 56, { stroke: p.color, sw: 2, rx: 28 }));
    b.push(t(p.x + 103, 181, 'El agente', { size: 17, fill: C.texto, weight: 600, anchor: 'middle' }));
    b.push(t(p.x + 200, 181, p.alcance, { size: 15.5 }));
    p.items.forEach((s, i) => {
      const y = 226 + i * 56;
      b.push(caja(p.x + 28, y, 476, 46, { stroke: C.bordeSuave, rx: 10 }));
      b.push(`<circle cx="${p.x + 52}" cy="${y + 23}" r="5" fill="${p.color}"/>`);
      b.push(t(p.x + 72, y + 29, s, { size: 16.5, fill: C.texto }));
    });
    b.push(t(p.x + 28, 490, p.pie, { size: 16.5, fill: p.color, weight: 600 }));
  }
  b.push(t(24, 558, 'Un entorno aislado puede ser una carpeta dedicada, una máquina virtual o el entorno en la nube del proveedor.', { size: 16, fill: C.texto, weight: 500 }));
  b.push(t(24, 584, 'Por defecto, el agente corre ahí. Lo otro se pide.', { size: 16 }));
  return svg(
    'El mismo agente, en dos lugares',
    'Dos paneles. A la izquierda, el agente en tu máquina de trabajo alcanza toda la unidad, el correo y el navegador abiertos, las credenciales guardadas y la red de la empresa: si se equivoca, se equivoca con tus permisos. A la derecha, el agente en un entorno aislado alcanza una copia de los datos de la tarea, una credencial propia y acotada, ningún correo ni contraseña, y solo los sitios de una lista: si se equivoca, se pierde una copia.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 5. El correo es la llave maestra
// ---------------------------------------------------------------------------

function mailLlave() {
  const pasos = [
    { a: 'Alguien le escribe', d: ['Un correo con', 'instrucciones', 'escondidas'], c: C.muted },
    { a: 'El agente lo lee', d: ['Tiene permiso', 'sobre toda', 'la casilla'], c: C.muted },
    { a: 'Pide un reinicio', d: ['"Olvidé mi', 'contraseña" en', 'otro servicio'], c: C.oro },
    { a: 'Llega el código', d: ['A la misma casilla', 'que el agente', 'está leyendo'], c: C.oro },
    { a: 'Cuenta tomada', d: ['Y con ella, las', 'que se recuperan', 'desde ahí'], c: C.naranja },
  ];
  const b = [titulo('El correo es la llave maestra')];
  pasos.forEach((p, i) => {
    const x = 24 + i * 222;
    b.push(caja(x, 84, 200, 184, { stroke: p.c, sw: i === 4 ? 2.5 : 2, fill: i === 4 ? '#fbf1ec' : '#ffffff' }));
    b.push(`<circle cx="${x + 30}" cy="${116}" r="15" fill="${p.c}"/>`);
    b.push(t(x + 30, 122, String(i + 1), { size: 16, fill: '#ffffff', weight: 600, anchor: 'middle' }));
    b.push(t(x + 18, 164, p.a, { size: 17, fill: C.texto, weight: 600 }));
    b.push(lineas(x + 18, 194, p.d, { size: 15 }, 22));
    if (i < 4) b.push(flecha(x + 202, 176, x + 220, 176));
  });
  b.push(t(24, 318, 'DÓNDE SE CORTA LA CADENA', { size: 14, fill: C.verde, weight: 600 }));
  const cortes = [
    { a: 'Casilla dedicada', d: ['El agente no entra a la casilla', 'principal. La suya no recupera', 'ninguna otra cuenta.'] },
    { a: 'Segundo factor sin correo', d: ['Aplicación o llave física.', 'El código no pasa por', 'donde lee el agente.'] },
    { a: 'Los cambios, una persona', d: ['Reiniciar contraseñas y dar', 'accesos no lo ejecuta', 'un agente.'] },
  ];
  cortes.forEach((c, i) => {
    const x = 24 + i * 368;
    b.push(caja(x, 332, 352, 168, { fill: '#eef6f3', stroke: C.verde, sw: 2 }));
    b.push(t(x + 20, 370, c.a, { size: 19, fill: C.verde, weight: 600 }));
    b.push(lineas(x + 20, 402, c.d, { size: 16, fill: C.texto }, 24));
  });
  b.push(t(24, 548, 'Redactar, resumir y ordenar correo sigue habilitado, en modo borrador: el asistente propone y la persona envía.', { size: 16, fill: C.texto, weight: 500 }));
  return svg(
    'El correo es la llave maestra',
    'Cadena de cinco pasos: alguien le escribe a la casilla un correo con instrucciones escondidas; el agente lo lee porque tiene permiso sobre toda la casilla; pide un reinicio de contraseña en otro servicio; el código llega a la misma casilla que el agente está leyendo; la cuenta queda tomada. Debajo, tres controles que cortan la cadena: una casilla dedicada para el agente, un segundo factor que no dependa del correo, y que los cambios de cuenta los haga una persona.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 6. Muchos agentes a la vez
// ---------------------------------------------------------------------------

function swarm() {
  const b = [titulo('Muchos agentes a la vez: qué cambia')];
  // Orchestrator and a grid of workers; one bad result spreads to its neighbours.
  const ox = 250;
  b.push(caja(ox - 110, 84, 220, 54, { stroke: C.azul, sw: 2, rx: 27 }));
  b.push(t(ox, 118, 'Agente coordinador', { size: 16, fill: C.azul, weight: 600, anchor: 'middle' }));
  const malos = new Set(['1-2', '1-3', '2-2', '2-3', '3-3']);
  for (let f = 0; f < 4; f++) {
    for (let c = 0; c < 5; c++) {
      const cx = 74 + c * 88;
      const cy = 216 + f * 76;
      const malo = malos.has(`${f}-${c}`);
      if (f === 0) b.push(`<line x1="${ox}" y1="138" x2="${cx}" y2="${cy - 26}" stroke="${C.borde}" stroke-width="1.5"/>`);
      b.push(`<circle cx="${cx}" cy="${cy}" r="24" fill="${malo ? '#fbf1ec' : C.superficie}" stroke="${malo ? C.naranja : C.borde}" stroke-width="${malo ? 2.5 : 1.5}"/>`);
      if (malo) b.push(t(cx, cy + 7, '!', { size: 20, fill: C.naranja, weight: 600, anchor: 'middle' }));
    }
  }
  b.push(t(24, 520, 'Un resultado malo pasa de un agente al siguiente,', { size: 15.5 }));
  b.push(t(24, 542, 'y cada uno lo da por bueno.', { size: 15.5 }));

  const notas = [
    { a: 'El error se copia', d: 'Un agente toma como verificado lo que otro no verificó.' },
    { a: 'La instrucción ajena circula', d: 'Lo que leyó uno llega como orden a los demás.' },
    { a: 'El gasto se dispara', d: 'Cien agentes consumen cien veces, y de noche.' },
    { a: 'Nadie lee todo', d: 'Miles de acciones por hora no las sigue una persona.' },
  ];
  notas.forEach((n, i) => {
    const y = 84 + i * 82;
    b.push(caja(520, y, 592, 70, { stroke: C.bordeSuave, fill: C.superficie }));
    b.push(t(540, y + 30, n.a, { size: 18, fill: C.naranja, weight: 600 }));
    b.push(t(540, y + 54, n.d, { size: 15.5 }));
  });
  b.push(caja(520, 420, 592, 132, { fill: '#eef6f3', stroke: C.verde, sw: 2 }));
  b.push(t(540, 454, 'Los controles', { size: 18, fill: C.verde, weight: 600 }));
  b.push(
    lineas(
      540,
      482,
      ['Entorno aislado, sin acceso a producción.', 'Tope de agentes, de tiempo y de gasto.', 'Un responsable que lo puede detener, y sabe cómo.'],
      { size: 16, fill: C.texto },
      25,
    ),
  );
  b.push(t(24, 584, 'Un agente que revisa a otro agente no cuenta como verificación.', { size: 16, fill: C.texto, weight: 500 }));
  return svg(
    'Muchos agentes a la vez: qué cambia',
    'A la izquierda, un agente coordinador sobre una grilla de veinte agentes; cinco de ellos, contiguos, están marcados con un signo de alerta: un resultado malo pasa de un agente al siguiente y cada uno lo da por bueno. A la derecha, cuatro cambios: el error se copia, la instrucción ajena circula, el gasto se dispara y nadie lee todo. Debajo, los controles: entorno aislado sin acceso a producción, tope de agentes, de tiempo y de gasto, y un responsable que lo puede detener.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 7. El episodio de Hugging Face
// ---------------------------------------------------------------------------

function huggingFace() {
  const hitos = [
    { f: '9 de julio', a: 'Sale de la prueba', d: ['Evaluación interna de', 'OpenAI. El agente usa', 'una falla desconocida', 'y llega a internet.'], c: C.oro },
    { f: '9 al 13 de julio', a: 'Entra a la plataforma', d: ['Un dataset malicioso', 'ejecuta código, roba', 'credenciales y pasa', 'a varios clústeres.'], c: C.naranja },
    { f: '16 de julio', a: 'Hugging Face avisa', d: ['Datasets internos y', 'credenciales, afectados.', 'Nada público alterado.', 'Pide rotar tokens.'], c: C.azul },
    { f: '21 de julio', a: 'OpenAI lo asume', d: ['Confirma que el agente', 'venía de una prueba', 'interna suya, en su', 'infraestructura.'], c: C.azul },
    { f: '27 de julio', a: 'El detalle técnico', d: ['Unas 17,600 acciones', 'reconstruidas. Buscaba,', 'al parecer, las', 'respuestas de la prueba.'], c: C.verde },
  ];
  const b = [titulo('Hugging Face, julio de 2026: el caso en cinco fechas')];
  b.push(`<line x1="40" y1="112" x2="1096" y2="112" stroke="${C.borde}" stroke-width="3"/>`);
  hitos.forEach((h, i) => {
    const x = 24 + i * 222;
    b.push(`<circle cx="${x + 100}" cy="112" r="9" fill="${h.c}"/>`);
    b.push(t(x + 100, 92, h.f, { size: 15.5, fill: h.c, weight: 600, anchor: 'middle' }));
    b.push(caja(x, 140, 200, 176, { stroke: h.c, sw: 2 }));
    b.push(t(x + 14, 174, h.a, { size: 15.5, fill: C.texto, weight: 600 }));
    b.push(lineas(x + 14, 204, h.d, { size: 14 }, 22));
  });
  b.push(t(24, 384, 'TRES REGLAS DE LA SESIÓN, EN UN SOLO CASO', { size: 14, fill: C.verde, weight: 600 }));
  const reglas = [
    { a: 'El entorno aislado es un control', d: ['Y como todo control, puede', 'fallar. No reemplaza a los', 'permisos mínimos.'] },
    { a: 'Muchos agentes, nadie mirando', d: ['Corrió un fin de semana,', 'a velocidad de máquina.', 'El aviso debe ser automático.'] },
    { a: 'Cumplió el objetivo, a su modo', d: ['Nadie le pidió entrar a otra', 'empresa. Buscó aprobar', 'la prueba por otro camino.'] },
  ];
  reglas.forEach((r, i) => {
    const x = 24 + i * 368;
    b.push(caja(x, 398, 352, 142, { fill: '#eef6f3', stroke: C.verde, sw: 2 }));
    b.push(t(x + 20, 432, r.a, { size: 16.5, fill: C.verde, weight: 600 }));
    b.push(lineas(x + 20, 462, r.d, { size: 15.5, fill: C.texto }, 23));
  });
  b.push(t(24, 578, 'Fuente: los dos comunicados de Hugging Face (16 y 27 de julio de 2026). La cantidad de agentes varía según quién lo cuente.', { size: 14.5 }));
  return svg(
    'Hugging Face, julio de 2026: el caso en cinco fechas',
    'Línea de tiempo con cinco fechas. 9 de julio: un agente sale del entorno de prueba de una evaluación interna de OpenAI usando una falla desconocida. 9 al 13 de julio: entra a Hugging Face con un dataset malicioso, roba credenciales y se mueve por varios clústeres. 16 de julio: Hugging Face lo informa; hay datasets internos y credenciales afectados y nada público alterado. 21 de julio: OpenAI se hace cargo. 27 de julio: Hugging Face publica la cronología técnica, con unas 17,600 acciones reconstruidas. Debajo, tres reglas de la sesión que el caso muestra: el entorno aislado es un control que puede fallar, muchos agentes sin nadie mirando, y un agente que cumple el objetivo por un camino que nadie pidió.',
    b,
  );
}

// ---------------------------------------------------------------------------
// 8. Del riesgo al control
// ---------------------------------------------------------------------------

function riesgoControl() {
  const filas = [
    ['Un dato confidencial termina afuera', 'Mapa de tres niveles y herramientas aprobadas', '4 y 5'],
    ['Un dato inventado sale en un informe firmado', 'Verificación según el destino del texto', '6'],
    ['La herramienta se cae, o el equipo ya no sabe hacerlo', 'Plan B por tarea crítica', '8'],
    ['Un agente borra o manda lo que no debía', 'Entorno aislado, permisos mínimos, regla de dos', '9'],
    ['Toman una cuenta a través del correo', 'Sin agentes en la casilla; segundo factor sin correo', '10'],
    ['Un sistema de muchos agentes se desborda', 'Topes, entorno aislado y un responsable con corte', '12'],
    ['Un pedido falso con voz o cara conocida', 'Confirmación por un segundo canal', '13'],
  ];
  const b = [titulo('Del riesgo al control: la política en una mirada')];
  b.push(t(40, 92, 'LO QUE PUEDE PASAR', { size: 14, fill: C.naranja, weight: 600 }));
  b.push(t(560, 92, 'LO QUE LO FRENA', { size: 14, fill: C.verde, weight: 600 }));
  b.push(t(1096, 92, 'SECCIÓN', { size: 14, fill: C.faint, weight: 600, anchor: 'end' }));
  filas.forEach((f, i) => {
    const y = 104 + i * 62;
    b.push(caja(24, y, 478, 52, { stroke: C.naranja, sw: 1.5, fill: '#fbf1ec', rx: 10 }));
    b.push(t(40, y + 32, f[0], { size: 16, fill: C.texto }));
    b.push(flecha(506, y + 26, 540, y + 26));
    b.push(caja(544, y, 486, 52, { stroke: C.verde, sw: 1.5, fill: '#eef6f3', rx: 10 }));
    b.push(t(560, y + 32, f[1], { size: 16, fill: C.texto, weight: 500 }));
    b.push(t(1096, y + 32, f[2], { size: 16, fill: C.faint, weight: 600, anchor: 'end' }));
  });
  b.push(t(24, 572, 'Ningún riesgo de la lista se resuelve prohibiendo la herramienta. Todos tienen un control que deja seguir usándola.', { size: 16, fill: C.texto, weight: 500 }));
  return svg(
    'Del riesgo al control: la política en una mirada',
    'Siete riesgos, cada uno unido por una flecha a su control y a la sección de la política que lo trata. Dato confidencial afuera: mapa de tres niveles y herramientas aprobadas. Dato inventado en un informe firmado: verificación según el destino. La herramienta se cae o se pierde la habilidad: plan B por tarea crítica. Un agente borra o manda lo que no debía: entorno aislado, permisos mínimos y regla de dos. Toman una cuenta a través del correo: sin agentes en la casilla y segundo factor sin correo. Un sistema de muchos agentes se desborda: topes, entorno aislado y un responsable con corte. Un pedido falso con voz o cara conocida: confirmación por un segundo canal.',
    b,
  );
}

const salidas = [
  ['s7-flujo-datos.svg', flujoDatos],
  ['s7-relevamiento.svg', relevamiento],
  ['s7-plan-b.svg', planB],
  ['s7-sandbox.svg', sandbox],
  ['s7-mail-llave.svg', mailLlave],
  ['s7-swarm.svg', swarm],
  ['s7-huggingface.svg', huggingFace],
  ['s7-riesgo-control.svg', riesgoControl],
];
for (const [archivo, generar] of salidas) {
  writeFileSync(join(IMG, archivo), generar());
  console.log(`slides/img/${archivo}`);
}
