"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Cross, X} from "lucide-react";
import InputImageComponent from "@/components/common/InputImageComponent";
import { registrationFormValidation } from "@/utils/validations/registrationFormValidation";
import type { MentorRegistrationErrorType } from "@/types/mentorType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { imageUploader } from "@/utils/helperFunctions/imageUploadFunction";
import { getDomainsNameAndId, registerForm } from "@/services/mentorService.ts/registrationApi";
import { useNavigate, useParams } from "react-router-dom";
import { acceptMentorApplication, getSpecificMentor } from "@/services/adminService.ts/mentorApi";
import { MENTOR_APPLICATION_STATUS, type MentorApplicationStatus } from "@/utils/constants";
import './MentorDetailsManage.css'
import {AnimatePresence, motion} from 'framer-motion'
import  LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import { getSpecificUser } from "@/services/userService/userApi";
import type { UserDetailsType } from "@/types/userType";
import type { DomainEntity } from "@/types/domainTypes";



export default function MentorDetailsManage() {

  //states
  const [userDetails,setUserDetails] = useState<Omit<UserDetailsType,"_id"|"role"|"isVerified">>({
    name:'',
    email:"",
    country:null,
    gender:null,
    mobileNumber:null,
    profileImage:"",
  })

  const [domains, setDomains] = useState<Pick<DomainEntity,'_id'|'name'>[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Pick<DomainEntity,'_id'|'name'>[]>([]);

  const [companyName,setCompanyName]=useState<string>('')
  const [workedAt,setWorkedAt]=useState<string[]>([])

  const [skillName,setSkillName]=useState<string>("");
  const [skills,setSkills] = useState<string[]>([]);

  const [images,setImages]=useState<(Blob|null|string)[]>([null,null])

  const [about,setAbout] = useState<string>("");
  const [fee,setFee] = useState<number>(0);
  const [feeError,setFeeError]=useState<string>('');

  const [errors,setErrors] = useState<MentorRegistrationErrorType>({})
  const [loading,setLoading] = useState<boolean>(false)

  const [isRejecting,setIsRejecting]=useState<boolean>(false)
  const [rejectionReason,setRejectionReason] = useState<string>('')
  const [rejectionReasonError,setRejectionReasonError] = useState<string>('')


  //router-dom
  const navigate = useNavigate();
  const {mentorId} = useParams()

  const pathname = window.location.pathname
  const purpose={
    adminVerification:pathname.split('/')[1]==="admin",
    mentorRegister:pathname.split('/')[1]==="mentor" && pathname.split('/')[2]==="register",
    mentorProfile:pathname.split('/')[1]==="mentor" && pathname.split('/')[2]==="profile"
  }

  //useEffect mutations
  const {mutate:mentorAplicationDetailsFetchMutation}=useMutation({
    mutationFn:getSpecificMentor,
    onSuccess:(response)=>{
      const mentor = response.data; 
      const {about,domains,skills,workedAt,cv,experienceCirtificate,_id,userId,isBlocked,fee,...rest} =mentor 
      setUserDetails(rest);
      setFee(fee)
      setAbout(about);
      setSelectedDomains(domains);
      setSkills(skills)
      setWorkedAt(workedAt)
      setImages([cv,experienceCirtificate])
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })

  const {mutate:userDetailsFetchMutation} = useMutation({
      mutationFn:getSpecificUser,
      onSuccess:(user)=>{
        setUserDetails(user)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
  })

  const {mutate:getDomainsNameAndIdMutation} = useMutation({
      mutationFn:getDomainsNameAndId,
      onSuccess:(response)=>{
        const domains=response.data
        setDomains(domains)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
  })

   
  //handle submit button mutations
  const {mutate:mentorRegisterMutation} = useMutation({
    mutationFn:registerForm,
    onSuccess:(response)=>{
      toast.success(response.message)
      navigate('/')
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })

  const {mutate:mentorRegisterVerifyMutation,isPending:verificationLoading}=useMutation({
    mutationFn:acceptMentorApplication,
    onSuccess:(response)=>{
      toast.success(response.message)
      navigate('/admin/mentors')
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  

  useEffect(()=>{
      if(purpose.adminVerification && mentorId){
        mentorAplicationDetailsFetchMutation(mentorId)
      }else if(purpose.mentorRegister){
        userDetailsFetchMutation();
        getDomainsNameAndIdMutation()
      }
  },[])

  const handleSelectDomain=(index:number)=>{
        const domain=domains[index];
        setSelectedDomains(prev=>[...prev,domain])
        setDomains(prev=>prev.filter((_,i)=>index!==i))
  }

  const handleRemoveSelectedDomain=(index:number)=>{
        const domain=selectedDomains[index];
        setDomains(prev=>[...prev,domain])
        setSelectedDomains(prev=>prev.filter((_,i)=>index!==i))
  }

  const handleAddCompany=()=>{
    const company = companyName.trim();
    if(!company || workedAt.includes(company)){
        return
    }
    setWorkedAt(prev=>[...prev,companyName])
    setCompanyName("")
  }

  const handleAddSkills=()=>{
     const skill = skillName.trim();
    if(!skill || skills.includes(skill)){
        return
    }
    setSkills(prev=>[...prev,skill])
    setSkillName("")
  }


  const handleDescriptionChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setAbout(e.target.value)
  }


  const handleSubmit=async()=>{
      const errors = registrationFormValidation(selectedDomains,about,workedAt,skills,images as (Blob|null)[])
      if(Object.values(errors).length>0){
        setErrors(errors);
        setTimeout(()=>{
          setErrors({})
        },5000)
        return
      }
      if(fee<0 && fee>700) return setFeeError('value should inside 0 - 700');

      try{
        setLoading(true)
        const imageUrls = await imageUploader(images as Blob[])

        const cv = imageUrls[0].public_id
        const experienceCirtificate = imageUrls[1].public_id

        const domains=selectedDomains.map(domain=>domain._id);
        mentorRegisterMutation({domains,about,workedAt,skills,cv,experienceCirtificate,fee})
        setLoading(false)
      }catch(error:any){
        setLoading(false)
        toast.error(error.message)
      }
  }

  const handleVerify=(status:MentorApplicationStatus)=>{
    if(mentorId){
      const isValid=/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{6,}$/.test(rejectionReason)
      if(status===MENTOR_APPLICATION_STATUS.REJECTED  && !isValid) {
        setRejectionReasonError("Reason should have more than 5 alphabets");
        return
      };
      mentorRegisterVerifyMutation({mentorId,email:userDetails?.email,status,reason:rejectionReason})
    }
  }

  const handleFeeChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value=Number(e.target.value)
      setFee(value)
  }
  
  
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Reviewer Registeration</h1>

      <Card className="p-6">

        <CardContent className="grid grid-cols-1  md:grid-cols-2 gap-10">

           <div className="col-span-2 flex justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <img  src={userDetails?.profileImage?userDetails.profileImage:"https://imgs.search.brave.com/bWNFz9pFC1Ul5pZ7ql6Z9qc1cTlkBrZbXMdCTkoMqeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFuLWF2YXRh/ci1wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bl8yNjg4MzQtNTM4/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"} alt="Profile" className="w-20 h-20 rounded-full" />
              </div>
           </div>

          <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
            <Input  placeholder="Enter your name" value={userDetails?.name} disabled/>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Country</Label>
            <Input  placeholder="Enter your Country" value={userDetails?.country||"N/A"} disabled/>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Gender</Label>
            <Input  placeholder="Enter your Gender" value={userDetails?.gender||"N/A"} disabled/>
          </div>

          <div className="col-span-1">
            <Label>My Email Address</Label>
            <p className="text-sm text-muted-foreground mt-1">{userDetails?.email}</p>
            <p className="text-xs text-gray-400">1 month ago</p>
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            
            <div className="flex gap-4">

                {!purpose.adminVerification &&
                <div className="flex-1  flex flex-col gap-2">
                 <Label className="">Domains you know</Label>
                  <div className=" border flex flex-wrap p-5 gap-5 h-full">
                    {domains.map((domain,index)=>(
                      <div onClick={()=>handleSelectDomain(index)} className="cursor-pointer py-2 px-3  bg-black text-white rounded-lg">{domain.name}</div>
                    ))
                  }
                </div>
                </div>
                }

                <div className="flex-1 flex flex-col gap-2">
                 <Label className="">Selected Domain</Label>
                  <div className="border flex flex-wrap p-5 gap-5 h-full">
                      {selectedDomains.map((domain,index)=>(
                          <div className="cursor-pointer py-2 px-3 relative bg-black text-white rounded-lg">
                              {!purpose.adminVerification &&
                                <div onClick={()=>handleRemoveSelectedDomain(index)} className="scale-75 -right-2 -top-2 bg-red-500 rounded-4xl absolute">
                                  <Cross className="scale-75 rotate-45"/>
                              </div>
                              }
                              {domain.name}
                          </div>
                      ))
                      }
                  </div>
                </div>

            </div>
          </div>
          <p className="text-red-300">{errors?.selectedDomainsError}</p>

          <div className="col-span-2 flex flex-wrap gap-2">
            <Label>Describe Yourself</Label>
            <Textarea
              value={about}
              disabled={purpose.adminVerification}
              onChange={handleDescriptionChange}
              rows={4}
              placeholder="18y Exp | Top 1% Mentor | Technology Leader | 10x Engineer | Founder\nAs a seasoned Engineering Manager..."
            />
            <p className="text-red-300">{errors?.descriptionError}</p>
          </div>
          

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <Label>Worked At</Label>
            {!purpose.adminVerification &&
              <div className="flex gap-2">
                <Input value={companyName} onChange={(e)=>setCompanyName(e.target.value)}  placeholder="place holder..." />
                <Button onClick={handleAddCompany}>ADD</Button>
            </div>
            }
             <div className="flex flex-col gap-2">
                {workedAt.map(((company,index)=>
                <div className="border-2 p-2 rounded-lg relative">
                {company}
                    {!purpose.adminVerification && <Cross onClick={()=>setWorkedAt((prev)=>prev.filter((_,ind)=>index!==ind))} className="rotate-45 top-2 right-2  text-white bg-red-500 rounded-4xl absolute p-1"/>}
                </div>
                ))}
            </div>
            <p className="text-red-300">{errors?.workedAtError}</p>
          </div>

          <div className="flex flex-col gap-2  col-span-2 md:col-span-1">
            <Label>Skills</Label>
            {!purpose.adminVerification &&
              <div className="flex gap-2">
                <Input value={skillName} onChange={(e)=>setSkillName(e.target.value)}  placeholder="place holder..." />
                <Button onClick={handleAddSkills}>ADD</Button>
            </div>
            }
             <div className="flex flex-col gap-2">
                {skills.map(((skill,index)=>
                <div className="border-2 p-2 rounded-lg relative">
                {skill}
                    {!purpose.adminVerification && <Cross onClick={()=>setSkills((prev)=>prev.filter((_,ind)=>index!==ind))} className="rotate-45 top-2 right-2  text-white bg-red-500 rounded-4xl absolute p-1"/>}
                </div>
                ))}
            </div>
            <p className="text-red-300">{errors?.skillsError}</p>
          </div>

          
          <div className="flex flex-col gap-2">
            <Label>Fee</Label>
            <div className="flex items-center gap-4">
            <Input onChange={handleFeeChange} type="number" value={fee} min={0} className="w-20"/> Rs
            </div>
            {feeError && <p className="text-red-500">{feeError}</p>}
          </div>
          
          {purpose.mentorRegister
            ?<InputImageComponent containerDivStyle=" col-span-2  grid grid-cols-1 md:grid-cols-2 gap-6 mt-4" images={images as (Blob|null)[]} setImages={setImages as React.Dispatch<React.SetStateAction<(null|Blob)[]>>} labels={["Add CV","Add Verification Certificate"]}/>
            :<div className="col-span-2 md:flex flex flex-col gap-4 justify-around">
              <img src={import.meta.env.VITE_CLOUDINARY_BASE_URL+'/'+images[0] as string} alt="" className=" border" />
              <img src={import.meta.env.VITE_CLOUDINARY_BASE_URL+"/"+images[1] as string} alt="" className="border"/>
            </div>
          }
          <p className="text-red-300">{errors?.images}</p>

        </CardContent>
          <Button disabled={loading || verificationLoading} onClick={purpose.mentorRegister?handleSubmit:()=>handleVerify(MENTOR_APPLICATION_STATUS.ACCEPTED)}>{(loading || verificationLoading)?<LoadingSpinnerComponent/>:purpose.adminVerification?"Verify":"submit"}</Button>
          {purpose.adminVerification && <Button onClick={()=>setIsRejecting(true)}>Reject</Button>}


          {/* Reject Reason specifying div */}
          <AnimatePresence>
          {isRejecting &&
            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.4 }}
            className="RejectReasonDiv w-full  fixed ">
            <div className="w-[70%] p-5 flex flex-col gap-4 items-center">
              <X onClick={()=>setIsRejecting(false)} strokeWidth={3} className="absolute right-2 top-2 bg-black text-white rounded-3xl p-1 "/>
              <Label className="text-center font-bold ">REASON FOR REJECTION</Label>
              <Textarea onChange={(e)=>setRejectionReason(e.target.value)} className="border-2 bg-white" placeholder="Enter your reason here..."/>
              <p className="text-red-300">{rejectionReasonError}</p>
              <Button disabled={verificationLoading} className="w-full" onClick={()=>handleVerify(MENTOR_APPLICATION_STATUS.REJECTED)}>{verificationLoading?<LoadingSpinnerComponent/>:"SUBMIT"}</Button>
            </div>
          </motion.div>
          }
          </AnimatePresence>


      </Card>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          <span className="font-bold text-black">META <span className="text-red-600">MENTOR</span></span><br />
          Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
        </p>
        <p className="mt-4">&copy; 2025 Meta Mentor. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
