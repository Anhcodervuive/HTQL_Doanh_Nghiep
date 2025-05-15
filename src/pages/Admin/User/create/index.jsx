import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

import { Routes } from '~/config'
import UserForm from '../form'

function UserCreate() {
  return (
    <Box
      sx={{
        minHeight: '700px'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Button variant='text' color='secondary' component={Link} to={Routes.admin.dashboard}>
          Admin
        </Button>
              &lt;
        <Button variant='text' color='secondary' component={Link} to={Routes.admin.user.list}>
          User
        </Button>
              &lt;
        create
      </Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add new user
      </Typography>
      <UserForm />
    </Box>
  )
}

export default UserCreate