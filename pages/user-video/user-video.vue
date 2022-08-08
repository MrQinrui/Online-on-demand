<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<media-list :item="item" :index="index"></media-list>
			<view class="flex" style="height: 100rpx;">
				<view class="flex-1 flex align-center justify-center" hover-class="bg-light" @click="edit(item)">修改</view>
				<view class="flex-1 flex align-center justify-center" hover-class="bg-light" @click="openVideoList(item)">视频</view>
				<view class="flex-1 flex align-center justify-center" hover-class="bg-light" @click="deleteVideo(item)">删除</view>
			</view>
			<view class="f-divider"></view>
		</view>
		
		<!-- 默认提示 -->
		<view v-if="list.length === 0" class="flex align-center justify-center text-secondary" style="height: 200rpx;">暂无数据</view>
		<!-- 上拉加载更多 -->
		<view  v-else-if="list.length > 10"  class="flex align-center justify-center font-md text-secondary" style="height: 80rpx;" hover-class="bg-light">
			{{ loadText }}
		</view>
		
	</view>
</template>

<script>
	import mediaList from '@/components/common/media-list.vue';
	import { mapState } from 'vuex'
	export default {
		components: {
			mediaList
		},
		data() {
			return {
				page:1,
				loadText:"上拉加载更多",
				list:[]
			}
		},
		onShow() {
			this.getData()
		},
		computed: {
			...mapState({
				user_id:state=>{
					return state.user ? state.user.id : 0
				}
			})
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
			this.page = this.page + 1
			this.getData()
		},
		methods: {
			deleteVideo(item){
				this.$H.post('/video/destroy',{
					id:item.id
				},{
					token:true
				}).then(res=>{
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					});
					this.getData()
				})
			},
			edit(item){
				uni.navigateTo({
					url: '../create/create?data='+encodeURIComponent(JSON.stringify(item)),
				});
			},
			openVideoList(item){
				uni.navigateTo({
					url: '../user-video-list/user-video-list?id='+item.id,
				});
			},
			getData(){
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				let page = this.page
				return this.$H.get(`/video_list/${this.page}?user_id=${this.user_id}`).then(res=>{
					uni.hideLoading()
					if(page === 1){
						this.list = res
					} else {
						this.list = [...this.list,...res]
					}
					this.loadText = res.length < 10 ? '没有更多' : "上拉加载更多"
				}).catch(err=>{
					uni.hideLoading()
					if(this.page > 1){
						this.page--
					}
					this.loadText = '上拉加载更多'
				})
			}
		}
	}
</script>

<style>

</style>
