<template>
	<view class="icon-cate" @click="open">
		<image :src="item.cover" style="width: 70rpx;height: 70rpx;" class="bg-light"></image>
		<text class="text-muted font mt-1">{{item.title}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index:[Number,String]
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages/list/list?id='+this.item.id + '&title='+this.item.title,
				});
			}
		},
	}
</script>

<style>
	.icon-cate{
		width: 187.5rpx;
		height: 187.5rpx;
		line-height: 1;
		display: inline-flex!important;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
