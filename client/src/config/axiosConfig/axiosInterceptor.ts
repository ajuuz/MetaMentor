import { useUserStore } from "@/zustand/userStore";
import type { AxiosInstance } from "axios";

export function setUpInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error:any) => {
      const originalRequest = error.config;

      const {logout} = useUserStore.getState()

        if (error.response?.status === 401 && !originalRequest.url.includes('/auth/refresh') && !originalRequest._retry) {
            try{
                console.log("error in access token",error.response.status);
                originalRequest._retry = true;
                await instance.post(`${import.meta.env.VITE_API_USER_BASE_URL}/auth/refresh`)
                return instance(originalRequest)
            }catch(error:any){
                logout()
                return Promise.reject(error)
            }
        }

        if(error.response?.status===403){
          logout()
        }
        
      return  Promise.reject(error)
    }
  );
}


//this is writted by me
//working of the response interceptor in 401:
//  when a protected route is access , and it return a 401 response. (because of authentication error, invalid token or no token etc).
// so when access token is not valid . it sends the 401 response which was a response to a new Request so _retry is false.
// it enters the if condition try to refresh access token by hitting /auth/refresh . where authentication and everything happens
// if the refresh token is valid create new access token and respond with a 200 success. which again calls the same previous endpoint which has to be called .
// if the refresh token is not valid . it will send 401 error. but this time it wont enters the if condition because of the condition url!==/auth/refresh
// so it goes to bottom Promise.reject and throw the error. which will be send to where it is called. 
// so here line 18 called that is await instance.post(`${import.meta.env.VITE_API_USER_BASE_URL}/auth/refresh`)
// since its a error it goes to the catch . and from where it is then throwed
