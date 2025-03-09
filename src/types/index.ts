export interface IResponseInfo<T> {
  status: number;
  data: T | null;
  message: string;
}
