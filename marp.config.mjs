/* marp.config.mjs — configuración de Marp CLI para los decks de las sesiones.
   cosmiconfig lo descubre solo, así que ningún script necesita pasarle -c.

   browserPath espeja el criterio de tools/brochure-pdf.mjs: una variable de
   entorno para overridear, y como default el chromium que ya cachea playwright.
   Es obligatorio, no opcional: Marp autodetecta navegadores buscando en PATH y
   en esta máquina el único Chrome es un flatpak, que no está en PATH.

   Solo lo necesitan --pdf, --pptx y --preview. La conversión a HTML —que es lo
   que corre npm run build y por lo tanto CI— no toca navegador. */

import { join } from 'node:path';
import { readdirSync } from 'node:fs';

// Playwright renumbers its chromium build on every update (chromium-1223,
// chromium-1243, ...): pick the newest one installed instead of a fixed number.
function playwrightChromium() {
  const base = join(process.env.HOME ?? '', '.cache/ms-playwright');
  let dirs = [];
  try {
    dirs = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort();
  } catch {
    return undefined;
  }
  const last = dirs.at(-1);
  return last ? join(base, last, 'chrome-linux64/chrome') : undefined;
}

export default {
  themeSet: ['./slides/themes'],

  /* Los fuentes se editan a ~76 columnas; sin esto, Marp convierte cada salto
     de línea del markdown en un <br> y parte las oraciones al medio. */
  options: { markdown: { breaks: false } },

  /* Los decks se mantienen en markdown plano: el tema hace el trabajo pesado
     para que editarlos a mano siga siendo cómodo. Lo único que se permite es el
     comentario de notas del orador y las directivas _class. */
  html: false,

  browserPath: process.env.SLIDES_CHROMIUM || playwrightChromium(),

  bespoke: { progress: true },
};
