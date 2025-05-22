import { createAsyncThunk } from '@reduxjs/toolkit'

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
      const tokenExpString = getState().user.currentUser.REFRESH_TOKEN_EXPIRY ?? getState().user.currentUser.ACCESS_TOKEN_EXPIRY
      const tokenExpTime = new Date(tokenExpString)
      const now = new Date()

      if (now > tokenExpTime) {
        console.log('logout local ', 'token exp: ', tokenExpTime, 'Now: ', now)
        navigate(Routes.auth.login)
        return 'Logout success'
      }

      console.log('Log out call API server')
      const res = await authService.logout(credentials)

      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)