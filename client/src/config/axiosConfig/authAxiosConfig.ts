import axios from 'axios';

export const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true, 
});
