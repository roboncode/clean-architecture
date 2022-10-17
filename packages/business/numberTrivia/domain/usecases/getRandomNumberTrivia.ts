import { INumberTriviaRepository } from '../repositories/INumberTriviaRepository'

export const makeGetRandomNumberTrivia = (repository: INumberTriviaRepository) => {
  return async () => {
    return await repository.getRandomNumberTrivia()
  }
}
