import { INumberTriviaRepository } from '../repositories/INumberTriviaRepository'
import { convertToNumber } from '../../../core/utils/convertToNumber'

export const makeGetConcreteNumberTrivia = (repository: INumberTriviaRepository) => {
  return async (number: number | string) => {
    number = convertToNumber(number)
    return await repository.getConcreteNumberTrivia(number)
  }
}
