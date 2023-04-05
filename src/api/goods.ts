import { get } from '@/utils/request'
import type { IPage, IGoodsInfo } from './type'



export function getGoodsList(data?: IPage) {
	return get<Array<IGoodsInfo>>('/goods/list', data)
}

export function getGoodsDetail(data: any) {
	return get<IGoodsInfo>('/goods/getGoodsById', data)
}