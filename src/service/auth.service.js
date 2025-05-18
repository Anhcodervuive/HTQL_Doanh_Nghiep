import { api } from '~/config'
import createApiClient from './api.service'

class AuthService {
  constructor() {
    const baseUrl = `${api.baseUrl}/`
    this.api = createApiClient(baseUrl)
  }

  async login() {

  }
}

export default new AuthService