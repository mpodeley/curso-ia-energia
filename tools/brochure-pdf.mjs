/* tools/brochure-pdf.mjs — renders docs/brochure/brochure.html to
   public/brochure.pdf (A4, print backgrounds) so the live site hosts it at
   /brochure.pdf. Same toolchain as podeley.ar's tools/shots.mjs.

   Usage:
     SHOTS_MODULES_DIR=/path/with/node_modules node tools/brochure-pdf.mjs
   Needs: playwright-core + a chromium binary (see EXEC below). */

import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const MODULES = process.env.SHOTS_MODULES_DIR || process.cwd();
const require = createRequire(join(MODULES, 'x.js'));
const { chromium } = require('playwright-core');

const EXEC =
  process.env.SHOTS_CHROMIUM ||
  join(process.env.HOME, '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome');

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage();
await page.goto('file://' + join(ROOT, 'docs/brochure/brochure.html'), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: join(ROOT, 'public/brochure.pdf'),
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
console.log('OK: public/brochure.pdf');
