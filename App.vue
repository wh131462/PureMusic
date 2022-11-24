<script>
	export default {
		globalData:{
			user:{
				
			},//用户信息"username": "wh131462","motto": "勇敢做自己！",
			setting:{//默认设置
				isNight:false,
				backgroundSrc:"../../static/Image/background1.jpg",
			    backgroundStyle:""
			},//设置全局变量
		},
		onLaunch: function() {
			console.log('App Launch')
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
	@font-face {
		font-family:"FZ";
		src: url('static/Font/FZZXHJW.TTF');
	}
	*{
		font-family: "FZ";
	}
	/* NavBar */
	.navBarIcon {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
	}
	
	.navBarIcon image {
		height: 30rpx;
		width: 30rpx;
	}
	/* 背景 */
	.Background {
		width: 100%;
		height: 100%;
		background-color: #50bcff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.Background-night{
		width: 100%;
		height: 100%;
		background-color: #111111;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.Background-night image{
		display: none;
	}
	
	.Background image {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		filter: blur(1px) brightness(80%);
	}
	
</style>
