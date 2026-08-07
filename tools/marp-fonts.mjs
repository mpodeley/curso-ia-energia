/* tools/marp-fonts.mjs — genera slides/themes/podeley-fonts.css con las cuatro
   woff2 de src/fonts/ embebidas en base64.

   Por qué base64 y no una url() relativa: Marp inlinea el tema dentro de un
   <style> del HTML, así que una ruta relativa resolvería contra el HTML y no
   contra el CSS — y ese HTML vive en cuatro lugares distintos (public/slides/,
   dist/slides/, file:// al abrirlo a mano, y el temporal que marp escribe para
   exportar el PDF). Embebidas, el deck queda en un archivo único sin un solo
   pedido externo, que es además lo que necesitamos para un aula detrás de un
   firewall corporativo.

   El resultado se versiona: las woff2 no cambian nunca y así el loop de edición
   (npm run slides:preview) no necesita un paso de build previo. Mismo criterio
   que public/data/*.json y public/brochure.pdf.

   Uso: node tools/marp-fonts.mjs      (o npm run slides:fonts) */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const FONTS = join(ROOT, 'src/fonts');
const OUT = join(ROOT, 'slides/themes/podeley-fonts.css');

/* Espeja las @font-face de src/styles/tokens.css. Cuatro archivos, no seis:
   IBM Plex Sans y Space Grotesk son variables, así que un rango de peso cubre
   los dos pesos declarados desde el mismo archivo.

   A diferencia de tokens.css, acá se omite el unicode-range: con la fuente
   embebida no hay ancho de banda que ahorrar, y restringir el rango solo
   lograría que un glifo presente en el archivo no se use. */
const FACES = [
  { family: 'IBM Plex Mono', weight: '400', file: 'ibm-plex-mono-400.woff2' },
  { family: 'IBM Plex Mono', weight: '500', file: 'ibm-plex-mono-500.woff2' },
  { family: 'IBM Plex Sans', weight: '400 600', file: 'ibm-plex-sans-400.woff2' },
  { family: 'Space Grotesk', weight: '500 700', file: 'space-grotesk-500.woff2' },
];

const rules = FACES.map(({ family, weight, file }) => {
  const b64 = readFileSync(join(FONTS, file)).toString('base64');
  return (
    `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};` +
    `font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2");}`
  );
});

const css = `/* @theme podeley-fonts */
/* GENERADO por tools/marp-fonts.mjs — no editar a mano.
   Regenerar: npm run slides:fonts
   Fuente: src/fonts/*.woff2, las mismas que sirve src/styles/tokens.css.

   No es un tema para usar directo: existe solo para que slides/themes/podeley.css
   lo levante con @import 'podeley-fonts'. Ese @import es el del theme set de
   Marpit, no el de CSS, y resuelve porque los dos archivos están registrados en
   themeSet de marp.config.mjs. */

${rules.join('\n\n')}
`;

writeFileSync(OUT, css);

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`podeley-fonts.css: ${FACES.length} @font-face, ${kb(css.length)}`);
