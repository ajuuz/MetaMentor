import SelectComponent from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSpecificUser } from "@/services/userService.ts/userApi";
import type { UserDetailsType } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { Edit, Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner";
import countries from "world-countries";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

    const [errors,setErrors] = useState<Pick<UserDetailsType,"name"|"mobileNumber">>({
        name:"",
        mobileNumber:null
    })

    const countryNames = useMemo(()=>countries.map(c => c.name.common),[]);

    const {mutate:detailsFetchMutation} = useMutation({
        mutationFn:getSpecificUser,
        onSuccess:(response)=>{
            setUserDetails(response.data)
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })


    useEffect(()=>{
        detailsFetchMutation()
    },[])

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSelectChange=(placeHolder:string,value:string)=>{
        setUserDetails((prev)=>({...prev,[placeHolder]:value}))
    }

    // const validation

   const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    mobileNumber: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit number"),
    });

    

    const handleUpdate=()=>{
        const fieldErrors=profileSchema.safeParse(userDetails);
        

    }

  return (
        <div className="flex flex-col gap-5 px-5 z-1 w-[450px]  relative">
            <div onClick={()=>setIsViewMode(prev=>!prev)} className="absolute top-2 right-2 border-4 bg-red-300 border-red-400 text-red-100 p-2 rounded-4xl scale-75">{isViewMode?<Edit/>:<Eye/>}</div>

            <div className="flex items-center gap-3">
                {userDetails?.profileImage
                    ?<img src={userDetails.profileImage} alt={`${userDetails.name}'s profile pic`} />
                    :<div className=" bg-black text-white rounded-[50%] p-6 px-8 font-bold text-xl">A</div>}
                <div>
                    <p className="text-6xl font-medium">{userDetails?.name.toUpperCase()}</p>
                    <span className="text-muted-foreground">{userDetails?.email}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input onChange={handleInputChange} name="name" value={userDetails?.name} disabled={isViewMode}/>
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                    <Label>Mobile Number</Label>
                    <Input onChange={handleInputChange} name="mobileNumber" value={userDetails?.mobileNumber||""} disabled={isViewMode}/>
                </div>

                <div className="flex flex-col gap-2">
                     <Label>Gender</Label>
                    <SelectComponent disabled={isViewMode} placeHolder={userDetails?.country||"Country"} handleSelectChange={handleSelectChange} content={countryNames} />
                </div>

                <div className="flex flex-col gap-2 ms-4">
                    <Label>Gender</Label>
                    <SelectComponent disabled={isViewMode} placeHolder={userDetails?.gender||'gender'} handleSelectChange={handleSelectChange} content={["male","female","other"]}/>
                </div>

                {!isViewMode && <Button className="col-span-2">Update</Button>}
            </div>
        </div>
  )
}

export default Profile
