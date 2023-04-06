<template>
	<button type="default" @click="logout">退出登录</button>
</template>

<script lang="ts" setup>
	import { useUserStore } from '@/stores/user'
	const user = useUserStore()
	const logout = () => {
		user.token = '',
		uni.clearStorageSync()
		uni.navigateTo({
			url:'/pages/login/index'
		})
	}
</script>

<style>
</style>