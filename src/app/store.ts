import { configureStore } from '@reduxjs/toolkit';
import {  authApi } from '../features/auth/api/authApi'
import { todolistsApi } from '../api/api';

export const store = configureStore({
  reducer: {
    [todolistsApi.reducerPath]: todolistsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(todolistsApi.middleware, authApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
