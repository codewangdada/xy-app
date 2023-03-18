import appConfig from '@/config/app'
const { HEADER, HEADERPARAMS, TOKENNAME, HTTP_REQUEST_URL } = appConfig
import type { IResponse } from './type'

type RequestOptionsMethod = 'GET' | 'POST'

// 白名单，不需要携带token就允许被访问的接口
const whiteApiList = ['/lkd/books/bk-book/getbook/1/10', '/api/login', '/api/register/verify', '/api/register/reset']

const token = ''

export const interceptor = () => {

	uni.addInterceptor('request', {

		// 请求拦截器
		invoke(args) {

			// 加载loading
			uni.showLoading({
				title: '加载中...'
			})

			// 当本地没有token，并且接口地址没在白名单内，一律跳转登录页面
			if (!token && !whiteApiList.includes(args.url)) {
				console.log('去登录页');
				uni.hideLoading()
				return false
			}
			// request 触发前拼接 url
			args.url = HTTP_REQUEST_URL + args.url

			//设置请求头及token
			args.header = {
				'content-type': args.method === 'POST' ? 'application/json' : 'application/x-www-form-urlencoded',
				'Authori-zation': 'Bearer ' + token
			}
		},

		// 响应拦截器，可以对数据进行预处理
		success(args) {
			uni.hideLoading()

		},
		fail(err) {
			console.log('interceptor-fail', err)
			console.log('请求失败')
			uni.hideLoading()
		},
		complete(res) {
			uni.hideLoading()
		}
	})
}

const promise = <T>(url: string, data: any = {}, method: RequestOptionsMethod) => {
	return new Promise<IResponse<T>>((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			success: (res: any) => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					reject(res)
				}
			}
		})
	})
}

export const get = <T>(url: string, data: any = {}) => {
	return promise<T>(url, data, 'GET')
}

export const post = <T>(url: string, data: any = {}) => {
	return promise<T>(url, data, 'POST')
}