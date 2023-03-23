<template>
	<view class="page-container">
		<view class="topbar-wrapper">
			消息
		</view>
		<view class="search">
			<image class="search-icon" src="../../static/icon/ic_search.png"></image>
			搜索聊天记录/联系人/服务号
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.page-container{
		padding-top: 60px;
		width: 100%;
		.topbar-wrapper{
			position: fixed;
			width: 100%;
			height: 60px;
			top: 0;
			left: 0;
			z-index: 101;
			box-sizing: border-box;
			padding: 20px;
			background: #fff;
		}
		.search{
			color: #bfbfbf;
			.search-icon{
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
