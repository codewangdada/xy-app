import { post } from '@/utils/request'
import type { IPage, IUserInfo, BaseList } from './type'



/**
 * 获取用户信息
 *
 */
export function fetchUserList(data?: IPage) {
  return post<BaseList<IUserInfo>>('/lkd/books/bk-book/getbook/1/10', data)
}