<template>
	<view class="page-container">
		<view class="main-wrapper">
			<view class="topbar-wrapper">
				<image class="icon" src="@/static/icon/ic_back.png" @click="goBack"></image>
				<image :src="detail.avatar" class="topbar-avatar"></image>
				<view class="topbar-name">
					{{detail.nick_name}}
				</view>
				<view class="topbar-attention">
					+ 关注
				</view>
				<image class="icon" src="@/static/icon/ic_more.png"></image>
			</view>
			<view class="footer-wrapper">
				<input v-model="msg" placeholder="喜欢就说两句" class="footer-input">
				<view class="footer-icon">
					<image class="icon-small" src="@/static/icon/ic_collect.png"></image>
					<view>
						{{detail.collect}}
					</view>
				</view>
				<view class="footer-icon">
					<image class="icon-small" src="@/static/icon/ic_leave.png"></image>
					<view>
						528
					</view>
				</view>
				<view class="footer-icon">
					<image class="icon-small" src="@/static/icon/ic_like_black.png"></image>
					<view>
						{{detail.like}}
					</view>
				</view>
			</view>

			<view class="image-wrapper" @click="handlePreview(detail.imgs)">
				<image class="image" :src="detail.imgs" mode="widthFix"></image>
			</view>

			<view class="content-wrapper" v-html="detail.content">
			</view>


			<view class="line">

			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		getPostsDetail
	} from "@/api/posts";
	import {
		ref,
		reactive,
		toRefs
	} from "vue";
	import type {
		IPostInfo
	} from '@/api/type'
	import {
		onLoad
	} from "@dcloudio/uni-app";

	interface IData {
		detail : IPostInfo,
	}

	const data = reactive<IData>({
		detail: {}
	})

	const {
		detail
	} = toRefs(data)

	const msg = ref<string>('')



	async function getDetail(id : number) {
		const {
			data
		} = await getPostsDetail({
			id
		})
		detail.value = data
	}

	function goBack() {
		uni.navigateBack({
			delta: 1
		});
	}

	function handlePreview(img : string) {
		uni.previewImage({
			urls: [img]
		})
	}

	onLoad(({
		id
	}) => {
		getDetail(id)
	})
</script>

<style lang="scss" scoped>
	.icon {
		width: 50rpx;
		height: 50rpx;
	}

	.icon-small {
		width: 40rpx;
		height: 40rpx;
	}

	.delete-line {
		text-decoration: line-through;
	}

	.page-container {
		padding: 80px 0;
		width: 100%;
		display: flex;
		justify-content: center;

		.main-wrapper {
			width: 100%;
			position: relative;

			.topbar-wrapper {
				width: 100%;
				height: 80px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				align-items: center;
				z-index: 101;
				position: fixed;
				top: 0;
				left: 0;
				padding: 80rpx 20rpx 10rpx;

				.topbar-avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 30rpx;
				}

				.topbar-name {
					flex: 1;
					margin-left: 10rpx;
				}

				.topbar-attention {
					font-weight: bold;
					background-color: #eee;
					border-radius: 50rpx;
					padding: 10rpx 20rpx;
				}

			}

			.footer-wrapper {
				position: fixed;
				width: 100%;
				bottom: 0;
				left: 0;
				background-color: #fff;
				border-top: 1px solid #eee;
				display: flex;
				z-index: 101;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 40rpx;
				box-sizing: border-box;

				.footer-icon {
					text-align: center;
					color: #999;
					font-size: 20rpx;
					margin-left: 40rpx;
				}

				.footer-input {
					flex: 1;
					background-color: #eee;
					padding: 10rpx 20rpx;
					border-radius: 40rpx;
				}

			}


			.content-wrapper {
				padding: 40rpx;
			}

			.image-wrapper {
				padding: 40rpx;

				.image {
					width: 100%;
					border-radius: 20rpx;
				}
			}

			.line {
				width: 100%;
				height: 20rpx;
				background-color: #eee;
			}
		}
	}
</style>