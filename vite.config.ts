import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

// base: "./" keeps asset + data paths relative so the build works unchanged
// under the GitHub Pages project subpath (mpodeley.github.io/<repo>/).
// mdx runs with enforce:'pre' so session prose compiles before the React
// plugin; remark-gfm enables the session agenda tables.
export default defineConfig({
  base: './',
  plugins: [{ enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) }, react()],
})
