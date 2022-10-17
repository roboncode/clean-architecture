import { IHttpClient } from '../../../core/data/adapters/HttpClient'
import { INumberTriviaRemoteDataSource } from './INumberTriviaRemoteDataSource'
import { NumberTrivia } from '../models/NumberTrivia'

export class NumberTriviaRemoteDataSource implements INumberTriviaRemoteDataSource {
  constructor(public readonly httpClient: IHttpClient) {}

  async getConcreteNumberTrivia(number: number): Promise<NumberTrivia> {
    const response = await this.httpClient.get(`http://numbersapi.com/${number}?json`)
    const numberTrivia = new NumberTrivia(0, '', false)
    return numberTrivia.deserialize(await response.json())
  }

  async getRandomNumberTrivia(): Promise<NumberTrivia> {
    const response = await this.httpClient.get('http://numbersapi.com/random?json')
    const numberTrivia = new NumberTrivia(0, '', false)
    return numberTrivia.deserialize(await response.json())
  }
}
