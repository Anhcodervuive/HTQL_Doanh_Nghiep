import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useForm, Controller } from 'react-hook-form'
import { emailRegex } from '~/config/formValidateRegex'

import IconifyIcon from '../IconifyIcon'

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [gender, setGender] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit, watch, formState: { errors } } = useForm()

  const validateAge = (value) => {
    const birthDate = new Date(value)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 16 ? true : 'Bạn phải đủ 16 tuổi'
    }
    return age >= 16 ? true : 'Bạn phải đủ 16 tuổi'
  }


  const sumbmit = (data) => {
    console.log(data)
  }

  const handleChange = (event) => {
    setGender(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit(sumbmit)}>
      <Grid container spacing={2.5} sx={{ mb: 3, p: 2, overflowY: 'auto', height: { xs: '300px', lg: 'auto' } }}>
        <Grid size={{ xs: 12, lg : 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Vui lòng nhập email', pattern: { value: emailRegex, message: 'Email không hợp lệ' } }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                name="email"
                label="Email address"
                size="medium"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Vui lòng nhập password', minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' } }}
            render={({ field }) => (
              <TextField
                {...field}
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
              required: 'Vui lòng nhập password',
              minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
              validate: value => value === watch('password') || 'Mật khẩu không khớp' }}
            render={({ field }) => (
              <TextField
                {...field}
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, lg : 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Vui lòng nhập tên đăng nhập', }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                name="username"
                label="Tên đăng nhập"
                size="medium"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'Vui lòng nhập họ', }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  name="firstName"
                  label="Họ"
                  size="medium"
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: 'Vui lòng nhập Tên', }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  name="lastName"
                  label="Tên"
                  size="medium"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="signup-gender-label">Giới tính</InputLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: 'Vui lòng chọn giới tính', }}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{ height: '100%' }}
                    labelId="signup-gender-label"
                    id="gender"
                    value={gender}
                    label="giới tính"
                    name='gender'
                    onChange={handleChange}
                    error={!!errors.gender}
                  >
                    <MenuItem value={'Male'}>Nam</MenuItem>
                    <MenuItem value={'Female'}>Nữ</MenuItem>
                    <MenuItem value={'Other'}>Khác</MenuItem>
                  </Select>
                )}
              />
              {errors.gender && <Typography variant='body1' color='error'>{errors.gender.message}</Typography>}
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ p: 0, }}>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{ required: 'Vui lòng chọn ngày sinh', validate: validateAge }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Ngày sinh"
                        name='dob'
                        value={field.value || null}
                        onChange={(date) => field.onChange(date)}
                        renderInput={(params) => (
                          <TextField {...params} error={!!errors.dob} helperText={errors.dob?.message} />
                        )}
                      />
                    )}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {errors.dob && <Typography variant='body1' color='error'>{errors.dob.message}</Typography>}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Button
        type="submit"
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
      >
        Sign Up
      </Button>
    </form>
  )
}

export default SignupForm
