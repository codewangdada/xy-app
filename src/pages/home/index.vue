<template>
	<view class="box">
		<view class="header">
			<view class="header-search">
				<image class="header-search__icon" src="../../static/image/search.png"></image>
				<view class="header-search__line">

				</view>
				<view class="header-search__text">
					11111
				</view>
				<view class="header-search__btn">搜索</view>
			</view>
		</view>
		<scroll-view class="content" scroll-y="true">
			<view class="activity">
				<view class="activity__wrap">
					<view class="activity__item">
						
					</view>
				</view>
				<view class="activity__wrap">
					<view class="activity__item">
						
					</view>
				</view>
			</view>
			<view class="type">
				1111111
			</view>
			<view class="container">
				<view class="item-wrapper" v-for="(item, i) in 7">
					<image src="../../static/logo.png" class="item" />
					11111
				</view>
			</view>
		</scroll-view>

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

<style lang="scss">
	$color: rgb(255, 231, 17);
	$box-color: rgb(249, 249, 249);
	$width:30rpx;
	$half-width: 15rpx;

	.box {
		height: 100%;

		.content {
			height: calc(100% - 300rpx)
		}
	}

	.header {
		height: 100px;
		padding: 100rpx 30rpx 0;

		.header-search {
			height: 60rpx;
			border-radius: 30rpx;
			border: 2px solid $color;
			display: flex;
			align-items: center;

			.header-search__icon {
				margin-left: 20rpx;
				margin-right: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}

			.header-search__line {
				margin-right: 20rpx;
				width: 4rpx;
				height: 40rpx;
				background-color: #eee;
			}

			.header-search__text {
				flex: 1;
			}

			.header-search__btn {
				height: 60rpx;
				line-height: 60rpx;
				background-color: $color;
				padding: 0 30rpx;
				border-radius: 30rpx;
			}
		}
	}

	.activity {
		padding: $width;
		display: flex;
		.activity__wrap {
			width: 50%;
			height: 400rpx;
			border-radius: 10rpx;
			// background-color: $box-color;
			box-sizing: border-box;
			&:nth-child(odd) {
				padding-right: $half-width;
			}
			
			&:nth-child(even) {
				padding-left: $half-width;
			}
			.activity__item{
				height: 100%;
				background-color: $box-color;
			}
		}
	}

	.type {
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		padding: $width;

		.item-wrapper {
			width: 50%;
			margin-bottom: $width;
			box-sizing: border-box;

			&:nth-child(odd) {
				padding-right: $half-width;
			}

			&:nth-child(even) {
				padding-left: $half-width;
			}

			.item {
				width: 100%;
			}
		}
	}
</style>
