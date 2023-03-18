export interface IPage {
  currentPage?: number;
  pageSize?: number;
}

export interface BaseList<T> {
  records: Array<T>,
  total: number
}

export interface IUserInfo {
    bookName: string,
    bookAuthor: string
}

