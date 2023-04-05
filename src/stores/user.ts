import { defineStore } from 'pinia';
import { reactive, ref } from 'vue'
export const useUserStore = defineStore('user', () => {
	const token = ref('');
	const userInfo = reactive({})
	function setToken(data) {
		token.value = data
	}
	return { token, setToken, userInfo }
})