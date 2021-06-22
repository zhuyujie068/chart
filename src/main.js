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

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
