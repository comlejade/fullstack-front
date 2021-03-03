import axios from 'axios'

const getCode = async () => {
  let result = ''
  try {
    result = await axios.get('/getCaptcha')
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
    result = await axios.post('/forget', {
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

export {
  getCode,
  forget
}
