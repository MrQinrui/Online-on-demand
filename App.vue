<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化用户登录状态
			this.$store.dispatch('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方样式库 */
	/* #ifndef APP-NVUE */
	@import url("./common/uni.css");
	/* 引入animate动画库 */
	@import url("./common/animate.css");
	/* #endif */
	/* 引入free样式库 */
	@import url("./common/free.css");
	/* 引入全局样式库 */
	@import url("./common/common.css");
	/* 引入自定义图标库 */
	/* #ifndef APP-NVUE */
	@import url("./common/icon.css");
	/* #endif */
</style>
