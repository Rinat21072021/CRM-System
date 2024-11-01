import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserRegistration } from '../../type/type';

const initialState: UserRegistration = {
  login: '',
  username: '',
  password: '',
  email: '',
  phoneNumber: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserRegistration: (
      state,
      action: PayloadAction<{ initialState: UserRegistration }>,
    ) => {
      state.email = action.payload.initialState.email;
      state.login = action.payload.initialState.login;
      state.password = action.payload.initialState.password;
      state.username = action.payload.initialState.username;
      state.phoneNumber = action.payload.initialState.phoneNumber;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserRegistration } = authSlice.actions;
export const authReducer = authSlice.reducer;
