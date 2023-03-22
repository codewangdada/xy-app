export interface IPage {
	currentPage?: number;
	pageSize?: number;
}

export interface BaseList<T> {
	records: Array<T>,
	total: number
}

export interface IGoodsInfo {
	id?: number,
	img?: string,
	introduce?: string,
	price?: string,
	old_price?: string,
	want?: number,
	user_address?: string
}

export interface IUserInfo {
	id?: number,
	user_name?: string,
	vip_name?: string,
	avatar?: string,
	collect_num?: number,
	look_num?: number,
	attention_num?: number,
	fans_num?: number,
	post_num?: number
}
