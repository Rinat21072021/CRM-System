import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://easydev.club/api/v1/',
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    },
    
  }),
  endpoints: () => ({}),
  tagTypes: ['Todolist'],
})




// import axios from "axios";

// export const instance = axios.create({
//   baseURL: 'https://easydev.club/api/v1/',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json; charset=UTF-8',
//   },
// });

// instance.interceptors.request.use((config)=>{
//    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
//    return config
// })