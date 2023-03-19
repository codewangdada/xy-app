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
						<text>小董</text><text class="tag">百次好评</text>
					</view>
					<view class="userinfo-time">
						<text>2分钟前来过</text>|<text>济南</text>
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
					36.98
				</view>
				<view class="small-text">
					￥100
				</view>
				<view class="middle-line">
					|
				</view>
				<view class="express">
					包邮
				</view>
				<view class="small-text">
					179人想要
				</view>
				<view class="middle-line">
					|
				</view>
				<view class="small-text">
					581浏览
				</view>
			</view>
			<view class="content-wrapper">
				15分钟内到账<br>
				优酷vip黄金会员一年优酷youku视频会员12个月直冲<br>
				充值到账12个月。15分钟内到账<br>
				直冲您的账号，拍下后提供手机号给客服，需要配合接验证码，一次性到账，正规充值，<br>
				1.直冲一次性到账，非共享账号，充值您的手机号<br>
				2.支持手机，平板，电脑通用，充值速度快<br>
				3.充值成功后，无法退款，请确认好充值账号，有问题可以私聊客服<br>
			</view>
			<view class="line">
				
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	function goBack() {
		uni.navigateBack({
			delta: 1
		});
	}
</script>

<style lang="scss" scoped>
	.icon{
		width: 50rpx;
		height: 50rpx;
	}
	.icon-small{
		width: 40rpx;
		height: 40rpx;
	}
	.page-container {
		padding-top: 80px;
		width: 100%;
		display: flex;
		justify-content: center;

		.main-wrapper {
			width: 100%;
			position: relative;
			.topbar-wrapper{
				width: 100%;
				height: 80px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				top: 0;
				left: 0;
				padding: 80rpx 20rpx 10rpx;
				.topbar-search{
					flex: 1;
					background-color: #eee;
					color: #999;
					margin: 0 20rpx;
					padding: 10rpx 20rpx;
					border-radius: 30rpx;
				}
				.topbar-share{
					margin-right: 20rpx;
				}
			}
			.footer-wrapper{
				position: fixed;
				width: 100%;
				bottom: 0;
				left: 0;
				border-top: 1px solid #eee;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				.footer-icon{
					text-align: center;
					color: #999;
					font-size: 20rpx;
					margin-right: 40rpx;
				}
				.footer-btn{
					background-color: rgb(255, 231, 17);
					border-radius: 60rpx;
					padding: 20rpx 40rpx;
				}
				.btn{
					margin-left: auto;
					margin-right: 20rpx;
					background-color: #eee;
				}
			}
			.userinfo-wrapper{
				padding: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.userinfo-avatar{
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
				}
				.userinfo-box{
					margin-left: 20rpx;
					flex: 1;
					.userinfo-name{
						font-weight: bold;
						font-size: 28rpx;
						.tag{
							color: orange;
							font-size: 24rpx;
							margin-left: 10rpx;
							background-color: yellow;
							padding: 2rpx 10rpx;
							border-radius: 20rpx;
						}
					}
					.userinfo-time{
						color: #666;
						margin-top: 10rpx;
						font-size: 24rpx;
					}
				}
				.userinfo-attention{
					font-weight: bold;
					background-color: #eee;
					border-radius: 50rpx;
					padding: 10rpx 20rpx;
				}
			}
			.price-wrapper{
				display: flex;
				align-items: baseline;
				padding: 40rpx;
				.price{
					color: #ff5500
				}
				.price-new{
					font-size: 40rpx;
					font-weight: bold;
					color: #ff5500
				}
				.small-text{
					color: #666;
					font-size: 24rpx;
					
				}
				.express{ 
					color: royalblue;
					font-size: 28rpx;
					flex: 1;
				}
				.middle-line{
					color: #eee;
					font-size: 24rpx;
					margin: 0 10rpx;
				}
			}
			.content-wrapper{
				padding: 40rpx;
			}
			.line{
				width: 100%;
				height: 20rpx;
				background-color: #eee;
			}
		}
	}
</style>
