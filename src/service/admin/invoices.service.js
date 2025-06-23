import { api } from '~/config'
import createApiClient from '../api.service'
class InvoicesService {
  constructor() {
    const baseUrl = `${api.baseUrl}/api/purchase-invoices`
    this.api = createApiClient(baseUrl)
  }
  async search(credential, options = {}) {
    console.log('option: ',options)
    console.log('credential: ',credential)
    console.log('deviceId1: ',credential.device_id)
    console.log('userId1: ', credential.user_id)
    return (await this.api.get('', {
      params: {
        ...options
      },
      headers: {
        ...credential
      },
      withCredentials: true,
    },)).data
  }
  async getInvoiceDetail(id, headers = {}) {
    console.log('id: ', id)
    const response = await this.api.get(`/${id}`, {
      headers: {
        ...headers
      },
      withCredentials: true,
    })
    return response.data
  }
  async create(credential, data) {
    return (await this.api.post('/', data, {
      headers: {
        ...credential
      },
      withCredentials: true
    })).data
  }
  async update(credential, id, data) {
    console.log('data: ', data)
    return (await this.api.put(`/${id}`, data, {
      headers: {
        ...credential
      },
      withCredentials: true
    })).data
  }
  async deleteItems(credential, id, items) {
    return (await this.api.put(`/${id}`, items, {
      headers: {
        ...credential
      },
      withCredentials: true
    })).data
  }
  async delete(credential, id) {
    return (await this.api.delete(`/${id}`, {
      headers: {
        ...credential
      },
      withCredentials: true
    })).data
  }

}
export default new InvoicesService