import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import '@/assets/iconfonts/iconfont.css'
import mintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(mintUi);

import ElementUI from 'element-ui';
Vue.use(ElementUI);

import vuePicturePreview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(vuePicturePreview)//图片预览组件

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter('setWH',(url , arg)=>{//图片过滤器
  return url.replace(/w\.h/,arg);
});

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)//滚动条组件

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)//加载组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
