import { get } from '@/utils/request'
import type { IUserInfo } from './type'



export function getUserInfo(data?: any) {
	return get<IUserInfo>('/user/getUserInfo', data)
}