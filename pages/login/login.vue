<template>
	<view>
		<view :style="'height:'+statusBarHeight+'px;'"></view>
		<view style="height: 44px;" class="flex align-center" @click="back">
			<view style="width: 44px;height: 44px;" class="flex align-center justify-center animated fast" hover-class="text-main pulse">
				<text class="iconfont iconguanbi font-lg"></text>
			</view>
		</view>
		
		<view class="flex align-center justify-center font-lg text-muted"
		style="margin-top: 100rpx;margin-bottom: 80rpx;">
			欢迎回来
		</view>
		
		<view class="px-4">
			<input type="text" class="uni-input bg-light rounded mb-4" placeholder="手机号/用户名/邮箱" v-model="form.username"/>
			<input type="text" class="uni-input bg-light rounded mb-4" placeholder="请输入密码" v-model="form.password"/>
			<input v-if="type === 'reg'" type="text" class="uni-input bg-light rounded mb-4" placeholder="请输入确认密码" v-model="form.repassword"/>
		</view>
		
		<view class="px-4">
			<main-big-button @click="submit">{{ type === 'login' ? '登 录' : '注 册' }}</main-big-button>
		</view>
		
		<view class="flex align-center justify-center py-5">
			<view style="height: 1rpx;width: 100rpx; background-color: #E3E1DD;"></view>
			<view class="text-muted mx-2 font-sm">社交账号登录</view>
			<view style="height: 1rpx;width: 100rpx;background-color: #E3E1DD;"></view>
		</view>
		
		<view class="flex align-center px-5">
			<view class="flex align-center justify-center flex-1">
				<view style="width: 100rpx;height: 100rpx;" class="rounded-circle flex align-center justify-center bg-light">
					<text class="iconfont iconweixin"></text>
				</view>
			</view>
			<view class="flex align-center justify-center flex-1">
				<view style="width: 100rpx;height: 100rpx;" class="rounded-circle flex align-center justify-center bg-light">
					<text class="iconfont iconQQ"></text>
				</view>
			</view>
			<view class="flex align-center justify-center flex-1">
				<view style="width: 100rpx;height: 100rpx;" class="rounded-circle flex align-center justify-center bg-light">
					<text class="iconfont iconxinlangweibo"></text>
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-center py-5">
			<view class="text-muted mx-2 font-sm" @click="changeType">
				{{ type === 'login' ? '注册账号' : '去登陆' }}
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import mainBigButton from '@/components/common/main-big-button.vue';
	export default {
		components: {
			mainBigButton
		},
		data() {
			return {
				type:"login",
				statusBarHeight:0,
				form:{
					username:"",
					password:"",
					repassword:""
				}
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		methods: {
			changeType(){
				this.type = this.type === 'login' ? 'reg' : 'login'
				this.form = {
					username:"",
					password:"",
					repassword:""
				}
			},
			back(){
				uni.navigateBack({
					delta: 1
				});
			},
			submit(){
				let msg = this.type === 'reg' ? '注册' : '登录'
				this.$H.post('/'+this.type,this.form).then(res=>{
					if(this.type === 'reg'){
						this.changeType()
					} else {
						this.$store.dispatch('login',res)
						uni.navigateBack({
							delta: 1
						});
					}
					uni.showToast({
						title: msg+'成功',
						icon: 'none'
					});
				})

			}
		}
	}
</script>

<style>

</style>
