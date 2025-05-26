import createApiClient from './api.service'
import { api } from '~/config'

class ImageService {
  constructor() {
    this.api = createApiClient(`${api.baseUrl}/api`)
  }

  async uploadAvatar(file, userId, avt_url) {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('type', 'AVATAR')
    formData.append('id', userId || '')
    formData.append('oldFileUrl', avt_url || '')

    const response = await this.api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  }
}

export default new ImageService()
