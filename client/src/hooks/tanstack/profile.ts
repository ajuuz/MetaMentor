import { getProfile } from "@/services/userService/userApi";
import type { UserDetailsRes } from "@/types/response/user";
import { useQuery } from "@tanstack/react-query";



export const useProfileQuery=()=>{
    return useQuery<UserDetailsRes>({
        queryKey:['enrolledDomain'],
        queryFn:()=> getProfile()
    })
};