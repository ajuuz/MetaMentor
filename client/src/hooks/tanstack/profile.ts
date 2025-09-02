import { getSpecificUser } from "@/services/userService/userApi";
import type { UserDetailsType } from "@/types/userType";
import { useQuery } from "@tanstack/react-query";



export const useProfileQuery=()=>{
    return useQuery<Omit<UserDetailsType,"role"|"isVerified"|"_id">>({
        queryKey:['enrolledDomain'],
        queryFn:()=> getSpecificUser()
    })
};