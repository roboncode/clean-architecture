import './App.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'

import DefaultLayout from './layouts/DefaultLayout'
import { Hello } from './components/Hello'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'

const Home = lazy(() => import('./pages/home'))

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/')

function App() {
  const [isChecked, setCheck] = useState(false)
  const hellos = [...Array(100).keys()].map(i => <Hello key={i} name={`${i}`} />)

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
