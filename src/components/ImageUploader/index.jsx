import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

function ImageUploader({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result) // Cập nhật ảnh
        onImageUpload(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2, gap: 2 }}>
      <Avatar alt='Upload new Avatar' src={selectedImage ?? ''} sx={{ height: '200px', width: '200px' }}/>
      <Button variant="contained" component="label">
              Upload Avatar
        <input type="file" hidden onChange={handleImageChange}/>
      </Button>
    </Box>
  )
}

export default ImageUploader