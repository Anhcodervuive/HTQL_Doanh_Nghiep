import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '../IconifyIcon';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Stack spacing={2.5} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        size={isSmUp ? 'medium' : 'small'}
        name="email"
        label="Email address"
      />
      <TextField
        fullWidth
        size={isSmUp ? 'medium' : 'small'}
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <IconifyIcon
                    icon={
                      showPassword
                        ? 'majesticons:eye'
                        : 'majesticons:eye-off'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack direction="row" justifyContent="flex-end">
        <Link
          href="/forget-password"
          variant="subtitle2"
          underline="hover"
        >
          Forgot password?
        </Link>
      </Stack>
      <Button
        fullWidth
        variant="contained"
        size={isSmUp ? 'large' : 'medium'}
        onClick={handleClick}
        sx={{
          backgroundColor: '#1E00FF',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 2,
          py: 1.5,
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#1400cc',
          },
        }}
      >
        Login
      </Button>
    </Stack>
  );
};

export default LoginForm;
