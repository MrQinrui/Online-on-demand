<template>
	<view class="bg-light" style="min-height: 100vh;">
		<block v-for="(item,index) in list" :key="index">
			<view v-if="!item.isedit" class="bg-white">
				<video style="height: 350rpx;width: 100%;" :src="item.video" controls></video>
				<form-item label="标题">
					<text class="font">{{item.title}}</text>
				</form-item>
				<view class="flex" style="height: 100rpx;">
					<view class="flex-1 font flex align-center justify-center" hover-class="bg-light" @click="openEdit(item)">修改</view>
					<view class="flex-1 font flex align-center justify-center" hover-class="bg-light" @click="deleteItem(item)">删除</view>
				</view>
			</view>
			<view v-else class="bg-white">
				<view style="height: 350rpx;" class="bg-light position-relative" hover-class="bg-hover-light">
					<video v-if="item.video" style="height: 350rpx;width: 100%;" :src="item.video" controls></video>
					<view v-if="!item.video" class="position-absolute left-0 right-0 top-0 bottom-0 flex flex-column align-center justify-center" style="background-color: rgba(255,255,255,0.2);" @click="upload(item)">
						<text class="iconfont iconjia" style="font-size: 50rpx;"></text>
						<text class="font text-muted">点击添加视频</text>
					</view>
				</view>
				<view v-if="item.video" class="flex align-center justify-center font border-bottom border-top" hover-class="bg-light" style="height: 100rpx;" @click="upload(item)">
					点击切换视频
				</view>
				<form-item label="标题">
					<input type="text" v-model="item.title" placeholder="请填写视频标题" placeholder-class="text-light-muted" class="w-100 pr-5"/>
				</form-item>
				<form-item label="描述">
					<textarea v-model="item.desc" placeholder="请填写视频描述" style="width: 550rpx;" class="py-3"/>
				</form-item>
				<view class="flex" style="height: 100rpx;">
					<view class="flex-1 font flex align-center justify-center bg-main text-white" hover-class="bg-main-hover" @click="submit(item)">完成</view>
					<view class="flex-1 font flex align-center justify-center" hover-class="bg-light" @click="deleteItem(index)">删除</view>
				</view>
			</view>
			<view class="f-divider"></view>
		</block>
		
		
		
		
		
		<view v-if="showButton" class="flex align-center justify-center bg-main text-white font" style="height: 100rpx;" hover-class="bg-main-hover" @click="add">
			+ 添加新章节
		</view>
	</view>
</template>

<script>
	import formItem from '@/components/common/form-item.vue';
	// #ifndef H5
	import VodUploader from '@/common/vod-wx-sdk-v2.js';
	// #endif
		
	export default {
		components: {
			formItem
		},
		data() {
			return {
				id:0,
				list:[],
			}
		},
		computed: {
			showButton() {
				let arr = this.list.filter(item=>{
					return item.isedit
				})
				return arr.length === 0
			}
		},
		onLoad(e) {
			if(!e.id){
				uni.navigateBack({
					delta: 1
				});
				return uni.showToast({
					title: '非法参数',
					icon: 'none'
				});
			}
			this.id = e.id
			this.getData()
		},
		methods: {
			getData(){
				this.$H.get('/video_detail/'+this.id).then(res=>{
					this.list = res.map(item=>{
						item.isedit = false
						item.video = item.url
						return item
					})
				})
			},
			// 完成
			submit(item){
				if(!item.video){
					return uni.showToast({
						title: '视频不能为空',
						icon: 'none'
					});
				}
				if(!item.title){
					return uni.showToast({
						title: '标题不能为空',
						icon: 'none'
					});
				}				
				
				let url = item.id ? '/video_detail/'+item.id : '/video_detail'
				let msg = item.id ? '修改' : '创建'
				this.$H.post(url,{
					title:item.title,
					url:item.video,
					video_id:this.id,
					desc:item.desc
				},{ token:true }).then(res=>{
					item.isedit = false
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					this.getData()
				})
			},
			// 删除
			deleteItem(item){
				console.log(item);
				uni.showModal({
					content: '是否要删除该视频？',
					success: (res)=>{
						if (res.confirm) {
							this.$H.post('/video_detail/destroy',{
								id:item.id
							},{
								token:true
							}).then(res=>{
								this.getData()
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								});
							})
						}
					}
				});
			},
			// 添加章节
			add(){
				this.list.push({
					video:"",
					title:"",
					desc:"",
					isedit:true
				})
			},
			// 上传视频
			upload(item){
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: (res)=> {

						// #ifdef H5
						let getSignature = (callback) => {
							return this.$H.post('/vod/sign',{},{
								token:true
							}).then(res=>{
								return res
							})
						}
						// #endif
						
						// #ifndef H5
						let getSignature = (callback) => {
							this.$H.post('/vod/sign',{},{
								token:true
							}).then(res=>{
								callback(res);
							})
						}
						// #endif
						
						// 生成唯一名称
						let mediaName = this.genID(12)
						uni.showLoading({
							title: '上传中...',
							mask: false
						});
						
						// #ifdef H5
						const tcVod = new TcVod.default({
						  getSignature: getSignature
						})
						const uploader = tcVod.upload({
						  mediaFile: res.tempFile,
						})
						uploader.on('media_progress',(info)=> {
						  console.log(info.percent) // 进度
						})
						uploader.done().then((doneResult)=>{
							// 上传后的视频链接
							item.video = doneResult.video.url
							uni.hideLoading()
						}).catch((err)=>{
							uni.hideLoading()
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						})
						// #endif
						
						// #ifndef H5
						VodUploader.start({
							mediaFile: res, 
							getSignature: getSignature,
							mediaName: mediaName,
							success: (result)=>{
								console.log('success');
								console.log(result);
							},
							error:(result)=> {
								uni.hideLoading()
								console.log('错误信息：' + result.data.message);
								let msg = result.data.code === 10002 ? '腾讯云点播子应用ID配置不正确，请修改自己部署的后端配置。（注意：老师提供的线上测试接口上传视频功能已关闭，请自己下载群文件完整后端代码跟着课程部署）' : result.data.message
								uni.showModal({
									title: '上传失败',
									content: msg,
									showCancel: false
								});
							},
							progress:(result)=> {
								console.log('progress');
								console.log(result);
							},
							finish: (result)=>{
								// 上传后视频链接
								item.video = result.videoUrl
								uni.hideLoading()
							}
						});
						// #endif
					}
				});
			},
			// 开启编辑状态
			openEdit(item){
				item.isedit = true
			},
			// 生成唯一ID
			genID(length){
			    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			}
		}
	}
</script>

<style>

</style>
