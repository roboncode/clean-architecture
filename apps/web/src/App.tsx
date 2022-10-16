import './App.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'

import Anime from './pages/anime'
import ApplicationLayout from './layouts/AppLayout'
import Child from './pages/child'
import DefaultLayout from './layouts/DefaultLayout'
import { Hello } from './components/Hello'
import Test from './pages/test'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'

const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))
const Signin = lazy(() => import('./pages/auth/signin'))
const Signup = lazy(() => import('./pages/auth/signup'))
const Convos = lazy(() => import('./pages/convos/index'))

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/')

function App() {
  const [isChecked, setCheck] = useState(false)
  const hellos = [...Array(100).keys()].map(i => <Hello key={i} name={`${i}`} />)

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ApplicationLayout />}>
            <Route path="/convos" element={<Convos />} />
            <Route path="" element={<About />}>
              <Route path=":id" element={<Child />} />
            </Route>
            <Route path="test" element={<Test />} />
            <Route path="anime" element={<Anime />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
