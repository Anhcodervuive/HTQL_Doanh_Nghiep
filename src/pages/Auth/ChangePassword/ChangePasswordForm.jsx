import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import authService from '~/service/auth.service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDeviceId } from '~/hooks/useDeviceId'

const ChangePasswordForm = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const user = useSelector(state => state.user.currentUser)
  const userId = user?.USER_ID
  const deviceId = useDeviceId()

  const onSubmit = async (data) => {
    try {
      const oldPassword = data.oldPassword
      const newPassword = data.newPassword

      const response = await authService.changePassword(
        oldPassword,
        newPassword,
        deviceId,
        userId
      )

      if (response.success) {
        alert(response.message || 'Đổi mật khẩu thành công!')
        navigate('/profile')
      } else {
        alert(response.message || 'Đổi mật khẩu thất bại.')
      }
    } catch (error) {
      console.error('Lỗi đổi mật khẩu:', error)
      alert('Mật khẩu không đúng.')
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <Controller
          name="oldPassword"
          control={control}
          defaultValue=""
          rules={{ required: 'Vui lòng nhập mật khẩu cũ' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Mật khẩu hiện tại"
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          rules={{ required: 'Vui lòng nhập mật khẩu mới', minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' } }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Mật khẩu mới"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: 'Vui lòng xác nhận lại mật khẩu',
            validate: value => value !== watch('password') || 'Mật khẩu không khớp'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Xác nhận mật khẩu mới"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
          Đổi mật khẩu
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          HOẶC
        </Typography>
      </Divider>

      <Typography textAlign="center" fontWeight={400} color="text.primary" variant="subtitle1">
        Quay lại trang cá nhân?
      </Typography>
    </form>
  )
}

export default ChangePasswordForm
