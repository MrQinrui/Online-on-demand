<template>
	<view>
		<uni-swipe-action v-for="(item,index) in list" :key="index">
			<uni-swipe-action-item :options="options" @click="bindClick($event,item)">
				<media-list :item="item" :index="index"></media-list>
			</uni-swipe-action-item>
		</uni-swipe-action>
		
		
		<!-- 默认提示 -->
		<view v-if="list.length === 0" class="flex align-center justify-center text-secondary" style="height: 200rpx;">暂无数据</view>
		
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
					text: '删除记录',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				list:[],
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
		onNavigationBarButtonTap() {
			uni.removeStorage({
				key:"history",
				success: (res) => {
					uni.showToast({
						title: '清除成功',
						icon: 'none'
					});
					this.list = []
				}
			})
		},
		methods: {
			getData(){
				let list = uni.getStorageSync('history')
				this.list = list ? JSON.parse(list) : []
			},
			bindClick(e,item) {
				let index = this.list.findIndex(v=>v.id === item.id)
				if(index !== -1){
					this.list.splice(index,1)
					uni.setStorage({
						key:"history",
						data:JSON.stringify(this.list)
					})
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					});
				}
			},
		}
	}
</script>

<style>

</style>
