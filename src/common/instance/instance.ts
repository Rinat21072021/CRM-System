import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

instance.interceptors.request.use((config)=>{
   config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
   return config
})