
import axios from 'axios'
const HttpServer = {}
HttpServer.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 请求拦截器的代码
  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login') {
      const AUTH_TOKEY = localStorage.getItem('token')
      // axios.defaults.headers.common['Authorization'] = AUTH_TOKEY
      config.headers['Authorization'] = AUTH_TOKEY
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  // 设置头部

  Vue.prototype.$http = axios
}
export default HttpServer
