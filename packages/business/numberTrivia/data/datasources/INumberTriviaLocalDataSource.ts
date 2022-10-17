import { NumberTrivia } from '../models/NumberTrivia'

export interface INumberTriviaLocalDataSource {
  /**
   * This will get the cached data from the local data source from
   * the last time the user had an internet connection.
   *
   * @param number
   */
  getCachedNumberTrivia(): Promise<NumberTrivia>

  /**
   * This will cache the data locally so that we can retrieve it later
   * when the user is offline.
   *
   * @param numberTrivia
   */
  cacheNumberTrivia(numberTrivia: NumberTrivia): Promise<void>
}
