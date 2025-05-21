import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import authService from '~/service/auth.service'
import { Routes } from '~/config'

export const login = createAsyncThunk(
  'user/login',
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const res = await authService.login(credentials)

      navigate(Routes.admin.dashboard)

      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(
  'user/logout',

  async ({ credentials, navigate }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.currentUser.REFRESH_TOKEN_EXPIRY ?? getState().user.currentUser.ACCESS_TOKEN_EXPIRY
      console.log('flag 1', token)

      if (!token) {
        navigate(Routes.auth.login)
        return 'Logout success'
      }

      console.log('flag 2')
      const res = await authService.logout(credentials)

      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)