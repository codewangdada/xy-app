<template>
	<view class="content">
		<image src="../../static/logo.png" class="logo"></image>
		<uni-forms class="form" ref="form" :rules="rules" border :modelValue="formData">
			<uni-forms-item name="username">
				<uni-easyinput v-model="formData.username" :input-border="false" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput v-model="formData.password" type="password" :input-border="false"
					placeholder="请输入账号密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="btn" type="primary" @click="submit(form)">登录</button>
	</view>

</template>

<script setup lang="ts">
	import {
		reactive,
		ref,
		toRefs
	} from 'vue';
	import {
		useUserStore
	} from '@/stores/user';
	import {
		passwordLogin
	} from '@/api/user'
	const data = reactive({
		formData: {
			username: '',
			password: ''
		},
		rules: {
			username: {
				rules: [{
					required: true,
					errorMessage: '用户名不能为空'
				}]
			},
			password: {
				rules: [{
					required: true,
					errorMessage: '密码不能为空'
				}]
			},
		}
	})

	const user = useUserStore()

	const {
		formData,
		rules
	} = toRefs(data)
	const form = ref()

	function submit(form: any) {
		form.validate().then(async res => {
			const {
				status,
				token,
				message
			} = await passwordLogin(res)
			if (status === 0) {
				user.setToken(token)
				// console.log(user);
				uni.switchTab({
					url: '/pages/home/index'
				})
			} else {
				uni.showToast({
					title: message,
					icon: 'none'
				})
			}
		}).catch(err => {
			console.log(err);
		})
	}
</script>

<style lang="scss" scoped>
	.logo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
	}

	.content {
		padding: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;

		.form {
			width: 100%;
		}

		.btn {
			width: 100%;
			margin-top: 40rpx;
			background-color: yellow;
			color: #666;
			border-radius: 80rpx;
			border: none;
		}
	}

	uni-button:after {
		border: none;
	}
</style>
