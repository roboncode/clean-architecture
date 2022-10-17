import { describe, expect, it } from 'vitest'

import { INetworkInfo } from '../../../core/network/INetworkInfo'
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

  async cacheNumberTrivia(_: NumberTrivia): Promise<void> {
    // mock does nothing with the trivia
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

describe('test repository when it is connected', () => {
  const remoteDataSource = new MockRemoteDataSource()
  const localDataSource = new MockLocalDataSource()
  const networkInfo = new MockConnectedNetworkInfo()
  const numberTriviaRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, networkInfo)

  it('should return true when device is connected', async () => {
    const isConnected = await networkInfo.isConnected()
    expect(isConnected).toBe(true)
  })

  it('should get concrete number trivia', async () => {
    const result = await numberTriviaRepository.getConcreteNumberTrivia(1)
    expect(result.number).toBe(1)
  })

  it('should get random number trivia', async () => {
    const result = await numberTriviaRepository.getRandomNumberTrivia()
    expect(result.number).toBe(123)
  })
})

describe('test repository when it is disconnected', () => {
  const remoteDataSource = new MockRemoteDataSource()
  const localDataSource = new MockLocalDataSource()
  const networkInfo = new MockDisconnectedNetworkInfo()
  const numberTriviaRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, networkInfo)

  it('should return false when device is disconnected', async () => {
    const isConnected = await networkInfo.isConnected()
    expect(isConnected).toBe(false)
  })

  it('should get concrete number trivia', async () => {
    // in the real-world this would throw an exception if there was no cached data
    const result = await numberTriviaRepository.getConcreteNumberTrivia(1)
    expect(result.number).toBe(123)
  })

  it('should get cached number trivia', async () => {
    const result = await numberTriviaRepository.getRandomNumberTrivia()
    expect(result.number).toBe(123)
  })
})
