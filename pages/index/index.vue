<template>
	<view>
		
		<!-- #ifdef MP -->
		<!-- 导航栏 -->
		<view class="flex align-center fixed-top bg-white" style="height: 44px;">
			<!-- 搜索框 -->
			<view @click="openSearch" class="ml-2 flex align-center flex-1 rounded-circle px-1" style="background-color: #F6F7F8;color: #959FA0;">
				<text class="iconfont iconsousuokuang"></text>
				<text>精彩热搜：帝莎编程学院</text>
			</view>
			<view @click="openCate" class="flex align-center px-2" style="color: #959FA0;">分类</view>
		</view>
		<view style="height: 44px;"></view>
		<!-- #endif -->
		
		<!-- 轮播图组件 -->
		<view class="px-3 py-2">
			<swiper-dot :info="swipers" :current="current">
				<swiper :current="current" circular :autoplay="true" :interval="3000" :duration="150" style="height: 250rpx;" @change="changeSwiper">
					<swiper-item v-for="(item,index) in swipers" :key="index" @click="openDetailVideo(item.video_id)">
						<image :src="item.cover" mode="aspectFill"
						style="height: 250rpx;width: 100%;"
						class="rounded-lg"></image>
					</swiper-item>
				</swiper>
			</swiper-dot>
		</view>
		
		<!-- 列表样式一 -->
		<card title="为你推荐">
		<view class="f-list">
			<view v-for="(item,index) in list" :key="index" style="margin-left: 15rpx;margin-right: 15rpx;min-height: 5rpx;width:328rpx;position: relative;" class="rounded-lg border mb-2" @click="openDetailVideo(item.id)">
				<image :src="item.cover" style="width: 100%;height: 220rpx;" class="rounded-top-lg"></image>
				<view style="height: 65rpx;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));position: absolute;left: 0;right: 0;top: 155rpx;" class="text-white flex align-center">
					<text class="iconfont iconbofangshu font-md mx-1"></text>
					<text class="font-sm">{{item.play_count}}</text>
					<text class="iconfont icondanmushu font-md mx-1"></text>
					<text class="font-sm">{{item.danmu_count}}</text>
				</view>
				<view class="px-1 pb-1">
					<view class="font">{{item.title}}</view>
					<view class="flex align-center justify-between text-light-muted">
						<text class="font">{{item.category.title}}</text>
						<text class="iconfont icongengduo"></text>
					</view>
				</view>
			</view>
		</view>
		</card>
		<view class="f-divider"></view>
		<!-- 列表样式二 -->
		<card title="为你推荐">
		<view class="f-list">
			<view v-for="(item,index) in list" :key="index" style="margin-left: 15rpx;margin-right: 15rpx;min-height: 5rpx;width:210rpx;position: relative;" class="rounded-lg mb-2" @click="openDetailVideo(item.id)">
				<image :src="item.cover" style="width: 100%;height: 280rpx;" class="rounded-lg" mode="aspectFill"></image>
				<view style="height: 65rpx;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));position: absolute;left: 0;right: 0;top: 215rpx;" class="text-white flex align-center rounded-bottom-lg">
					<text class="iconfont iconbofangshu font-md mx-1"></text>
					<text class="font-sm">{{item.play_count}}</text>
				</view>
				<view class="font">{{item.title}}</view>
			</view>
		</view>
		</card>
		<view class="f-divider"></view>
		<!-- 列表样式三 -->
		<card title="为你推荐">
		<view class="f-list">
			
			<media-list v-for="(item,index) in list" :key="index"
			:item="item" :index="index"></media-list>
			
		</view>
		</card>
	</view>
</template>

<script>
	import swiperDot from '@/components/common/swiper-dot.vue';
	import card from '@/components/common/card.vue';
	import mediaList from '@/components/common/media-list.vue';
	export default {
		components: {
			swiperDot,
			card,
			mediaList
		},
		data() {
			return {
				current:0,
				swipers: [],
				
				list:[]
			}
		},
		onLoad() {
			this.$H.get('/index_data').then(res=>{
				this.list = res
			})
			this.$H.get('/banner/list').then(res=>{
				this.swipers = res
			})
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url:"../cate/cate"
			})
		},
		methods: {
			openSearch(){
				uni.navigateTo({
					url: '../search/search',
				});
			},
			openCate(){
				uni.switchTab({
					url:"../cate/cate"
				})
			},
			changeSwiper(e){
				this.current = e.detail.current
			},
			openDetailVideo(id){
				uni.navigateTo({
					url: '../detail-video/detail-video?id='+id,
				});
			}
		}
	}
</script>

<style>
	.f-list{
		display: flex;
		flex-wrap: wrap;
		padding-left: 15rpx;
		padding-right: 15rpx;
	}
</style>
