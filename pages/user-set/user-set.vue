<template>
	<view>
		<main-big-button @click="logout">退出登录</main-big-button>
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
				
			}
		},
		methods: {
			logout(){
				this.$store.dispatch('logout').then(res=>{
					uni.switchTab({
						url:"../my/my"
					})
					uni.showToast({
						title: '退出登录成功',
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style>

</style>
