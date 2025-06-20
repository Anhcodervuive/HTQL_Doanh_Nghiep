/* eslint-disable indent */
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

export default function ProfileIndex() {
  const theme = useTheme()

  const user = {
    name: 'Trần Ngân',
    email: 'tranquocviet07072003@gmail.com',
    gender: 'Nữ',
    birthDate: '2/1/2000',
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    district1: 'District 1',
    district2: 'District 2',
    phone: '0987654321',
    avatar:
            'https://i.pinimg.com/736x/3d/4f/b5/3d4fb590a068c374506bce49307be094.jpg',
  }

  const InfoItem = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Box sx={{ minWidth: 34 }}>{icon}</Box>
      <Typography variant="body1" fontWeight={500} sx={{ mr: 1 }}>
        {label}:
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  )

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        px: 2,
        pt: 1,
        pb: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // ✅ để nội dung bắt đầu từ trên
      }}
    >
  
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: '100%',
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >


        {/* Avatar chính giữa */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        {/* Thông tin cá nhân */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        {/* Thông tin chi tiết */}
        <Box>
          <InfoItem icon={<span>👩</span>} label="Giới tính" value={user.gender} />
          <InfoItem icon={<span>📅</span>} label="Ngày sinh" value={user.birthDate} />
          <InfoItem icon={<span>🌍</span>} label="Quốc gia" value={user.country} />
          <InfoItem icon={<span>🏙️</span>} label="Tỉnh / Thành phố" value={user.city} />
          <InfoItem icon={<span>📍</span>} label="Quận / Huyện" value={user.district1} />
          <InfoItem icon={<span>📍</span>} label="Quận / Huyện" value={user.district2} />

          <InfoItem icon={<span>📞</span>} label="Số điện thoại" value={user.phone} />
        </Box>

        {/* Nút chỉnh sửa bên dưới bên phải */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            sx={{
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
                        Chỉnh sửa thông tin
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
