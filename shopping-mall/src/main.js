import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api"
import http from './http/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import dayjs from "dayjs"
import lodash from "lodash"
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$axios = http;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$lodash = lodash;
Vue.prototype.$Toast = Toast;

// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 900, position: "top"});
// 将所有 loading Toast 设置为背景不可点击 (2.2.10 版本开始支持)
Toast.setDefaultOptions('loading', { forbidClick: true });
//响应拦截
axios.defaults.timeout = 20000;//设置超时时间
//过滤请求结果 只返回结果的data
axios.interceptors.response.use(
    response=>{
      return response.data;
    },error=>{
      return Promise.reject(error);
    }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
