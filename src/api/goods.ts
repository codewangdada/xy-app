import { get } from '@/utils/request'
import type { IPage, IGoodsInfo, BaseList } from './type'



export function getGoodsList(data?: IPage) {
  return get<BaseList<IGoodsInfo>>('/goods/list', data)
}