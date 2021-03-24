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

const reg = (options) => {
  return axios.post('/login/reg', {
    ...options
  })
}

export {
  getCode,
  forget,
  login,
  reg
}
