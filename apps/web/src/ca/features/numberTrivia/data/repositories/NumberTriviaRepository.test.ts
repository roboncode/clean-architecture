import { describe, expect, it } from 'vitest'

import { INetworkInfo } from '../../../core/data/platform/INetworkInfo'
import { INumberTriviaLocalDataSource } from '../datasources/INumberTriviaLocalDataSource'
import { INumberTriviaRemoteDataSource } from '../datasources/INumberTriviaRemoteDataSource'
import { NumberTrivia } from '../models/NumberTrivia'
import { NumberTriviaRepository } from './NumberTriviaRepository'

class MockRemoteDataSource implements INumberTriviaRemoteDataSource {
  async getConcreteNumberTrivia(number: number): Promise<NumberTrivia> {
    return new NumberTrivia(number, 'test trivia', true)
  }

  async getRandomNumberTrivia(): Promise<NumberTrivia> {
    return new NumberTrivia(123, 'test trivia', true)
  }
}

class MockLocalDataSource implements INumberTriviaLocalDataSource {
  async getCachedNumberTrivia(): Promise<NumberTrivia> {
    return new NumberTrivia(123, 'test trivia', true)
  }

  async cacheNumberTrivia(numberTrivia: NumberTrivia): Promise<void> {
    return
  }
}

class MockConnectedNetworkInfo implements INetworkInfo {
  isConnected(): Promise<boolean> {
    return Promise.resolve(true)
  }
}

class MockDisconnectedNetworkInfo implements INetworkInfo {
  isConnected(): Promise<boolean> {
    return Promise.resolve(false)
  }
}

describe('NumberTriviaRepository', () => {
  const remoteDataSource = new MockRemoteDataSource()
  const localDataSource = new MockLocalDataSource()
  const connectedNetworkInfo = new MockConnectedNetworkInfo()
  const disconnectedNetworkInfo = new MockDisconnectedNetworkInfo()
  const connectedRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, connectedNetworkInfo)
  const disconnectedRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, disconnectedNetworkInfo)

  it('should get concrete number trivia', async () => {
    const result = await connectedRepository.getConcreteNumberTrivia(1)
    expect(result.number).toBe(1)
  })

  it('should get random number trivia', async () => {
    const result = await connectedRepository.getRandomNumberTrivia()
    expect(result.number).toBe(123)
  })

  it('should get cached number trivia', async () => {
    const result = await disconnectedRepository.getRandomNumberTrivia()
    expect(result.number).toBe(123)
  })
})
