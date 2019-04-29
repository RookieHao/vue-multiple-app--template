import axios from 'axios'
import { Toast } from 'vant'
const pagesPath = require('../../pathConfig.js')

// 创建axios实例
const service = axios.create({
  baseURL: pagesPath[process.env.NODE_ENV][process.env.VUE_APP_Module].serviceURL || '',
  timeout: 20000,
  withCredentials: true
})
let loading
/**
 *  防止重复提交
 *  将每一次请求放入requests中，请求完成之后删除。
 *  在请求结束之前，再次发起同样的请求，使用axios的CancelToken方法停止未完成的请求
 */
var CancelToken = axios.CancelToken
let requests = []
let remRquest = (request) => {
  for (let i in requests) {
    if (requests[i].u === request) {
      requests[i].cancel()
      requests.splice(i, 1)
    }
  }
}
// 请求拦截，请求发出之前执行
service.interceptors.request.use(config => {
  // 请求之前，停止与本次请求重复的未完成请求
  remRquest(config.url + '&' + config.method + '&' + (config.data && JSON.stringify(config.data)) + '&' + (config.params && JSON.stringify(config.params)))

  // 将本次请求放入requests
  config.cancelToken = new CancelToken((cancel) => {
    requests.push({ u: config.url + '&' + config.method + '&' + (config.data && JSON.stringify(config.data)) + '&' + (config.params && JSON.stringify(config.params)), cancel })
  })

  // 如果请求参数有loading标识，显示loading
  config.loading && (loading = Toast.loading({ duration: 0, message: '加载中...', mask: true }))
  return config
}, error => {
  loading && loading.clear()
  Toast.fail({ message: error.message })
  return Promise.reject(error.message)
})

// 响应拦截，收到响应结果之后对结果进行处理
service.interceptors.response.use(response => {
  // 接收到响应结果之后，将本次请求从requests中删除
  remRquest(response.config.url + '&' + response.config.method + '&' + (response.config.data && JSON.stringify(response.config.data)) + '&' + (response.config.params && JSON.stringify(response.config.params)))

  // 取消loading状态
  loading && loading.clear()

  // status是请求状态码，200是响应结束
  if (response.status === 200) {
    // retCode为业务状态码
    if (response.data.retCode !== '0000') {
      Toast.fail({ message: response.data.retMessage || '系统错误' })
      return Promise.reject(new Error(response.data.retMessage))
    }
    return response.data.body
  } else {
    Toast.fail({ message: '网络错误' })
    return Promise.reject(new Error('网络错误'))
  }
}, error => {
  loading && loading.clear()
  Toast.fail({ message: error.message })
  return Promise.reject(error.message)
})

export default service
