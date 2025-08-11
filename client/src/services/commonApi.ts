import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";


export const uploadImage =async (imageData:FormData)=>{
    try{
        const response = await userAxiosInstance.post('/common/images/upload',imageData,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        return response.data;
    }
    catch(error:any)
    {
        if(!error.response){
            throw error;
        }
        else{
        throw error.response.data;
        }    
    }
}

export const eventSourceProvider=(email:string):EventSource=>{
    const baseUri=userAxiosInstance.getUri()
    const eventSource = new EventSource(`${baseUri}/common/eventSource/${email}`)
    return eventSource
}


export const saveFcmToken=async(fcmToken:string)=>{
    await userAxiosInstance.post('/common/fcmTokens',{fcmToken})
}