import axios from "axios";
import { setUpInterceptors } from "./axiosInterceptor";

export  const adminAxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_ADMIN_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true, 
})

setUpInterceptors(adminAxiosInstance)