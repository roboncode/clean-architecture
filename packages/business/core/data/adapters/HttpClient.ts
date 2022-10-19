import { ServerError } from '../../errors'

export interface IHttpResponse<T = any> extends Response {
  json<P = T>(): Promise<P>
}

export interface IHttpClient {
  get: <T = any>(url: string) => Promise<IHttpResponse<T>>
}

export class HttpClient implements IHttpClient {
  get = async <T = any>(url: string): Promise<IHttpResponse<T>> => {
    try {
      const response = await fetch(url)
      return response as IHttpResponse<T>
    } catch (error: any) {
      throw new ServerError(error.message)
    }
  }
}
