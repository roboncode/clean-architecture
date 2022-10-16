import { describe, expect, it } from 'vitest'

import { INumberTrivia } from '../entities/INumberTrivia'
import { INumberTriviaRepository } from '../repositories/INumberTriviaRepository'
import { NumberTrivia } from '../../data/models/NumberTrivia'
import { makeGetConcreteNumberTrivia } from './getConcreteNumberTrivia'
import { makeGetRandomNumberTrivia } from './getRandomNumberTrivia'

class MockNumberTriviaRepository implements INumberTriviaRepository {
  getConcreteNumberTrivia(number: number): Promise<INumberTrivia> {
    const numberTrivia = {
      text: 'test',
      number,
      found: true,
      type: 'test',
    }
    return Promise.resolve(numberTrivia)
  }

  getRandomNumberTrivia(): Promise<INumberTrivia> {
    // get a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 100) + 1
    return Promise.resolve(new NumberTrivia(randomNumber, 'test', true))
  }
}

describe('getConcreteNumberTrivia', () => {
  const getConcreteNumberTrivia = makeGetConcreteNumberTrivia(new MockNumberTriviaRepository())

  it('should return a number trivia', async () => {
    const result = await getConcreteNumberTrivia(1)
    expect(result.number).toBe(1)
  })

  // TODO: Move this to data layer, just doing this to keep tests passing
  it('should be valid', async () => {
    const result = await getConcreteNumberTrivia(1)
    const numberTrivia = new NumberTrivia(result.number, result.text, result.found)
    expect(numberTrivia.validate()).toBe(true)
  })
})

describe('getConcreteNumberTrivia', () => {
  const getRandomNumberTrivia = makeGetRandomNumberTrivia(new MockNumberTriviaRepository())

  it('should return a number trivia between 1 to 100', async () => {
    const result = await getRandomNumberTrivia()
    expect(result.number).toBeGreaterThanOrEqual(1)
    expect(result.number).toBeLessThanOrEqual(100)
  })
})
