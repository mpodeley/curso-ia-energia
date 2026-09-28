# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this repo is

Static site for a Spanish-language course on generative AI (LLMs + agents) for
petroleum-industry professionals. Delivered live by video; this site hosts the per-session
materials, the slide decks, and **fully client-side interactive exercises** (attendees only have
free-tier chatbot accounts — the exercises never call an LLM API). Deployed to GitHub Pages
twice: the canonical site at **mpodeley.github.io/curso-ia-energia** (personal account, no custom
domain, serves directly — this is the URL printed on decks and QR) and a backup copy in the org,
which the org's custom domain serves at podeley.ar/curso-ia-energia. The Worker's ORIGENES
allowlist carries all three origins (it compares `Origin`, i.e. host only, so a path change never
touches it).

**Editions live in git history, not in directories.** `main` is always the edition being
prepared or taught. The first edition (YPFB Andina, 8 sessions × 2 h, August 2026) is frozen at
tag `ypfb-2026-08` and at the archived Pages repo `mpodeley/curso-energia-ypfb`; never rebuild
or redeploy it. The second edition (PCR, CGC, Tecpetrol, Andes Petroleum; 8 sessions × 2 h,
two per day, 2026-09-28 to 2026-10-01) is what `main` holds now; its cohort profile and programme are in
`docs/edicion-2026-09/`.

One thing *does* leave the browser, and only when the student presses a button: the session-1
survey, the live pulsos and the open answers — plus the name typed into the identity card, which
travels with them — all going to a Cloudflare Worker in `worker/` (see below). The exercises
themselves still send nothing. Keep the footer in `src/App.tsx` honest about that distinction —
it is a promise, not decoration.

**The second edition (2026-09) runs with the Worker off.** On 2026-09-24 something outside the
dev machine started hitting the Worker at 6–13k req/min and the account's Free quota died within
an hour of each reset, so on 2026-09-25 `workers_dev` went to false, `.env.production` ships an
empty `VITE_API_URL`, and the MDX pages no longer mount `PulsoVivo` or `EncuestaS1`. There is no
PIN; the definitions, the expectations, the confidence vote, the S2 polls and the session-1
survey (now a spoken two-question round) all go through the video-call chat or by voice, and
Martín keeps them in his own document. The footer switches on `apiHabilitada`. Components,
panel and Worker code stay in the repo for a future edition. The deployed script itself was
deleted from Cloudflare on 2026-09-25 at 16:58 UTC (another session, `wrangler delete --force`);
the D1 database `curso-energia-ypfb` survives. Restoring means `workers_dev = true`,
`npm run worker:deploy`, the three `wrangler secret put` (they died with the script), the URL
back in `.env.production` and the two MDX mounts.

Sibling of `simulador-subastas-peru` (same Vite + React 19 + TS + Recharts skeleton and
conventions). Curriculum of the first edition: `~/.claude/plans/flickering-floating-star.md`; plan
of the second: `~/.claude/plans/harmonic-leaping-stearns.md`. `docs/syllabus.md` and
`docs/brochure/` are the first edition's sales material, kept as history.

## Architecture

- `src/content/programa.ts` — session registry (titles, objectives, estado) and `DIAS` (date and
  title of each day: the two sessions of a day belong together, and the landing groups them under
  that title; deck covers and the session-1 map repeat it); grid + headers render from here. Prose bodies are `src/content/sesion-N.mdx` (compiled by @mdx-js/rollup, lazy-loaded).
- `src/router.ts` — hand-rolled hash routing (`#/sesion/3`); no react-router. Works under
  GitHub Pages subpath with `base:'./'` and no 404.html hack.
- `src/engine/` — framework-free, vitest-tested exercise logic (sampling/temperature math, quiz
  scoring). Keep exercise math here, not in components.
- `src/exercises/` — one drop-in component per exercise, self-wrapped in `<Ejercicio>`; state
  persisted via `useExerciseState` (localStorage, hydrate-merge).
- `public/data/*.json` — precomputed datasets with the `{generated_at, source, source_date, data}`
  envelope; regenerated offline by `scripts/build_data.py` (tiktoken for real BPE splits). Only
  JSON ships to the browser. Exception since 2026-09-15: the `quiz_sN.json` files are
  hand-authored per session and `build_data.py` never touches them — `npm run data` is safe to run
  while a quiz is being edited.
- Sessions 1–2 datasets (added 2026-09-24): `linea_de_tiempo.json` (hand-authored, 28 milestones
  in `data: {eras, hitos}`, one primary source each — a milestone that can't be verified doesn't
  go in; `src/engine/lineaDeTiempo.test.ts` guards order, eras and sources),
  `pozos_aprendizaje.json` (`scripts/build_pozos_aprendizaje.py`, 84 active Noroeste wells by
  RGP and water cut with their declared type, from the Capítulo IV cache; the test in
  `src/engine/aprendizaje.test.ts` fails if a new cut breaks the page's story: kNN and k-means
  must both recover the declared type ≥ 90%), `escala.json` (`scripts/build_escala.py`, Epoch AI
  "Notable AI Models", CC BY), `autosupervisado.json` (hand-authored, a verbatim Secretaría de
  Energía sentence plus sourced scale rungs) and `red_digitos.json` (added 2026-09-25,
  `scripts/build_mnist.py`: a 784→64→10 MNIST network, int8 weights in base64 plus 20 test
  digits; the browser runs it in `src/engine/digitos.ts`, whose `preprocesar` fits the drawing
  the way MNIST was built, and that step matters as much as the weights. Run the script with
  `uv run --with numpy --with scikit-learn --with scipy`) and `red_generativa.json`
  (`scripts/build_mnist_generativa.py`, PyTorch CPU: the decoder of a conditional VAE, two style
  numbers + one-hot → 256 → 784, for "la red al revés"; the test checks the reading network
  recognises what it draws).
- `slides/img/` — deck figures, also embedded on the pages as `<figure className="figura">`
  (`public/slides/img/`). Four are hand-written SVG (capas, estrecha-vs-general, tres-maneras,
  dos-etapas); four are generated by `tools/diagramas.mjs` from the same JSON the page
  components draw (pozos-aprendizaje, escala, linea-de-tiempo, linea-de-tiempo-reciente), and it
  imports `src/engine/aprendizaje.ts` directly (Node ≥ 24 type stripping; CI runs Node 24). It
  runs inside `npm run slides`. Every SVG embeds its fonts: an `<img>` SVG can't see the page's.
- `public/descargas/` — files the student downloads to feed a chatbot. Since 2026-09-28 the
  session-3 workshop uses `campos_capiv_2006_2026.csv` (seven mature Argentine fields, oil,
  water and water injection by month and resource type, 2006-01 to 2026-07; no field operated
  by a company in the room) and its deliberately dirty twin `campos_capiv_sucio.csv`, both
  built by `scripts/build_csv_campos.py` from the Capítulo IV "agrupada por yacimiento y
  formación" CSV (downloaded to `scripts/_cache/`). Ecuador and Colombia publish oil only, so
  the water comes from Argentina. `scripts/surveillance_referencia.py` implements the same
  rules as the surveillance prompt printed on the session-3 page and writes
  `surveillance_referencia.xlsx` (plan B, with live formulas; recalculated in LibreOffice it
  matches the script) plus the answer key in `scripts/_cache/` — prompt and script are two
  copies of one contract: change both or neither. Since the second rework of 2026-09-28 the
  session-3 workshop consolidates the six ARCH daily reports (8–15 Sep) into an Excel, and the
  surveillance workbook moved to "para curiosos". `scripts/arch_consolidar.py` reads the six
  PDFs with `pdftotext -layout` and writes `arch_consolidado_referencia.xlsx` (plan B) plus
  the answer key in `scripts/_cache/arch_control.json`; it is the second copy of the workshop
  prompt's contract. Known facts it pins: companies add up to each report's totals; the
  report of 11 Sep revises EP Petroecuador's day 9 by +5,827 bppd; operation days 11 and 12
  have no report of their own. The Banco Central del Ecuador bulletin (Q2 2026) stays for the
  session-4 notebook menu; the Petroecuador vs BCE cross-check was dropped. The decline assets (10-well CSV, `build_csv_descarga.py`, `dca_referencia.py`, the
  Volve CSV and its scripts) are no longer linked from any page since the 2026-09-28 reshuffle;
  they stay in the repo, and `decline_wells.json` still feeds session 1's DeclineDuel.
- `src/theme.ts` — same export shape as simulador's, but values are `var(--pd-*)` strings from
  `src/styles/tokens.css` (podeley.ar identity layer, copied verbatim — edit upstream, not here).
  Chart/badge colors stay literal hex (SVG attributes can't resolve var()); they mirror the LIGHT
  theme tokens. Site is light-only.
- `slides/sesion-N.md` — the session deck, plain Marp markdown, hand-edited. The "En la sesión en
  vivo" table of the matching `sesion-N.mdx` **is** the deck outline: same blocks, same minutes.
  Theme in `slides/themes/podeley.css` (+ `podeley-fonts.css`, generated by `tools/marp-fonts.mjs`,
  woff2 inlined as base64 so the HTML makes zero external requests — the classroom sits behind a
  corporate firewall). `npm run slides` (part of `npm run build`) emits `public/slides/*.html` →
  `dist/slides/`; the PDFs in `public/handouts/` are committed and regenerated with
  `npm run slides:pdf`, which needs a browser (same pattern as `tools/brochure-pdf.mjs`).
- `worker/` — Cloudflare Worker + D1 behind the live forms. Outside the root tsconfig's `include`,
  with its own (`npm run typecheck:worker`). `worker/src/validate.ts` is pure and covered by the
  repo's vitest. Deployed by hand, never from CI: a bad push must not be able to break the API ten
  minutes before a live class.
- `src/lib/` — I/O adapters, not hooks: `config.ts` (the `VITE_API_URL` kill switch), `api.ts`
  (never throws — every call returns a `Resultado`), `outbox.ts` (localStorage retry queue),
  `identidad.tsx` (PIN + name context).

## Course calibration (set 2026-09-15 for the second edition; supersedes the YPFB calibration frozen at tag ypfb-2026-08)

- **Reshuffle of 2026-09-28** (Matías, after day 1): the old sessions 3 and 4 were condensed
  into session 3 (reworked again that night: what a prompt is, system vs user prompt shown
  on Claude's published system prompt, an ARCH report told to four audiences in three
  languages, and a workshop that consolidates six ARCH reports into an Excel); the old session 5 (RAG, Gemini
  Notebook) moved to slot 4 with a reserves and regulation notebook; the old session 6 on
  agents was split into sessions 5 (what an agent is, the harness, the landscape, a free
  agent workshop) and 6 (a terminal agent builds the session-8 case live, then the company
  case). Design assumption from then on: nobody brings anything (no homework, no data, no
  paid account); every exercise ships its own files. The free workshop tool is Claude, the
  only free tier verified to run code and return an .xlsx.
- **Format: 8 sessions × 2 h, two per day on 4 consecutive days, Mon 28-sep to Thu 1-oct 2026,
  10:00–14:00 Argentina (8:00–12:00 Ecuador and Colombia), remote.** Odd session 10:00–12:00,
  even session 12:00–14:00; same numbering and topics as the first edition (day 1 = S1+S2, day
  2 = S3+S4, ...). Each session has 110 minutes of content and **one 10-minute break**: the odd
  one ends with it (11:50–12:00), the even one keeps it mid-session (~13:00). Breaks are rows of
  the agenda table in both the MDX and the deck. Split decided 2026-09-24; from 2026-09-15 to
  then the site had four 4-hour day pages. The tarea and "Para discutir" live in the even
  session; "tomorrow" is the next day, not the next session. Never write "esta semana / la
  semana pasada" for course cadence. A change of mode (expo → taller → ronda) at
  least every 25 minutes.
- **Cohort: 6 technical staff from four companies (PCR-Ecuador, CGC, Tecpetrol, Andes
  Petroleum), three countries (Ecuador, Argentina, Colombia), competitors.** Full rounds by name
  are cheap — use them. Never assume shared data, systems or vocabulary; never ask for company
  data in the shared chat. Examples and datasets come from public sources of Ecuador (ARCH
  daily report, Petroecuador monthly) and Argentina (Capítulo IV); no third country track. The
  two HR coordinators (PCR, Andes) do not attend.
- **Two instructors.** Matías teaches; Martín Alvarado runs the chat, the timer, calls the
  rounds and writes down what the room says in the chat (expectations, definitions, the
  relevamiento round). Deck notes address the lead instructor; anything the support
  instructor does in a block goes in the notes prefixed `Apoyo:`.
- **Nobody is named in published text** (Matías, 2026-09-28). Pages, slide text and speaker
  notes never name Matías or Martín: the notes ship in the handout PDFs and in presenter view.
  Cues to the room say "esperá a que te indiquemos" or use "nosotros" ("decimos 'ya'"). Only
  the credits keep the names: the "Quiénes somos" slide of session 1 and the site footer.
- **The employers pay for the course.** Every use case is framed as work; nothing is pitched as
  personal or "para la vida", even when it obviously also serves there (Matías, 2026-09-25).
- **Vocabulary:** "IA de propósito específico" versus "IA de propósito general"; never "IA
  estrecha" (Matías, 2026-09-25). NotebookLM is "Gemini Notebook (antes NotebookLM)" since
  Google's rename of 2026-07-16.
- **The real case is pre-built on public data** (waterflood screening, Puesto Guardián, Capítulo
  IV). It is shown, dissected and extended live in session 8 — not assembled between sessions
  from the survey. The survey feeds emphasis and examples; each company writes its own one-page
  case in the session-6 workshop and gets it critiqued in session 8.
- **Driving school, not mechanics.** The course teaches first steps in USING generative AI at
  work, not ML expertise. Mechanics appear only in service of use, and every mechanical piece
  must land on something the student does differently at work tomorrow. Depth goes to
  clearly-marked "para curiosos" material on the page, never into live minutes.
- **Zero pre-work assumed.** Nobody arrives having read anything: everything essential happens
  live, from zero. Session pages are reinforcement and optional depth ("Antes de la sesión
  (opcional)"), never prerequisites. The ONLY ask between days is the tarea, sized at ~5
  minutes, and every deck carries a plan B in its notes for when few did it.
- **Resources: first-rate only.** 3Blue1Brown, Khan Academy, Anthropic, Distill, Polo Club
  (Transformer Explainer), official tools and data sources. No generic-divulgation YouTube
  channels in any language. Short lists beat padded ones.
- **Speaker notes start with a timestamp (`0:00 · …`) and end with `acumulado h:mm`; each deck
  closes at 2:00.** A note whose first line parses as `key: value` YAML is swallowed by Marpit
  as a directive and vanishes from HTML and PDF.
- **Every session ends with takeaways**: two or three concrete practices, said in plain words
  on a closing slide.

## Conventions

- UI text Spanish (voseo — the instructor is Argentine); identifiers/comments English.
- No inline hex in components — theme.ts tokens only (chart hexes live in `theme.chart`).
- Every dataset JSON carries the metadata envelope; exercises show `meta.source` (provenance is
  part of the pedagogy — the course teaches verification). Exception: `decline_wells.json` mixes
  synthetic and real wells, so single-well exercises print the per-well `fuente` field instead —
  a synthetic curve must never get credited to the government dataset.
- Exercises must run 100% client-side and deterministic where demoed live (seeded RNG in
  `engine/sampling.ts`) so screen-shared runs reproduce.
- A session ships as `estado: 'lista'` with `slides: true` only when prose, exercises, quiz
  and deck are all done. While it is being written it stays `en-preparacion` with `slides: false`
  and a `callout--wip` at the top of its MDX: restore or retire both together.
- A deck and its MDX share the agenda table: change both or neither.
- The LIGHT values of `tokens.css` are restated as literal hex in **three** places
  (`src/theme.ts`, `docs/brochure/brochure.html`, `slides/themes/podeley.css`) because each one
  is somewhere CSS vars do not reach. If the tokens change upstream, all three move together.
- Deck markdown stays plain: headings, lists, tables, and at most the layout classes the theme
  defines. No inline `<style>`, no raw HTML beyond speaker-note comments.
- **No PIN lives in the client.** Everything under `src/` ships to a public bundle; the three
  secrets exist only as `wrangler secret` values and are only ever compared inside the Worker.
- Anything that talks to the Worker must degrade to "saved in your browser, retrying" rather than
  fail. The site is projected live: a dead Worker is a yellow note, never a blank page.
- Pulso types: `opcion` (bars), `palabra` (word cloud) and `texto` (one sentence per person,
  projected as named cards for a round; the Worker's `/tally` doesn't count it, so the student
  sees "está en la pantalla del instructor"). `texto` needed no Worker change: the payload
  `{texto}` fits the generic shape check, pinned by a case in `worker/src/validate.test.ts`.
- Deck layout classes: portada, seccion, agenda, panel, cita, acentos, figura (one image filling
  the slide + a caption paragraph) and dupla (two h3 + paragraph columns, "Quiénes somos").
- Survey and pulso *content* lives in `src/content/` under version control; the database stores
  only answers and which pulso is open. Content in git, state in the DB.
