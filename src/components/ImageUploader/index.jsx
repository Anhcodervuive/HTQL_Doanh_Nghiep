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
    <Box>
      {selectedImage && <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
      <Avatar alt='Upload new Avatar' src={selectedImage ?? ''} />
      <Button variant="contained" component="label">
              Upload File
        <input type="file" hidden onChange={handleImageChange}/>
      </Button>
    </Box>
  )
}

export default ImageUploader