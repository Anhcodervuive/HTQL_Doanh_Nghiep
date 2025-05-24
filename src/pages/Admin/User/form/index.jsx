import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ImageUploader from '~/components/ImageUploader'
import LocationSelector from '~/components/LocationSelector'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useForm, Controller } from 'react-hook-form'
import { emailRegex } from '~/config/formValidateRegex'
import IconifyIcon from '~/pages/Auth/IconifyIcon'


function UserForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { control, handleSubmit, watch, formState: { errors } } = useForm()

  const submit = (data) => {
    console.log(data)
  }

  return (
    <form
      style={{
        backgroundColor: '#fff',
        padding: '24px'
      }}
      onSubmit={handleSubmit(submit)}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#4A4A4A',
          fontWeight: 400,
          textTransform: 'uppercase',
          pb: 4,
          height: 'fit-content',
        }}
      >
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={6}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Controller
                name="firstname"
                control={control}
                defaultValue=""
                rules={{ required: 'Vui lòng nhập Họ' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    name="firstname"
                    label="Họ"
                    size="medium"
                    error={!!errors.firstname}
                    helperText={errors.firstname ? errors.firstname.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="lastname"
                control={control}
                defaultValue=""
                rules={{ required: 'Vui lòng nhập Tên' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    name="lastname"
                    label="Tên"
                    size="medium"
                    error={!!errors.lastname}
                    helperText={errors.lastname ? errors.lastname.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="create-update-user-gender-label">Giới tính</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Vui lòng chọn giới tính', }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      sx={{ height: '100%' }}
                      labelId="create-update-user-gender-label"
                      id="gender"
                      // value={gender}
                      label="giới tính"
                      name='gender'
                      error={!!errors.gender}
                    >
                      <MenuItem value={'male'}>Nam</MenuItem>
                      <MenuItem value={'female'}>Nữ</MenuItem>
                      <MenuItem value={'other'}>Khác</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && <Typography variant='body1' color='error'>{errors.gender.message}</Typography>}
              </FormControl>
            </Grid>
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ p: 0, width: '100%' }}>
                  <DatePicker label="Birth" sx={{ height: '100%' }} name='birth' />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid size={12}>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{ required: 'Vui lòng nhập Số điện thoại', validate: (value) => { if (!matchIsValidTel(value)) return 'Số điện thoại không hợp lệ' } }}
                render={({ field }) => (
                  <MuiTelInput
                    {...field}
                    fullWidth
                    name='phoneNumber'
                    label='Số điện thoại'
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="addressSelector"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value || Object.keys(value?.city).length === 0) {
                      return 'Vui lòng nhập vào Thành phố/Tỉnh'
                    } else if (Object.keys(value?.district).length === 0) {
                      return 'Vui lòng chọn Quận/Huyện'
                    } else if (Object.keys(value?.ward).length === 0) {
                      return 'Vui lòng nhập vào Phường, Thị xã,...'
                    }
                  } }}
                render={({ field, fieldState }) => (
                  <LocationSelector
                    value={{
                      city: 'Cần Thơ',
                      district: 'Ninh Kiều',
                      ward: 'An Khánh',
                    }}
                    onChange={field.onChange}
                    error={fieldState.error}
                  />
                )}
              />
              {/* <LocationSelector /> */}
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="address1"
                label="Địa chỉ 1"
                size="medium"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="address2"
                label="Địa chỉ 2"
                size="medium"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <ImageUploader onImageUpload={(data) => {console.log(data)}} />
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        sx={{
          color: '#4A4A4A',
          fontWeight: 400,
          textTransform: 'uppercase',
          pb: 4,
          height: 'fit-content',
        }}
      >
        Thông tin tài khoản
      </Typography>
      <Grid container spacing={2}>
        <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          <Box sx={{ display: 'flex', gap: 2 }}>
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
                validate: value => value === watch('password') || 'Mật khẩu không khớp'
              }}
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
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button type='submit' variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </form>
  )
}

export default UserForm