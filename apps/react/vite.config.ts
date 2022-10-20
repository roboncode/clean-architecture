import Unocss from 'unocss/vite'
import { defineConfig } from 'vitest/config'
import presetUno from '@unocss/preset-uno'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  // START :: DO NOT REMOVE THIS SECTION. IT IS REQUIRED FOR THE VITE CONFIG TO WORK
  optimizeDeps: {
    include: [
      "business",
    ],
  },
  build: {
    rollupOptions: {}
  },
  // END :: DO NOT REMOVE THIS SECTION. IT IS REQUIRED FOR THE VITE CONFIG TO WORK
  plugins: [
    react(),
    Unocss({
      presets: [presetUno()],
      shortcuts: {
        'bg-base': 'bg-gray-100 dark:bg-dark-800',
        'bg-shade': 'bg-gray-200/70 dark:bg-gray-500/10',
        'bg-highlight': 'bg-gray-100 dark:bg-gray-600/50',
        'bg-accent': 'bg-dark-50 dark:bg-dark-200',
        'color-base': 'text-gray-900 dark:text-gray-300',
        'color-fade': 'text-gray-900:50 dark:text-gray-300:50',
        'color-accent': 'text-white dark:text-gray-100',
        'border-base': 'border-gray-300 dark:border-dark-300',
        'border-highlight': 'border-gray-200/50 dark:border-gray-700/50',
      },
    }),
  ],
  test: {
    coverage: {
      reporter: ['html', 'text'],
    },
  },
})
