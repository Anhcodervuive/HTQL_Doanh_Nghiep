import { createSlice } from '@reduxjs/toolkit'

import { login, logout } from '../thunks/user.thunk'

const initState = {
  currentUser: null,
  status: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success'
        state.currentUser = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(logout.fulfilled, () => {
        return initState
      })
  }
})

export default userSlice.reducer