import Vue from 'vue'
import App from './App'
//自定义引用
import uniNavbar from 'components/uni-nav-bar/uni-nav-bar.vue'
Vue.component("uniNavbar", uniNavbar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
//自定义全局函数
Vue.prototype.test = function() {
	console.log("全局函数的测试样例")
};

//下载文件 基础代码
const DF = (Url) => {
	uni.downloadFile({
		url: Url,
		success: (res) => {
			if (res.statusCode === 200) {
				console.log('下载成功');
			}
		}
	})
	console.log("文件已下载");
}
// 存储设置参数 此函数在每次设置变动的时候进行调用
const setSetting = () => {
	var set = getApp().globalData.setting;
	uni.setStorageSync("Setting", set);
	console.log("已同步保存设置到本地:");
	console.log(set);
}
// 读取设置参数 此函数在首次启动应用时调用一次 匹配所有保存设置
const getSetting = () => {
	var res = uni.getStorageSync("Setting");
	var setting = getApp().globalData.setting;
	//存储参数传递 设定多少个参数就进行多少个匹配
	console.log(res);
	var Arr = Object.keys(res);
	for (var i = 0; i < Arr.length; i++) {
		console.log("匹配参数...\"" + setting[Arr[i]] + "\"=>\"" + res[Arr[i]] + "\"");
		setting[Arr[i]] = res[Arr[i]];
		console.log("匹配参数完成...\"" + Arr[i] + "\":\"" + setting[Arr[i]] + "\"");
	}
	//protype setting.isNight=res.isNight;
	return setting;
}
// 读取json
const setUser = () => {
	var user = getApp().globalData.user;
	uni.setStorageSync("User", user);
	console.log("已同步保存用户信息到本地:");
	console.log(user);
}
const getUser = () => {
	var res = uni.getStorageSync("User");
	var user = getApp().globalData.user;
	//存储参数传递 设定多少个参数就进行多少个匹配
	console.log(res);
	//未登录
	if (!res.isLogin) {
		user.isLogin=false;
		user.username="未登录";
		console.log("未登录");
	} else {
		//已登录 匹配所有信息
		var Arr = Object.keys(res);
		for (var i = 0; i < Arr.length; i++) {
			console.log("匹配参数...\"" + user[Arr[i]] + "\"=>\"" + res[Arr[i]] + "\"");
			user[Arr[i]] = res[Arr[i]];
			console.log("匹配参数完成...\"" + Arr[i] + "\":\"" + user[Arr[i]] + "\"");
		}
	}
	//protype user.isNight=res.isNight;
	return user;
}
Vue.prototype.$api = {
	DF,
	setSetting,
	getSetting,
	getUser,
	setUser
};
