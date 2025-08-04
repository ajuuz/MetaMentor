import { uploadImage } from "@/services/commonApi";

export const imageUploader=async(images:Blob[]|File[])=>{
        const imageData = new FormData();
        images.forEach((image)=>{
            imageData.append('image',image);
        })
        const imageUploadResult = await uploadImage(imageData);
        return imageUploadResult.data;
}