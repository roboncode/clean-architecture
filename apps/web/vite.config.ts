import Unocss from 'unocss/vite'
import { defineConfig } from 'vitest/config'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import react from '@vitejs/plugin-react'
import transformerDirective from '@unocss/transformer-directives'

// Vitest video: https://www.youtube.com/watch?v=7f-71kYhK00

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': "undefined",
  },
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
      theme: {
        colors: {
          // primary: '#0ea5e9',
          // primary: '#007bcc',
          primary: '#0ca5e9',
          highlight: '#F9FAFB',
          danger: '#EF4444',
          slack: '#1a1d21',
        },
      },
      shortcuts: {
        // theme colors
        // 'theme-bg-base': 'bg-slate-800',
        // 'theme-border-base': 'border-slate-700',
        // 'border-theme-light': 'border-slate-700',
        // 'color-theme': 'text-slate-100',
        // 'color-theme-shade': 'text-slate-300:50',
        // 'color-theme-light': 'text-slate-200:50',

        'theme-bg-base': 'bg-slate-800',
        'theme-bg-shade': 'bg-slate-500:10',
        'theme-bg-highlight': 'bg-slate-600:50',
        'theme-bg-inverted': 'bg-teal-700',
        'theme-color-base': 'text-slate-300',
        'theme-color-fade': 'text-slate-300:50',
        'theme-color-inverted': 'text-slate-100',
        'theme-border-base': 'border-slate-700',
        'theme-border-highlight': 'border-slate-700',
        'theme-activeLink': 'bg-light-blue-700',

        // core colors
        'bg-base': 'bg-gray-100 dark:bg-slack',
        'bg-shade': 'bg-gray-200/70 dark:bg-gray-500/10',
        'bg-highlight': 'bg-gray-100 dark:bg-gray-600/50',
        'bg-accent': 'bg-dark-50 dark:bg-dark-200',
        'color-base': 'text-gray-900 dark:text-gray-300',
        'color-fade': 'text-gray-900:50 dark:text-gray-300:50',
        'color-accent': 'text-white dark:text-gray-100',
        'border-base': 'border-gray-300 dark:border-dark-300',
        'border-highlight': 'border-gray-200/50 dark:border-gray-700/50',
        'input-base': 'text-gray-900 dark:text-light-blue-400',
        // core components colors
        textinput:
          'w-full px-3 py-2 bg-base border border-base rounded-md disabled:bg-gray-50 disabled:text-gray-400 dark:placeholder:text-gray-600',
        'form-label': 'pl-1 pt-1 text-sm font-medium',
        btn: 'inline-flex whitespace-nowrap items-center justify-center px-6 py-2 space-x-2 text-sm font-semibold text-center transition-colors duration-300 rounded-md',
        'btn-base': 'bg-shade color-base border border-base bg-gray-100 hover:bg-highlight hover:drop-shadow-sm',
        'btn-primary': 'bg-light-blue-700 hover:bg-light-blue-600 text-white',
        'btn-success': 'bg-green-600 hover:bg-green-700 text-white',
        'btn-warning': 'bg-yellow-600 hover:bg-yellow-700 text-white',
        'btn-danger': 'bg-red-600 hover:bg-red-700 text-white',
        'btn-disabled':
          'disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:disabled:opacity-30 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-default disabled:pointer-events-none disabled:drop-shadow-none disabled:select-none',
        'btn-plain':
          'inline-flex whitespace-nowrap items-center justify-center rounded-md px-6 py-2 space-x-2 text-sm font-semibold text-center hover:bg-highlight',
        'btn-block': 'rounded-none',
        'btn-sm': 'py-1 px-3 text-sm',
        'btn-icon': 'p-2 text-lg',
        'btn-highlight': 'bg-blue-500 dark:bg-blue-600',
        'btn-outline-primary': 'border-primary',
        'btn-outline-success': 'border-green-600',
        link: 'font-semibold text-light-blue-500 hover:underline cursor-pointer',
        avatar: 'flex-shrink-0 flex items-center justify-center rounded',
        'menu-item':
          'flex items-center gap-4 cursor-pointer p-2 px-5 text-gray-600 hover:bg-highlight hover:rounded-r-full text-sm font-medium',
        'menu-item-active': 'text-primary !bg-blue-50 rounded-r     -full',
        'snackbar-content':
          'flex items-center gap-1 px-5 py-3 bg-black rounded text-white text-sm font-bold drop-shadow-lg',
        sidebar: 'fixed top-18 bottom-0 w-100',
        card: 'bg-base border border-base md:rounded-lg overflow-hidden',
        'card-content': 'p-2 md:p-6',
        'card-header': 'flex items-center gap-3 py-3 pl-8 pr-4 border-b border-gray-200 font-bold',
        'card-footer': 'py-4 px-6 flex items-center border-t border-t-gray-200',
        'card-info': 'border-none md:border-1 md:border-primary bg-blue-50 text-primary px-4 md:px-6 py-3',
        'h-row': 'flex items-center flex-wrap gap-2',
        'row-hover': 'hover:bg-gray-50 hover:cursor-pointer',
        'ring-status': 'w-4 h-4 rounded-full border-4',
        'table-scrollable': 'relative block max-h-96 border border-gray-200 rounded overflow-y-auto',
        'table-header-sticky': 'bg-gray-50 border-b border-gray-200 sticky top-0 z-1',
        'table-row-link': 'hover:bg-gray-50 font-medium cursor-pointer',
        'center-center': 'hover:bg-gray-50',
        'transform-center': 'absolute top-50% left-50% -translate-50%',
        switch: 'h-5',
        'switch-track': 'rounded-full border-2 border-base',
        'switch-thumb': 'bg-primary rounded-full',
        // application colors
        activeLink: '!bg-light-blue-200 dark:!bg-light-blue-700',
        titlebar: 'flex items-center flex-grow-0 w-full p-2 border-b border-base font-bold',
        snackbar: 'bg-black text-white font-medium px-6 py-4 sm:rounded sm:text-sm sm:font-medium sm:px-6 sm:py-4',
        subtitlebar: 'flex items-center flex-grow-0 w-full px-4 h-10 min-h-10 text-xs font-bold uppercase',
        tooltip: 'text-sm font-semibold px-3 py-2 bg-black text-white rounded-md',
      },
      transformers: [transformerDirective()],
    }),
  ],
  test: {
    includeSource: ['src/**/*.ts'],
    coverage: {
      reporter: ['html', 'text'],
    }
  }
})
