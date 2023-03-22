<template>
	<view class="page-container">
		<view class="main-wrapper">
			<view class="topbar-wrapper">
				<image class="icon" src="../../static/icon/ic_back.png" @click="goBack"></image>
				<view class="topbar-search">
					请搜索你要的宝贝
				</view>
				<image class="icon topbar-share" src="../../static/icon/ic_share.png"></image>
				<image class="icon" src="../../static/icon/ic_more.png"></image>
			</view>
			<view class="footer-wrapper">
				<view class="footer-icon">
					<image class="icon-small" src="../../static/icon/ic_bid.png"></image>
					<view>
						出价
					</view>
				</view>
				<view class="footer-icon">
					<image class="icon-small" src="../../static/icon/ic_leave.png"></image>
					<view>
						留言
					</view>
				</view>
				<view class="footer-icon">
					<image class="icon-small" src="../../static/icon/ic_collect.png"></image>
					<view>
						10
					</view>
				</view>
				<view class="footer-btn btn">
					卖同款
				</view>
				<view class="footer-btn">
					我想要
				</view>
			</view>
			<view class="userinfo-wrapper">
				<image src="../../static/logo.png" class="userinfo-avatar"></image>
				<view class="userinfo-box">
					<view class="userinfo-name">
						<text>{{detail.user_name}}</text><text class="tag">百次好评</text>
					</view>
					<view class="userinfo-time">
						<text>2分钟前来过</text>
						<view class="middle-line">
							|
						</view>
						<text>{{detail.user_address}}</text>
					</view>
				</view>
				<view class="userinfo-attention">
					+ 关注
				</view>
			</view>
			<view class="price-wrapper">
				<view class="price">
					￥
				</view>
				<view class="price-new">
					{{detail.price}}
				</view>
				<view class="small-text delete-line">
					￥{{detail.old_price}}
				</view>
				<view class="middle-line">
					|
				</view>
				<view class="express">
					包邮
				</view>
				<view class="small-text">
					{{detail.want}}人想要
				</view>
				<view class="middle-line">
					|
				</view>
				<view class="small-text">
					{{detail.look}}浏览
				</view>
			</view>
			<view class="content-wrapper" v-html="detail.introduce">
			</view>
			<view class="image-wrapper" @click="handlePreview(detail.img)">
				<image class="image" :src="detail.img" mode="widthFix"></image>
			</view>

			<view class="line">

			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		getGoodsDetail
	} from "@/api/goods";
	import {
		reactive,
		toRefs
	} from "vue";
	import type {
		IGoodsInfo
	} from '@/api/type'
	import {
		onLoad
	} from "@dcloudio/uni-app";

	interface IData {
		detail: IGoodsInfo,
	}

	const data = reactive < IData > ({
		detail: {}
	})

	const {
		detail
	} = toRefs(data)




	async function getDetail(id: number) {
		const {
			data
		} = await getGoodsDetail({
			id
		})
		detail.value = data
	}

	function goBack() {
		uni.navigateBack({
			delta: 1
		});
	}

	function handlePreview(img: string) {
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

				.topbar-search {
					flex: 1;
					background-color: #eee;
					color: #999;
					margin: 0 20rpx;
					padding: 10rpx 20rpx;
					border-radius: 30rpx;
				}

				.topbar-share {
					margin-right: 20rpx;
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
					margin-right: 40rpx;
				}

				.footer-btn {
					background-color: rgb(255, 231, 17);
					border-radius: 60rpx;
					padding: 20rpx 40rpx;
				}

				.btn {
					margin-left: auto;
					margin-right: 20rpx;
					background-color: #eee;
				}
			}

			.userinfo-wrapper {
				padding: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.userinfo-avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
				}

				.userinfo-box {
					margin-left: 20rpx;
					flex: 1;

					.userinfo-name {
						font-weight: bold;
						font-size: 28rpx;

						.tag {
							color: orange;
							font-size: 24rpx;
							margin-left: 10rpx;
							background-color: yellow;
							padding: 2rpx 10rpx;
							border-radius: 20rpx;
						}
					}

					.userinfo-time {
						color: #666;
						margin-top: 10rpx;
						font-size: 24rpx;
						display: flex;

						.middle-line {
							color: #eee;
							font-size: 24rpx;
							margin: 0 10rpx;
						}
					}
				}

				.userinfo-attention {
					font-weight: bold;
					background-color: #eee;
					border-radius: 50rpx;
					padding: 10rpx 20rpx;
				}
			}

			.price-wrapper {
				display: flex;
				align-items: baseline;
				padding: 40rpx;

				.price {
					color: #ff5500
				}

				.price-new {
					font-size: 40rpx;
					font-weight: bold;
					color: #ff5500
				}

				.small-text {
					color: #666;
					font-size: 24rpx;

				}

				.express {
					color: royalblue;
					font-size: 28rpx;
					flex: 1;
				}

				.middle-line {
					color: #eee;
					font-size: 24rpx;
					margin: 0 10rpx;
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
