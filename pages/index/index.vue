<template>
	<view class="content">
		<!-- 起始页 -->
		<view class="TextView">
			<text class="TextView-title">PureMusic</text>
			<text class="TextView-description">一个纯洁的音乐软件....</text>
		</view>
		<view class="BgView">
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			var _this=this;
			setTimeout(()=>{uni.reLaunch({
					url:"../main/main",
					success() {
						console.log("关闭当前页面，进入main页面...");
					},
					fail(err) {
						console.log("跳转失败:"+err);
					}
				})},500);
				
		},
		methods: {

		}
	}
</script>

<style>
	.TextView {
		width: 100%;
		height: 100rpx;
		position: fixed;
		top: 50%;
		margin-top: -50rpx;
		z-index: 1;
	}

	.TextView-title {
		display: block;
		color: #ffffff;
		text-align: center;
		font-size: 1.5rem;
		font-style: italic;
		font-family: "SongTi";
	}

	.TextView-description {
		display: block;
		color: #ffffff;
		text-align: center;
	}

	.BgView {
		display: block;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -1;
		background-color: #00ffff;
		animation: bg 3s infinite;
	}

	@keyframes bg {
		0% {
			background-color: #da0204;
		}

		6.25% {
			background-color: #f28f00;
		}

		12.5% {
			background-color: #fec200;
		}

		18.75% {
			background-color: #fbed06;
		}

		25% {
			background-color: #d0e100;
		}

		31.25% {
			background-color: #92d202;
		}

		37.5% {
			background-color: #00bf57;
		}

		43.75% {
			background-color: #008d06;
		}

		50% {
			background-color: #00a39a;
		}

		56.25% {
			background-color: #00a6d0;
		}

		62.5% {
			background-color: #0088d6;
		}

		68.75% {
			background-color: #006eb9;
		}

		75% {
			background-color: #002ba8;
		}

		81.25% {
			background-color: #540195;
		}

		87.5% {
			background-color: #930186;
		}

		93.75% {
			background-color: #b60171;
		}

		100% {
			background-color: #da0204;
		}
	}

	.BgView image {
		display: none;
		width: 100%;
		height: 100%;
	}
</style>
