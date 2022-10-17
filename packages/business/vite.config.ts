import { defineConfig } from 'vitest/config'

// Vitest video: https://www.youtube.com/watch?v=7f-71kYhK00

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': "undefined",
  },
  plugins: [],
  test: {
    includeSource: ['src/**/*.ts'],
    coverage: {
      reporter: ['html', 'text'],
    }
  }
})
