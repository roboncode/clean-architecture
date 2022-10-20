import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import {resolve} from 'path'

// Vitest video: https://www.youtube.com/watch?v=7f-71kYhK00

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  optimizeDeps: {
    exclude: ['axios'],
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.ts'),
      name: 'business',
      formats: ['es', "umd"],
      // the proper extensions will be added
      fileName: 'index',
    },
  },
  plugins: [dts()],
  test: {
    includeSource: ['src/**/*.ts'],
    coverage: {
      reporter: ['html', 'text'],
    },
  },
})
