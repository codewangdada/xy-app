<template>
	<view class="page-container">
		<view class="main-wrapper">
			<view class="topbar-wrapper">
				<view class="header-search">
					<image class="header-search__icon" src="../../static/image/search.png"></image>
					<view class="header-search__line">

					</view>
					<view class="header-search__text">
						{{topH}}
					</view>
					<view class="header-search__btn">搜索</view>
				</view>
			</view>
			<view class="gonge-wrapper">

			</view>
			<view class="category-wrapper">
				<view class="category-item" @click="goTop">
					猜你喜欢
				</view>
				<view class="category-item">
					最新发布
				</view>
			</view>
			<view class="recommend-container">
				<view class="recommend-item" v-for="item in 7" @click="goDetail">
					<a class="recommend-img-wrapper">
						<image class="recommend-img" src="../../static/logo.png"></image>
					</a>
					<a class="recommend-info">
						<view class="recommend-title">
							<text class="recommend-title-p">
								好侍咖王咖喱咖哩咖喱块中辣3号90ghouse块状咖喱调味料调料
							</text>
						</view>
						<view class="recommend-price-box">
							<text class="recommend-sign">
								￥
							</text>
							<text class="recommend-price">
								13.8
							</text>
							<text class="recommend-payed">
								180人想要
							</text>
						</view>
						<view class="recommend-person-box">
							<image src="../../static/logo.png" class="recommend-avatar"></image>
							<text class="recommend-address">
								杭州
							</text>
							<text class="recommend-credit">
								芝麻信用极好
							</text>
						</view>
					</a>
				</view>
			</view>
		</view>
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
	import {
		onReady
	} from "@dcloudio/uni-app";
	
	const listData = ref < IUserInfo[] > ([])
	const count = ref < number > (0)
	const counter = useCounterStore()
	
	const topH = ref < number > (0)
	
	onReady(() => {
		uni.getSystemInfo({
			success(res) {
				let titleH = uni.createSelectorQuery().select(".category-item")
				titleH.boundingClientRect(data => {
					topH.value = data.top - 120 - 20
				}).exec()
			}
		})
	})
	
	function goTop() {
		uni.pageScrollTo({
			scrollTop:topH.value,
			duration:100
		})
	}
	
	function goDetail() {
		uni.navigateTo({
			url:'/pages/detail/index'
		})
	}
	
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

<style lang="scss" scoped>
	$color: rgb(255, 231, 17);

	.page-container {
		padding-top: 120px;
		width: 100%;
		display: flex;
		justify-content: center;

		.main-wrapper {
			width: 100%;
			position: relative;
			// padding-top: 20px;

			.topbar-wrapper {
				position: fixed;
				width: 100%;
				height: 120px;
				top: 0;
				left: 0;
				z-index: 101;
				box-sizing: border-box;
				padding: 20px;
				background: #fff;

				.header-search {
					margin-top: 60px;
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
						height: 62rpx;
						margin-right: -1px;
						line-height: 62rpx;
						background-color: $color;
						padding: 0 30rpx;
						border-radius: 30rpx;
					}
				}

			}

			.gonge-wrapper {
				position: relative;
				width: 670rpx;
				height: 300rpx;
				margin: 12rpx 40rpx 0 40rpx;
				border-radius: 24rpx;
				background-color: #eee;
				flex-wrap: wrap;
				overflow: hidden;
			}

			.category-wrapper {
				padding: 40rpx;
				position: sticky;
				top: 120px;
				z-index: 10;
				background: #fff;
				display: flex;

				.category-item {
					background-color: $color;
					width: 160rpx;
					padding: 10rpx 20rpx;
					border-radius: 40rpx;
					margin-right: 10rpx;
					text-align: center;
				}
			}

			.recommend-container {
				display: flex;
				position: relative;
				box-sizing: border-box;
				overflow: hidden;
				flex-wrap: wrap;
				padding: 0 20rpx;

				.recommend-item {
					position: relative;
					width: 50%;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					background: #fff;
					padding: 0 20rpx 40rpx;

					.recommend-img-wrapper {
						height: 340rpx;
						align-items: center;
						justify-content: center;

						.recommend-img {
							width: 100%;
							height: 100%;
						}
					}

					.recommend-info {
						text-decoration: none;

						.recommend-title {
							margin-top: 24rpx;
							height: 76rpx;
							position: relative;
							line-height: 38rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							min-height: 0;

							.recommend-title-p {
								font-size: 26rpx;
								color: #333;
							}
						}

						.recommend-price-box {
							margin-top: 22rpx;
							height: 40rpx;
							line-height: 40rpx;

							.recommend-sign {
								font-size: 24rpx;
								color: #ff5500
							}

							.recommend-price {
								font-size: 28rpx;
								line-height: 32rpx;
								color: #ff5500
							}

							.recommend-payed {
								font-size: 24rpx;
								color: #999;
								margin-top: 4rpx;
							}
						}

						.recommend-person-box {
							display: flex;
							align-items: center;
							margin-top: 20rpx;
							.recommend-avatar{
								width: 40rpx;
								height: 40rpx;
								border-radius: 20rpx;
							}
							.recommend-address{
								flex: 1;
								font-size: 28rpx;
								margin-left: 10rpx;
								color: rgb(168,168,168);
							}
							.recommend-credit{
								background:rgb(244,244,252);
								color: blue;
								border-radius: 40rpx;
								padding: 10rpx 20rpx;
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
