# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this repo is

Static site for an 8-session Spanish-language course on generative AI (LLMs + agents) for
petroleum-industry professionals (first client: YPFB Andina). Delivered live by video; this site
hosts the per-session materials and **fully client-side interactive exercises** (attendees only
have free-tier chatbot accounts — no API calls, ever). Deployed to GitHub Pages.

Sibling of `simulador-subastas-peru` (same Vite + React 19 + TS + Recharts skeleton and
conventions). Curriculum design + full plan: `~/.claude/plans/flickering-floating-star.md`.
Sales material: `docs/syllabus.md`.

## Architecture

- `src/content/programa.ts` — session registry (titles, objectives, estado); grid + headers render
  from here. Prose bodies are `src/content/sesion-N.mdx` (compiled by @mdx-js/rollup, lazy-loaded).
- `src/router.ts` — hand-rolled hash routing (`#/sesion/3`); no react-router. Works under
  GitHub Pages subpath with `base:'./'` and no 404.html hack.
- `src/engine/` — framework-free, vitest-tested exercise logic (sampling/temperature math, quiz
  scoring). Keep exercise math here, not in components.
- `src/exercises/` — one drop-in component per exercise, self-wrapped in `<Ejercicio>`; state
  persisted via `useExerciseState` (localStorage, hydrate-merge).
- `public/data/*.json` — precomputed datasets with the `{generated_at, source, source_date, data}`
  envelope; regenerated offline by `scripts/build_data.py` (tiktoken for real BPE splits). Only
  JSON ships to the browser.
- `src/theme.ts` — same export shape as simulador's, but values are `var(--pd-*)` strings from
  `src/styles/tokens.css` (podeley.ar identity layer, copied verbatim — edit upstream, not here).
  Chart/badge colors stay literal hex (SVG attributes can't resolve var()); they mirror the LIGHT
  theme tokens. Site is light-only.

## Conventions

- UI text Spanish (voseo — the instructor is Argentine); identifiers/comments English.
- No inline hex in components — theme.ts tokens only (chart hexes live in `theme.chart`).
- Every dataset JSON carries the metadata envelope; exercises show `meta.source` (provenance is
  part of the pedagogy — the course teaches verification).
- Exercises must run 100% client-side and deterministic where demoed live (seeded RNG in
  `engine/sampling.ts`) so screen-shared runs reproduce.
- Session pages S4–S8 carry a `callout--wip` block until their content lands; remove it when
  filling in the session (and flip `estado` in programa.ts).
