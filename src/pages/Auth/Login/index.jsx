import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import IconifyIcon from '../IconifyIcon'
import LoginForm from './LoginForm'

import { useDispatch } from 'react-redux'
import { login } from '~/redux/thunks/user.thunk'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (data) => {
    dispatch(login({ credentials: data, navigate }))
  }
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f3f8fc, #eaf1f8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sign In
          </Typography>

          <Typography variant="body2" sx={{ mb: 3 }}>
            Don’t have an account?
            <Link
              href="/register"
              underline="hover"
              sx={{ ml: 0.75 }}
            >
              Create One Now!
            </Link>
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: 999, p: 1 }}
            >
              <IconifyIcon icon="eva:google-fill" color="error.main" />
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: 999, p: 1 }}
            >
              <IconifyIcon icon="gg:facebook" color="primary.main" />
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: 999, p: 1 }}
            >
              <IconifyIcon icon="logos:twitter" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoginForm handleLogin={handleLogin}/>
        </Card>
      </Container>
    </Box>
  )
}

export default LoginPage
