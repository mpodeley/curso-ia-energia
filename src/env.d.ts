/// <reference types="vite/client" />

// URL del Worker del curso. Vacía o ausente = sitio sin backend: todo lo que
// habla con el servidor deja de renderizar (ver src/lib/config.ts).
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Session prose is authored as MDX (see src/content/). Compiled by
// @mdx-js/rollup in vite.config.ts; each file default-exports a component.
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}
