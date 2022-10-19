import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    includeSource: ['src/**/*.ts'],
    exclude: ['node_modules', 'build', 'dist', 'coverage', 'test', 'tests'],
    coverage: {
      reporter: ['html', 'text'],
    },
  },
})
