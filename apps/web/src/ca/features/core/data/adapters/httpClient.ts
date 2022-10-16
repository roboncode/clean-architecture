export interface HttpResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export interface IHttpClient {
  get: <T = any>(url: string) => Promise<HttpResponse<T>>;
  // post: <T = any>(url: string, body: any) => Promise<HttpResponse<T>>;
  // put: <T = any>(url: string, body: any) => Promise<HttpResponse<T>>;
  // delete: <T = any>(url: string) => Promise<HttpResponse<T>>;
}

export class HttpClient implements IHttpClient {
  get = async <T = any>(url: string): Promise<HttpResponse<T>> => {
    const response = await fetch(url)
    return response as HttpResponse<T>
  }
}

