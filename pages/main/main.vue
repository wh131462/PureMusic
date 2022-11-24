<template>
	<view class="content">
		<uniNavbar title="音乐" :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'" :color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false"
			@clickLeft="isSetting=!isSetting" @clickRight="SearchMusic">
			<view slot="left" class="navBarIcon">
				<image
					:src="setting.isNight?'../../static/Icon/settingList_white.png':'../../static/Icon/settingList_black.png'"
					mode="aspectFit"></image>
			</view>
			<view slot="right" class="navBarIcon">
				<image :src="setting.isNight?'../../static/Icon/search_white.png':'../../static/Icon/search_black.png'"
					mode="aspectFit"></image>
			</view>
		</uniNavbar>
		<!-- 设置面板 -->
		<view :class="setting.isNight?'setting-night':'setting'" v-if="isSetting" :style="settingStyle">
			<scroll-view scroll-y="true" :style="settingScrollStyle">
				<view class="setting-user">
					<image :class="setting.isNight?'setting-user-background-night':'setting-user-background'"
						src="../../static/Image/background1.jpg" mode="aspectFill"></image>
					<image class="setting-user-headpic"
						:src="user.headpic?user.headpic:'../../static/Image/background3.png'" mode="aspectFill"
						@click="user.isLogin?NavToPage('detail'):NavToPage('login')"></image>
					<text class="setting-user-name">{{user.username}}</text>
				</view>
				<view :class="setting.isNight?'setting-div-night':'setting-div'">
					<view class="btn" @click="SearchMusic()"><text>扫描本地音乐</text></view>
					<view class="btn" @click="ShowMusicList()"><text>显示音乐列表</text></view>
					<view class="btn" @click="ClearMusicList()"><text>清理缓存</text></view>
				</view>
				<view :class="setting.isNight?'setting-div-night':'setting-div'">
					<view class="btn" @click="SortMusicList()"><text>音乐排序</text></view>
					<view class="btn"><text>夜间模式</text>
						<switch color="#bfbfbf" :checked="setting.isNight" @change="SunOrNight()" />
					</view>
					<view class="btn" @click="Test()"><text>测试</text></view>
				</view>
				<view :class="setting.isNight?'setting-div-night':'setting-div'">
					<view class="btn" @click="SettingMore()"><text>更多</text></view>
				</view>
				<view :class="setting.isNight?'setting-div-night':'setting-div'">
					<view class="btn" @click="AppRestart()()"><text>重启应用</text></view>
					<view class="btn" @click="AppQuit()"><text>退出</text></view>
				</view>

			</scroll-view>

			<!-- 空白区域 点击就退出 -->

		</view>
		<view class="settiing-other" v-if="isSetting" @click="isSetting=!isSetting"></view>
		<!-- 背景 -->
		<view :class="setting.isNight?'Background-night':'Background'">
			<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
		</view>
		<!-- 播放器控制面板 -->
		<view class="player" :class="setting.isNight?'player-night':'player'">
			<image class="player_main" :src="music.cover?music.cover:setting.isNight?'../../static/Icon/music_white.png':playerCover" mode="aspectFill"
				@click="ToMusicDetail()">
			</image>
			<view class="player_infos">
				<view class="player-info">
					<text class="title" :style="ScrollText">{{music.name?music.name:"未播放歌曲"}}</text>
					<text class="time" :style="setting.isNight?'background-color:#2c2c2c;':'background-color:#FFF;'">{{playerTime}}</text>
				</view>
				<view class="prograss">
					<movable-area class="prograss_background" id="prograssBg">
						<view class="prograss_point" :style="playerPrograss"></view>
						<movable-view direction="horizontal" :x="x" damping="100000" friction="0" animation="false"
							@change="PlayerSeek" id="point"></movable-view>
					</movable-area>
				</view>
			</view>
			<view class="player_btn">
				<image v-if="!isPlaying" :src="setting.isNight?'../../static/Icon/playMain_white.png':'../../static/Icon/playMain_black.png'" mode="aspectFill"
					@click="PlayerPlay()"></image>
				<image v-else @click="PlayerPause()" :src="setting.isNight?'../../static/Icon/pause_white.png':'../../static/Icon/pause_black.png'" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 音乐播放列表 -->
		<scroll-view v-if="musicList[0]" class="musicList" scroll-y="true" :style="musicListStyle">
			<view :class="[isPlaying&&item.mid==music.mid?'music-item music-item-play':'music-item']"
				v-for="(item,index) in musicList" :key="index">
				<view class="music-item-info" @click="PlayerPlay(index)">
					<text class="info-title">{{item.name}}</text>
					<text class="info-author">{{item.author}}-{{item.album}}</text>
				</view>
				<view class="music-item-control">
					<image src="../../static/Icon/more_white.png" mode="aspectFit" @click="ShowMore(index)"></image>
				</view>
			</view>
			<text v-show="musicList!=[]" id="musicListButtom">已经到底了~</text>
		</scroll-view>
		<text v-else
			style="display:block;width: 100%;height: 50px;line-height: 50px;text-align: center;color: #FFFFFF;">暂无歌曲	</text>
		<!-- 详细操作列表 -->
		<view v-if="isMore" class="more" :class="setting.isNight?'more-night':'more'">
			<view class="more-info">
				<image :src="musicList[moreIndex].cover" mode="aspectFill"></image>
				<text>{{musicList[moreIndex].name}}</text>
			</view>
			<view class="more-btn">
				<image src="../../static/Icon/next_black.png" mode="aspectFill"></image><text>下一首播放</text>
			</view>
			<view class="more-btn">
				<image src="../../static/Icon/add_black.png" mode="aspectFill"></image><text>加入播放列表</text>
			</view>
			<view class="more-btn">
				<image src="../../static/Icon/add_black.png" mode="aspectFill"></image><text>加入歌单</text>
			</view>
			<view class="more-btn"
				@click="ShowDialog('提示','是否要将此歌曲从列表中删除?此操作不会删除本地文件。','确定','取消',deleteMusicItem,null,moreIndex,null)">
				<image src="../../static/Icon/add_black.png" mode="aspectFill"></image><text>删除此歌曲</text>
			</view>
			<view class="more-btn">
				<image src="../../static/Icon/add_black.png" mode="aspectFill"></image><text>查看详情</text>
			</view>
		</view>
		<view v-if="isMore" class="more-other" @click="isMore=!isMore">
			&nbsp;
		</view>
		<!-- 模态框 -->
		<view v-if="isDialog" class="dialog">
			<view class="dialog-title">
				<text>{{dialogTitle}}</text>
			</view>
			<view class="dialog-content">
				<text>{{dialogContent}}</text>
			</view>
			<view class="dialog-btns">
				<view class="dialog-btn" @click="doSureCallback()">
					<text>{{dialogBtnSure}}</text>
				</view>
				<view class="dialog-btn" @click="doCancelCallback()">
					<text>{{dialogBtnCancel}}</text>
				</view>
			</view>
		</view>
		<view v-if="isDialog" class="dialog-other">
			&nbsp;
		</view>
		<!-- 音乐详情页 -->
		<view v-if="isDetail" class="music-detail" :style="musicDetailStyle">
			<!-- detail nav -->
			<uniNavbar title="音乐详情" :backgroundColor="setting.isNight?'#111':'rgba(255,255,255,0.1)'" :color="setting.isNight?'#FFF':'#000'" fixed="true" status-bar="false"
				@clickLeft="isDetail=false" style="margin-top:-30px;z-index: 1001;">
				<view slot="left" class="navBarIcon">
					<image :src="setting.isNight?'../../static/Icon/back_white.png':'../../static/Icon/back_black.png'" mode="aspectFit"></image>
				</view>
			</uniNavbar>
			<!-- 详情背景 -->
			<view :class="setting.isNight?'detail-background-night':'detail-background'">
				<image :src="setting.backgroundSrc" :style="setting.backgroundStyle" mode="aspectFill"></image>
			</view>
			<!-- detail volume -->
			<view class="detail-volume">
				<image v-if="vol==0" src="../../static/Icon/mute_white.png" mode="aspectFit"></image>
				<image v-else src="../../static/Icon/volume_white.png" mode="aspectFit"></image>
				<slider :value="vol" min="0" max="1" step="0.01" @changing="VolumeChange" activeColor="#FFF"
					backgroundColor="rgba(255,255,255,0.3)" block-color="#FFF" block-size="8" />
			</view>
			<!-- detail info -->
			<view class="detail-info">
				<view class="cover">
					<image :src="music.cover" mode="aspectFill"></image>
				</view>
				<view class="info">
					<text class="detail-info-name">{{music.name}}</text>
					<text class="detail-info-author">{{music.author}}</text>
				</view>
			</view>
			<!-- detail controls -->
			<view class="detail-controls">
				<!-- 按钮集合 -->
				<view class="controls-btns">

				</view>
				<!-- 进度条 -->
				<view class="controls-prograss">
					<text class="controls-prograss-text">{{detailNowTime}}</text>
					<movable-area class="controls-prograss-background" id="detailPrograssBg">
						<view class="controls-prograss-point" :style="playerPrograss"></view>
						<movable-view direction="horizontal" :x="dx" damping="100000" friction="0" animation="false"
							@change="PlayerSeekInDetail" id="detailPrograssPoint"></movable-view>
					</movable-area>
					<text class="controls-prograss-text">{{detailDuration}}</text>
				</view>
				<!-- 按钮合集  -->
				<view class="controls-btns">
					<!-- PlayMode :order random sololoop -->
					<image v-if="playMode=='order'" @click="ChangeMode('random')"
						src="../../static/Icon/order_white.png" mode="aspectFit"></image>
					<image v-else-if="playMode=='random'" @click="ChangeMode('sololoop')"
						src="../../static/Icon/random_white.png" mode="aspectFit"></image>
					<image v-else @click="ChangeMode('order')" src="../../static/Icon/sololoop_white.png"
						mode="aspectFit"></image>
					<!-- end -->
					<!-- Play btns :pre play pause next -->
					<image @click="preMuisc()" src="../../static/Icon/pre_white.png" mode="aspectFit"></image>
					<image v-if="!isPlaying" @click="PlayerPlay()" src="../../static/Icon/play_white.png"
						mode="aspectFit"></image>
					<image v-else @click="PlayerPause()" src="../../static/Icon/pause1_white.png" mode="aspectFit">
					</image>
					<image @click="nextMusic()" src="../../static/Icon/next_white.png" mode="aspectFit"></image>
					<!-- PlayList -->
					<image src="../../static/Icon/playlist_white.png" mode="aspectFit"></image>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//全局开关变量
				isSetting: false,
				isPlaying: false,
				isDetail: false,
				isMore: false, //更多操作
				isDialog: false, //模态框
				isQuit: false,
				isNight: false, //夜间模式
				//样式控制变量
				musicListStyle: "", //设置高度
				settingStyle: "", //设置高度
				settingScrollStyle: "", //设置高度
				musicDetailStyle: "", //设置高度
				ScrollText: "", //设置触发动画
				//可用数据
				musicList: [],//歌曲列表
				playList: [], //播放列表
				//more
				moreIndex: 0, //查看更多的序号
				//dialog
				dialogTitle: "提示",
				dialogContent: "这里是一段测试内容，长度为短。",
				dialogBtnSure: "确定",
				dialogBtnCancel: "取消",
				dialogSureCallback: {},
				dialogCancelCallback: {},
				dialogSureParam: "",
				dialogCancelParam: "",
				// Setting
				setting: {}, //设置信息
				user: {}, //用户信息
				//Player
				Player: {}, //player对象
				//默认参数
				playerCover: "../../static/Icon/music_black.png", //音乐封面图
				playerInfo: "未播放歌曲",
				playerSrc: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
				music: {}, //歌曲对象
				playerTime: "0:00/3:00",
				playerPrograss: "", //进度条宽度style
				x: "",
				len: "",
				playerTimeInterval: {},
				// Detail
				vol: 1,//音量
				dx: "",
				dlen: "",
				detailNowTime: "",
				detailDuration: "",
				playMode: "order" //order.random.sololoop
			}
		},
		computed: {

		},
		watch: {
			setting: {
				immediate: true,
				handler(n, o) {
					console.log("数据变化", o, n);
					if (n.isNight) {
						// 夜间模式开启
						//tabbar
						uni.setTabBarStyle({
							color: '#8d8d8d',
							selectedColor: '#eeeeee',
							backgroundColor: '#111'
						});
						//修改tabbar icon
						uni.setTabBarItem({
							index: 0,
							iconPath: "static/Icon/musicIcon_white.png",
							selectedIconPath: "static/Icon/musicIcon_white.png"
						})
						uni.setTabBarItem({
							index: 1,
							iconPath: "static/Icon/my_white.png",
							selectedIconPath: "static/Icon/my_white.png"
						})
						console.log("夜间模式开启");
					} else {
						//tabbar
						uni.setTabBarStyle({
							color: "#b0b0b0",
							selectedColor: "#00104a",
							backgroundColor: "rgba(255,255,255,0.5)"
							
						});
						//修改tabbar icon
						uni.setTabBarItem({
							index: 0,
							iconPath: "static/Icon/musicIcon_black.png",
							selectedIconPath: "static/Icon/musicIcon_black.png"
						})
						uni.setTabBarItem({
							index: 1,
							iconPath: "static/Icon/my_black.png",
							selectedIconPath: "static/Icon/my_black.png"
						})
						console.log("日间模式开启");
					}
				},
				deep: true
			},
			isDetail:{
				handler(n,o){
					if(n){
						//隐藏tabbar
						uni.hideTabBar({animation:true});
					}else{
						uni.showTabBar();
					}
				}
			}
		},
		onLoad() {
			//开始要初始化 一些参数
			var _this = this;
			//应用首次运行触发获取本地存储参数
			getApp().globalData.setting = this.$api.getSetting();
			getApp().globalData.user = this.$api.getUser();
			//绑定全局数据
			_this.setting = getApp().globalData.setting;
			_this.user = getApp().globalData.user;

			uni.getSystemInfo({
				success(res) {
					//分别为setting/list/detail设置高度
					console.log(res.navigationBarHeight + " " + res.statusBarHeight + " " + res.windowHeight +
						" " + res.screenHeight + " " + res.titleBarHeight);
					_this.musicListStyle = "height:" + (res.windowHeight - res.statusBarHeight - 50) + "px";
					_this.settingStyle = "height:" + (res.screenHeight + 50) + "px;" + "padding-top:" + res
						.statusBarHeight + "px;";
					_this.settingScrollStyle = "height:" + (res.windowHeight - res.statusBarHeight) + "px;" +
						"padding-bottom:" + res.statusBarHeight + "px;";
					_this.musicDetailStyle = "height:" + (res.screenHeight + 50) + "px;" + "padding-top:" + res
						.statusBarHeight + "px;";

				},
				fail(err) {
					console.log("失败");
				},
				complete(fianl) {
					console.log("已完成");
				}
			});
			// 创建Player
			this.CreatePlayer();
			//文件系统_WWW目录 plus.io.PRIVATE_WWW;
			_this.LoadMusicList();

			this.njsNotificationForAndroid({
				title: 'PureMusic',
				content: '音乐播放器',
				isOngoing: true
			});
		},
		onReady() {
			var _this = this;
			//获取进度条的信息
			this.GetPrograssLen();
			//播放时间进度
			setTimeout(() => {
				_this.PlayerGetTime();
			}, 100);
			//全局函数测试
			//this.$api.DF("https://131462.wang/");
		},
		methods: {
			//Player Methods
			CreatePlayer() {
				var _this = this;
				this.Player = uni.createInnerAudioContext(); //uni.getBackgroundAudioManager();
				this.Player.autoplay = false;
				this.Player.src = this.music != null ? this.music.src : this.playerSrc;

				//原生函数自定义
				this.Player.onPlay(() => {
					console.log('Player playing...');
					if (_this.playerTimeInterval) {
						clearInterval(_this.playerTimeInterval);
					}
					this.playerTimeInterval = setInterval(() => {
						_this.PlayerGetTime()
					}, 500);
					_this.isPlaying = true;
				});
				this.Player.onPause(function() {
					console.log("Player paused...");
					if (_this.playerTimeInterval) {
						clearInterval(_this.playerTimeInterval);
					}
				});
				this.Player.onSeeking(function() {
					_this.Player.volume = 0;
					//滑动时校准 
					var percent=_this.x/_this.len*100;
					_this.playerPrograss = "width:" + percent + "%";
					console.log("Seeking...");
				});
				this.Player.onSeeked(function() {
					_this.Player.volume = 1;
					console.log("Seeked...");
				});
				this.Player.onStop(function() {
					console.log("Player stop.");
					_this.isPlaying = false;
				});
				this.Player.onEnded(function() {
					console.log("Player end.");
					if (_this.playerTimeInterval) {
						clearInterval(_this.playerTimeInterval);
					}
					_this.isPlaying = false;
					// 开始切歌
					switch (_this.playMode) {
						case "order":
							_this.Player.loop = false;
							_this.nextMusic();
							break;
						case "random":
							_this.Player.loop = false;
							_this.nextMusic();
							break;
						case "sololoop":
							_this.Player.loop = true;
							break;
					}
				});
				this.Player.onError((res) => {
					_this.isPlaying = false;
					console.log("Player Err:" + res.errMsg + " ErrCode:" + res.errCode);
				});
				console.log("Player initialized.");
			},
			PlayerPlay(index = null) {
				if (index != null) {
					this.music = this.musicList[index];
					this.Player.src = this.musicList[index].src;
					this.Player.stop();
				}
				this.ScrollText = "display:none;";
				setTimeout(() => {
					this.ScrollText = "";
				}, 100)
				this.Player.play();
				this.isPlaying = true;
			},
			PlayerPause() {
				this.Player.pause();
				this.isPlaying = false;
			},
			PlayerGetTime() {
				// 控制时间显示和进度条
				var _this = this;
				var percent = _this.Player.currentTime / _this.Player.duration * 100;
				_this.playerPrograss = "width:" + percent + "%";
				_this.x = _this.len * percent / 100;
				_this.dx = _this.dlen * percent / 100;
				//console.log(_this.dx);
				_this.detailNowTime = _this.ConvertTime(_this.Player.currentTime);
				_this.detailDuration = _this.ConvertTime(_this.Player.duration);
				_this.playerTime = _this.ConvertTime(_this.Player.currentTime) + "/" + _this.ConvertTime(_this.Player
					.duration);
				//console.log(_this.playerTime);
			},
			ConvertTime(duration) {
				var seconds = parseInt(duration % 60);
				var minutes = parseInt(duration % (60 * 60) / 60);
				var hours = parseInt(duration / (60 * 60));
				return hours == 0 ? minutes + ":" + (seconds < 10 ? "0" + seconds : seconds) : (minutes < 10 ? "0" +
					minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
			},
			GetPrograssLen() {
				var _this = this;
				// 获取首页进度条元素长度
				uni.createSelectorQuery().in(this).select("#prograssBg").boundingClientRect(data => {
					_this.len = parseInt(data.width);

				}).exec();
				console.log("获取到元素长度：" + _this.len);
				return _this.len;
			},
			PlayerSeek(e) {
				if (e.detail.source == "") {
					return;
				}
				var _this = this;
				var len = this.len; //长度
				var chip = e.detail.x; //切片长度
				var percent = chip / len * 100; //百分比
				_this.PlayerGetTime();
				_this.Player.seek(_this.Player.duration * percent / 100);
				//console.log(e.detail);
			},
			PlayerSeekInDetail(e) {
				if (e.detail.source == "") {
					return;
				}
				var _this = this;
				if (!_this.dlen) {
					// 获取详情页进度条元素长度
					uni.createSelectorQuery().in(this).select("#detailPrograssBg").boundingClientRect(data => {
						_this.dlen = parseInt(data.width);

					}).exec();
					console.log("dlen:" + _this.dlen);
				}

				var len = this.dlen; //长度
				var chip = e.detail.x; //切片长度
				var percent = chip / len * 100; //百分比
				_this.PlayerGetTime();
				_this.Player.seek(_this.Player.duration * percent / 100);
			},
			ToMusicDetail() {
				if (!this.music.cover) {
					return;
				}
				// 展示详情页
				this.isDetail = true;
				//更新dlen
				var _this = this;
				setTimeout(() => {
					uni.createSelectorQuery().in(this).select("#detailPrograssBg").boundingClientRect(data => {
						_this.dlen = parseInt(data.width);

					}).exec();
				}, 50);

			},
			VolumeChange(e) {
				console.log(e.detail.value);
				this.vol = e.detail.value;
				//获取系统音量为plus.device.getVolume();
				//设置系统音量为plus.device.setVolume(this.vol);
				this.Player.volume = this.vol;
				console.log(this.vol);
			},
			ChangeMode(mode) {
				this.playMode = mode;
			},
			preMuisc() {
				var len = this.musicList.length;
				var mode = this.playMode;
				console.log("Pre music." + this.playMode + len);
				switch (mode) {
					case "order":
						for (var i = 0; i < this.musicList.length; i++) {
							if (this.musicList[i].mid == this.music.mid) {
								var pre = i != 0 ? (--i) : (len - 1);
								this.music = this.musicList[pre];
								this.Player.src = this.musicList[pre].src;
								console.log(pre);
								break;
							}
						}
						break;
					case "random":
						var random = Math.floor(Math.random() * len);
						this.music = this.musicList[random];
						this.Player.src = this.musicList[random].src;
						console.log(random);
						break;
				}
				this.Player.stop();
				this.Player.play();
			},
			nextMusic() {
				console.log("Next music." + this.playMode);
				var len = this.musicList.length;
				var mode = this.playMode;
				switch (mode) {
					case "order":
						for (var i = 0; i < this.musicList.length; i++) {
							if (this.musicList[i].mid == this.music.mid) {
								var next = i != len - 1 ? ++i : 0;
								this.music = this.musicList[next];
								this.Player.src = this.musicList[next].src;
								console.log(next);
								break;
							}
						}
						break;
					case "random":
						var random = Math.floor(Math.random() * len);
						this.music = this.musicList[random];
						this.Player.src = this.musicList[random].src;
						console.log(random);
						break;
				}
				this.Player.stop();
				this.Player.play();
			},
			// 音乐列表操作
			ShowMusicList() {
				console.log(this.musicList);
			},
			SortMusicList() {
				//对音乐进行排序
				this.musicList.sort(function(a, b) {
					return a.name.localeCompare(b.name);
				});
				console.log("整理完毕:");
				console.log(this.musicList);
			},
			//通过数据库获取封面图  建议使用GetCover使用MP3获取png
			getCover(album) {
				//通过Media数据库查询 Android10以前可用 
				var main = plus.android.runtimeMainActivity();
				var MediaStore = plus.android.importClass("android.provider.MediaStore");
				plus.android.importClass(main.getContentResolver());
				let cursorAlbum = main.getContentResolver().query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI, [MediaStore
					.Audio.Albums.ALBUM_ART
				], MediaStore.Audio.Albums.ALBUM + "=?", [album], null);
				plus.android.importClass(cursorAlbum);
				var cover;
				if (cursorAlbum != null && cursorAlbum.moveToFirst()) {
					cover = cursorAlbum.getString(cursorAlbum.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART));
					console.log("获取到封面" + cover);
					cursorAlbum.close();
				}
				return cover;
			},
			/*
			getCoverById(albumid) {
				//同上  通过id查询
				var main = plus.android.runtimeMainActivity();
				var MediaStore = plus.android.importClass("android.provider.MediaStore");
				plus.android.importClass(main.getContentResolver());
				let cursorAlbum = main.getContentResolver().query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI, [MediaStore
					.Audio.Albums._ID, MediaStore.Audio.Albums.ALBUM_ART
				], MediaStore.Audio.Albums._ID + "=?", [albumid], null);
				plus.android.importClass(cursorAlbum);
				var cover;
				if (cursorAlbum != null && cursorAlbum.moveToFirst()) {
					cover = cursorAlbum.getString(cursorAlbum.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART));
					console.log("content://media/external/audio/albums/" + albumid);
					console.log("获取到封面" + cover);
					cursorAlbum.close();
				}
				return cover;
			},*/
			LoadMusicList() {
				//加载音乐列表 目录列表 now
				var _this = this;
				uni.getStorage({
					key: "MusicList",
					success: res => {
						this.musicList = res.data;
						console.log(res.data);
					}
				});
			
			},
			SaveMusicList() {
				this.SortMusicList();
				//存储文件列表
				uni.setStorageSync("MusicList", this.musicList);
			},
			ClearMusicList() {
				//直接清理所有
				uni.clearStorageSync();
			},
			deleteMusicItem(index) {
				this.musicList.splice(index, 1);
				//因为必然是从more界面调用的删除 所以 要进行一次关闭
				this.isMore = false;
				uni.setStorageSync("MusicList", this.musicList);
			},
			GetCover(music){
				//通过音乐文件获取bitmap 再转png 版本通用 返回数据为图片保存地址
				var _this = this;
				const main = plus.android.runtimeMainActivity();
				const Context = plus.android.importClass('android.content.Context');
				var MediaMetadataRetriever = plus.android.importClass('android.media.MediaMetadataRetriever');
				var Bitmap = plus.android.importClass('android.graphics.Bitmap');
				var BitmapFactory = plus.android.importClass('android.graphics.BitmapFactory');
				
				var url = music.src; //音乐地址
				var mediaMetadataRetriever = new MediaMetadataRetriever();
				mediaMetadataRetriever.setDataSource(url);
				var pic = mediaMetadataRetriever.getEmbeddedPicture();//转化EmbeddedPicture Byte[]类型
				if(!pic){return ""}//无法获取 直接返回空
				var bim = BitmapFactory.decodeByteArray(pic, 0, pic.length);//转到Bitmap
				//将图片保存本地 引入Java类
				var File = plus.android.importClass('java.io.File');
				var FileOutputStream = plus.android.importClass('java.io.FileOutputStream');
				
				//保存到私有目录
				var dir=plus.io.convertLocalFileSystemURL("_doc/");
				var f = new File(dir, music.name + ".png");
				var albumSrc=dir+music.name + ".png";
				if (f.exists()) {//存在就删除
					f.delete();
				}
				var out = new FileOutputStream(f);
				//压制图片为png格式
				bim.compress(Bitmap.CompressFormat.PNG, 100, out);
				out.flush();
				out.close();
				console.log("已经保存",albumSrc);
				
				return albumSrc;
			},
			SearchMusic() {
				//通过调用文件系统选择音乐文件来确定文件夹 
				var _this = this;
				var main = plus.android.runtimeMainActivity();
				if (plus.os.name == 'Android') {
					var Build = plus.android.importClass('android.os.Build');
					//Android系统版本大于等于10 Build.VERSION.SDK_INT>=29
					//直接通过MediaStore查询所有音乐
					var MediaStore = plus.android.importClass("android.provider.MediaStore");
					plus.android.importClass(main.getContentResolver());
					let cursor = main.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, [MediaStore
						.Audio.Media.TITLE, MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.ARTIST, MediaStore
						.Audio.Media.YEAR, MediaStore.Audio.Media.DATA, MediaStore.Audio.Media.DURATION, MediaStore
						.Audio.Media.ALBUM_ID
					], null, null, MediaStore.Audio.Media.DEFAULT_SORT_ORDER);
					plus.android.importClass(cursor);
					var data = [];
					cursor.moveToFirst()
					if (cursor != null) {
						while (cursor.moveToNext()) {
							data["title"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE));
							data["album"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM));
							data["artist"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST));
							data["year"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.YEAR));
							data["src"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
							data["duration"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION));
							data["albumId"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID));
							if (_this.isExistMusic(data["src"])) {
								console.log(data["title"] + "已存在");
								continue;
							}
							if (parseInt(data["duration"]) < 30000 || data["duration"] == null) {
								console.log(data["title"] + " duration:" + data["duration"]);
								continue;
							}
							
							//插入musicList
							var obj = {
								"mid": _this.id++,
								"cover": "",
								"name": data["title"],
								"author": data["artist"],
								"album": data["album"],
								"albumId": data["albumId"],
								"year": data["year"],
								"duration": data["duration"],
								"src": data["src"],
								"lrc": ""
							};
							
							//生成封面
							var coverByFile=_this.GetCover(obj);
							var coverByMedia=_this.getCover(obj.album);
							obj.cover=coverByFile?coverByFile:coverByMedia?coverByMedia:"../../static/Image/cover.png";
							console.log(obj);
							_this.musicList.push(obj);
						}
						//结束
						cursor.close();
					}
				}
				this.SaveMusicList();
				console.log("扫描本地音乐执行完毕.");
			},
			isExistMusic(path) {
				//如果此音乐已经在列表中 就返回true
				for (var i = 0; i < this.musicList.length; i++) {
					if (this.musicList[i].src == path) {
						return true;
					}
				}
				return false;
			},
			GetAudioInfo(path) {
				//根据文件地址获取音频所有信息  Android低版本
				var _this = this;
				var main = plus.android.runtimeMainActivity();
				var MediaStore = plus.android.importClass("android.provider.MediaStore");
				plus.android.importClass(main.getContentResolver());
				let cursor = main.getContentResolver().query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, [MediaStore.Audio
					.Media.TITLE, MediaStore.Audio.Media.ALBUM, MediaStore.Audio.Media.ARTIST, MediaStore.Audio
					.Media.YEAR, MediaStore.Audio.Media.DURATION
				], MediaStore.Audio.Media.DATA + "=?", [path], MediaStore.Audio.Media.DEFAULT_SORT_ORDER);
				plus.android.importClass(cursor);
				var data = [];
				var album;
				if (cursor != null && cursor.moveToFirst()) {

					data["title"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.TITLE));
					data["album"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM));
					data["artist"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST));
					data["year"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.YEAR));
					data["src"] = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
					album = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ALBUM));
					cursor.close();
				}
				let cursorAlbum = main.getContentResolver().query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI, [MediaStore
					.Audio.Albums.ALBUM_ART
				], MediaStore.Audio.Albums.ALBUM + "=?", [album], null);
				plus.android.importClass(cursorAlbum);
				if (cursorAlbum != null && cursorAlbum.moveToFirst()) {

					var albumCoverPath = cursorAlbum.getString(cursorAlbum.getColumnIndex(MediaStore.Audio.Albums
						.ALBUM_ART));
					data["cover"] = albumCoverPath;
					console.log("获取到封面" + albumCoverPath);
					cursorAlbum.close();
				}
				return data;
			},
			//Setting
			Test() {
				// this.setting.isTest=true;
				// this.$api.setSetting();
				/* JAVA CODE   *
				     * 加载封面
				     * @param mediaUri MP3文件路径
				     *
				    private void loadingCover(String mediaUri) {
				        MediaMetadataRetriever mediaMetadataRetriever=new MediaMetadataRetriever();
				        mediaMetadataRetriever.setDataSource(mediaUri);
				        byte[] picture = mediaMetadataRetriever.getEmbeddedPicture();
				        Bitmap bitmap= BitmapFactory.decodeByteArray(picture,0,picture.length);
				        musicCover.setImageBitmap(bitmap);
				}*/
				// Test Js
				var _this = this;
				const main = plus.android.runtimeMainActivity();
				const Context = plus.android.importClass('android.content.Context');
				var MediaMetadataRetriever = plus.android.importClass('android.media.MediaMetadataRetriever');
				var Bitmap = plus.android.importClass('android.graphics.Bitmap');
				var BitmapFactory = plus.android.importClass('android.graphics.BitmapFactory');
				
				var url = _this.music.src; //音乐地址
				var mediaMetadataRetriever = new MediaMetadataRetriever();
				mediaMetadataRetriever.setDataSource(url);
				var pic = mediaMetadataRetriever.getEmbeddedPicture();//转化EmbeddedPicture Byte[]类型
				
				if(!pic){console.log("无法获取");
					return ""}//无法获取 直接返回空
				var bim = BitmapFactory.decodeByteArray(pic, 0, pic.length);//转到Bitmap
				//将图片保存本地 引入Java类
				var File = plus.android.importClass('java.io.File');
				var FileOutputStream = plus.android.importClass('java.io.FileOutputStream');
				
				//保存到私有目录
				var dir=plus.io.convertLocalFileSystemURL("_doc/");
				var f = new File(dir, _this.music.name + ".png");
				var albumSrc=dir+_this.music.name + ".png";
				if (f.exists()) {//存在就删除
					f.delete();
				}
				var out = new FileOutputStream(f);
				//压制图片为png格式
				bim.compress(Bitmap.CompressFormat.PNG, 100, out);
				out.flush();
				out.close();
				console.log("测试完成",albumSrc);
				
				
			},
			SunOrNight() {
				//设置夜间模式 
				this.setting.isNight = !this.setting.isNight;
				this.$api.setSetting();
			},
			// More操作
			ShowMore(index) {
				this.isMore = !this.isMore;
				this.moreIndex = index;
			},
			//dialog操作
			ShowDialog(title, content, sure, cancel, sureCallback, cancelCallback, sureparam, cancelparam) {
				this.isDialog = true;
				this.dialogTitle = title;
				this.dialogContent = content;
				this.dialogBtnSure = sure;
				this.dialogBtnCancel = cancel;
				//回调函数调用
				this.dialogSureCallback = sureCallback;
				this.dialogCancelCallback = cancelCallback;
				this.dialogSureParam = sureparam;
				this.dialogCancelParam = cancelparam;
			},
			doSureCallback() {
				if (this.dialogSureCallback != null) {
					//执行然后清空
					this.dialogSureCallback(this.dialogSureParam);
					this.dialogSureCallback = null;
				}
				this.isDialog = false;
			},
			doCancelCallback() {
				if (this.dialogCancelCallback != null) {
					this.dialogCancelCallback(this.dialogCancelParam);
					this.dialogCancelCallback = null;
				}
				this.isDialog = false;
			},
			// 应用函数
			SettingMore() {
				//跳到设置页面
				this.NavToPage("setting");
			},
			NavToPage(page) {
				//跳转
				uni.navigateTo({
					url: '../' + page + '/' + page,
					animationDuration: 300,
					animationType: "slide-in-right"
				})
			},
			AppQuit() {
				//应用退出
				plus.runtime.quit();
			},
			AppRestart(){
				plus.runtime.restart();
			},
			//音乐通知栏常驻
			MusicNotification() {
				plus.android.importClass('android.app.Notification');
			},
			//通知栏
			njsNotificationForAndroid({
				title = '标题',
				content = '描述',
				isOngoing = true
			}) {
				if (uni.getSystemInfoSync().platform == "android") {
					console.log('准备调起常驻通知栏');
					const main = plus.android.runtimeMainActivity();
					const Context = plus.android.importClass('android.content.Context');
					const Notification = plus.android.importClass('android.app.Notification');

					const RemoteViews = plus.android.importClass('android.widget.RemoteViews');
					const View = plus.android.importClass('android.view.View');
					const log = plus.android.importClass('android.util.Log');
					const Toast = plus.android.importClass('android.widget.Toast');

					const mNotification = new Notification.Builder(main);
					const Intent = plus.android.importClass('android.content.Intent');
					const PendingIntent = plus.android.importClass('android.app.PendingIntent');
					const android_R = plus.android.importClass(
					'android.R'); // android.R：使用系统默认图标，可以把android改成实际项目的包名，则会使用项目的图标

					if (isOngoing) mNotification.setOngoing(true); // 这个如果被注释掉，则允许滑动删除
					mNotification.setContentTitle(title);
					mNotification.setContentText(content);
					mNotification.setSmallIcon(android_R.drawable
					.ic_notification_overlay); // 需要在原生项目的drawable目录下添加ic_notification_overlay.png
					mNotification.setTicker(content); // 无障碍
					mNotification.setContentIntent(PendingIntent.getActivity(main, 0, new Intent(main, main.getClass()),
						PendingIntent.FLAG_CANCEL_CURRENT));
					main.getSystemService(Context.NOTIFICATION_SERVICE).notify(1, mNotification.build());

				}

			}
			//Methods end
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			console.log("下拉刷新");
		},
		onBackPress(e) {
			var _this = this;

			//退出 顺序执行所以要在提示信息之前
			if (_this.isQuit) {
				console.log("退出");
				_this.AppQuit();
			}
			//主界面
			if (!this.isDetail && !this.isSetting) {
				uni.showToast({
					icon: "none",
					duration: 1500,
					title: "再按一次退出！",
					position: "bottom",
					success() {
						_this.isQuit = true;
						setTimeout(() => {
							_this.isQuit = false;
							console.log("重置退出");
						}, 1500);
					}
				});
			}
			//在查看详情
			if (this.isDetail) {
				this.isDetail = false;
				console.log("返回上一页");
			}
			//在查看设置
			if (this.isSetting) {
				this.isSetting = false;
				console.log("返回上一页");
			}
			return true;
		},
		onUnload() {
			this.SaveMusicList();
			console.log("退出");
		}

	}
</script>

<style>
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

	/* setting */
	.setting {
		width: 80%;
		/* 样式 */
		background-color: #f4f4f4;
		/* 定位 */
		position: fixed;
		left: 0;
		top: var(--window-top);
		/* 比所有层级都高 */
		z-index: 1001;
		/* 动画 */
		animation: SettingMove 0.1s linear;
	}

	.setting-night {
		width: 80%;
		/* 样式 */
		background-color: #111;
		
		/* 定位 */
		position: fixed;
		left: 0;
		top: var(--window-top);
		/* 比所有层级都高 */
		z-index: 1001;
		/* 动画 */
		animation: SettingMove 0.1s linear;

	}

	/* 个人信息 */
	.setting-user {
		width: 100%;
		height: 200px;
		overflow: hidden;
		position: relative;
	}

	/* 个人信息背景 */
	.setting-user-background {
		display: block;
		width: 100%;
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		filter: blur(3px) brightness(100%);
	}

	.setting-user-background-night {
		display: none;
	}

	.setting-user-headpic {
		display: block;
		margin: 30px auto 5px;
		width: 100px;
		height: 100px;
		border-radius: 5px;
		z-index: 5;
	}

	.setting-user-name {
		display: block;
		width: 100%;
		position: relative;
		text-align: center;
		font-size: 1.1rem;
		background-image: linear-gradient(75deg, #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		background-image: -webkit-linear-gradient(75deg, #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		background-image: -moz-linear-gradient(75deg, #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		background-image: -ms-linear-gradient(75deg, #e90003, #d36200, #d2e900, #15d300, #00d3c5, #000ed3, #ff00a6);
		/* 渐变背景 */
		color: transparent;
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

	@-ms-keyframes rainbow {
		from {
			background-position: 0 0;
		}

		to {
			background-position: 1000px 0;
		}
	}

	@-webkit-keyframes rainbow {
		from {
			background-position: 0 0;
		}

		to {
			background-position: 1000px 0;
		}
	}

	@-moz-keyframes rainbow {
		from {
			background-position: 0 0;
		}

		to {
			background-position: 1000px 0;
		}
	}

	/* 设置区块 */
	.setting-div {
		width: 95%;
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		overflow: hidden;
	}

	.setting-div-night {
		width: 95%;
		margin: 10px auto;
		background-color: #222;
		color: #FFF !important;
		border-radius: 10px;
		overflow: hidden;
	}

	/* 最后一个区块 */
	.setting-div:last-child {
		margin-bottom: 20px;
	}

	/* 区块内按钮 */
	.setting-div .btn,
	.setting-div-night .btn {
		border: solid rgba(0, 0, 0, 0.1) .1px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.setting-div .btn:active,
	.setting-div-night .btn:active {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.setting-div .btn text,
	.setting-div-night .btn text {
		margin-left: 10px;
	}

	/* 按钮内的开关 */
	.setting-div .btn switch,
	.setting-div-night .btn switch {
		position: absolute;
		right: 5px;
	}

	.settiing-other {
		width: 100%;
		height: 100%;
		/* 样式 */
		background-color: rgba(0, 0, 0, 0.3);
		/* 定位 */
		position: fixed;
		right: 0;
		top: 0;
		/* 比所有层级都高 比设置低*/
		z-index: 1000;
		/* 动画 */
		animation: SettingOther 0.1s linear;
	}

	@keyframes SettingMove {
		from {
			width: 0%;
		}

		to {
			width: 80%;
		}
	}

	@keyframes SettingOther {
		from {
			background-color: rgba(0, 0, 0, 0);
		}

		to {
			background-color: rgba(0, 0, 0, 0.3);
		}
	}

	/* 背景 */
	.Background {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.Background image {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		filter: blur(1px) brightness(80%);
	}

	/* player主类 */
	.player {
		/* 布局 */
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;

		margin: 0;
		padding: 0;
		/* 外观样式 */
		color: #000;
		background-color: #ffffff;
		box-shadow: #000000 1rpx 1rpx 5rpx;
		width: 100%;
		height: 50px;

		/* 底部tabbar的高度 */
		bottom: 0rpx;
		z-index: 999;
		position: fixed;
	}
	
	.player-night {
		/* 布局 */
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
	
		margin: 0;
		padding: 0;
		/* 外观样式 */
		color: #f8f8f8;
		background-color: #2c2c2c;
		box-shadow: #ffffff 1rpx 1rpx 5rpx;
		width: 100%;
		height: 50px;
	
		/* 底部tabbar的高度 */
		bottom: 0rpx;
		z-index: 999;
		position: fixed;
	}
	/* 音乐封面图 */
	.player_main {
		display: block;
		height: 50px;
		width: 50px;
		position: absolute;
		left: 0;
	}

	.player_infos {
		margin: 0 0 0 50px;
		padding-left: 10px;
		/* 封面占50px 播放按钮50px*/
		width: calc(100% - 100px);
		height: 50px;
	}

	.player-info {
		width: 100%;
		height: 25px;
		line-height: 25px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow: hidden;
		position: relative;
	}

	.player-info .title,
	.player-info .time {
		display: inline-block;
		padding: 0;
		margin: 5px 0 0 0;
		
		height: 25px;
		line-height: 25px;
	}

	/* 音乐信息 */
	.player-info .title {
		width: auto;
		font-size: 0.9rem;
		position: absolute;
		left: 0;
		animation-duration: 10s;
		animation-name: scrollText;
	}

	/* 音乐时间 */
	.player-info .time {
		z-index: 1000;
		position: absolute;
		right: 5px;
		padding-left: 8px;
	}

	@keyframes scrollText {
		0% {
			transform: translateX(0);
		}

		49% {
			opacity: 1;
			transform: translateX(-100%);
		}

		50% {
			opacity: 0;
			transform: translateX(-100%);

		}

		51% {
			opacity: 0;
			transform: translateX(100%);
		}

		55% {
			opacity: 1;
			transform: translateX(100%);
		}

		100% {
			transform: translateX(0);
		}
	}

	/* 进度条 */
	.player_infos .prograss {
		margin-left: -5px;
		width: 100%;
		height: 25px;
		line-height: 25px;
	}

	.player_infos .prograss .prograss_background {
		height: 2px;
		width: 100%;
		background-color: #b0b0b0;
		margin-top: 12.5px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.player_infos .prograss .prograss_point {
		height: 2px;
		background-color: #ff3e4b;
		position: relative;
	}

	.player_infos .prograss #point {
		display: inline-block;
		width: 8px;
		height: 8px;
		margin-left: -4px;
		margin-top: -4px;
		background-color: #FFF;
		border-radius: 50%;
		box-shadow: #000 1px 1px 3px;
		position: absolute;
	}

	.player_btn {
		display: block;
	}

	.player_btn image {
		display: inline-block;
		margin: 5px;
		height: 40px;
		width: 40px;
		position: absolute;
		right: 0;
	}

	/* 音乐列表 */
	.musicList {
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		flex-direction: column;
		align-content: flex-start;
		margin-top: var(--window-top);
		position: fixed;
		z-index: 1;
	}

	#musicListButtom {
		display: block;
		width: 100%;
		height: 30px;
		margin-top: 20px;
		padding-bottom: 50px;
		text-align: center;
		color: #FFF;
		font-size: 0.8rem;
	}

	.music-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		height: 50px;
		background-color: rgba(0, 0, 0, 0);
		box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 1px;
	}

	.music-item-play {
		background-color: rgba(255, 255, 255, 0.1) !important;
		box-shadow: rgba(0, 0, 255, 0.3) 0px 0px 1px !important;
	}

	.music-item-play .info-title,
	.music-item-play .info-author {
		color: #FFF;
		text-shadow: #ff4c4f 0px 1px 1px;
	}

	.music-item-info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: calc(100% - 50px);
		height: 100%;
	}

	/* 歌曲信息 名字 */
	.info-title {
		display: inline-block;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-indent: 1em;
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		/* 溢出省略 */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* 作者 */
	.info-author {
		display: inline-block;
		width: 100%;
		height: 20px;
		line-height: 20px;
		text-indent: 1.5em;
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.6);
		/* 溢出省略 */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.music-item-control {
		/* 水平居中 */
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 50px;
		color: #000;
	}

	.music-item-control image {
		display: block;
		margin: auto 0;
		height: 35rpx;
		width: 35rpx;
	}

	/* 更多操作 */
	.more-other {
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0px;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.3);
		/* 动画 */
		animation: intoMoreOther 0.2s linear;
	}
	
	.more {
		/* 基本属性 */
		width: 100%;
		/* 按钮45*n + 信息50*1 */
		height: 275px;
		position: fixed;
		bottom: 0px;
		z-index: 1000;
		/* 样式 */
		background-color: #FFF;
		border-radius: 10px;
		overflow: hidden;
		/* 动画 */
		animation: intoMore 0.2s linear;
		/* 布局 */
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	/* 夜间模式 */
	.more-night {
		/* 基本属性 */
		width: 100%;
		/* 按钮45*n + 信息50*1 */
		height: 275px;
		position: fixed;
		bottom: 0px;
		z-index: 1000;
		/* 样式 */
		color: #ebebeb;
		background-color: #111111;
		border-radius: 10px;
		overflow: hidden;
		/* 动画 */
		animation: intoMore 0.2s linear;
		/* 布局 */
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.more-info {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}

	.more-info image {
		display: inline-block;
		width: 40px;
		height: 40px;
		margin: 5px;
		border-radius: 5px;
	}

	.more-info text {
		width: calc(100% - 50px);
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.more-btn {
		display: block;
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border: rgba(0, 0, 0, 0.1) solid .1px;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}

	.more-btn:active {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.more-btn image {
		display: inline-block;
		width: 25px;
		height: 25px;
		margin: 10px;
	}

	.more-btn text {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	@keyframes intoMore {
		from {
			height: 0px;
		}

		to {
			height: 270px;
		}
	}

	@keyframes intoMoreOther {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	/* dialog 模态框*/
	.dialog {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: fixed;
		/* 比设置层级高 */
		z-index: 1003;
		width: 80%;
		height: 250px;
		top: 50%;
		left: 50%;
		margin-top: -125px;
		margin-left: -40%;
		background-color: #FFFFFF;
		border-radius: 20px;
		overflow: hidden;
	}

	.dialog-other {
		width: 100%;
		height: 1000%;
		position: fixed;
		/* 比设置层级高 比dialog低 */
		z-index: 1002;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.dialog-title {
		width: 100%;
		height: 30px;
		margin: 15px auto;
		line-height: 30px;
		text-align: center;
		font-size: 1.5rem;
		color: #000000;
	}

	.dialog-content {
		width: calc(100% - 40px);
		height: 180px;
		margin: 0 auto;
		padding: 5px 20px;
		text-align: left;
		text-indent: 2em;
		font-size: 1.2rem;
		color: #0088D6;
	}

	.dialog-content text {
		width: 100%;
		height: 100%;
	}

	.dialog-btns {
		width: 100%;
		height: 45px;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

	}

	.dialog-btn {
		width: 100%;
		line-height: 40px;
		text-align: center;
		color: #007AFF;
		background-color: #ffffff;
		border: rgba(0, 0, 0, 0.1) solid .1px;
	}

	.dialog-btn:active {
		background-color: rgba(0, 0, 0, 0.1);
	}

	/* music detail */
	.music-detail,
	.detail-info,
	.detail-volume,
	.detail-controls {
		/* 都在同一级的内容 而背景要比他们都低一层 */
		z-index: 1001;
	}

	.music-detail {
		width: 100%;
		background-color: rgba(255, 255, 255, 1);
		/* 布局 */
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
	}
	/* 详情背景 */
	.detail-background {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	.detail-background-night {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: #111;
	}
	.detail-background image {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		filter: blur(1px) brightness(80%);
	}
	.detail-background-night image{
		display: none;
	}

	.detail-volume {
		width: 100%;
		height: 20px;
		display: flex;
		flex-direction: row;
		justify-items: flex-start;
	}

	.detail-volume image {
		margin: 5px 0px 0px 10px;
		height: 15px;
		width: 15px;
		line-height: 20px;
	}

	.detail-volume slider {
		margin: 4px 10px 0px 5px;
		width: 100%;
		line-height: 20px;
	}

	/* 音乐详情部分 包括Cover name author */
	.detail-info {
		width: 100%;
	}

	.detail-info .cover {
		display: block;
		width: 60%;
		padding-top: 60%;
		position: relative;
		margin: 50px auto 0px;
	}

	.cover image {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 10px;
	}

	.info {
		width: 80%;
		margin: 10px auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.detail-info-name {
		display: block;
		width: 100%;
		font-size: 1.3rem;
		color: #FFF;
		word-break: break-all;
		text-align: center;
	}

	.detail-info-author {
		margin-top: 15px;
		font-size: 1.1rem;
		color: #EEE;
		display: block;
		word-break: break-all;
		text-align: center;
	}

	/* 控制按钮部分 */
	.detail-controls {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0;
	}

	.controls-btns {
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.controls-btns image {
		display: inline-block;
		height: 30px;
		width: 30px;
	}

	/* detail prograss */
	.controls-prograss {
		margin: 5px auto;
		width: 100%;
		height: 25px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.controls-prograss-text {
		display: block;
		margin: 0 10px;
		color: #FFF;
		font-size: 0.7rem;
		line-height: 25px;
	}

	.controls-prograss-background {
		height: 2px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.3);
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.controls-prograss-point {
		height: 2px;
		background-color: #ffffff;
		position: relative;
	}

	#detailPrograssPoint {
		display: inline-block;
		width: 8px;
		height: 8px;
		margin-left: -4px;
		margin-top: -3px;
		background-color: #FFF;
		border-radius: 50%;
		box-shadow: #000 1px 1px 3px;
		position: absolute;
	}
</style>
