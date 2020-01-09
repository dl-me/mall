import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initializeApi from './api'

import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';  
import "animate.css";
import VSR from 'vue-scroll-reveal'

Vue.use(Vant);
Vue.use(VSR,{
  class: 'v-scroll-reveal', 
  duration: 1000,
  distance: '100px',
  mobile: true,
  delay:2000
});

// 300毫秒点击延迟
// import fastClick from 'fastclick'
// 初始化标签
import '@/assets/styles/reset.css'
// border.css解决1像素边框问题
import '@/assets/styles/border.css'

import '@/assets/styles/iconfont/iconfont.css'  
require ('@/assets/styles/iconfont/iconfont.js') //引用彩色图标

// 引入swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


initializeApi(Vue)

Vue.config.productionTip = false
// // 跳转后返回顶部
// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
