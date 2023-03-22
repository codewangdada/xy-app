<template>
	<view class="content">
		<view class="setting-wrapper">
			<uni-icons type="gear" size="30"></uni-icons>
		</view>
		<view class="header-wrapper">
			<image class="avatar" :src="userInfo.avatar" mode="widthFix"></image>
			<view class="name">
				{{userInfo.user_name}}
				<view class="vip-name">
					会员名：{{userInfo.vip_name}}
				</view>
			</view>

		</view>
		<view class="nums-wrapper">
			<view class="nums-item">
				<view class="num">
					{{userInfo.collect_num}}
				</view>
				<view class="text">
					收藏
				</view>
			</view>
			<view class="nums-item">
				<view class="num">
					{{userInfo.look_num}}
				</view>
				<view class="text">
					历史浏览
				</view>
			</view>
			<view class="nums-item">
				<view class="num">
					{{userInfo.attention_num}}
				</view>
				<view class="text">
					关注
				</view>
			</view>
			<view class="nums-item">
				<view class="num">
					{{userInfo.fans_num}}
				</view>
				<view class="text">
					粉丝
				</view>
			</view>
			<view class="nums-item">
				<view class="num">
					{{userInfo.post_num}}
				</view>
				<view class="text">
					帖子
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="title">
			我的交易
		</view>
		<uni-grid :column="4" :showBorder="false" :highlight="true" @change="handleTransactionChange">
			<uni-grid-item v-for="(item, index) in transactionList" :index="index" :key="item.id">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons type="image" :size="30" color="#777" />
					<text class="text">{{item.title}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
		<view class="title">
			我的会玩
		</view>
		<uni-grid :column="4" :showBorder="false" :highlight="true" @change="handleTransactionChange">
			<uni-grid-item v-for="(item, index) in playList" :index="index" :key="item.id">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons type="image" :size="30" color="#777" />
					<text class="text">{{item.title}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
		<view class="title">
			互动权益
		</view>
		<uni-grid :column="4" :showBorder="false" :highlight="true" @change="handleTransactionChange">
			<uni-grid-item v-for="(item, index) in transactionList" :index="index" :key="item.id">
				<view class="grid-item-box" style="background-color: #fff;">
					<uni-icons type="image" :size="30" color="#777" />
					<text class="text">{{item.title}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script setup lang="ts">
	import {
		getUserInfo
	} from '@/api/user'
	import {
		ref,
		reactive,
		toRefs
	} from "vue";
	import type {
		IUserInfo
	} from '@/api/type'
	interface IData {
		userInfo: IUserInfo,
	}
	const transactionList = ref([{
		id: 1,
		title: '我发布的'
	}, {
		id: 2,
		title: '我卖出的'
	}, {
		id: 3,
		title: '我买到的'
	}, {
		id: 4,
		title: '我可转卖的'
	}])

	const playList = ref([{
		id: 1,
		title: '我的圈子'
	}, {
		id: 2,
		title: '我的帖子'
	}, {
		id: 3,
		title: '玩家中心'
	}, {
		id: 4,
		title: '有奖活动'
	}])

	function handleTransactionChange(e: any) {
		console.log(e.detail.index);
	}



	const data = reactive < IData > ({
		userInfo: {}
	})

	const {
		userInfo
	} = toRefs(data)

	getUser(1)

	async function getUser(id: number) {
		const {
			data
		} = await getUserInfo({
			id
		})
		userInfo.value = data
	}
</script>

<style lang="scss" scoped>
	.content {
		.setting-wrapper {
			text-align: right;
			padding: 40rpx;
		}

		.header-wrapper {
			padding: 40rpx;
			display: flex;

			.avatar {
				width: 100rpx;
				border-radius: 50rpx;
			}

			.name {
				margin-left: 20rpx;

				.vip-name {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #999;
				}
			}
		}

		.nums-wrapper {
			display: flex;
			justify-content: space-between;

			.nums-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				.num,
				.text {
					font-size: 24rpx;
					font-weight: bold;
				}
			}
		}

		.line {
			margin: 40rpx;
			height: 1px;
			background: #eee;
		}

		.title {
			font-weight: bold;
			padding-left: 40rpx;
		}

		.grid-item-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
		}
	}
</style>
