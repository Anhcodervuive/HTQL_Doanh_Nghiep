// ResetPasswordForm.jsx
import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'

const ResetPasswordForm = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = (data) => {
    console.log('Reset password to:', data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Please enter your new password' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="New Password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Confirm New Password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
            />
          )}
        />

        <Button
          fullWidth
          type="submit"
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
        >
          Reset Password
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>

      <Typography textAlign="center" fontWeight={400} color="text.primary" variant="subtitle1">
        Remembered your password?
      </Typography>

      <Button
        component={Link}
        href="/login"
        fullWidth
        size="large"
        type="button"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#1E00FF',
          color: '#fff',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#1400cc',
          },
        }}
      >
        Back to Sign-in
      </Button>
    </form>
  )
}

export default ResetPasswordForm
