import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { toast } from 'react-toastify'

function UpdateImgage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUpdateAvatar = async () => {
    if (!selectedFile) {
      alert('Vui lòng chọn ảnh trước khi cập nhật.')
      return
    }

    const formData = new FormData()
    formData.append('avatar', selectedFile)

    try {
      // Gọi API upload ảnh
      // const response = await fetch('/api/user/avatar', {
      //   method: 'PUT',
      //   body: formData
      // })

      toast.success('Cập nhật ảnh đại diện thành công!')
    } catch (error) {
      console.error('Upload avatar error:', error)
      toast.error('Cập nhật ảnh đại diện thất bại!')
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, textAlign: 'center', bgcolor: '#fff', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Cập nhật ảnh đại diện
      </Typography>

      <Avatar
        src={previewUrl}
        sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
      />

      <Button variant="outlined" component="label">
        Chọn ảnh
        <input hidden accept="image/*" type="file" onChange={handleFileChange} />
      </Button>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateAvatar}
          disabled={!selectedFile}
        >
          Cập nhật
        </Button>
      </Box>
    </Box>
  )
}

export default UpdateImgage
