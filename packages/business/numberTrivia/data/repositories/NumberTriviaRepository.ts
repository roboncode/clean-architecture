import { INetworkInfo } from '../../../core/network/INetworkInfo'
import { INumberTrivia } from '../../domain/entities/INumberTrivia'
import { INumberTriviaLocalDataSource } from '../datasources/INumberTriviaLocalDataSource'
import { INumberTriviaRemoteDataSource } from '../datasources/INumberTriviaRemoteDataSource'
import { INumberTriviaRepository } from '../../domain/repositories/INumberTriviaRepository'

export class NumberTriviaRepository implements INumberTriviaRepository {
  constructor(
    private readonly remoteDataSource: INumberTriviaRemoteDataSource,
    private readonly localDataSource: INumberTriviaLocalDataSource,
    private readonly networkInfo: INetworkInfo
  ) {}

  async getConcreteNumberTrivia(number: number): Promise<INumberTrivia> {
    if (await this.networkInfo.isConnected()) {
      const numberTrivia = await this.remoteDataSource.getConcreteNumberTrivia(number)
      this.localDataSource.cacheNumberTrivia(numberTrivia)
      return numberTrivia
    }
    return this.localDataSource.getCachedNumberTrivia()
  }

  async getRandomNumberTrivia(): Promise<INumberTrivia> {
    if (await this.networkInfo.isConnected()) {
      const numberTrivia = await this.remoteDataSource.getRandomNumberTrivia()
      this.localDataSource.cacheNumberTrivia(numberTrivia)
      return numberTrivia
    }
    return this.localDataSource.getCachedNumberTrivia()
  }
}
