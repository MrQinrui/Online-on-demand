<template>
	<view style="min-height: 100rpx;" class="flex border-bottom border-light-secondary">
		<view style="width: 120rpx;height: 100rpx;" class="flex align-center justify-center font-md">{{label}}</view>
		<view class="flex-1 flex align-center">
			<slot></slot>
		</view>
		<view v-if="rightIcon" class="flex align-center justify-center" style="height: 100rpx;width: 80rpx;">
			<text class="iconfont iconjinru text-muted"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: "标题"
			},
			rightIcon:{
				type:Boolean,
				default:false
			}
		},
	}
</script>

<style>
</style>
