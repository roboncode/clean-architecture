import { NumberTrivia } from '../models/NumberTrivia'

export interface INumberTriviaRemoteDataSource {
  /**
   * Calls the http://numbersapi.com/{number} endpoint.
   *
   * @param number
   */
  getConcreteNumberTrivia(number: number): Promise<NumberTrivia>

  /**
   * Calls the http://numbersapi.com/random endpoint.
   */
  getRandomNumberTrivia(): Promise<NumberTrivia>
}
