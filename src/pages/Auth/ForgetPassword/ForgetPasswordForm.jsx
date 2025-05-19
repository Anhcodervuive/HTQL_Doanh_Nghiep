import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const ForgetPasswordForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Reset password for:', data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Please enter email' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email address"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
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
          Send Reset Password Link
        </Button>
      </Stack>
    </form>
  )
}

export default ForgetPasswordForm
