import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    {
      path : '/cities',
          components : {//命名视图使用compons
              cities : () => import('@/views/Movie/cities')
          }
    },
    {
      path : '/',
      redirect :'/movie'
    }
  ]
})
