import '@unocss/reset/tailwind.css'
import 'uno.css'
import './index.css'
import './styles/common.css'
import './styles/dialog.css'
import './styles/tabs.css'
import './styles/codeviewer.css'

import App from './App'
import { GreetingContext } from './components/Hello'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GreetingContext.Provider value={{ message: 'Bonjour' }}>
      <App />
    </GreetingContext.Provider>
  </React.StrictMode>
)
