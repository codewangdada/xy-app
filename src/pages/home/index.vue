<template>
	<view class="page-container">
		<view class="main-wrapper">
			<view class="topbar-wrapper">
				<view class="header-search">
					<image class="header-search__icon" src="../../static/image/search.png"></image>
					<view class="header-search__line">

					</view>
					<view class="header-search__text">
					</view>
					<view class="header-search__btn">搜索</view>
				</view>
			</view>
			<view class="gonge-wrapper">
				<view class="gonge-item">
					咸鱼集市
					<view class="gong-wrapper">
						<view class="gong">
							<image src="../../static/logo.png" class="gong-img"></image>
							<view class="gong-text">
								手机严选
							</view>
						</view>
						<view class="gong">
							<image src="../../static/logo.png" class="gong-img"></image>
							<view class="gong-text">
								保真奢侈
							</view>
						</view>
						<view class="gong">
							<image src="../../static/logo.png" class="gong-img"></image>
							<view class="gong-text">
								文玩珠宝
							</view>
						</view>
						<view class="gong">
							<image src="../../static/logo.png" class="gong-img"></image>
							<view class="gong-text">
								限量潮品
							</view>
						</view>
					</view>

				</view>
				<view class="gonge-item">
					<view>
						旧物换礼
						<view class="gong-wrapper">
							<view class="gong">
								<image src="../../static/logo.png" class="gong-img"></image>
								<view class="gong-text">
									仅剩26件
								</view>
							</view>
							<view class="gong">
								<image src="../../static/logo.png" class="gong-img"></image>
								<view class="gong-text">
									842已换
								</view>
							</view>
						</view>
					</view>
					<view class="gong-right">
						高价回收
						<image src="../../static/logo.png" class="gong-right-img"></image>
					</view>
				</view>
			</view>
			<view class="category-wrapper">
				<view class="category-item" @click="goTop">
					猜你喜欢
				</view>
				<view class="category-item">
					最新发布
				</view>
			</view>
			<waterfall v-model="listData" ref="mWaterfall" :add-time="50">
				<template #left={leftList}>
					<view class="recommend-item" v-for="item in leftList" :key="item.id" @click="goDetail(item.id)">
						<a class="recommend-img-wrapper">
							<image class="recommend-img" mode="widthFix" :src="item.img"></image>
						</a>
						<a class="recommend-info">
							<view class="recommend-title">
								<text class="recommend-title-p">
									{{item.introduce}}
								</text>
							</view>
							<view class="recommend-price-box">
								<text class="recommend-sign">
									￥
								</text>
								<text class="recommend-price">
									{{item.price}}
								</text>
								<text class="recommend-payed">
									{{item.want}}人想要
								</text>
							</view>
							<view class="recommend-person-box">
								<image :src="item.avatar" class="recommend-avatar">
								</image>
								<view class="recommend-address">
									{{item.city}}
								</view>
								<view class="recommend-credit" v-if="item.credit === 1">
									芝麻信用极好
								</view>
							</view>
						</a>
					</view>
				</template>
				<template #right={rightList}>
					<view class="recommend-item" v-for="item in rightList" :key="item.id" @click="goDetail(item.id)">
						<a class="recommend-img-wrapper">
							<image class="recommend-img" mode="widthFix" :src="item.img"></image>
						</a>
						<a class="recommend-info">
							<view class="recommend-title">
								<text class="recommend-title-p">
									{{item.introduce}}
								</text>
							</view>
							<view class="recommend-price-box">
								<text class="recommend-sign">
									￥
								</text>
								<text class="recommend-price">
									{{item.price}}
								</text>
								<text class="recommend-payed">
									{{item.want}}人想要
								</text>
							</view>
							<view class="recommend-person-box">
								<image :src="item.avatar" class="recommend-avatar">
								</image>
								<view class="recommend-address">
									{{item.city}}
								</view>
								<view class="recommend-credit" v-if="item.credit === 1">
									芝麻信用极好
								</view>
							</view>
						</a>
					</view>
				</template>
			</waterfall>
			<uni-load-more :status="loadingStatus"></uni-load-more>
		</view>
	</view>
</template>

<script setup lang="ts">
	import waterfall from '@/components/waterfall/index.vue'
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		getGoodsList
	} from "@/api/goods";
	import type {
		IGoodsInfo
	} from "@/api/type";
	import {
		onPullDownRefresh,
		onReachBottom,
		onReady
	} from "@dcloudio/uni-app";

	const listData = ref<IGoodsInfo[]>([])
	const count = ref<number>(0)
	const topH = ref<number>(0)
	const params = reactive({
		currentPage: 1,
		pageSize: 10
	})
	const mWaterfall = ref()

	const loadingStatus = ref('loading')

	onReady(() => {
		console.log('onReady');
		uni.getSystemInfo({
			success(res) {
				let titleH = uni.createSelectorQuery().select(".category-item")
				titleH.boundingClientRect(data => {
					topH.value = data.top - 120 - 20
				}).exec()
			}
		})
	})

	onMounted(() => {
		console.log("onMounted");
		uni.startPullDownRefresh({
			success: () => {
				uni.showToast({
					icon: 'none',
					title: '^v^'
				})
			}
		});
	})

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

	function goTop() {
		uni.pageScrollTo({
			scrollTop: topH.value,
			duration: 100
		})
	}

	function goDetail(id : number) {
		uni.navigateTo({
			url: `/pages/detail/index?id=${id}`
		})
	}

	async function getList() {
		loadingStatus.value = 'loading'
		const {
			data,
			total
		} = await getGoodsList({
			currentPage: params.currentPage,
			pageSize: params.pageSize,
		})
		loadingStatus.value = 'more'
		listData.value = listData.value.concat(data)
		count.value = total
	}
</script>

<style lang="scss" scoped>
	$color: rgb(255, 231, 17);

	.page-container {
		padding-top: 120px;
		// padding-bottom: 50px;
		width: 100%;
		display: flex;
		justify-content: center;

		.main-wrapper {
			width: 100%;
			position: relative;

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
				display: flex;
				padding: 30rpx;

				.gonge-item {
					flex: 1;
					background: #eee;
					border-radius: 10rpx;
					padding: 10rpx;
					margin: 10rpx;

					.gong-wrapper {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;

						.gong {
							margin: 30rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							
							

							.gong-img {
								width: 80rpx;
								height: 80rpx;
							}

							.gong-text {
								font-size: 20rpx;
							}
						}
					}

					.gong-right {
						margin-top: 40rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.gong-right-img {
							width: 80rpx;
							height: 80rpx;
							margin-right: 30rpx;
						}
					}

				}
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
					font-size: 20rpx;
					padding: 10rpx 20rpx;
					border-radius: 40rpx;
					margin-right: 10rpx;
					text-align: center;
				}
			}



			.recommend-item {
				position: relative;
				// width: 50%;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				background: #fff;
				padding: 10px;

				.recommend-img-wrapper {

					.recommend-img {
						width: 100%;
						border-radius: 20rpx;
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
							color: #ff5500;
							margin-left: -14rpx;
						}

						.recommend-payed {
							font-size: 24rpx;
							color: #999;
							margin-left: 10rpx;
						}
					}

					.recommend-person-box {
						display: flex;
						align-items: center;
						margin-top: 20rpx;

						.recommend-avatar {
							width: 20px;
							height: 20px;
							border-radius: 10px;
						}

						.recommend-address {
							flex: 1;
							font-size: 28rpx;
							margin-left: 10rpx;
							color: rgb(168, 168, 168);
						}

						.recommend-credit {
							background: rgb(244, 244, 252);
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
</style>