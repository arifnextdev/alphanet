//auth slice

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../services/auth';

const initialState: IUser = {
  id: '',
  name: '',
  email: '',
  status: '',
  provider: '',
  roles: [],
  avatar: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.status = action.payload.status;
      state.provider = action.payload.provider;
      state.roles = action.payload.roles;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setAuth } = authSlice.actions;
