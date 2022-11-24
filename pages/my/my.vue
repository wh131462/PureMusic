<template>
	<view>
		<!-- 导航栏示例代码 -->
		<uniNavbar title="我的" :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'" :color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false">
		</uniNavbar>
		<view :class="setting.isNight?'Background-night':'Background'">
			<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
		</view>
		<!-- 个人信息带头像名称 -->
		<view class="User-info" @click="user.isLogin?NavToPage('detail'):NavToPage('login')">
			<view class="info-headpic">
				<image src="../../static/Image/background3.png" mode="aspectFill"></image>
			</view>
			<view class="info-content">
				<text class="info-username">{{user.username}}</text>
				<text class="info-motto">{{user.motto}}</text>
			</view>
		</view>
		<!-- 我喜欢的歌单 -->
		<view class="LoveAndRecent-title">
			<text>我喜欢的歌曲&最近播放</text>
		</view>
		<view class="LoveAndRecent">
			<view class="MyLove">
				<view class="MyLove-cover">
					<image class="MyLove-icon" src="../../static/Icon/fullheart-red.png" mode="aspectFit"></image>
					<image class="MyLove-back" src="../../static/Image/background1.jpg" mode="aspectFill"></image>
				</view>
				<text class="MyLove-title">我喜欢的歌曲</text>
			</view>

			<!-- 最近播放 -->
			<view class="RecentPlay">
				<view class="RecentPlay-cover">
					<image class="RecentPlay-icon" src="../../static/Icon/history_white.png" mode="aspectFit"></image>
					<image class="RecentPlay-back" src="../../static/Image/background1.jpg" mode="aspectFill"></image>
				</view>
				<text class="RecentPlay-title">最近播放</text>
			</view>
		</view>


		<!-- 自建歌单 -->
		<view class="MyList">
			<view class="MyList-title">
				<text>我创建的歌单</text>
			</view>
			<view class="MyList-item">
				<view class="MyList-item-cover">
					<image src="../../static/Image/background1.jpg" mode="aspectFill"></image>
				</view>
				<view class="MyList-item-info">
					<text class="MyList-item-info-title">自定义歌单1</text>
					<text
						class="MyList-item-info-describe">自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单歌单自定义的歌单歌单自定义的歌单歌单自定义的歌单</text>
				</view>
			</view>
			<view class="MyList-item">
				<view class="MyList-item-cover">
					<image src="../../static/Image/background0.jpg" mode="aspectFill"></image>
				</view>
				<view class="MyList-item-info">
					<text class="MyList-item-info-title">自定义歌单2</text>
					<text
						class="MyList-item-info-describe">自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单歌单自定义的歌单歌单自定义的歌单歌单自定义的歌单</text>
				</view>
			</view>
			<view class="MyList-item">
				<view class="MyList-item-cover">
					<image src="../../static/Image/background1.jpg" mode="aspectFill"></image>
				</view>
				<view class="MyList-item-info">
					<text class="MyList-item-info-title">自定义歌单3</text>
					<text
						class="MyList-item-info-describe">自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单自定义的歌单歌单自定义的歌单歌单自定义的歌单歌单自定义的歌单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//全局对象
				user:{},//用户信息
				setting:{}//设置参数
			}
		},
		onLoad() {
			var _this=this;
			//获取设置参数
			_this.setting=getApp().globalData.setting;
			_this.user=getApp().globalData.user;
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			// 应用函数
			NavToPage(page){
				//跳转
				uni.navigateTo({
					url:'../'+page+'/'+page,
					animationDuration:300,
					animationType:"slide-in-right"
				})
			}
			//methods end
		}
	}
</script>

<style>
	/* 用户信息 */
	.User-info {
		margin: 20px auto;
		height: 80px;
		width: 95%;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.2);
	}

	.User-info:active {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.info-headpic {
		width: 20%;
		text-align: center;
	}

	.info-headpic image {
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}

	.info-content {
		width: 80%;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

	}

	.info-username {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 1.1rem;
		text-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px;
		background-image: linear-gradient(75deg, #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		background-image: -webkit-linear-gradient(75deg, #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		background-image:-moz-linear-gradient(75deg , #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		background-image:-ms-linear-gradient(75deg , #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		/* 渐变背景 */
		color:transparent;
		-webkit-background-clip: text;
		animation: rainbow 8s linear infinite;
	}

	@keyframes rainbow {
		from {
			background-position: 0 0;
		}

		to {
			background-position: 1000px 0;
		}
	}

	.info-motto {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.8rem;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* 我喜欢的and最近播放 */
	.LoveAndRecent {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.LoveAndRecent-title {
		width: 100%;
		height: 30px;
		padding-left: 10px;
	}

	.LoveAndRecent-title text {
		color: #FFF;
		font-size: 1.2rem;
		font-weight: 500;
	}

	/* 我喜欢的 */
	.MyLove {
		width: 100px;
		height: 130px;
		margin: 5px 10px;
	}
	.MyLove-cover{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	.MyLove-icon {
		width: 50px;
		height: 50px;
		position: absolute;
		z-index: 3;
		left: 50%;
		top: 50%;
		margin-left: -25px;
		margin-top: -25px;
	}

	.MyLove-back {
		width: 100%;
		height: 100%;
		filter: blur(1px) brightness(70%);
		z-index: 2;
	}

	.MyLove-title{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		width: 100%;
		color: #FFFFFF;
		text-align: center;
	}

	/* 最近听过 */
	.RecentPlay {
		width: 100px;
		height: 130px;
		margin: 5px 10px;
	}
	.RecentPlay-cover{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	.RecentPlay-icon {
		width: 50px;
		height: 50px;
		position: absolute;
		z-index: 3;
		left: 50%;
		top: 50%;
		margin-left: -25px;
		margin-top: -25px;
	}
	
	.RecentPlay-back {
		width: 100%;
		height: 100%;
		filter: blur(1px) brightness(70%);
		z-index: 2;
	}
	
	.RecentPlay-title{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		width: 100%;
		color: #FFFFFF;
		text-align: center;
	}
	

	/*我创建的歌单 */
	.MyList {
		width: 100%;
		height: auto;
		padding-bottom: 100px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.MyList-title {
		width: 100%;
		height: 30px;
		padding-left: 10px;

	}

	.MyList-title text {
		color: #FFF;
		font-size: 1.2rem;
		font-weight: 500;
	}

	/* 歌单子项 */
	.MyList-item {
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	/* 子项封面 */
	.MyList-item-cover {
		margin: 10px;
		width: 80px;
		height: 80px;
		border-radius: 5px;
		overflow: hidden;
	}

	.MyList-item-cover image {
		width: 100%;
		height: 100%;
	}

	/* 子项信息 */
	.MyList-item-info {
		width: calc(100% - 100px);
		margin: 10px 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: relative;
	}

	.MyList-item-info-title {
		display: block;
		height: 30px;
		width: 100%;
		color: #FFF;
		font-size: 1.1rem;

	}

	.MyList-item-info-describe {
		/* 多行文本省略 */
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		overflow:hidden;
		height: 50px;
		line-height: 25px;
		width: 95%;
		color: #DDD;
		font-size: 0.9rem;
	}
</style>
