export interface IPage {
  currentPage?: number;
  pageSize?: number;
}

export interface BaseList<T> {
  records: Array<T>,
  total: number
}

export interface IGoodsInfo {
	id: number,
    img: string,
    introduce: string,
	price: string,
	old_price: string,
	want: number,
	user_address: string
}

