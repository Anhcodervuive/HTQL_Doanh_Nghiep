import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '../IconifyIcon';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <TextField fullWidth name="email" label="Email address" size="medium" />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          size="medium"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <IconifyIcon
                      icon={showPassword ? 'majesticons:eye' : 'majesticons:eye-off'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          size="medium"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={showConfirmPassword ? 'majesticons:eye' : 'majesticons:eye-off'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Button
        fullWidth
        variant="contained"
        size="large"
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
        onClick={handleClick}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignupForm;
