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
}

export default new AuthService