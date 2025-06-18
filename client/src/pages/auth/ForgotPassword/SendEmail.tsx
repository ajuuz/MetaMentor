import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasswordSendMail } from "@/services/authService.ts/authApi"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const SendEmail = () => {

    const [email,setEmail]=useState<string>("")
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn:forgotPasswordSendMail,
        onSuccess:(response)=>{
            toast.success(response.message)
            navigate('/forgotPassword/success')
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{        
        setEmail(e.target.value)
    }

    const handleSubmit=()=>{
        if(!email.trim()) return
        mutation.mutate(email)
    }
  return (
    <div className='flex items-center justify-center h-screen'>

        <div className='p-8 rounded-lg flex flex-col gap-10 w-96'>
          <h1 className='text-3xl font-semibold text-center text-[#E63946]'>EMAIL VERIFICATION</h1>
          <form action="" className='flex flex-col gap-9'>
            <div className='flex flex-col gap-2'>
            <Label htmlFor="email">Email</Label>
            <Input onChange={handleChange} className='w-full' name='email'/>
            </div>
          </form>
          <Button onClick={handleSubmit} className='bg-[#E63946] text-white py-2 rounded-lg hover:bg-[#dc2f3c] transition-colors'>Submit</Button>
        </div>
    </div>
  )
}

export default SendEmail
