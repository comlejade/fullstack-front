// 封装axios的请求，返回重新封装的数据格式
// 对错误统一处理
import axios from 'axios'
import { errHandle } from './errHandle'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    // 全局变量存储url路径
    this.pending = {}
  }

  // 获取实例配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending (key, isRequest = false) {
    console.log(key, isRequest)
    // 如果if条件为true，说明对应的url已经发起请求，取消上一次请求，执行cancel方法
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  // 设定拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      return config
    }, (err) => {
      // Do something with request err
      errHandle(err)
      return Promise.reject(err)
    })

    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with res data
      // 请求成功返回也需要删除对应的方法，防止内存溢出，或者正常请求被拦截
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)

      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with res err
      errHandle(err)
      return Promise.reject(err)
    })
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'GET',
      url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'POST',
      url,
      data
    })
  }
}

export default HttpRequest
