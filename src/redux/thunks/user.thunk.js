import { createAsyncThunk } from '@reduxjs/toolkit'

import authService from '~/service/auth.service'
import { Routes } from '~/config'
import userService from '~/service/user.service'
import { toast } from 'react-toastify'

export const login = createAsyncThunk(
  'user/login',
  async ({ credentials, method = 'default' }, { rejectWithValue }) => {
    try {
      let res

      if (method === 'google') {

        res = await authService.google_login(credentials.token, credentials.deviceId)
      } else {

        res = await authService.login(credentials)
      }
      if (!res.success) {
        return rejectWithValue(res.message || 'Đăng nhập thất bại!')
      }
      return res.data


    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'Đăng nhập thất bại!'
      toast.error(errorMessage)
      return rejectWithValue(errorMessage)
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
      navigate(Routes.auth.login)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ credentials, payload, navigate }, { rejectWithValue }) => {
    try {
      const res = await userService.updateProfile(payload, credentials)


      navigate(Routes.user.profile)
      return res?.data?.user_data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const verifyUser = createAsyncThunk(
  'user/verify',
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const res = await authService.verify(credentials)
      // setIsLoading(false)
      return res?.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)