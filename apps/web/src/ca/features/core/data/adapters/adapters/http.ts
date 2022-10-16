export interface HttpResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export const http = <T>(...args: any): Promise<HttpResponse<T>> => {
  return fetch.apply(window, args);
}
