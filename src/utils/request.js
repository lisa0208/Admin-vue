import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import env from '../../config/sit.env'
import Cookies from 'js-cookie'

// create an axios instance
const service = axios.create({
  baseURL: env.BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
  validateStatus: function (status) {
    console.log(status, '状态检查');
    return status < 500; // 状态码在大于或等于500时才会 reject
  }
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['jf_token'] = Cookies.get('jf_token')
      // config.headers['jf_token'] = 'xCDUQE++88g/A3XiJacKz/V396eCN3njCkgHiy0FlEx79zselQ4MU1r2k1fDSW+xj9Qv4aoPbrGcllLh6+OWXg=='
      
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,

  response => {

    console.log('res', response);
    if(response.status == 401){
      console.log('这里处理错误状态');
      window.location.replace('/#/userLogin');
      return Promise.reject(response);
    } else {
      return response;
    }
    
  },

  (error, status) => {
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
