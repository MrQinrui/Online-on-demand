import Vue from 'vue';
import Vuex from 'vuex'
import $H from '../common/request.js';
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		user:false,
		token:false
	},
	actions:{
		// 登录
		login({ state },user){
			state.user = user
			state.token = user.token
			uni.setStorageSync('user',JSON.stringify(user))
			uni.setStorageSync('token',user.token)
		},
		// 初始化用户登录状态
		initUser({ state }){
			let u = uni.getStorageSync('user')
			if(u){
				u = JSON.parse(u);
				state.user = u
				state.token = u.token
			}
		},
		// 退出登录
		logout({ state }){
			$H.post('/logout',{},{
				token:true
			})
			state.user = false
			state.token = false
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		}
	}
})