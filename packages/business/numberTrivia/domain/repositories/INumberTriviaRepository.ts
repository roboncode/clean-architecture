import { INumberTrivia } from '../entities/INumberTrivia'

export interface INumberTriviaRepository {
  getConcreteNumberTrivia(number: number): Promise<INumberTrivia>
  getRandomNumberTrivia(): Promise<INumberTrivia>
}
