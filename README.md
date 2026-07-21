# curso-ia-energia

Sitio del curso **"IA generativa para la industria del petróleo y gas"** — 8 sesiones × 2 h,
en vivo por video, con materiales auto-guiados y ejercicios interactivos que corren enteros en
el navegador (sin backend, sin APIs).

- Syllabus completo: [`docs/syllabus.md`](docs/syllabus.md)
- Encuesta de relevamiento (sesión 1): [`docs/encuesta.md`](docs/encuesta.md)

## Stack

Vite + React 19 + TypeScript + Recharts, prosa de sesiones en MDX, deploy estático a GitHub
Pages. Mismo esqueleto que `simulador-subastas-peru`; identidad visual compartida vía
`src/styles/tokens.css` (capa portable `--pd-*` de podeley.ar).

```bash
npm run dev        # desarrollo
npm test           # vitest (engine de ejercicios)
npm run build      # tsc + vite build → dist/
npm run data       # regenera public/data/ (requiere: pip install tiktoken)
```
