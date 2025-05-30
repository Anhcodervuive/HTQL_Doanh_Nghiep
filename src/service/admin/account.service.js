import { api } from '~/config'
import createApiClient from '../api.service'

class AccountService {
  constructor() {
    const baseUrl = `${api.baseUrl}/api/account`
    this.api = createApiClient(baseUrl)
  }

  async updateAccountActiveStatus(username, isActive, reason, headers = {}) {
    console.log('username từ account service: ', username)
    console.log('isActive từ account service: ', isActive, reason)

    const response = await this.api.put('/active', { username, isActive, reason }, {
      headers: {
        ...headers
      },
      withCredentials: true
    })
    return response.data
  }

}

export default new AccountService