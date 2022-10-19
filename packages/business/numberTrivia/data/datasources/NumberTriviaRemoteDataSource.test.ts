import { IHttpClient, IHttpResponse } from '../../../core/data/adapters/HttpClient'
import { describe, expect, it } from 'vitest'

import { NumberTriviaRemoteDataSource } from './NumberTriviaRemoteDataSource'

describe('test remote data source', () => {
  const mockHttpClient: IHttpClient = {
    get: async (url: string) => {
      const response = {
        json: async () => {
          return {
            text: 'test',
            number: 1,
            found: true,
          }
        },
      }
      return response as IHttpResponse
    },
  }

  it('should return a number trivia model', async () => {
    const numberTriviaRemoteDataSource = new NumberTriviaRemoteDataSource(mockHttpClient)
    const numberTrivia = await numberTriviaRemoteDataSource.getConcreteNumberTrivia(1)
    expect(numberTrivia.number).toBe(1)
  })

  it('should return a random number trivia model', async () => {
    const numberTriviaRemoteDataSource = new NumberTriviaRemoteDataSource(mockHttpClient)
    const numberTrivia = await numberTriviaRemoteDataSource.getRandomNumberTrivia()
    expect(numberTrivia.number).toBe(1)
  })
})
