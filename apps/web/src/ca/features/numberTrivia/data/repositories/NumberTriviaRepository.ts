import { INetworkInfo } from "../../../core/data/platform/INetworkInfo"
import { INumberTriviaLocalDataSource } from "../datasources/INumberTriviaLocalDataSource"
import { INumberTriviaRemoteDataSource } from "../datasources/INumberTriviaRemoteDataSource"
import { INumberTriviaRepository } from "../../domain/repositories/INumberTriviaRepository"
import { NumberTrivia } from "../models/NumberTrivia"

export class NumberTriviaRepository implements INumberTriviaRepository {
  constructor(
    private readonly remoteDataSource: INumberTriviaRemoteDataSource,
    private readonly localDataSource: INumberTriviaLocalDataSource,
    private readonly networkInfo: INetworkInfo
  ) {}

  async getConcreteNumberTrivia(number: number): Promise<NumberTrivia> {
    const numberTrivia = await this.remoteDataSource.getConcreteNumberTrivia(number)
    this.localDataSource.cacheNumberTrivia(numberTrivia)
    return numberTrivia
  }

  async getRandomNumberTrivia(): Promise<NumberTrivia> {
    if(await this.networkInfo.isConnected()) {
      const numberTrivia = await this.remoteDataSource.getRandomNumberTrivia()
      this.localDataSource.cacheNumberTrivia(numberTrivia)
      return numberTrivia
    }
    return this.localDataSource.getCachedNumberTrivia()
  }
}
