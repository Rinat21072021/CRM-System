
import { Profile, Token, UserRegistration } from '../../../common/type/type';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'Auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://easydev.club/api/v1/auth/' }),
  
  endpoints: (builder) => ({
    registration: builder.mutation<UserRegistration, { values: Profile }>({
      query: (values) => ({
        url: 'signup ',
        method: 'POST',
        body: values,
      }),
    }),

    login: builder.mutation<Token, { login: string; password: string }>({
      query: ({ login, password }) => ({
        url: 'signin',
        method: 'POST',
        body: { login, password },
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'DELETE',
      }),
    }),
  }),
});
export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } = authApi;
