export interface IResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
