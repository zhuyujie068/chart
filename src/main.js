import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import api from './api'
Vue.prototype.API = api;

import * as util from './assets/src/utils'
Vue.prototype.UTIL = util;

Vue.config.productionTip = false;

// Vue修改网页浏览器标签的标题 https://blog.csdn.net/SonHOuse1993/article/details/109651971
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
