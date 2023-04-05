import { get, post } from '@/utils/request'
import type { IChatInfo } from './type'


export function getChatList(data: any) {
	return get<Array<IChatInfo>>('/chat/getChatList', data)
}

export function createChatGroup(data: any) {
	return get<string>('/chat/createChatGroup', data)
}

export function getChatGroup() {
	return get<Array<IChatInfo>>('/chat/getChatGroup')
}