
import axios from 'axios'
const HttpServer = {}
HttpServer.install = function (Vue) {  
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 设置头部
const AUTH_TOKEY = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = AUTH_TOKEY
Vue.prototype.$http = axios
}
export default HttpServer