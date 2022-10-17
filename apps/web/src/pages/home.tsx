import { BrowserNetworkInfo, HttpClient, NumberTriviaLocalDataSource, NumberTriviaRemoteDataSource, NumberTriviaRepository, convertToNumber } from 'business'
import { SlButton, SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react'

import { Container } from 'ui'
import { INumberTrivia } from 'business/numberTrivia/domain/entities/INumberTrivia'
import { useState } from 'react'

const httpClient = new HttpClient()
const remoteDataSource = new NumberTriviaRemoteDataSource(httpClient)
const localDataSource = new NumberTriviaLocalDataSource(localStorage)
const networkInfo = new BrowserNetworkInfo()
const numberTriviaRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, networkInfo)

function Home() {
  const [number, setNumber] = useState('')
  const [trivia, setTrivia] = useState<INumberTrivia>()

  const searchTriviaFromInput = async (evt: any) => {
    const value = convertToNumber(number)
    const numberTrivia = await numberTriviaRepository.getConcreteNumberTrivia(value)
    setTrivia(numberTrivia)
  }

  const searchRandomTrivia = async () => {
    const numberTrivia = await numberTriviaRepository.getRandomNumberTrivia()
    setTrivia(numberTrivia)
  }

  return (
    <Container className="w-full h-full bg-base color-base" contentClass="justify-center items-center gap-4">
      <div className="w-full max-w-sm grid gap-4">
        {trivia && (
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold">{trivia.number}</div>
            <div className="text-lg">{trivia.text}</div>
          </div>
        )}
        <SlInput type="number" placeholder="Input a number" size="large" className="w-full" value={number} onSlInput={(evt: any) => setNumber(evt.target.value)}>
          <SlIcon name="search" slot="prefix"></SlIcon>
        </SlInput>
        <div className="flex gap-4">
          <SlButton variant="success" className="w-full" onClick={searchTriviaFromInput}>
            Search
          </SlButton>
          <SlButton className="w-full" onClick={searchRandomTrivia}>
            Get random trivia
          </SlButton>
        </div>
      </div>
    </Container>
  )
}

export default Home
