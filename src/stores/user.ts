import { defineStore } from 'pinia';
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
	const token = ref('');
	function setToken(data) {
		token.value = data
	}
	return { token, setToken }
})