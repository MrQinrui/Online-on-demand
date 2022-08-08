<template>
	<view>
		<navigator v-if="!user" url="../login/login">
		<view class="p-3 flex align-center">
			<image src="/static/demo/6.jpg" style="height: 120rpx;width: 120rpx;" class="bg-light rounded-circle flex-shrink"></image>
			<view class="flex flex-column pl-3 flex-1">
				<view class="font-md text-main">点击登录</view>
				<text class="font-sm text-muted">请先登录</text>
			</view>
		</view>
		</navigator>
		
		<navigator v-else :url="'../user-space/user-space?user_id='+user.id">
		<view class="p-3 flex align-center">
			<image :src="user.avatar || '/static/demo/6.jpg'" style="height: 120rpx;width: 120rpx;" class="bg-light rounded-circle flex-shrink"></image>
			<view class="flex flex-column pl-3 flex-1">
				<view class="font-md text-dark">{{user.nickname || user.username}} <text class="font-sm text-muted ml-3">{{user.sex}}</text></view>
				<text class="font-sm text-muted">{{user.desc || '暂无描述'}}</text>
			</view>
		</view>
		</navigator>
		
		<view class="f-divider"></view>
		<f-list-item icon="iconshipin" title="我的作品" :showRightIcon="false" :rightText=" videoCount + '个'"
		@click="navigateTo('user-video')"></f-list-item>
		<f-list-item icon="iconshoucang1" title="收藏"
		@click="navigateTo('user-fava')"></f-list-item>
		<f-list-item icon="iconguanzhu" title="关注" :rightText="followCount" @click="navigateTo('user-follow')"></f-list-item>
		<f-list-item icon="iconlishi" title="历史记录" @click="navigateTo('user-history')"></f-list-item>
		<!-- #ifdef MP -->
		<f-list-item icon="iconlishi" title="我的设置" @click="navigateTo('user-set')"></f-list-item>
		<!-- #endif -->
		<view class="f-divider"></view>
		<view class="py-2 px-3">
			<main-big-button @click="addMsg">立即投稿</main-big-button>
		</view>
		
		<!-- 弹框 -->
		<f-popup ref="popup">
			<view class="position-absolute bottom-0 left-0 right-0 bg-white animated faster fadeIn">
				<view class="flex" style="height: 200rpx;">
					<view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light" @click="navigateTo('create')">
						<text class="iconfont icondingdanwenjian flex align-center justify-center text-white bg-primary rounded-circle" style="width: 80rpx;height: 80rpx;"></text>
						<text class="font mt-1 text-muted">单集</text>
					</view>
					<view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light" @click="navigateTo('create')">
						<text class="iconfont icon918caidan_wenjian flex align-center justify-center text-white bg-main rounded-circle" style="width: 80rpx;height: 80rpx;"></text>
						<text class="font mt-1 text-muted">连载</text>
					</view>
				</view>
				<view class="f-divider"></view>
				<view class="py-2 flex align-center justify-center font-md text-muted" hover-class="bg-light" @click.stop="hidePopup">取消</view>
			</view>
		</f-popup>
		
	</view>
</template>

<script>
	import fListItem from '@/components/common/f-list-item.vue';
	import mainBigButton from '@/components/common/main-big-button.vue';
	import fPopup from '@/components/common/f-popup.vue';
	
	import { mapState } from 'vuex'
	
	export default {
		components: {
			fListItem,
			mainBigButton,
			fPopup
		},
		data() {
			return {
				show:false,
				followCount: 0,
				videoCount: 0,
			}
		},
		computed: {
			...mapState({
				user:state=>state.user
			})
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.navigateTo('user-set')
			}
		},
		onShow() {
			this.$H.get('/user/statistics',{
				token:true,
				noJump:true,
				toast:false
			}).then(res=>{
				this.followCount = res.followCount
				this.videoCount = res.videoCount
			})
		},
		methods: {
			// 选择投稿类型
			addMsg(){
				this.$refs.popup.show()
			},
			hidePopup(){
				this.$refs.popup.hide()
			},
			navigateTo(path){
				this.authJump({
					url: '/pages/'+path+'/'+path,
				})
			}
		}
	}
</script>

<style>

</style>
