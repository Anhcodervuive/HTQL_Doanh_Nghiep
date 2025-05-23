import axios from 'axios'

import { api } from '~/config'


const getUserId = () => {
  const state = JSON.parse(localStorage.getItem('persist:root'))
  const user = JSON.parse(state.user)

  return user.currentUser.USER_ID
}


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

  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // Nếu lỗi 401 và chưa từng gửi request refresh toke
      if (
        error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
      ) {
        originalRequest._retry = true // Đánh dấu request đang được retry

        try {
          // Gửi request refresh token
          const deviceId = localStorage.getItem('device_id')
          const { data } = await API.post(`${api.baseUrl}/api/auth/refresh-token`, {
            deviceId,
            userId: getUserId()
          },
          {
            withCredentials: true
          }
          )

          console.log(data)

          // Lưu Access Token mới
          // localStorage.setItem('accessToken', data.accessToken);

          // Cập nhật header Authorization cho request cũ
          // originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          // Gửi lại request cũ
          return API(originalRequest)
        } catch (err) {
          console.error('Refresh token failed:', err)
          return Promise.reject(err)
        }
      }

      return Promise.reject(error)
    }
  )

  return API
}

export default apiService