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
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
        p: 3
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#4A4A4A',
          fontWeight: 400,
          textTransform: 'uppercase',
          pb: 4,
        }}
      >
        Personal Info
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          size='small'
          label="first name"
          defaultValue=""
        />
        <TextField
          error
          size='small'
          label="last name"
          defaultValue=""
        />
        <FormControl sx={{ minWidth: 120 }} size='small'>
          <InputLabel id="admin-user-gender-label">Gender</InputLabel>
          <Select
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
        <Button variant="contained" component="label">
                  Upload File
          <input type="file" hidden />
        </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Birth" />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          type="email"
          size='small'
          label="Email"
          defaultValue=""
        />
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

      </Box>
    </Box>
  )
}

export default UserForm