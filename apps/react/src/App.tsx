import './App.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'

import { SlButton, SlCard, SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react'
import { getConcreteNumberTrivia, getRandomNumberTrivia } from './api/numberTrivia'

import { INumberTrivia } from 'business/numberTrivia/domain/entities/INumberTrivia'
import logo from './assets/react.svg'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'
import { useState } from 'react'

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/')

function App() {
  const [number, setNumber] = useState('')
  const [trivia, setTrivia] = useState<INumberTrivia>()

  const handleInputChange = (evt: any) => setNumber(evt.target.value)

  const searchTriviaFromInput = async () => {
    const numberTrivia = await getConcreteNumberTrivia(number)
    setTrivia(numberTrivia)
  }

  const searchRandomTrivia = async () => {
    const numberTrivia = await getRandomNumberTrivia()
    setTrivia(numberTrivia)
  }

  return (
    <div className="w-screen h-screen bg-base color-base flex justify-center items-center gap-4">
      <div className="fixed top-0 left-0 w-full flex items-center p-4">
        <div className="text-xl font-bold">Clean Architecture React Example</div>
        <div className="flex-grow"></div>
        <a href="https://github.com/roboncode/clean-architecture" target="_blank" rel="noreferrer">
          <SlIcon name="github" className="text-2xl" />
        </a>
      </div>
      <SlCard className="shadow-lg w-full max-w-md">
        <div slot="header" className="flex items-center gap-2 text-xl font-bold">
          <img src={logo} className="w-6" />
          <div>Number Trivia</div>
        </div>
        <div className="grid gap-4">
          {trivia && (
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">{trivia.number}</div>
              <div className="text-lg">{trivia.text}</div>
            </div>
          )}
          <SlInput
            type="number"
            placeholder="Input a number"
            size="large"
            className="w-full"
            value={number}
            onSlInput={handleInputChange}
          >
            <SlIcon name="search" slot="prefix"></SlIcon>
          </SlInput>
          <div className="flex gap-4">
            <SlButton variant="success" className="w-full" onClick={searchTriviaFromInput}>
              Search
            </SlButton>
            <SlButton className="w-full" onClick={searchRandomTrivia}>
              Get Random Trivia
            </SlButton>
          </div>
        </div>
      </SlCard>
    </div>
  )
}

export default App
