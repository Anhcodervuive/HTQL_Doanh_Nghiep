import axios from 'axios'

const commonConfig = {
  header: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

const apiService = (baseURL) => {
  const API = axios.create({
    baseURL,
    ...commonConfig,
  })

  return API
}

export default apiService