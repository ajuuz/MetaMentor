import axios from "axios";
import { setUpInterceptors } from "./axiosInterceptor";


export const mentorInstance = axios.create({
    baseURL:import.meta.env.VITE_API_MENTOR_BASE_URL,
     headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
})

setUpInterceptors(mentorInstance)