<template>
	<view class="page-container">
		<view class="header">
			<image src="../../static/icon/ic_search.png" class="icon-40"></image>
			<view class="header-add">
				发帖子
			</view>
		</view>
		<view class="category-wrapper">

		</view>
		<waterfall v-model="listData" ref="mWaterfall">
			<template #left={leftList}>
				<view v-for="item in leftList" class="post-item" @click="goDetail(item.id)">
					<image class="post-img" :src="item.imgs" mode="widthFix" />
					<view class="post-content">{{item.content}}</view>
					<view class="post-footer">
						<image class="post-avatar" :src="item.avatar" />
						<view class="post-name">
							{{item.nick_name}}
						</view>
						<image src="../../static/icon/ic_like.png" class="icon-40"></image>
						<view class="post-like">
							{{item.like}}
						</view>
					</view>
				</view>
			</template>
			<template #right={rightList}>
				<view v-for="item in rightList" class="post-item" @click="goDetail(item.id)">
					<image class="post-img" :src="item.imgs" mode="widthFix" />
					<view class="post-content">{{item.content}}</view>
					<view class="post-footer">
						<image class="post-avatar" :src="item.avatar" />
						<view class="post-name">
							{{item.nick_name}}
						</view>
						<image src="../../static/icon/ic_like.png" class="icon-40"></image>
						<view class="post-like">
							{{item.like}}
						</view>
					</view>
				</view>
			</template>
		</waterfall>
		<uni-load-more :status="loadingStatus"></uni-load-more>
	</view>
</template>

<script setup lang="ts">
	import waterfall from '@/components/waterfall/index.vue'
	import { ref, reactive } from 'vue'
	import {
		getPostsList
	} from "@/api/posts";
	import {
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app";
	const listData = ref([])
	const count = ref<number>(0)
	const params = reactive({
		currentPage: 1,
		pageSize: 10
	})
	const tabValue = ref(['示例1', '示例2', '示例3', '示例4', '示例5', '示例1', '示例2', '示例3', '示例4', '示例5'])
	const tabIndex = ref(0)
	const mWaterfall = ref()

	const loadingStatus = ref('loading')
	getList()

	onPullDownRefresh(() => {
		params.currentPage = 1
		mWaterfall.value.clear()
		getList()
		uni.stopPullDownRefresh()
	})

	onReachBottom(() => {
		if (listData.value.length < count.value) {
			params.currentPage++
			getList()
		} else {
			loadingStatus.value = 'noMore'
		}
	})
	async function getList() {
		loadingStatus.value = 'loading'
		const {
			data,
			total
		} = await getPostsList({
			currentPage: params.currentPage,
			pageSize: params.pageSize,
		})
		loadingStatus.value = 'more'
		listData.value = listData.value.concat(data)
		count.value = total
	}

	function goDetail(id : number) {
		uni.navigateTo({
			url: `/pages/play/play-detail/index?id=${id}`
		})
	}
</script>

<style lang="scss" scoped>
	.page-container {
		padding-top: 200rpx;

		.header {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 99;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			background: #fff;
			align-items: center;
			padding: 80rpx 80rpx 40rpx 40rpx;

			.header-add {
				border: 1px solid #eee;
				padding: 10rpx 20rpx;
				border-radius: 40rpx;
			}
		}

		// .category-wrapper {
		// 	padding: 40rpx;
		// 	position: sticky;
		// 	top: 120px;
		// 	z-index: 10;
		// 	background: #fff;
		// 	display: flex;
		// }

		.post-item {
			padding: 0 20rpx 40rpx;

			.post-img {
				width: 100%;
				border-radius: 20rpx;
			}

			.post-content {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.post-footer {
				display: flex;
				padding: 20rpx;

				.post-avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 20rpx;
				}

				.post-name {
					flex: 1;
					margin-left: 10rpx;
				}

				.post-like {
					color: #999;
				}
			}
		}
	}
</style>