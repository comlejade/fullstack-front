import axios from 'axios'

const getCode = async (sid) => {
  let result = ''
  try {
    result = await axios.get('/public/getCaptcha', {
      params: {
        sid
      }
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
  return result
}

const forget = async (options) => {
  let result = ''
  try {
    result = await axios.post('/login/forget', {
      ...options
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
  return result
}

const login = async (options) => {
  let result = ''
  try {
    result = await axios.post('/login/login', {
      ...options
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (err) {
    console.log(err)
  }
  return result
}

export {
  getCode,
  forget,
  login
}
