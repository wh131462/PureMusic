<template>
	<view>
		<!-- 设置界面 -->
		<!-- 导航栏示例 -->
		<uniNavbar title="设置" :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'" :color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false"
			@clickLeft="Back()"
			>
			<view slot="left" class="navBarIcon">
				<image :src="setting.isNight?'../../static/Icon/back_white.png':'../../static/Icon/back_black.png'" mode="aspectFit"></image>
			</view>
		</uniNavbar>
		<!-- 背景 -->
		<view :class="setting.isNight?'Background-night':'Background'">
			<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
		</view>
		<view class="setting-div">
			<view class="btn"  @click="SetBack()"><text>设置背景</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setting:{}
			}
		},
		onLoad() {
			this.setting=this.$api.getSetting();
		},
		methods: {
			Back(){
				console.log("返回");
				uni.navigateBack({
					animationDuration:300,
					animationType:"slide-out-right"
				})
			},
			SetBack(){
				uni.navigateTo({
					url:"../setback/setback",
					animationDuration:300,
					animationType:"slide-in-right"
				})
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		}
	}
</script>

<style>
	/* 设置区块 */
	.setting-div{
		width: 100%;
		margin: 10px auto;
		background-color:rgba(255,255,255,0.1);
		overflow: hidden;
	}
	/* 最后一个区块 */
	.setting-div:last-child{
		margin-bottom: 20px;
	}
	/* 区块内按钮 */
	.setting-div .btn::after{
		content: ">";
		position: absolute;
		right: 15px;
		margin: auto;
	}
	.setting-div .btn{
		border:solid rgba(0,0,0,0.1) .1px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: rgba(255,255,255,0.1);
	}
	.setting-div .btn:active{
		background-color: rgba(0,0,0,0.1);
	}
	
	.setting-div .btn text{
		margin-left: 10px;
	}
	/* 按钮内的开关 */
	.setting-div .btn switch{
		position: absolute;
		right:5px;
	}
</style>
