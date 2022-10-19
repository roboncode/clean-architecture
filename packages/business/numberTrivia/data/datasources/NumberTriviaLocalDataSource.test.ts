import { describe, expect, it } from 'vitest'

import { CacheError } from '../../../core/errors'
import { NumberTrivia } from '../models/NumberTrivia'
import { NumberTriviaLocalDataSource } from './NumberTriviaLocalDataSource'
import { SessionStorage } from '../../../core/data/storage/SessionStorage'

describe('NumberTriviaLocalDataSource', () => {
  it('should return NumberTrivia from storage when there is one in the cache', async () => {
    const sessionStorage = new SessionStorage()
    sessionStorage.setItem('cachedNumberTrivia', '{"text":"test trivia","number":1,"found":true,"type":"trivia"}')

    const numberTriviaLocalDataSource = new NumberTriviaLocalDataSource(sessionStorage)
    const numberTrivia = await numberTriviaLocalDataSource.getCachedNumberTrivia()
    expect(numberTrivia.number).toBe(1)
  })

  it('should throw a CacheError when there is not a cached value', async () => {
    const sessionStorage = new SessionStorage()
    const numberTriviaLocalDataSource = new NumberTriviaLocalDataSource(sessionStorage)
    try {
      await numberTriviaLocalDataSource.getCachedNumberTrivia()
    } catch (error) {
      expect(error).toBeInstanceOf(CacheError)
    }
  })

  it('should cache the data', async () => {
    const sessionStorage = new SessionStorage()
    const numberTriviaLocalDataSource = new NumberTriviaLocalDataSource(sessionStorage)
    const numberTrivia = new NumberTrivia(1, 'test trivia', true)
    await numberTriviaLocalDataSource.cacheNumberTrivia(numberTrivia)
    const cachedNumberTriviaData = await sessionStorage.getItem('cachedNumberTrivia')
    expect(typeof cachedNumberTriviaData).toBe('string')
    // test that it begins an ends with curly braces (JSON-like)
    expect(cachedNumberTriviaData?.startsWith('{')).toBe(true)
    expect(cachedNumberTriviaData?.endsWith('}')).toBe(true)

    // ⭐ Best practice: write as little production code as possible to make the test pass.
    // const cachedNumberTrivia = new NumberTrivia(0, '', false)
    // cachedNumberTrivia.deserialize(cachedNumberTriviaData)
    // expect(cachedNumberTrivia.text).toBe('test trivia')
    // expect(cachedNumberTrivia.number).toBe(1)
  })
})
