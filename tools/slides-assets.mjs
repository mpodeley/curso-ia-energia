/* tools/slides-assets.mjs — copia slides/img/ a public/slides/img/.

   Los decks referencian sus imágenes como `img/...`, relativo al markdown. Al
   convertir, el HTML sale en public/slides/, así que las imágenes tienen que
   existir en los dos lugares: en slides/img/ para que resuelvan al exportar el
   PDF (marp escribe el temporal al lado del markdown de entrada) y en
   public/slides/img/ para que resuelvan en el HTML servido.

   Uso: node tools/slides-assets.mjs   (lo corre npm run slides) */

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ORIGEN = join(ROOT, 'slides/img');
const DESTINO = join(ROOT, 'public/slides/img');

if (!existsSync(ORIGEN)) {
  // Todavía no hay imágenes: no es un error, los decks arrancan sin QR.
  process.exit(0);
}

mkdirSync(DESTINO, { recursive: true });
cpSync(ORIGEN, DESTINO, { recursive: true });
console.log(`slides/img -> public/slides/img`);
