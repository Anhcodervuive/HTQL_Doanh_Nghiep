import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  TextField,
} from '@mui/material'
import { useState, useRef } from 'react'
import { Save } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { PhotoCamera } from '@mui/icons-material'


export default function EditProfile() {
  const theme = useTheme()
  const fileInputRef = useRef()
  const [formData, setFormData] = useState({
    name: 'Trần Ngân',
    email: 'tranquocviet07072003@gmail.com',
    gender: 'Nữ',
    birthDate: '2/1/2000',
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    district: 'District 1',
    phone: '0987654321',
    avatar:
            'https://i.pinimg.com/736x/3d/4f/b5/3d4fb590a068c374506bce49307be094.jpg',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Đã lưu thông tin:', formData)
    // Gửi dữ liệu lên backend tại đây nếu cần
  }
  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, avatar: imageUrl }))
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        px: 2,
        pt: 2,
        pb: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: '100%',
          px: 4,
          py: 3,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Avatar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
          <Avatar
            src={formData.avatar}
            alt="avatar"
            sx={{ width: 100, height: 100, cursor: 'pointer' }}
            onClick={() => fileInputRef.current.click()}
          />
          {/* Nút icon máy ảnh */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 'calc(50% - 12px)', // căn giữa ngang avatar
              backgroundColor: theme.palette.primary.main,
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <PhotoCamera sx={{ color: '#fff', fontSize: 16 }} />
          </Box>

          {/* Input file ẩn */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </Box>


        {/* Form fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Họ và tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Giới tính"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Ngày sinh"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Quốc gia"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Tỉnh / Thành phố"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Quận / Huyện"
            name="district"
            value={formData.district}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />

        </Box>

        {/* Nút Lưu */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={handleSubmit}
            sx={{ borderRadius: 10 }}
          >
                        Lưu thay đổi
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
