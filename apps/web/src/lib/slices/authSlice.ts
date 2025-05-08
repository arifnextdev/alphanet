//auth slice

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../services/auth';

interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

  const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      console.log('action.payload', action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;


export default authSlice.reducer;