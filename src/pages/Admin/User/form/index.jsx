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
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ImageUploader from '~/components/ImageUploader'

function UserForm() {
  const [gender, setGender] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const handleChange = (event) => {
    setGender(event.target.value)
  }
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '400px',
        p: 3,
      }}
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
        Personal Info
      </Typography>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                fullWidth
                label="first name"
                defaultValue=""
              />
            </Grid>
            <Grid size={6}>
              <TextField
                error
                fullWidth
                label="last name"
                defaultValue=""
              />
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="admin-user-gender-label">Gender</InputLabel>
                <Select
                  sx={{ height: '100%' }}
                  labelId="admin-user-gender-label"
                  id="demo-simple-select-helper"
                  value={gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ p: 0, width: '100%' }}>
                  <DatePicker label="Birth" sx={{ height: '100%' }} />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                defaultValue=""
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid size={6}>
          <ImageUploader onImageUpload={(data) => {console.log(data)
          }} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default UserForm