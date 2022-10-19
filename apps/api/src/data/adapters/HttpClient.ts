import { IHttpClient, IHttpResponse } from 'business/core/data/adapters/HttpClient'

import axios from 'axios'

export class HttpClient implements IHttpClient {
  get = async <T = any>(url: string): Promise<IHttpResponse<T>> => {
    try {
      const response = await axios.get(url)
      return { json: () => response.data } as IHttpResponse<T>
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
