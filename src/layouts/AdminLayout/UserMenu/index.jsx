import React, { useState } from 'react'
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '~/redux/thunks/user.thunk'
import { useDeviceId } from '~/hooks/useDeviceId'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

import { capitalizeFirstLetter } from '~/utils/formatter'
import useUserInfo from '~/hooks/useUserInfo'

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const deviceId = useDeviceId()
  const navigate = useNavigate()
  const { roles } = useAuth()
  const { nameInfo, avatarImgUrl } = useUserInfo()
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    const userId = user.USER_ID
    dispatch(logout({ credentials: { userId, deviceId }, navigate }))
    handleClose()
  }

  return (
    <>
      <Button onClick={handleClick} variant='text'>
        <Avatar sx={{ mr: 1 }} alt={nameInfo?.firstName} src={avatarImgUrl} />
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', textTransform: 'none' }}>
          <Typography sx={{ color: '#4A4A4A', fontWeight: '500' }} variant='body1'>
            {nameInfo?.fullName}
          </Typography>
          <Typography sx={{ color: 'rgba(74, 73, 74, 0.8)' }} variant='body2'>
            {roles.map(role => capitalizeFirstLetter(role)).join(', ')}
          </Typography>
        </Box>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu