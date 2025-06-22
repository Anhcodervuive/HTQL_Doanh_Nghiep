import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import {
  Box, AppBar, Toolbar, Typography, Button, IconButton, Avatar,
  Container, Grid, CssBaseline, ThemeProvider
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '~/redux/thunks/user.thunk'
import { logo1 } from '~/assets/images'
import themeCustomer from '../themeCustomer'
import { useDeviceId } from '~/hooks/useDeviceId'
import MiniCart from './MiniCart'

export default function CustomerLayout() {
  const user = useSelector(s => s.user.currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const device_id = useDeviceId()

  const handleLogout = () => {
    const user_id = user.USER_ID
    dispatch(logout({ credentials: { user_id, device_id }, navigate }))
  }

  return (
    <ThemeProvider theme={themeCustomer}>
      <CssBaseline />

      {/* ---------- Navbar ---------- */}
      <AppBar position="fixed" color="primary">
        <Toolbar>

          <Box
            component={Link}
            to="/customer/home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src={logo1}
              alt="Logo"
              sx={{
                height: { xs: 40, md: 56 },
                width: 'auto',
                mr: 1,
                objectFit: 'contain',
              }}
            />
          </Box>


          <Box sx={{ flexGrow: 1, ml: 5, display: 'flex', gap: 3 }}>
            {['/customer/home', '/customer/list-Item', '/about'].map((path, i) => (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: '#fff', fontWeight: 600,
                  '&:hover': { bgcolor: 'secondary.main' }
                }}
              >
                {['Trang chủ', 'Sản phẩm', 'Liên hệ'][i]}
              </Button>
            ))}
          </Box>

          {/* <IconButton color="inherit" component={Link} to="/customer/cart">
            <ShoppingCartIcon />
          </IconButton> */}
          <MiniCart />

          {user ? (
            <>
              <IconButton color="inherit" component={Link} to="/profile">
                <Avatar src={user.AVATAR_IMG_URL} sx={{ width: 30, height: 30 }} />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="inherit" component={Link} to="/login">
                <LoginIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/register">
                <HowToRegIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box sx={{ minHeight: '80vh', py: 3, bgcolor: 'info.main' }}>
        <Container><Outlet /></Container>
      </Box>

      {/* ---------- Footer ---------- */}
      <Box component="footer" sx={{ bgcolor: 'success.main', color: '#fff', py: 4, mt: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            }}
          >
            <Box sx={{ wordBreak: 'break-word' }}>
              <Typography variant="h6" gutterBottom>Về 5TRENDZ</Typography>
              <Typography variant="body2">
                5TRENDZ là shop thời trang dành cho giới trẻ, mang phong cách
                hiện đại, năng động và luôn bắt kịp xu hướng. Tại đây, bạn sẽ tìm thấy
                đa dạng mẫu mã từ streetwear cá tính đến trang phục thanh lịch,
                với chất liệu chất lượng, giá cả hợp lý và dịch vụ tận tâm.
                5TRENDZ – khẳng định cá tính, bắt nhịp xu hướng!
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>Thành viên nhóm</Typography>
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                <li>Nguyễn Văn A</li>
                <li>Trần Thị B</li>
                <li>Lê Văn C</li>
                <li>Phạm Thị D</li>
                <li>Đặng Văn E</li>
              </ul>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>Liên hệ</Typography>
              <Typography>Email: 5trendz@example.com</Typography>
              <Typography>Hotline: 0123 456 789</Typography>
              <Typography>Địa chỉ: 123 HN Street, Hà Nội</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </ThemeProvider>
  )
}
