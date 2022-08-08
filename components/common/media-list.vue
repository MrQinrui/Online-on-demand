<template>
	<view style="width: 750rpx;box-sizing: border-box;" class="flex align-center py-2 border-bottom" @click="open">
		<image :src="item.cover" style="width: 260rpx;height: 160rpx;" class="rounded-lg mx-2 flex-shrink"></image>
		<view class="flex-1 flex flex-column">
			<text class="font" style="line-height: 1.2;">{{item.title}}</text>
			<text class="font-sm text-light-muted mt-auto">{{item.create_time}}</text>
			<view class="flex align-center justify-between text-muted line-h">
				<view class="line-h">
					<text class="iconfont iconbofangshu font-md mx-1"></text>
					<text class="font-sm">{{item.play_count}}</text>
				</view>
				<view class="line-h">
					<text class="iconfont icondanmushu font-md mx-1"></text>
					<text class="font-sm">{{item.danmu_count}}</text>
				</view>
				<text class="iconfont icongengduo"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index:[String,Number]
		},
		methods: {
			// 数组置顶
			toFirst(arr,index){
				if (index != 0) {
					arr.unshift(arr.splice(index,1)[0]);
				}
				return arr;
			},
			open() {
				uni.navigateTo({
					url: '/pages/detail-video/detail-video?id='+this.item.id
				});
				// 存储到历史记录中
				let list = uni.getStorageSync('history')
				list = list ? JSON.parse(list) : []
				
				let index = list.findIndex(item=>{
					return item.id === this.item.id
				})
				
				if(index === -1){
					list.unshift(this.item)
				} else {
					this.toFirst(list,index)
				}
	
				uni.setStorage({
					key:"history",
					data:JSON.stringify(list)
				})
			}
		},
	}
</script>

<style>
</style>
