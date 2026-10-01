# curso-ia-energia

Sitio del curso **"IA generativa para la industria del petróleo y gas"**: en vivo por video,
con materiales auto-guiados y ejercicios interactivos que corren enteros en el navegador.

Edición vigente: **4 sesiones × 4 h, del 28 de septiembre al 1 de octubre de 2026**, para una
cohorte de PCR, CGC, Tecpetrol y Andes Petroleum, con dos instructores. La primera edición
(YPFB Andina, 8 sesiones × 2 h, agosto de 2026) quedó congelada en el tag `ypfb-2026-08` y en
`mpodeley.github.io/curso-energia-ypfb` (repo archivado): no se reconstruye nunca más.

- Programa de la edición vigente: [`docs/edicion-2026-09/programa.md`](docs/edicion-2026-09/programa.md)
  (el syllabus de la primera edición, [`docs/syllabus.md`](docs/syllabus.md), queda como histórico)
- Encuesta de relevamiento (sesión 1): [`src/content/encuesta-s1.ts`](src/content/encuesta-s1.ts),
  diseñada en [`docs/encuesta.md`](docs/encuesta.md)

## Stack

Vite + React 19 + TypeScript + Recharts, prosa de sesiones en MDX, deploy estático a GitHub
Pages. Mismo esqueleto que `simulador-subastas-peru`; identidad visual compartida vía
`src/styles/tokens.css` (capa portable `--pd-*` de podeley.ar).

Los once ejercicios corren enteros en el navegador y no mandan nada a ningún lado. Lo único
que viaja a un servidor es lo que el alumno envía a propósito (la encuesta, los pulsos en vivo
y las respuestas abiertas), junto con el nombre con el que entró, contra un Cloudflare Worker
propio (`worker/`), que es opcional: sin `VITE_API_URL` el sitio se construye sin nada de eso.

```bash
npm run dev              # desarrollo
npm test                 # vitest (engine de ejercicios + validación del Worker)
npm run build            # slides + tsc + vite build → dist/
npm run data             # regenera public/data/ (requiere: pip install tiktoken)
npm run typecheck        # tsc --noEmit    ·    npm run typecheck:worker para worker/
npm run deploy:canonica  # build + push de dist/ a mpodeley.github.io (la canónica)
```

El deploy tiene dos destinos: el CI publica solo el **respaldo** de la org (servido en
podeley.ar) en cada push; la **canónica** (`mpodeley.github.io/curso-ia-energia`, la URL
impresa en decks y brochure) se publica a mano con `npm run deploy:canonica`. Decisión del
10-ago-2026; si algún día se quiere automatizar, el paso ya está en `deploy.yml` y se activa
creando el secret `ACTIONS_DEPLOY_KEY` (deploy key de escritura sobre el repo de mpodeley).

La fuente vive en dos repos con el mismo `main`. Se clona y se trae de
`mpodeley/curso-ia-energia`; cada push va además a `podeley/curso-ia-energia`, cuyo CI publica
el respaldo. En una máquina nueva, después de clonar el primero:

```bash
git remote set-url --add --push origin https://github.com/mpodeley/curso-ia-energia.git
git remote set-url --add --push origin https://github.com/podeley/curso-ia-energia.git
```

Con eso `git push` actualiza los dos. En el repo de mpodeley el workflow `Build and deploy` está
desactivado desde el 1 de octubre de 2026, así que un push a su `main` deja la canónica como
estaba hasta el próximo `npm run deploy:canonica`.

El brochure (`docs/brochure/brochure.html`) fue el material de venta de la primera edición y ya
no se sirve desde el sitio. Si vuelve a hacer falta: `python scripts/build_qr.py` rehace el QR
desde la URL del curso, y `SHOTS_MODULES_DIR=<dir-con-playwright-core> node tools/brochure-pdf.mjs`
rehace el PDF. Los dos necesitan algo que no está en el repo (segno y un chromium).

## Slides

Los decks de cada sesión son markdown plano, editables a mano en cualquier editor. El tema
`slides/themes/podeley.css` hace el trabajo visual, con las fuentes embebidas en base64: el
HTML resultante es un archivo único que no hace ni un pedido externo, que es lo que se necesita
para un aula detrás de un firewall corporativo.

```bash
npm run slides          # decks → public/slides/  (lo corre npm run build)
npm run slides:preview  # loop de edición: watch + ventana de preview
npm run slides:serve    # http://localhost:8080 (la vista de presentador solo anda vía http)
npm run slides:pdf      # handouts → public/handouts/  (necesita navegador)
npm run slides:notes    # run sheet de texto con las notas del orador
npm run slides:fonts    # regenera slides/themes/podeley-fonts.css desde src/fonts/
```

Dos trampas de Marp que conviene tener presentes al editar: `---`, `***` y `___` son **los tres**
saltos de slide, así que un `<hr>` dentro de una slide no existe (la regla de la portada se
dibuja desde el CSS); y una nota del orador cuya primera línea parezca `clave: valor` la come
Marpit como directiva y desaparece sin avisar.

Exportar a `.pptx` no está en ningún flujo: `--pptx-editable` necesita LibreOffice Impress, que
no está instalado, y el `--pptx` común saca un bitmap por slide que no se puede editar. Si algún
cliente lo exige: `marp --allow-local-files --pptx -I slides -o build/pptx`.

## Formularios en vivo (`worker/`)

Un Cloudflare Worker con D1 recibe la encuesta de relevamiento, los pulsos y las respuestas
abiertas, y los sirve al panel del instructor en `#/panel`. Se deploya a mano, aparte de Pages.

```bash
cd worker && npm install && npx wrangler login
npx wrangler d1 create curso-energia-ypfb          # el database_id va a wrangler.toml
npx wrangler d1 execute curso-energia-ypfb --remote --file=./sql/schema.sql
npx wrangler secret put PIN_ALUMNO               # el que se dicta en clase
npx wrangler secret put PIN_INSTRUCTOR
npx wrangler secret put TOKEN_SECRET             # openssl rand -hex 32
npx wrangler deploy                              # la URL resultante va a .env.production
```

Cohorte nueva: cambiar `EDICION` en `wrangler.toml`, rotar `PIN_ALUMNO` y deployar. Las
respuestas viejas quedan consultables desde el selector de edición del panel. Backup:
`npx wrangler d1 export curso-energia-ypfb --remote --output=backup.sql`, o el botón
**Exportar CSV** del panel.

Ningún PIN vive en el cliente: todo lo que está en `src/` es público y los tres secretos los
verifica únicamente el Worker.

### Antes de dictar

Una semana antes de la primera clase, pedirle a alguien de **cada** empresa de la cohorte que
abra `<url-del-worker>/api/v1/salud` **desde la red corporativa** y mande captura (en la
edición 2026-09 son cuatro redes distintas, y fallan por separado). Es la única manera de saber
si el firewall bloquea `*.workers.dev`, y no es algo que se pueda descubrir diez minutos antes
de empezar. Si está bloqueado, la salida es mover la zona `podeley.ar` a
Cloudflare y darle un dominio propio al Worker.

Ojo con el origen: la URL canónica del curso es `mpodeley.github.io/curso-ia-energia`
(cuenta personal, sin dominio custom: sirve directo, sin redirecciones). El CI publica además
una copia de respaldo en la organización, que por el dominio propio de esta termina servida
en `podeley.ar/curso-ia-energia/` (con `podeley.github.io/...` respondiendo 301 hacia ahí).
`ORIGENES` en `worker/wrangler.toml` tiene que incluir los tres orígenes: `mpodeley.github.io`,
`podeley.ar` y `podeley.github.io`. El ensayo se hace siempre desde la URL canónica, la misma
que van a abrir los alumnos, nunca desde localhost.

El día anterior conviene un ensayo con `EDICION` terminada en `-ensayo`: abrir un pulso,
responderlo **desde un teléfono con datos móviles** (no del wifi de la oficina, que prueba
otra cosa), cerrarlo, y confirmar que el alumno ve el resultado. Después volver `EDICION` al
valor real; las filas del ensayo quedan aisladas en su propia edición.
