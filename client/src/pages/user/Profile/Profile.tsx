import { useEffect, useMemo, useState } from "react"
import { useMutation } from "@tanstack/react-query";

import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import SelectComponent from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { UserDetailsType } from "@/types/userType";

import { updateProfile } from "@/services/userService/userApi";
import { imageUploader } from "@/utils/helperFunctions/imageUploadFunction";

import { Edit, Eye, Image } from "lucide-react";

import countries from "world-countries";

import { toast } from "sonner";
import { useProfileQuery } from "@/hooks/profile";

const Profile = () => {
    const [isViewMode,setIsViewMode] = useState(true);
    const [userDetails,setUserDetails] = useState<Omit<UserDetailsType,"_id"|"role"|"isVerified">>({
         name:"",
         profileImage:null,
         country:null,
         gender:null,
         mobileNumber:null,
         email:"",
    })
    const [profileImage,setProfileImage] = useState<File|null>(null)
    const [errors,setErrors] = useState<Pick<UserDetailsType,"name"|"mobileNumber">>({
        name:"",
        mobileNumber:""
    })
    const [loading,setLoading] = useState<boolean>(false)
    const countryNames = useMemo(()=>countries.map(c => c.name.common),[]);

    const {data:profileData} = useProfileQuery()

    const {mutate:updateProfileMutation}=useMutation({
        mutationFn:updateProfile,
        onSuccess:(response)=>{
            toast.success(response.message)
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })


    useEffect(()=>{
        if(profileData){
            setUserDetails(profileData)
        }
    },[profileData])

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSelectChange=(key:string,value:string)=>{
        setUserDetails((prev)=>({...prev,[key]:value}))
    }

    const validation=()=>{
        let error:boolean=false;
        if(!userDetails.name.trim()){
            setErrors(prev=>({...prev,name:'name cannot be empty'}))
            error=true;
        }else if(/^[A-Za-z\s]{3,20}$/.test(userDetails.name)===false){
            setErrors(prev=>({...prev,name:'Name must contain only letters and at least 3 characters. format'}))
            error=true;
        }
        if(userDetails.mobileNumber && /^\d{10}$/.test(userDetails.mobileNumber)===false){
            setErrors(prev=>({...prev,mobileNumber:"Mobile number must be a valid 10-digit number"}))
            error=true;
        }
        return error;
    }

    const handleUpdate=async()=>{
        const isValid = validation();
        if(isValid){
            setTimeout(()=>{
                setErrors({name:"",mobileNumber:""})
            },2000)
            return;
        }
        try{
            if(profileImage){
                setLoading(true)
                const imageUrl = await imageUploader([profileImage])
                userDetails.profileImage=imageUrl[0].url
            }
            const {email,...updatedData} = userDetails;
            updateProfileMutation(updatedData)
            setLoading(false)
            setProfileImage(null)
            setIsViewMode(true)
        }
        catch(error:any){
            toast.error(error.message)
            setLoading(false)
        }

    }

    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?e.target.files[0]:null
    setProfileImage(file)
    }

  return (
        <div className="flex flex-col gap-5 px-5 z-1 w-[450px]  relative ">
            <div onClick={()=>setIsViewMode(prev=>!prev)} className="absolute top-2 right-2 border-4 bg-red-300 border-red-400 text-red-100 p-2 rounded-4xl scale-75 cursor-pointer">{isViewMode?<Edit/>:<Eye/>}</div>

            <div className="flex items-center gap-3">
                {isViewMode && userDetails.profileImage
                    ?<div className="bg-black/30 border-5 text-white rounded-[50%] p-3 text-[0.6rem] relative flex justify-center font-medium">
                        <img src={userDetails?.profileImage}  className="rounded-4xl" alt={`${userDetails.name}'s profile pic`} />
                    </div>
                    :!isViewMode
                    ?<Label htmlFor="profilePic" className={`bg-black/30 border-5 text-white rounded-[50%] ${profileImage?"p-3":"p-6"} text-[0.6rem] relative flex justify-center font-medium`}>
                        {
                        profileImage?
                        <img src={URL.createObjectURL(profileImage)} className="rounded-4xl" />
                        :<>
                            <span className="absolute top-2 text-muted">upload</span>
                                <Image/>
                            <span className="absolute bottom-2 text-muted">Image</span>
                        </>
                        }
                        <Input id="profilePic" type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
                    </Label>
                    :<div className=" bg-black text-white rounded-[50%] p-6 px-8 font-bold text-xl">A</div>}
                <div className={`${userDetails.profileImage && "flex flex-col gap-5"}`}>
                    <p className={`${userDetails.profileImage?"text-3xl":"text-4xl"} font-medium`}>{userDetails?.name.toUpperCase()}</p>
                    <span className="text-muted-foreground">{userDetails?.email}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input onChange={handleInputChange} name="name" value={userDetails?.name} disabled={isViewMode}/>
                    <p className='text-red-400 text-xs'>{errors.name}</p>
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Mobile Number</Label>
                    <Input onChange={handleInputChange} name="mobileNumber" value={userDetails?.mobileNumber||""} disabled={isViewMode}/>
                    <p className='text-red-400 text-xs'>{errors.mobileNumber}</p>
                </div>

                <div className="flex flex-col gap-2">
                     <Label>Country</Label>
                    <SelectComponent disabled={isViewMode} selectKey="country" placeHolder={userDetails?.country||"Country"}  handleSelectChange={handleSelectChange} content={countryNames} />
                </div>

                <div className="flex flex-col gap-2 ms-4">
                    <Label>Gender</Label>
                    <SelectComponent disabled={isViewMode} selectKey="gender" placeHolder={userDetails?.gender||'gender'} handleSelectChange={handleSelectChange} content={["male","female","other"]}/>
                </div>

                {!isViewMode && <Button disabled={loading} onClick={handleUpdate} className="col-span-2 cursor-pointer">{loading?<LoadingSpinnerComponent/>:"Update"}</Button>}
            </div>
        </div>
  )
}

export default Profile
