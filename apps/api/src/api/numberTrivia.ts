import {
  NumberTriviaLocalDataSource,
  NumberTriviaRemoteDataSource,
  NumberTriviaRepository,
  makeGetConcreteNumberTrivia,
  makeGetRandomNumberTrivia,
} from 'business'

import { HttpClient } from '../data/adapters/HttpClient'
import { SQLiteStorage } from '../data/storage/SQLiteStorage'
import { ServerNetworkInfo } from '../data/network/NetworkInfo'

/**
 * Here is where we are hooking up the business logic to the UI
 */
// Http client is used to make http requests. It is a wrapper around the browser's fetch api
const httpClient = new HttpClient()
// Local data source is used to store data locally. This is an example of an in-memory data source
const sessionStorage = new SQLiteStorage(__dirname + '/../../db.sqlite')
// The remote data source is used to fetch data from the remote api
const remoteDataSource = new NumberTriviaRemoteDataSource(httpClient)
// Local storage is used to store data in the browser's local storage. It implements the Storage interface
// The local data source is used to fetch data from the local storage
const localDataSource = new NumberTriviaLocalDataSource(sessionStorage)
// Network info is used to check if the device is connected to the internet
const networkInfo = new ServerNetworkInfo()
// The repository is used to fetch data from the remote or local data source
const numberTriviaRepository = new NumberTriviaRepository(remoteDataSource, localDataSource, networkInfo)
// The use cases are used to fetch data from the repository
// They are exposed to the UI as the API for the business logic
export const getConcreteNumberTrivia = makeGetConcreteNumberTrivia(numberTriviaRepository)
export const getRandomNumberTrivia = makeGetRandomNumberTrivia(numberTriviaRepository)
export const closeDatabase = () => sessionStorage.close()
