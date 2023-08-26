import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserSchema, User } from '../types/user'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/jsonSettings'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/lodalStorage'
import { setFeatureFlags } from '@/shared/lib/features'

const initialState: UserSchema = {
  _inited: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
    },
    initAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
      state._inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
      if (state.authData) {
        state.authData.jsonSettings = action.payload
      }
    })
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
