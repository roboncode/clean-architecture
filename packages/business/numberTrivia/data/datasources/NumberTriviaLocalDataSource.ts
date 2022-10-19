import { CacheError } from '../../../core/errors'
import { IAsyncStorage } from '../../../core/data/storage/IAsyncStorage'
import { INumberTriviaLocalDataSource } from './INumberTriviaLocalDataSource'
import { NumberTrivia } from '../models/NumberTrivia'

export class NumberTriviaLocalDataSource implements INumberTriviaLocalDataSource {
  constructor(public storage: IAsyncStorage) {}

  async getCachedNumberTrivia(): Promise<NumberTrivia> {
    const cachedNumberTrivia = await this.storage.getItem('cachedNumberTrivia')
    if (cachedNumberTrivia) {
      const numberTrivia = new NumberTrivia(0, '', false)
      return numberTrivia.deserialize(cachedNumberTrivia)
    }
    throw new CacheError('No trivia cached')
  }

  async cacheNumberTrivia(numberTrivia: NumberTrivia): Promise<void> {
    await this.storage.setItem('cachedNumberTrivia', numberTrivia.serialize())
  }
}
