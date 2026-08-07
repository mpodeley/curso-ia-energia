import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // worker/src/validate.ts is pure on purpose so the rules that decide what
    // the database accepts run under the same vitest as the exercise engines.
    include: ['src/**/*.test.ts', 'worker/src/**/*.test.ts'],
  },
})
