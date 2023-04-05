export interface IPage {
	currentPage ?: number;
	pageSize ?: number;
}

export interface IGoodsInfo {
	id ?: number,
	img ?: string,
	introduce ?: string,
	price ?: string,
	old_price ?: string,
	want ?: number,
	user_address ?: string
}

export interface IUserInfo {
	id ?: number,
	nick_name ?: string,
	vip_name ?: string,
	avatar ?: string,
	collect_num ?: number,
	look_num ?: number,
	attention_num ?: number,
	fans_num ?: number,
	post_num ?: number
}

export interface IChatInfo {
	id : number,
	chat_id : number,
	user_id : number,
	message : string,
	nick_name : string,
	time : string,
	avatar : string
}