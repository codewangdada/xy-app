<template>
	<view class="page-container" ref="content">
		<view v-for="item in chat.chatList" class="chat-item">
			<view class="chat-time">{{format(item.time)}}</view>
			<view class="chat-item-left" v-if="item.send_id !== user.userInfo.id">
				<image :src="item.send_avatar" class="avatar">
				</image>
				<view class="chat-message" style="background-color: #fff;">
					{{item.message}}
				</view>
			</view>
			<view class="chat-item-right" v-else>
				<view class="chat-message">
					{{item.message}}
				</view>
				<image :src="item.send_avatar" class="avatar">
				</image>
			</view>
		</view>
		<view class="message-footer">
			<image src="../../../static/icon/ic_record.png" class="icon" @click="goBottom"></image>
			<input v-model="msg" class="footer-input">
			<image src="../../../static/icon/ic_face.png" class="icon"></image>
			<image src="../../../static/icon/ic_add.png" class="icon"></image>
			<button @click="sendMsg" size="mini">发送</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { nextTick, onMounted, ref, toRefs, watch } from 'vue'
	import {
		useChatStore
	} from '@/stores/chat';
	import {
		useUserStore
	} from '@/stores/user';
	import { getChatList } from '@/api/chat'
	import { onLoad } from '@dcloudio/uni-app';
	import timeFormat from '@/utils/timeFormat'

	const content = ref()

	const mChatId = ref<number>()
	const mReceiveId = ref<number>()
	const mReceiveAvatar = ref<string>()
	const mReceiveName = ref<string>()
	const format = (time) => {
		return timeFormat(time, 'hh:MM')
	}

	const msg = ref<string>()


	const chat = useChatStore()

	const user = useUserStore()


	const sendMsg = () => {
		const data = {
			type: 'message',
			message: msg.value,
			chat_id: mChatId.value,
			send_id: user.userInfo.id,
			send_name: user.userInfo.nick_name,
			send_avatar: user.userInfo.avatar,
			receive_id: mReceiveId.value,
			receive_name: mReceiveName.value,
			receive_avatar: mReceiveAvatar.value,
		}
		uni.sendSocketMessage({
			data: JSON.stringify(data)
		})
		msg.value = ''
	}

	onMounted(() => {
		goBottom()
	})
	
	watch(()=> chat.chatList, (newValue, oldValue)=>{
		goBottom()
	})

	const goBottom = async () => {
		setTimeout(() => {
			uni.pageScrollTo({
				scrollTop: 50000,
				duration: 0
			})
		}, 300)
	}

	onLoad(async ({ chatId, receiveId, receiveAvatar, receiveName }) => {
		mChatId.value = Number(chatId)
		mReceiveId.value = receiveId
		mReceiveAvatar.value = receiveAvatar
		mReceiveName.value = receiveName
		const { data } = await getChatList({ chat_id: Number(chatId) })
		chat.chatList = data
		uni.setNavigationBarTitle({
			title:receiveName
		})
	})
</script>
<style lang="scss" scoped>
	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		margin: 0 10rpx;
	}

	.page-container {
		padding-bottom: 50px;
	}


	.icon {
		width: 60rpx;
		height: 60rpx;
		padding: 10rpx;
	}

	.chat-item {
		.chat-time {
			font-size: 20rpx;
			text-align: center;
		}
	}

	.chat-item-left {
		display: flex;
		margin-bottom: 10rpx;
	}

	.chat-item-right {
		display: flex;
		margin-bottom: 10rpx;
		justify-content: flex-end;
	}

	.chat-message {
		background-color: rgb(149, 235, 108);
		padding: 10rpx;
		border-radius: 10rpx;
		max-width: 300rpx;
		word-break: break-all;
	}

	.message-footer {
		width: 100%;
		background-color: rgb(247, 247, 247);
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		// margin-bottom: 50px;


		.footer-input {
			flex: 1;
			height: 60rpx;
			border-radius: 10rpx;
			background-color: #fff;
		}
	}
</style>