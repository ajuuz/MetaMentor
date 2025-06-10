import axios from 'axios';

export const userAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_USER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true, 
});