import { get } from '@/utils/request'
import type { IPage, IPostInfo } from './type'



export function getPostsList(data?: IPage) {
	return get<Array<IPostInfo>>('/posts/list', data)
}

export function getPostsDetail(data: any) {
	return get<IPostInfo>('/posts/getPostsById', data)
}