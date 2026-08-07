/* marp.config.mjs — configuración de Marp CLI para los decks de las sesiones.
   cosmiconfig lo descubre solo, así que ningún script necesita pasarle -c.

   browserPath espeja el criterio de tools/brochure-pdf.mjs: una variable de
   entorno para overridear, y como default el chromium que ya cachea playwright.
   Es obligatorio, no opcional: Marp autodetecta navegadores buscando en PATH y
   en esta máquina el único Chrome es un flatpak, que no está en PATH.

   Solo lo necesitan --pdf, --pptx y --preview. La conversión a HTML —que es lo
   que corre npm run build y por lo tanto CI— no toca navegador. */

import { join } from 'node:path';

export default {
  themeSet: ['./slides/themes'],

  /* Los decks se mantienen en markdown plano: el tema hace el trabajo pesado
     para que editarlos a mano siga siendo cómodo. Lo único que se permite es el
     comentario de notas del orador y las directivas _class. */
  html: false,

  browserPath:
    process.env.SLIDES_CHROMIUM ||
    join(process.env.HOME ?? '', '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'),

  bespoke: { progress: true },
};
