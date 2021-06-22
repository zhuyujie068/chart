import axios from "axios"

import api from "../api"

import Cookies from "js-cookie"
// import NProgress from "nprogress"
import { Message } from "element-ui"
// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
axios.defaults.baseURL = process.env.API_HOST

// http request 拦截器
axios.interceptors.request.use(config => {
  // NProgress.start()
  config.headers["Content-Type"] = "application/json;charset=UTF-8"


  // // 判断是否有 token
  // if (Cookies.get('token')) {
  config.headers.token = Cookies.get('token');
  // } else {
  //   api.login({
  //     username: "dp001",
  //     password:
  //       "f969248d621bcded4a3582a1c3b17a71eedfefa9120c36ee3bd1957438cd55b9",
  //     source: "dp",
  //   }).then((res) => {
  //     Cookies.remove("token");
  //     Cookies.set("token", res.data.data.token);
  //   });
  // }

  return config
},
  error => {
    return Promise.reject(error.response)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // NProgress.done()
    if (response.data.code === 11000) {
      // Cookies.set("access_token", response.data.message, { expires: 1 / 12 })
      return Promise.resolve()
    } else if (response.data.code === 10000) { // 约定报错信息
      Message({
        message: response.data.message,
        type: "warning"
      })
      return Promise.reject(response)
    } else {
      return Promise.resolve(response)
    }
  },
  error => {

    console.log(error)

    if (error.response.status === 404) {
      Message({
        message: "请求地址出错",
        type: "warning"
      })
    } else if (error.response.status === 401) {
      Message({
        message: error.response.data.message,
        type: "warning"
      })
      // Cookies.remove("access_token")
      setTimeout(() => {
        location.reload()
      }, 3000)
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })
export default axios
