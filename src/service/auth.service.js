import { api } from '~/config'
import createApiClient from './api.service'

class AuthService {
  constructor() {
    const baseUrl = `${api.baseUrl}/api/auth`
    this.api = createApiClient(baseUrl)
  }

  async login(formData) {
    return (await this.api.post('/login', formData, {
      withCredentials: true
    })).data
  }

  async logout(formData) {
    return (await this.api.post('/logout', formData, {
      withCredentials: true
    })).data
  }

  async refreshToken(formData) {
    console.log(formData)
    return (await this.api.post('/refresh-token', formData, {
      withCredentials: true
    })).data
  }

  async register(formData) {
    return (await this.api.post('/register', formData)).data
  }

  async forgetPassword(email) {
    return (await this.api.post('/forget-password', { email })).data
  }

  async resetPassword(token, newPassword) {
    return (await this.api.post('/reset-password', { token, newPassword })).data
  }
}

export default new AuthService