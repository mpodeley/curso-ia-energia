/* tools/diagramas.mjs — genera los SVG de datos que usan las slides.

   Lee los mismos JSON de public/data/ que dibujan los componentes de la página
   (y el mismo k-means: src/engine/aprendizaje.ts se importa directo; Node 24 o
   más nuevo saca los tipos solo, por eso el CI corre en 24). Así una slide y la página no pueden contar números
   distintos. Las figuras conceptuales (capas, estrecha contra general, tres
   maneras, dos etapas) no salen de acá: están escritas a mano en slides/img/.

   Cada SVG lleva incrustadas IBM Plex Sans y Space Grotesk, sacadas de
   slides/themes/podeley-fonts.css: un SVG cargado como <img> no ve las fuentes
   de la página y caería en una del sistema, más ancha.

   Uso: node tools/diagramas.mjs   (lo corre npm run slides, antes de copiar
   slides/img/ a public/) */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { coincidencias, enElPlano, kmeans, tablaCruzada } from '../src/engine/aprendizaje.ts';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DATA = join(ROOT, 'public/data');
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

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const leer = (archivo) => JSON.parse(readFileSync(join(DATA, archivo), 'utf-8'));

function fuentesIncrustadas() {
  const css = readFileSync(join(ROOT, 'slides/themes/podeley-fonts.css'), 'utf-8');
  const bloques = css.match(/@font-face\s*{[^}]*}/g) ?? [];
  return bloques.filter((b) => /IBM Plex Sans'|Space Grotesk/.test(b)).join('\n');
}
const FUENTES = fuentesIncrustadas();

function svg(ancho, alto, titulo, desc, cuerpo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ancho} ${alto}" width="100%" role="img">
<title>${esc(titulo)}</title>
<desc>${esc(desc)}</desc>
<rect width="${ancho}" height="${alto}" fill="#ffffff"/>
${cuerpo}
<style>
${FUENTES}
</style>
</svg>
`;
}

const texto = (x, y, t, { size = 20, fill = C.muted, anchor = 'start', weight = 400, fam = SANS } = {}) =>
  `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" font-family="${fam}">${esc(t)}</text>`;

// ---------------------------------------------------------------------------
// 1. Pozos con y sin etiquetas (sesión 1)
// ---------------------------------------------------------------------------

function pozosAprendizaje() {
  const pozos = leer('pozos_aprendizaje.json').data;
  const plano = enElPlano(pozos);
  const { grupos } = kmeans(plano, 2);
  const tipos = plano.map((p) => p.tipo);
  const tabla = tablaCruzada(grupos, tipos, 2);
  const mayoria = tabla.map((f) => (f.gasifero > f.petrolifero ? 'gasifero' : 'petrolifero'));
  const { coinciden, total } = coincidencias(grupos, tipos, 2);
  const colorTipo = { petrolifero: C.verde, gasifero: C.naranja };
  const colorGrupo = [C.azul, C.oro];

  const W = 1136;
  const H = 480;
  const panel = (x0, titulo, sub, color, borde) => {
    const P = { x: x0 + 70, y: 78, w: 440, h: 300 };
    const sx = (x) => P.x + (Math.min(Math.max(x, 0), 5) / 5) * P.w;
    const sy = (y) => P.y + P.h - y * P.h;
    let s = texto(x0 + 14, 34, titulo, { size: 24, fill: C.texto, weight: 500, fam: DISP });
    s += texto(x0 + 14, 60, sub, { size: 18, fill: C.muted });
    for (const d of [0, 1, 2, 3, 4, 5]) {
      s += `<line x1="${sx(d)}" x2="${sx(d)}" y1="${P.y}" y2="${P.y + P.h}" stroke="${C.bordeSuave}"/>`;
      if (d % 2 === 0) s += texto(sx(d), P.y + P.h + 26, (10 ** d).toLocaleString('en-US'), { size: 18, fill: C.faint, anchor: 'middle' });
    }
    for (const y of [0, 0.5, 1]) {
      s += `<line x1="${P.x}" x2="${P.x + P.w}" y1="${sy(y)}" y2="${sy(y)}" stroke="${C.bordeSuave}"/>`;
      s += texto(P.x - 10, sy(y) + 6, `${Math.round(y * 100)}%`, { size: 18, fill: C.faint, anchor: 'end' });
    }
    s += texto(P.x + P.w / 2, P.y + P.h + 56, 'Relación gas-petróleo, m³/m³ (log)', { size: 18, fill: C.faint, anchor: 'middle' });
    s += `<text x="${x0 + 22}" y="${P.y + P.h / 2}" font-size="18" fill="${C.faint}" text-anchor="middle" font-family="${SANS}" transform="rotate(-90 ${x0 + 22} ${P.y + P.h / 2})">Corte de agua</text>`;
    plano.forEach((p, i) => {
      const anillo = borde?.(p, i);
      s += `<circle cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="${anillo ? 8 : 6.5}" fill="${color(p, i)}" fill-opacity="0.85" stroke="${anillo ?? '#ffffff'}" stroke-width="${anillo ? 4 : 1}"/>`;
    });
    return s;
  };

  let cuerpo = panel(0, 'Con etiquetas', 'Verde petrolífero, naranja gasífero: lo que declaró la operadora', (p) => colorTipo[p.tipo]);
  cuerpo += `<line x1="568" x2="568" y1="20" y2="${H - 20}" stroke="${C.borde}"/>`;
  cuerpo += panel(
    568,
    'Sin etiquetas: dos grupos',
    `Los encontró k-means solo; coinciden con la etiqueta en ${coinciden} de ${total}`,
    (p, i) => colorGrupo[grupos[i]],
    (p, i) => (mayoria[grupos[i]] !== p.tipo ? colorTipo[p.tipo] : null),
  );

  return svg(
    W,
    H,
    'Los mismos pozos, con etiquetas y sin etiquetas',
    `${total} pozos activos de la cuenca Noroeste según su relación gas-petróleo y su corte de agua. A la izquierda, coloreados por el tipo declarado; a la derecha, por los dos grupos que encontró k-means sin ver las etiquetas (coinciden en ${coinciden} de ${total}; los que no coinciden llevan borde).`,
    cuerpo,
  );
}

// ---------------------------------------------------------------------------
// 2. Escala del cómputo de entrenamiento (sesión 2)
// ---------------------------------------------------------------------------

// Solo se rotulan estos en la slide (la página los muestra todos). Desplazamiento
// del rótulo a mano, para que no se pisen en 2017–2025.
const ROTULOS = {
  'LeNet, 1989': [10, -14, 'start'],
  AlexNet: [-12, -14, 'end'],
  Transformer: [-12, -12, 'end'],
  'GPT-2': [-12, -14, 'end'],
  'GPT-3': [-12, -14, 'end'],
  'GPT-4': [-12, -14, 'end'],
  'GPT-4.5': [-12, -16, 'end'],
};

function escala() {
  const env = leer('escala.json');
  const filas = env.data.filter((f) => f.fecha >= '1985');
  const anio = (f) => Number(f.fecha.slice(0, 4)) + (Number(f.fecha.slice(5, 7)) - 1) / 12;
  const W = 1136;
  const H = 480;
  const P = { x: 96, y: 24, w: 1000, h: 380 };
  const [a0, a1] = [1985, 2027];
  const [l0, l1] = [12, 27];
  const sx = (a) => P.x + ((a - a0) / (a1 - a0)) * P.w;
  const sy = (flop) => P.y + P.h - ((Math.log10(flop) - l0) / (l1 - l0)) * P.h;
  const sup = (n) => String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);

  let s = '';
  for (let l = l0; l <= l1; l += 3) {
    s += `<line x1="${P.x}" x2="${P.x + P.w}" y1="${sy(10 ** l)}" y2="${sy(10 ** l)}" stroke="${C.bordeSuave}"/>`;
    s += texto(P.x - 12, sy(10 ** l) + 7, `10${sup(l)}`, { size: 20, fill: C.faint, anchor: 'end' });
  }
  for (let a = 1990; a <= 2025; a += 5) {
    s += texto(sx(a), P.y + P.h + 30, String(a), { size: 20, fill: C.faint, anchor: 'middle' });
  }
  s += `<text x="26" y="${P.y + P.h / 2}" font-size="19" fill="${C.faint}" text-anchor="middle" font-family="${SANS}" transform="rotate(-90 26 ${P.y + P.h / 2})">Cómputo (operaciones, escala log)</text>`;
  for (const f of filas) {
    if (f.flop < 10 ** l0 || f.flop > 10 ** l1) continue;
    s += `<circle cx="${sx(anio(f)).toFixed(1)}" cy="${sy(f.flop).toFixed(1)}" r="4" fill="${C.faint}" fill-opacity="0.35"/>`;
  }
  for (const f of filas.filter((x) => x.destacado && ROTULOS[x.etiqueta ?? x.modelo])) {
    const [dx, dy, anchor] = ROTULOS[f.etiqueta ?? f.modelo];
    const cx = sx(anio(f));
    const cy = sy(f.flop);
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="8" fill="${C.naranja}" stroke="#ffffff" stroke-width="2"/>`;
    s += texto(cx + dx, cy + dy, f.etiqueta ?? f.modelo, { size: 21, fill: C.texto, anchor, weight: 500 });
  }
  return svg(
    W,
    H,
    'Cuánto cómputo se usó para entrenar cada modelo',
    `Cómputo de entrenamiento de ${filas.length} modelos notables desde 1985, en escala logarítmica, con LeNet, AlexNet, Transformer, GPT-2, GPT-3, GPT-4 y GPT-4.5 marcados. Fuente: Epoch AI (CC BY).`,
    s,
  );
}

// ---------------------------------------------------------------------------
// 3. Línea de tiempo (sesión 1): completa y los últimos años
// ---------------------------------------------------------------------------

// Rótulo corto de cada hito en la slide; la página muestra el título entero.
const CORTO = {
  'turing-1950': 'Turing',
  'dartmouth-1956': 'Dartmouth',
  'perceptron-1958': 'Perceptrón',
  'eliza-1966': 'ELIZA',
  'lighthill-1973': 'Primer invierno',
  'r1-1980': 'Sistemas expertos',
  'dipmeter-1981': 'Dipmeter Advisor',
  'invierno-1984': 'Segundo invierno',
  'retropropagacion-1986': 'Retropropagación',
  'lenet-1989': 'LeNet',
  'deep-blue-1997': 'Deep Blue',
  'imagenet-2009': 'ImageNet',
  'alexnet-2012': 'AlexNet',
  'alphago-2016': 'AlphaGo',
  'transformer-2017': 'Transformer',
  'gpt-2018': 'GPT',
  'gpt2-2019': 'GPT-2',
  'gpt3-2020': 'GPT-3',
  'instructgpt-2022': 'InstructGPT (RLHF)',
  'chatgpt-2022': 'ChatGPT',
  'llama-2023': 'LLaMA abierto',
  'gpt4-2023': 'GPT-4',
  'claude-2023': 'Claude',
  'o1-2024': 'o1 razona',
  'deepseek-r1-2025': 'DeepSeek-R1',
  'claude-code-2025': 'Claude Code',
  'mythos-2026': 'Claude Mythos',
  'gpt6-astra-2026': 'GPT-6 Astra',
};
// En la vista completa se rotulan solo estos (los demás quedan como punto).
const EN_LA_COMPLETA = new Set([
  'turing-1950', 'dartmouth-1956', 'perceptron-1958', 'eliza-1966', 'lighthill-1973',
  'dipmeter-1981', 'retropropagacion-1986', 'lenet-1989', 'deep-blue-1997', 'alexnet-2012',
  'transformer-2017', 'chatgpt-2022', 'claude-code-2025',
]);
const COLOR_ERA = { reglas: C.oro, datos: C.azul, profundas: C.verde, generales: C.naranja };

const anioDe = (fecha) => {
  const [a, m = '07', d = '01'] = fecha.split('-');
  return Number(a) + (Number(m) - 1) / 12 + (Number(d) - 1) / 365;
};

// Greedy label placement: each label takes the first level (alternating above
// and below the axis, moving outward) where it overlaps nothing already placed.
// Width is estimated from the character count: good enough for IBM Plex Sans.
function ubicarRotulos(items, { x0, x1, ejeY, niveles, size }) {
  const puestos = []; // {nivel, a, b}
  return items.map((it) => {
    const ancho = it.texto.length * size * 0.56;
    for (const nivel of niveles) {
      let anchor = 'start';
      let a = it.x + 6;
      let b = a + ancho;
      if (b > x1) {
        anchor = 'end';
        b = it.x - 6;
        a = b - ancho;
      }
      if (a < x0) continue;
      const choca = puestos.some((q) => q.nivel === nivel && !(b + 14 < q.a || a > q.b + 14));
      if (!choca) {
        puestos.push({ nivel, a, b });
        return { ...it, y: ejeY + nivel, anchor, tx: anchor === 'start' ? it.x + 6 : it.x - 6 };
      }
    }
    return null;
  });
}

function lineaDeTiempo({ desde, hasta, filtro, conAnio, titulo, desc }) {
  const { eras, hitos } = leer('linea_de_tiempo.json').data;
  const W = 1136;
  const H = 480;
  const X0 = 40;
  const X1 = 1096;
  const EJE = 238;
  const sx = (a) => X0 + ((a - desde) / (hasta - desde)) * (X1 - X0);
  let s = '';

  for (const e of eras) {
    const a = Math.max(e.desde, desde);
    // The last era runs to the right edge (it is "today").
    const b = Math.min(e.id === eras[eras.length - 1].id ? hasta : e.hasta, hasta);
    if (b <= a) continue;
    s += `<rect x="${sx(a).toFixed(1)}" y="40" width="${(sx(b) - sx(a)).toFixed(1)}" height="370" fill="${COLOR_ERA[e.id]}" fill-opacity="0.07"/>`;
  }
  s += `<line x1="${X0}" x2="${X1}" y1="${EJE}" y2="${EJE}" stroke="${C.muted}" stroke-width="2"/>`;
  const paso = hasta - desde > 30 ? 10 : 2;
  for (let a = Math.ceil(desde / paso) * paso; a < hasta; a += paso) {
    s += `<line x1="${sx(a)}" x2="${sx(a)}" y1="${EJE - 6}" y2="${EJE + 6}" stroke="${C.muted}" stroke-width="2"/>`;
    s += texto(sx(a), EJE + 30, String(a), { size: 18, fill: C.faint, anchor: 'middle' });
  }

  const visibles = hitos.filter((h) => anioDe(h.fecha) >= desde && anioDe(h.fecha) < hasta);
  const rotulables = visibles
    .filter((h) => filtro(h))
    .map((h) => ({
      h,
      x: sx(anioDe(h.fecha)),
      texto: (CORTO[h.id] ?? h.titulo) + (conAnio ? `, ${h.fecha.slice(0, 4)}` : ''),
    }));
  const niveles = [-44, 60, -84, 100, -124, 140, -164, 180];
  const ubicados = ubicarRotulos(rotulables, { x0: 8, x1: W - 8, ejeY: EJE, niveles, size: 20 });
  for (const u of ubicados) {
    if (!u) continue;
    const arriba = u.y < EJE;
    s += `<line x1="${u.x.toFixed(1)}" x2="${u.x.toFixed(1)}" y1="${EJE}" y2="${(arriba ? u.y + 6 : u.y - 20).toFixed(1)}" stroke="${COLOR_ERA[u.h.era]}" stroke-opacity="0.6" stroke-width="1.5"/>`;
    s += texto(u.tx, u.y, u.texto, { size: 20, fill: C.texto, anchor: u.anchor, weight: 500 });
  }
  for (const h of visibles) {
    s += `<circle cx="${sx(anioDe(h.fecha)).toFixed(1)}" cy="${EJE}" r="7" fill="${COLOR_ERA[h.era]}" stroke="#ffffff" stroke-width="2"/>`;
  }

  // Leyenda de eras abajo: en la vista completa las bandas recientes son finas.
  // Sin años: el eje ya los muestra.
  let lx = X0;
  for (const e of eras) {
    s += `<rect x="${lx}" y="438" width="16" height="16" rx="4" fill="${COLOR_ERA[e.id]}"/>`;
    s += texto(lx + 24, 452, e.nombre, { size: 18, fill: C.muted });
    lx += 24 + e.nombre.length * 18 * 0.56 + 40;
  }
  const faltan = ubicados.filter((u) => u === null).length;
  if (faltan) console.warn(`diagramas: ${faltan} rótulos no entraron en "${titulo}"`);
  return svg(W, H, titulo, desc, s);
}

// ---------------------------------------------------------------------------

const salidas = [
  ['pozos-aprendizaje.svg', pozosAprendizaje],
  ['escala.svg', escala],
  [
    'linea-de-tiempo.svg',
    () =>
      lineaDeTiempo({
        desde: 1948,
        hasta: 2028,
        filtro: (h) => EN_LA_COMPLETA.has(h.id),
        conAnio: true,
        titulo: 'Setenta y cinco años de inteligencia artificial',
        desc: 'Línea de tiempo de 1950 a 2026 con cuatro eras: reglas escritas a mano, aprender de datos, redes profundas y modelos generales. Cada hito tiene su fuente en la página de la sesión 1.',
      }),
  ],
  [
    'linea-de-tiempo-reciente.svg',
    () =>
      lineaDeTiempo({
        desde: 2011.5,
        hasta: 2027,
        filtro: () => true,
        conAnio: false,
        titulo: 'Los últimos quince años, de AlexNet a hoy',
        desc: 'Línea de tiempo de 2012 a 2026: AlexNet, AlphaGo, el transformer, GPT, GPT-2, GPT-3, InstructGPT, ChatGPT, LLaMA, GPT-4, Claude, o1, DeepSeek-R1, Claude Code, Claude Mythos y GPT-6 Astra.',
      }),
  ],
];
for (const [archivo, generar] of salidas) {
  writeFileSync(join(IMG, archivo), generar());
  console.log(`slides/img/${archivo}`);
}
