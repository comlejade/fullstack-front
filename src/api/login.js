import axios from '@/util/request'

/**
 * 获取验证码接口
 * @param {*} sid 唯一标识
 * @returns Promise
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: { sid }
  })
}

/**
 * 找回密码接口
 * @param {*} options 用户信息
 * @returns Promise
 */
const forget = (options) => {
  return axios.post('/login/forget', {
    ...options
  })
}

/**
 * 登录接口
 * @param {*} options 用户信息
 * @returns Promise
 */

const login = (options) => {
  return axios.post('/login/login', {
    ...options
  })
}

export {
  getCode,
  forget,
  login
}
