<template>
	<view>
		<uni-swipe-action v-for="(item,index) in list" :key="index">
			<uni-swipe-action-item :options="options" @click="bindClick($event,item)">
				<media-list :item="item" :index="index"></media-list>
			</uni-swipe-action-item>
		</uni-swipe-action>
		
		
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
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue';
	import { mapState } from 'vuex'
	export default {
		components: {
			mediaList,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				options: [{
					text: '取消收藏',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				list:[],
				page:1,
				loadText:"上拉加载更多"
			}
		},
		onLoad() {
			this.getData()
		},
		computed: {
			...mapState({
				user_id:state=>state.user.id
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
			this.page++
			this.getData()
		},
		methods: {
			getData(){
				let page = this.page
				return this.$H.get(`/fava_list/${this.page}?user_id=${this.user_id}`).then(res=>{
					this.list = page === 1 ? res : [...this.list,...res],
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch(err=>{
					if(page > 1){
						this.page--
					}
					this.loadText = '上拉加载更多'
				})
			},
			bindClick(e,item) {
				this.$H.post('/fava/video',{
					video_id:item.id
				},{ token:true }).then(res=>{
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					this.page = 1
					this.getData()
				})
			},
		}
	}
</script>

<style>

</style>
