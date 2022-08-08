<template>
	<view>
		<view style="height: 350rpx;" class="bg-light position-relative" hover-class="bg-hover-light" @tap="upload">
			<image v-if="form.cover" :src="form.cover" mode="aspectFill"
			style="width: 750rpx;height: 350rpx;"></image>
			<view class="position-absolute left-0 right-0 top-0 bottom-0 flex flex-column align-center justify-center" style="background-color: rgba(255,255,255,0.2);">
				<text v-if="!form.cover" class="iconfont iconjia" style="font-size: 50rpx;"></text>
				<text class="font text-muted">点击{{form.cover ? '切换' : '添加'}}封面图</text>
			</view>
		</view>
		<form-item label="标题">
			<input type="text" v-model="form.title" placeholder="请填写视频标题" placeholder-class="text-light-muted" class="w-100 pr-5"/>
		</form-item>
		<picker mode="selector" :range="range" @change="change">
			<form-item label="分类" rightIcon>
				<input type="text" v-model="categroyTitle" placeholder="请填写视频标题" placeholder-class="text-light-muted" class="w-100 pr-5" disabled/>
			</form-item>
		</picker>
		<form-item label="描述">
			<textarea v-model="form.desc" placeholder="请填写视频描述" style="width: 550rpx;" class="py-3"/>
		</form-item>
		<!-- #ifdef MP -->
		<view class="py-2 px-3">
			<main-big-button @tap="submit">发 布</main-big-button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import formItem from '@/components/common/form-item.vue';
	import mainBigButton from '@/components/common/main-big-button.vue';
	export default {
		components: {
			formItem,
			mainBigButton
		},
		data() {
			return {
				id:0,
				form:{
					cover:"",
					title:"",
					category_id:0,
					desc:""
				},
				category:[],
				range:[]
			}
		},
		onLoad(e) {
			if(e.data){
				let item = JSON.parse(decodeURIComponent(e.data))
				this.form = {
					cover:item.cover,
					title:item.title,
					category_id:item.category_id,
					desc:item.desc,
				}
				this.id = item.id
			}
			this.$H.get('/category').then(res=>{
				this.category = res
				this.range = res.map(item=>item.title)
			})
		},
		onNavigationBarButtonTap() {
			this.submit()
		},
		computed: {
			categroyTitle() {
				let index =this.category.findIndex(item=>item.id === this.form.category_id) 
				if(index === -1){
					return ''
				}
				return this.category[index].title
			}
		},
		methods: {
			// 点击添加封面图
			upload(){
				uni.chooseImage({
				    count: 1,
				    sizeType: ['compressed'],
				    success: (res)=> {
						this.$H.upload('/upload',{
							filePath:res.tempFilePaths[0]
						}).then(res=>{
							this.form.cover = res.url
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							});
						})
				    }
				});
			},
			change(e){
				this.form.category_id = this.category[e.detail.value].id
			},
			submit(){
				let url = this.id === 0 ? '/video' : '/video/'+this.id
				let msg = this.id === 0 ? '发布' : '修改'
				this.$H.post(url,this.form,{
					token:true
				}).then(res=>{
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					uni.navigateBack({
						delta: 1
					});
				})
			}
		}
	}
</script>

<style>

</style>
