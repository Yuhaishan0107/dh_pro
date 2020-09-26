import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index'
import Cookies from 'js-cookie'
//导入全局样式表

Vue.use(ElementUI)
Vue.config.productionTip = false

//配置axios全局使用
import axios from 'axios'
axios.defaults.baseURL = 'https://dtc-cdsv-test.zclound.ac.cn/'
// 将vue的原型http对象设置未axios，以后用这个原型就可以直接使用
Vue.prototype.$axios = axios;
Vue.prototype.$cookies = Cookies;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
