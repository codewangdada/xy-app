import { defineStore } from 'pinia';
import { reactive, ref } from 'vue'
export const useUserStore = defineStore('user', () => {
	const token = ref(uni.getStorageSync('token') ? uni.getStorageSync('token') : '');
	const userInfo = reactive({})
	function setToken(data) {
		token.value = data
		uni.setStorageSync('token', data)
	}
	return { token, setToken, userInfo }
})