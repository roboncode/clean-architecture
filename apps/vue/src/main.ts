import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'

import App from './App.vue'
import { createApp } from 'vue'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/')

createApp(App).mount('#app')
