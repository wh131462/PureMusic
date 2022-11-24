<template>
	<view>
		<!-- 个人详情页 -->
		<uniNavbar title="个人详情"  :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'" :color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false"
			@clickLeft="Back()">
			<!-- 导航栏左侧插槽 -->
			<view slot="left" class="navBarIcon"><image :src="setting.isNight?'../../static/Icon/back_white.png':'../../static/Icon/back_black.png'" mode="aspectFit"></image></view>
		</uniNavbar>
		<!-- 背景 -->
		<view :class="setting.isNight?'Background-night':'Background'">
			<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
		</view>
		<!-- 个人信息详情 -->
		<view class="Detail">
			<view class="detail-item">
				<view class="item-title">
					<text>头像</text>
				</view>
				<view class="item-content">
					<image src="../../static/Image/background3.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="detail-item">
				<view class="item-title">
					<text>昵称</text>
				</view>
				<view class="item-content">
					<text>wh131462</text>
				</view>
			</view>
			<view class="detail-item">
				<view class="item-title">
					<text>性别</text>
				</view>
				<view class="item-content">
					<text>男</text>
				</view>
			</view>
		</view>
		<view class="Detail">
			<view class="detail-item">
				<view class="item-title">
					<text>生日</text>
				</view>
				<view class="item-content">
					<text>1999.11.22</text>
				</view>
			</view>
			<view class="detail-item">
				<view class="item-title">
					<text>地区</text>
				</view>
				<view class="item-content">
					<text>河北保定</text>
				</view>
			</view>
			<view class="detail-item">
				<view class="item-title">
					<text>简介</text>
				</view>
				<view class="item-content">
					<text>一个有趣的灵魂</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//本地设置参数
				user:{},
				setting:{}
			}
		},
		onLoad() {
			var _this=this;
			//获取设置参数
			_this.setting=getApp().globalData.setting;
			_this.user=getApp().globalData.user;
		},
		methods: {
			Back(){
				uni.navigateBack({
					animationDuration:300,
					animationType:"slide-out-left"
				})
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		}
	}
</script>

<style>
	/* 详情总容器 */
	.Detail{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin: 10px 0;
	}
	/* 详情子项目 */
	.detail-item{
		width: 100%;
		height: 50px;
		color: #efefef;
		background-color: rgba(255,255,255,0.2);
		box-shadow: rgba(255,255,255,0.5) 0px .3px 1px; 
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.detail-item:active{
		background-color: rgba(255,255,255,0.1);
	}
	/* 标题部分 */
	.detail-item .item-title{
		width: 25%;
		text-indent: 1em;
	}
	/* 内容 */
	.detail-item .item-content{
		width: 75%;
		text-align: right;
		padding-right: 1em;
		line-height: 100%;
	}
	.item-content image{
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}
</style>
