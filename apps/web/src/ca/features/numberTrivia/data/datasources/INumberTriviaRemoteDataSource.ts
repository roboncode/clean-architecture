import { NumberTrivia } from "../models/NumberTrivia"

export interface INumberTriviaRemoteDataSource {
  getConcreteNumberTrivia(number: number): Promise<NumberTrivia>
  getRandomNumberTrivia(): Promise<NumberTrivia>
}