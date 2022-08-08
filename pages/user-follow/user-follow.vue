<template>
	<view>
		<f-list-item :title="item.name" v-for="(item,index) in list" :key="index">
			<image slot="icon" :src="item.avatar || '/static/demo/6.jpg'" style="width: 80rpx;height: 80rpx;" class="rounded-circle mr-2"></image>
		</f-list-item>
		
		<!-- 默认提示 -->
		<view v-if="list.length === 0" class="flex align-center justify-center text-secondary" style="height: 200rpx;">暂无数据</view>
		<!-- 上拉加载更多 -->
		<view  v-else-if="list.length > 10"  class="flex align-center justify-center font-md text-secondary" style="height: 80rpx;" hover-class="bg-light">
			{{ loadText }}
		</view>
		
	</view>
</template>

<script>
	import fListItem from '@/components/common/f-list-item.vue';
	export default {
		components: {
			fListItem
		},
		data() {
			return {
				list:[],
				page:1,
				loadText:"上拉加载更多"
			}
		},
		onLoad() {
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData().then(res=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			}).catch(err=>{
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if(this.loadText !== '上拉加载更多'){
				return
			}
			this.loadText = '正在加载中...'
			this.page++
			this.getData()
		},
		methods: {
			getData(){
				let page = this.page
				return this.$H.get(`/user/follows/${page}`,{
					token:true
				}).then(res=>{
					this.list = page === 1 ? res : [...this.list,...res],
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch(err=>{
					if(page > 1){
						this.page--
					}
					this.loadText = '上拉加载更多'
				})
			},
		}
	}
</script>

<style>

</style>
