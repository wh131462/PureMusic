<template>
	<view>
		<!-- 登录界面 -->
		<uniNavbar :title="StatusLogin?'登录':'注册'" :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'" :color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false"
			@clickLeft="Back()">
			<!-- 导航栏左侧插槽 -->
			<view slot="left" class="navBarIcon"><image :src="setting.isNight?'../../static/Icon/back_white.png':'../../static/Icon/back_black.png'" mode="aspectFit"></image></view>
		</uniNavbar>
		<!-- 背景 -->
		<view :class="setting.isNight?'Background-night':'Background'">
			<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
		</view>
		
		<!-- 登录 -->
		<view v-if="StatusLogin" class="Login">
			
			<view class="Login-Input">
				<input type="text" v-model="Lusername" placeholder="账号" />
			</view>
			
			<view class="Login-Input">
				<input type="password" v-model="Lpassword" placeholder="密码"/>
			</view>
			
			<view class="Login-help">
				<text>忘记密码?</text>
			</view>
			
			<view class="Login-Btn">
				<button type="default" @click="Login()">登录</button>
			</view>
			<view class="Login-Btn">
				<button type="default"  @click="StatusLogin=!StatusLogin">注册</button>
			</view>
		</view>
		<!-- 注册 -->
		<view  v-if="!StatusLogin" class="Register">
			<view class="Register-Input">
				<input type="text" v-model="Rusername" placeholder="用户名" />
			</view>
			
			<view class="Register-Input">
				<input type="password" v-model="Rpassword" placeholder="密码"/>
			</view>
			<view class="Register-Input">
				<input type="password" v-model="RpasswordR" placeholder="重复密码"/>
			</view>
			
			<view class="Register-Btn">
				<button type="default" @click="Register()">注册</button>
			</view>
			<view class="Register-Btn">
				<button type="default" @click="StatusLogin=!StatusLogin">已有账号，直接登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusLogin:true,//登录状态还是注册状态
				//全局参数
				user:{},
				setting:{},
				//页内参数
				//登录
				Lusername:"",
				Lpassword:"",
				//注册
				Rusername:"",
				Rpassword:"",
				RpasswordR:""
				
			}
		},
		onLoad() {
			var _this=this;
			//获取设置参数
			_this.setting=getApp().globalData.setting;
			_this.user=getApp().globalData.user;
		},
		methods: {
			//返回
			Back(){
				uni.navigateBack({
					animationDuration:300,
					animationType:"slide-out-left"
				})
			},
			//登录函数
			CheckLogin(){
				var _this=this;
				//对输入进行基本检测 通过则返回true 反之则false
				if(this.Lusername!=""&&this.Lpassword!=""){
					//不为空
					return true;
				}else{
					plus.nativeUI.toast("提示",{icon:"../../static/Icon/delete_black.png",background:"rgba(255,255,255,0.3)"});
					uni.showToast({
						icon:"error",
						duration:1000,
						title:"请输入"+(_this.Lusername==""?"账号"+(_this.Lpassword==""?"和密码":""):"密码")
					});
					return false;
				}
			},
			Login(){
				if(this.CheckLogin()){
					uni.showToast({
						duration:1000,
						icon:"success",
						title:"登录成功！"
					})
				}else{
					
				}
				
			},
			//注册函数
			Register(){
				
			}
			
		}
	}
</script>

<style>
.Login,.Register{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.Login-Input,.Register-Input{
	width: 100%;
	margin: 10px auto;
	
}
.Login-Input input,.Register-Input input{
	display:block;
	width: calc(80% - 2em) ;
	height: 80rpx;
	margin: 0 auto;
	padding: 0 1em;
	border-radius: 30px;
	color: #626262;
	background-color: rgba(255,255,255,0.6);
}


.Login-help{
	width: 100%;
	height: 30px;
	color: #3751ff;
}
.Login-help text{
	display: inline-block;
	position: absolute;
	right: calc(10%);
}
.Login-Btn,.Register-Btn{
	width: 100%;
	margin: 10px;
}
.Login-Btn button,.Register-Btn button{
	display:block;
	width: 80%;
	height: 80rpx;
	margin: 0 auto;
	border-radius: 30px;
	color: #00A6D0;
	background-color: rgba(255,255,255,0.8);
}

.Login-Btn button:active,.Register-Btn button:active{
	display:block;
	width: 80%;
	height: 80rpx;
	margin: 0 auto;
	border-radius: 30px;
	color: #00A6D0;
	background-color: rgba(255,255,255,0.5);
}
</style>
