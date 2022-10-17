import './App.css'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'

import { BrowserNetworkInfo, HttpClient, NumberTriviaLocalDataSource, NumberTriviaRemoteDataSource, NumberTriviaRepository, convertToNumber } from 'business'
import { SlButton, SlCard, SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react'

import { INumberTrivia } from 'business/numberTrivia/domain/entities/INumberTrivia'
import logo from './assets/react.svg'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'
import { useState } from 'react'

const httpClient = new HttpClient()
const remoteDataSource = new NumberTriviaRemoteDataSource(httpClient)
const localDataSource = new NumberTriviaLocalDataSource(localStorage)
const networkInfo = new BrowserNetworkInfo()
const numberTriviaRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, networkInfo)

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/')

function App() {
  const [number, setNumber] = useState('')
  const [trivia, setTrivia] = useState<INumberTrivia>()

  const handleInputChange = (evt: any) => setNumber(evt.target.value)

  const searchTriviaFromInput = async () => {
    const value = convertToNumber(number)
    const numberTrivia = await numberTriviaRepository.getConcreteNumberTrivia(value)
    setTrivia(numberTrivia)
  }

  const searchRandomTrivia = async () => {
    const numberTrivia = await numberTriviaRepository.getRandomNumberTrivia()
    setTrivia(numberTrivia)
  }

  return (
    <div className="w-screen h-screen bg-base color-base flex justify-center items-center gap-4">
      <SlCard className='shadow-lg w-full max-w-md'>
        <div slot="header" className='flex items-center gap-2 text-xl font-bold'>
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
          <SlInput type="number" placeholder="Input a number" size="large" className="w-full" value={number} onSlInput={handleInputChange}>
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
