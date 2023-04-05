import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from 'pinia'
import { interceptor } from '@/utils/request'
import {
	useChatStore
} from '@/stores/chat';


export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	interceptor()
	return {
		app,
		Pinia
	};
}

uni.connectSocket({
	url: 'ws://43.142.88.253:8888' //ws://43.142.88.253:8888
})

uni.onSocketMessage(res => {
	const chat = useChatStore()
	chat.addList(JSON.parse(res.data))
})

uni.onSocketOpen(res => {
	
})
