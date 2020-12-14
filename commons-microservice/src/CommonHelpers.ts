
export const errorResponse = <T = {}>(p: { message: string }) => ({ error: true, message: p.message }) as ErrorResponse<T>;
export const okResponse = <T>(data: T) => ({ error: false, data: data }) as ErrorResponse<T>;

export type Empty = {};

export type UserRequest = {
  user: {
    sub: string
  }
}

export type ErrorResponse<T> = {
  error: true,
  message: string
} | {
  error: false, 
  data: T
}

export function isErrorResponse<T>(o: any): o is ErrorResponse<T> {
  return (o as ErrorResponse<T> && o && o?.error)?.error;
}
