<template>
	<view class="page-container">
		<view class="header">
			消息
		</view>
		<view class="message" @click="goChat(item)" v-for="item in list" :key="item.id">
			<image :src="item.avatar" class="avatar"></image>
			<view class="message-right">
				<view class="message-user">
					{{item.nick_name}}
				</view>
				<view class="message-last">
					{{item.message}}
				</view>
				<view class="message-time">
					{{format(item.time)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { getChatGroup } from '@/api/chat'
	import { ref } from 'vue'
	import timeFrom from '@/utils/timeFrom'
	import {
		useUserStore
	} from '@/stores/user';
	import { onPullDownRefresh } from '@dcloudio/uni-app';
	const user = useUserStore()
	const list = ref([])
	const format = (time) => {
		return timeFrom(Date.parse(time))
	}

	const getList = async () => {
		const { data } = await getChatGroup()
		list.value = data.map(item => {
			return {
				...item,
				user_id: item.send_id === user.userInfo.id ? item.receive_id : item.send_id,
				avatar: item.send_id === user.userInfo.id ? item.receive_avatar : item.send_avatar,
				nick_name: item.send_id === user.userInfo.id ? item.receive_name : item.send_name,
			}
		})
	}
	getList()
	onPullDownRefresh(() => {
		getList()
		uni.stopPullDownRefresh()
	})
	const goChat = ({ chat_id, user_id, avatar, nick_name }) => {
		uni.navigateTo({
			url: `/pages/message/message-detail/index?chatId=${chat_id}&receiveId=${user_id}&receiveAvatar=${avatar}&receiveName=${nick_name}`
		})
	}
</script>
<style lang="scss" scoped>
	.page-container {
		padding-top: 80rpx;

		.header {
			padding: 40rpx;
		}

		.message {
			display: flex;

			.avatar {
				width: 40px;
				height: 40px;
				border-radius: 40px;
				margin: 40rpx;
			}

			.message-right {
				display: flex;
				flex-direction: column;
				justify-content: center;

				.message-user {}

				.message-last {
					font-size: 28rpx;
					color: #999;
				}

				.message-time {
					font-size: 20rpx;
					color: #999;
				}
			}

		}

	}
</style>