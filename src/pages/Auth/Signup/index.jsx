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
import SignupForm from './SignupForm'

const SignupPage = () => {
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
      <Container sx={{ width: { sm : '40%', lg: '70%' } }}>
        <Card
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            Sign Up
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
            Already have an account?
            <Link
              href="/login"
              underline="hover"
              sx={{ ml: 0.75, fontWeight: 500 }}
            >
              Sign In Now!
            </Link>
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '999px',
                p: 1,
                width: '200px',
              }}
            >
              <IconifyIcon icon="eva:google-fill" color="error.main" />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '999px',
                p: 1,
                width: '200px',
              }}
            >
              <IconifyIcon icon="gg:facebook" color="primary.main" />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '999px',
                p: 1,
                width: '200px',
              }}
            >
              <IconifyIcon icon="logos:twitter" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <SignupForm />
        </Card>
      </Container>
    </Box>
  )
}

export default SignupPage
