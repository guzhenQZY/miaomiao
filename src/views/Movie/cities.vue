<template>
<div class="city">
	<Header title="城市">
		<i class="iconfont icon-close" @click="handleToBack"></i>
	</Header>
    <div class="city_body">
		<div class="city_list">
			<!-- 热门城市 -->
			<Loading v-if="isLoading" />
			<Scroller v-else ref="city_list">
			<div>
				<!-- 当前城市 -->
				<div class="city_now">
					当前城市 : &nbsp;<b>{{$store.state.city.nm}}</b>
				</div>
				<!-- 定位城市 -->
				<div class="city_gps" @tap="handleToCity(cityGps.nm,cityGps.id)">
					<i class="iconfont icon-LC_icon_gps_line_2"></i>
					&nbsp;
					<b>{{cityGps.nm}}</b>
					&nbsp;
					<span>GPS定位</span>
				</div>
				<!-- 热门城市 -->
				<div class="city_hot">
					<h2>热门城市</h2>
					<ul class="clearfix">
						<li  v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">
							{{ item.nm }}
						</li>
					</ul>
				</div>
				<!-- 城市列表 -->
				<div class="city_sort" ref="city_sort">
					<div  v-for="item in cityList" :key="item.id">
						<h2>{{item.index}}</h2>
						<ul>
							<li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">
								{{ itemList.nm }}
							</li>
						</ul>
					</div>
				</div>
			</div>
			</Scroller>
		</div>
		
		<!-- 城市索引 -->
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in cityList" :key="item.id" @touchstart="handleToIndex(index)">
					{{ item.index }}
				</li>
			</ul>
		</div>
		
	</div>
</div>
</template>

<script>
import Header from '@/components/Header'
import {Toast} from 'mint-ui'
    export default{
	   name : 'City',
	   components:{
		   Header,
	   },
	   data(){
		   return{
			   cityList : [],
			   hotList : [],
			   isLoading :true,
			   cityGps : {id:0,nm:'正在加载...'},//定位城市的默认值
		   }
	   },
		mounted(){
			//城市定位
			this.axios.get('/api/getLocation').then((res)=>{
					var msg = res.data.msg;
					if(msg==='ok'){
						this.cityGps=res.data.data;
					}
			});

			//热门城市、城市列表,存入本地存储
			var cityList=window.localStorage.getItem('cityList');
			var hotList=window.localStorage.getItem('hotList');
			if(cityList&&hotList){
				this.cityList=JSON.parse(cityList);
				this.hotList=JSON.parse(hotList);
				this.isLoading=false
			}else{
				this.axios.get('/api/cityList').then((res)=>{
					var msg =res.data.msg;
					if(msg== 'ok'){
						this.isLoading=false
						var cities = res.data.data.cities;//城市信息
						//[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
						var {cityList, hotList} =this.formatcityList(cities);
						this.cityList=cityList;
						this.hotList=hotList;
						window.localStorage.setItem('cityList',JSON.stringify(cityList));
						window.localStorage.setItem('hotList',JSON.stringify(hotList))
					}
				})
			}
			
		},
		methods : {
			handleToBack(){
				this.$router.back();
			},
			formatcityList(cities){//整理城市列表格式
				var cityList =[];
				var hotList = [];

				for(var i=0;i<cities.length;i++){//获取热门城市
					if(cities[i].isHot === 1){
						hotList.push(cities[i])
					}
				}

				for(var i=0;i<cities.length;i++){
					var firstLetter = cities[i].py.substring(0,1).toUpperCase();
					if(toCom(firstLetter)){//新添加索引(城市首字母)
						cityList.push({index : firstLetter, list : [{nm : cities[i].nm, id : cities[i].id}] });
					}
					else{//累加到已有索引（城市首字母）
						for(var j=0;j<cityList.length;j++){
							if(cityList[j].index===firstLetter){
								cityList[j].list.push({nm :cities[i].nm,id :cities[i].id})
							}
						}
					}
				}

				cityList.sort((n1,n2)=>{//对城市首字母排序
					if(n1.index>n2.index){
						return 1;
					}else if(n1.index<n2.index){
						return -1;
					}else{
						return 0;
					}
				})

				function toCom(firstLetter){//判断cityList内对象的index（城市首字母）
					for(var i= 0;i<cityList.length;i++){
						if(cityList[i].index===firstLetter){
							return false;
						}
					}
					return true
				}
				
				return{
					cityList,
					hotList
				}
			},
			handleToIndex(index){
				var h2=this.$refs.city_sort.getElementsByTagName('h2');
				//this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;//设置滚动条到指定位置
				this.$refs.city_list.toScrollTop(h2[index])//获取组件内的toScrollTop方法
			},
			handleToCity(nm,id){
				if(!id){
					Toast("当前城市定位还未完成!")
					return
				}
				this.$store.commit('city/CITY_INFO',{nm,id});//修改状态管理
				window.localStorage.setItem('nowNm',nm);
				window.localStorage.setItem('nowId',id);
				this.$router.back();
			}
		}
    }
</script>

<style lang="scss" scoped>
.city{ height: 100%; width:100%; position: absolute; top: 0; left: 0;background: white;z-index: 100;animation: .3s slideMove;}
@keyframes slideMove{
	0% {opacity: 0.3;}
	100% {opacity: 1;}
} 


.city_body{ display: flex; width:100%;height: calc(100% - 50px);}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_now{padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;margin-top: 15px;}
.city_body .city_gps{margin-top: 15px;padding-left: 15px; i{color :#f03d37;font-weight: bold;}span{font-size: 12px;color: #ccc}}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>