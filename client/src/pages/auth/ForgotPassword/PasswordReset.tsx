import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { formDataValidation } from '@/utils/validations/formDataValidation'
import './forgotPassword.css'
import {AnimatePresence, motion} from 'framer-motion'
import type { AuthFormErrorsType } from '@/types/authTypes'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/services/authService.ts/authApi'
import { toast } from 'sonner'
import LoadingSpinnerComponent from '@/components/common/LoadingSpinnerComponent'

const PasswordReset = () => {
    const [formData,setFormData] = useState({
      password:'',
      confirmPwd:''
    })
    const [error,setError]=useState<Pick<AuthFormErrorsType,'password'|'confirmPwd'>>({})
    const navigate=useNavigate()
    const {token} = useParams()

    const {mutate:resetPasswordMutation,isPending:resetPasswordLoading}=useMutation({
      mutationFn:resetPassword,
      onSuccess:(response)=>{
        toast.success(response.message)
        navigate('/login')
      },
      onError:(error)=>{
        toast.error(error.message)
      }
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit=()=>{
       const error = formDataValidation(formData);
       if(Object.values(error).length>0){
          setError(error)
          console.log
          setTimeout(()=>{
            setError({})
          },3000)
       }

       const password = formData.password
       resetPasswordMutation({password,token:token as string})
    }

  return (
   <div className='outer-div flex items-center justify-center h-screen'>
        <div className='p-8 rounded-lg flex flex-col gap-10 w-96'>
          <h1 className='text-3xl font-semibold text-center text-[#E63946]'>Password Reset</h1>

          <form action="" className='flex flex-col gap-9'>

            <div className='flex flex-col gap-2'>
               <Label htmlFor="email sample">Password</Label>
               <div className='relative overflow-hidden border rounded-lg'>
                   <AnimatePresence>
                   {error.password &&
                   <motion.div 
                   initial={{x:'-100%'}}
                   animate={{x:0}}
                   style={{ fontSize: `70%`}}
                   exit={{x:'-100%'}}
                   transition={{duration:1}}
                   className={`h-full text-white flex justify-center items-center font-semibold w-full absolute bg-red-400 rounded-lg p-1 text-center`}>
                     {error.password}
                   </motion.div>
                   }
                   </AnimatePresence>
                  <Input onChange={handleChange} className={`w-full  ${error.password && "border-red-400 border-2"} `} name='password' type="password"/>
               </div>
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor="email">Re Enter Password</Label>
                <div className='relative overflow-hidden border rounded-lg'>
                  <AnimatePresence>
                  {error.confirmPwd &&
                  <motion.div 
                  initial={{x:'-100%'}}
                  animate={{x:0}}
                  style={{ fontSize: `70%`}}
                  exit={{x:'-100%'}}
                  transition={{duration:1}}
                  className={`h-full text-white flex justify-center items-center font-semibold w-full absolute bg-red-400 rounded-lg p-1 text-center`}>
                    {error.confirmPwd}
                  </motion.div>
                  }
                  </AnimatePresence>
                  <Input onChange={handleChange} className={`w-full  ${error.confirmPwd && "border-red-400 border-2"} `} name='confirmPwd' type="password"/>
                </div>
            </div>

          </form>
          <Button disabled={resetPasswordLoading} onClick={handleSubmit} className='bg-[#E63946] text-white py-2 rounded-lg hover:bg-[#dc2f3c] transition-colors'>{resetPasswordLoading?<LoadingSpinnerComponent/>:"Submit"}</Button>
        </div>
    </div>
  )
}

export default PasswordReset
