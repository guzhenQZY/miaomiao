<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail" :style="{ 'background' :  detailMovie.backgroundColor }">
			
            <div class="detail_list">
				<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ detailMovie.img.replace(/w\.h/,'148.208') +')' }"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img  :src="detailMovie.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{ detailMovie.nm }}</h2>
						<p>{{ detailMovie.enm }}</p>
						<p>{{ detailMovie.sc }}</p>
						<p>{{ detailMovie.cat }}</p>
						<p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
						<p>{{ detailMovie.pubDesc }}</p>
					</div>
				</div>
			</div>
            
			<div class="detail_intro" >
				<h3>简介</h3>
				<p>{{detailMovie.dra}}</p>
			</div>
			
			<!-- <div class="detail_video">
				<video class="video" controls x5-video-player-type="h5" v-if="detailMovie.vd" width="100%" height="240"> -->
				<!-- height="240px"  /*如果有封面，请设置高度*/
				controls  /*这个属性规定浏览器为该视频提供播放控件*/  
				style="object-fit:fill"  /*加这个style会让 Android / web 的视频在微信里的视频全屏，如果是在手机上预览，会让视频的封面同视频一样大小*/
				webkit-playsinline="true"  /*这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/  
				x-webkit-airplay="true"  /*这个属性还不知道作用*/ 
				playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ 
				x5-video-player-type="h5" /*启用H5播放器,是wechat安卓版特性*/
				x5-video-orientation="h5" /*播放器支付的方向，landscape横屏，portraint竖屏，默认值为竖屏*/
				x5-video-player-fullscreen="true" /*全屏设置，设置为 true 是防止横屏*/
				preload="auto" /*这个属性规定页面加载完成后载入视频*/  -->

					<!-- <source :src="detailMovie.vd" type="video/mp4">
				</video>
			</div> -->

			<div class="detail_player swiper-container" ref="detail_player">
				<h3>视频剧照</h3>
				<ul class="swiper-wrapper">
					<li class="video_img swiper-slide" v-if="detailMovie.videoImg">
						<div>
							
							<img :src="detailMovie.videoImg" alt="">
							<el-popover
								placement="left-end"
								width="100%"
								trigger="click"
								>
								<video class="video" controls  v-if="detailMovie.vd" width="100%" height="240">
									<source :src="detailMovie.vd" type="video/mp4">
								</video>
								<el-button slot="reference">
									<span class="iconfont icon-play"></span>
								</el-button>
							</el-popover>

						</div>
					</li>
					<li  class="swiper-slide" v-for="(item,index) in photos" :key="index">
						<div>
							<!-- 图片预览添加preview属性 src="图片地址" large="预览图片地址" preivew="分组:相同的为一组"-->
							<img v-lazy="item.src" :src="item.src" :large="item.msrc" preview="1">
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="pay">
			<mt-button size="large" type="danger">特惠购买</mt-button>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header'
import { Button } from 'mint-ui'
import { Lazyload } from 'mint-ui'

    export default {
		name : 'Detail',
		data(){
			return {
				detailMovie : {},
				isLoading : true,
				photos : [],
			}
		},
		components : {
			Header,
		},
		props : ['movieId'],
		methods : {
			handleToBack(){
				this.$router.back();
			},
		},
		mounted () {

			// console.log(this.movieId)
			this.axios.get('/api/detailmovie?movieId='+ this.movieId).then((res)=>{
            var msg = res.data.msg;
            if( msg === 'ok' ){
                this.isLoading = false;
				this.detailMovie = res.data.data.detailMovie;
				this.$nextTick(()=>{//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
					new Swiper(this.$refs.detail_player , {
							slidesPerView : 'auto',
							freeMode : true,
							freeModeSticky: true,
						});
				})

				for( var i=0;i<res.data.data.detailMovie.photos.length;i++){
						//设置大小两张图片,添加到photos数组
						this.photos.push({src :res.data.data.detailMovie.photos[i].replace(/w\.h/,'120.107'),msrc: res.data.data.detailMovie.photos[i].replace(/w\.h/,'600.400')}) 
				}
				// console.log(this.photos)
				this.$previewRefresh();//photos是异步获取数据的时候在获取数据后需要调用this.$previewRefresh();刷新重置一下
            }
			}).catch(erro =>{//获取数据失败
				console.log(erro);
				
			});
		},
    }
</script>

<style lang="scss" scoped>

#detailContrainer{position: absolute;left: 0;top: 0;z-index: 100; width: 100%;height: 100%;background: white}
#detailContrainer.slide-enter-active{animation: .3s slideMove;}
@keyframes slideMove{
	0% {transform: translateX(100%);}
	100% {transform: translateX(0%);}
} 
#content.contentDetail{ display: block; margin-bottom:0; height: calc(100% - 100px); margin-bottom: 50px;overflow:auto ;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
.detail_intro{padding: 10px; color: #ccc;font-weight: normal; p{text-indent: 24px}}
#content .detail_intro{ padding: 10px;}
// .detail_video{position: relative;height: 240px; .video{position: absolute ;top: 0;clear:both;}}

#content .detail_player{ margin:10px; h3{color: #ccc;} .swiper-wrapper{margin-top: 10px}}
#content .detail_player .video_img{margin-right: 20px; div{position: relative; span{ width: 30px; height: 30px; text-align: center; display: block; color: #ccc; font-size: 25px;position: absolute; top:calc(50% - 15px); left: calc(50% - 15px);} }}
#content .detail_player .video_img div img{width: 90px; height: 60px;}
.detail_player .swiper-slide{ width:90px;height: 60px; margin-right: 20px; text-align: center; font-size: 14px;overflow: hidden;}
.detail_player .swiper-slide img{margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}


.pay{text-align: center; width:100%; height:40px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0;}
</style>
