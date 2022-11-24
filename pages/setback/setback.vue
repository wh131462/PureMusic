<template>
	<view>
		<!-- 导航栏示例 -->
		<uniNavbar title="背景设置" :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'"
			:color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false" @clickLeft="Back()">
			<view slot="left" class="navBarIcon">
				<image :src="setting.isNight?'../../static/Icon/back_white.png':'../../static/Icon/back_black.png'"
					mode="aspectFit"></image>
			</view>
		</uniNavbar>
		<!-- 背景 -->
		<view :class="setting.isNight?'Background-night':'Background'">
			<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
		</view>
		<!-- 设置背景 -->
		<!-- 设置主背景 -->
		<!-- 设置头像背景 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//全局参数
				user: {},
				setting: {}
			}
		},
		onLoad() {
			var _this = this;
			//获取设置参数
			_this.setting = getApp().globalData.setting;
			_this.user = getApp().globalData.user;
		},
		methods: {
			Back() {
				console.log("返回");
				uni.navigateBack({
					animationDuration: 300,
					animationType: "slide-out-right"
				})
			},
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		}
	}
</script>

<style>

</style>
