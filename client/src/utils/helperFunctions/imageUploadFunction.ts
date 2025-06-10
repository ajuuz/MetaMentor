import { uploadImage } from "@/services/commonApi";

export const imageUploader=async(images:Blob[])=>{
        const imageData = new FormData();
        images.forEach((image)=>{
            imageData.append('image',image);
        })
    try{
        const imageUploadResult = await uploadImage(imageData);
        return imageUploadResult.data;
    }
    catch(error){
        throw error;
    }
}