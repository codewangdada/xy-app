import { get, post } from '@/utils/request'
import type { IUserInfo } from './type'



export function getUserInfo() {
	return get<IUserInfo>('/user/userinfo')
}

export function passwordLogin(data: any) {
	return post<string>('/user/login', data)
}