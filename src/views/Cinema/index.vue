<template>
    <div id="main">
       <Header title="影院">
            <div class="city_name" @click="handleToCity">
                <span>{{$store.state.city.nm}}</span><span class="iconfont icon-lower-triangle"></span>
            </div>
       </Header>
            <div id="content">
                <div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			    </div>
                <CiList></CiList>
            </div>
       <Tabbar></Tabbar>
    </div>
</template>

<script>

    import Header from '@/components/Header';
    import Tabbar from '@/components/Tabbar';
    import CiList from '@/components/CiList';
    export default{
        name : 'Cinema',
        components :{
            Header,
            Tabbar,
            CiList
        },
        methods : {
            handleToCity(){
                this.$router.push('/cities')
            }
        }
    }
</script>

<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
.city_name{position: absolute; left: 15px; top: 50%; margin-top: -7px; font-size: 15px;}
</style>