import axios from '@/util/request'

const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: { sid }
  })
}

const forget = (options) => {
  return axios.post('/login/forget', {
    ...options
  })
}

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
