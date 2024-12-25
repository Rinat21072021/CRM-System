import { createSlice } from '@reduxjs/toolkit';
import { UserRegistration } from '../../../common/type/type';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  } as UserRegistration,
  reducers: (create) => {
    return {
      setUserRegistration: create.reducer<{ initialState: UserRegistration }>(
        (state, action) => {
          state.email = action.payload.initialState.email;
          state.login = action.payload.initialState.login;
          state.password = action.payload.initialState.password;
          state.username = action.payload.initialState.username;
          state.phoneNumber = action.payload.initialState.phoneNumber;
        },
      ),
    };
  },
  // {
  //   setUserRegistration: (
  //     state,
  //     action: PayloadAction<{ initialState: UserRegistration }>,
  //   ) => {
  //     state.email = action.payload.initialState.email;
  //     state.login = action.payload.initialState.login;
  //     state.password = action.payload.initialState.password;
  //     state.username = action.payload.initialState.username;
  //     state.phoneNumber = action.payload.initialState.phoneNumber;
  //   },
  // },
});

export const { setUserRegistration } = authSlice.actions;
export const authReducer = authSlice.reducer;
