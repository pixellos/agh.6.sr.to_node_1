
export const errorResponse = (p: { message: string }) => ({ error: true, message: p.message }) as BadResponse;
export const okResponse = <T>(data: T) => ({ error: false, data: data }) as ErrorResponse<T>;

export type Empty = {};

export type UserRequest = {
  user: {
    sub: string
  },
  headers: {
    authorization: string
  }
}

export type OkResponse<T> = {
  error: false, 
  data: T
}

export type BadResponse = {
  error: true,
  message: string
}

export type ErrorResponse<T> = BadResponse | OkResponse<T>

export function isErrorResponse<T>(o: any): o is BadResponse {
  return (o as ErrorResponse<T> && o && o?.error);//?.error ?? true;
}


export function isOkResponse<T>(o: any): o is  OkResponse<T> {
  return !isErrorResponse<T>(o);
}

