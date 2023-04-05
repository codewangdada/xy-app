import appConfig from '@/config/app'
const { HEADER, HEADERPARAMS, TOKENNAME, HTTP_REQUEST_URL } = appConfig
import type { IResponse } from './type'
import {
	useUserStore
} from '@/stores/user';
import errorCode from './errorCode';

type RequestOptionsMethod = 'GET' | 'POST'

// 白名单，不需要携带token就允许被访问的接口
const whiteApiList = ['/goods/list', '/user/login', '/goods/getGoodsById']



export const interceptor = () => {

	uni.addInterceptor('request', {

		// 请求拦截器
		invoke(args) {
			const user = useUserStore()
			const token = user.token

			// 当本地没有token，并且接口地址没在白名单内，一律跳转登录页面
			if (!token && !whiteApiList.includes(args.url)) {
				uni.navigateTo({
					url: '/pages/login/index'
				})
				return false
			}
			// request 触发前拼接 url
			args.url = HTTP_REQUEST_URL + args.url

			//设置请求头及token
			args.header = {
				'content-type': args.method === 'POST' ? 'application/json' : 'application/x-www-form-urlencoded',
				'Authorization': token
			}
		},

		// 响应拦截器，可以对数据进行预处理
		success(args) {
			const code = args.data.code || 200;
			const msg = errorCode[code] || args.data.msg || errorCode['default']
			if (code === 401) {
				console.log('重新登录');
				return
			}
			if (code === 500) {
				uni.showToast({
					title: msg,
					icon:'none'
				})
				return Promise.reject(args.data);
			}
			return Promise.resolve(args.data)
		},
		fail(err) {
			console.log('interceptor-fail', err)
			console.log('请求失败')
			// uni.hideLoading()
		},
		complete(res) {
			// uni.hideLoading()
		}
	})
}

const promise = <T>(url : string, data : any = {}, method : RequestOptionsMethod) => {
	return new Promise<IResponse<T>>((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			success: (res : any) => {
				resolve(res)
			},
			fail: (err) => {
				console.log('fail');
			}
		})
	})
}

export const get = <T>(url : string, data : any = {}) => {
	return promise<T>(url, data, 'GET')
}

export const post = <T>(url : string, data : any = {}) => {
	return promise<T>(url, data, 'POST')
}