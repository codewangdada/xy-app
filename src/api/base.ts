import { get, post } from '@/utils/request'
import type { IChatInfo } from './type'


export function getVersion() {
	return get<string>('/base/getVersion')
}