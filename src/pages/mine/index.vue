<template>
	<view class="content">
		我的
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from "vue";
	import {
		fetchUserList
	} from "@/api/user";
	import type {
		IUserInfo
	} from "@/api/type";
	import {
		useCounterStore
	} from '@/stores/counter'

	const listData = ref < IUserInfo[] > ([])
	const count = ref < number > (0)
	const counter = useCounterStore()

	function add() {
		counter.increment();
	}

	getList();
	async function getList() {
		const {
			data
		} = await fetchUserList({
			currentPage: 1,
			pageSize: 2,
		})
		const {
			records,
			total
		} = data
		listData.value = records
		count.value = total

	}
</script>

<style>
	.content {}
</style>
