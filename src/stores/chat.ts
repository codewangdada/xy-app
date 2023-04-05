import { defineStore } from 'pinia';
import { ref } from 'vue'
export const useChatStore = defineStore('chat', () => {
	const chatList = ref([]);
	function setList(data) {
		chatList.value = data
	}
	function addList(data) {
		chatList.value = [...chatList.value, data]
	}
	return { chatList, setList, addList}
})