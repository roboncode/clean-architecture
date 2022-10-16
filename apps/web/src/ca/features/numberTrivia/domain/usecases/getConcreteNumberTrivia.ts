import { INumberTriviaRepository } from "../repositories/INumberTriviaRepository"

export const makeGetConcreteNumberTrivia = (repository: INumberTriviaRepository) => {
  return async (number: number) => {
    return await repository.getConcreteNumberTrivia(number)
  }
}
