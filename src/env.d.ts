/// <reference types="vite/client" />

// Session prose is authored as MDX (see src/content/). Compiled by
// @mdx-js/rollup in vite.config.ts; each file default-exports a component.
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}
