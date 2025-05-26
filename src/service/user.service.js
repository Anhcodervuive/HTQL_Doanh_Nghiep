import { api } from '~/config'
import createApiClient from './api.service'

class UserService {
  constructor() {
    const baseUrl = `${api.baseUrl}/api/user`
    this.api = createApiClient(baseUrl)
  }

  async updateProfile(payload, credentials) {
    console.log('Payload gửi về server từ service:', payload)
    console.log('credentials:', credentials)


    return (await this.api.put('/profile', payload, {
      headers: {
        ...credentials
      },
      withCredentials: true
    })).data
  }


}

export default new UserService
