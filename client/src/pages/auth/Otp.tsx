import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "@/services/authService.ts/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Otp = () => {
    const [otp,setOtp]=useState<string>("")
    const [otpSend,setOtpSend] = useState<boolean>(false)
    
    const [timer,setTimer]=useState<number>(()=>{
      const storedTimer = localStorage.getItem('timer')
      return storedTimer ? parseInt(storedTimer) : 60
    });

    const location = useLocation()
    const navigate = useNavigate();
    
    const {mutate:verifyOtpMutation,isPending:verifyOtpLoading} = useMutation({
        mutationFn:verifyOtp,
        onSuccess:(response)=>{
            toast.success(response.message);
            navigate('/login');
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    const {mutate:resendOtpMutaion,isPending:resendOtpLoading}=useMutation({
      mutationFn:resendOtp,
      onSuccess:(response)=>{
        toast.success(response.message)
        setOtpSend(true)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
    })

    useEffect(()=>{
      const timerInterval=setInterval(()=>{

        setTimer((prev)=>{
          if(prev<=1){
              clearInterval(timerInterval)
              localStorage.removeItem('timer')
              return 0
          }
          localStorage.setItem('timer',JSON.stringify(prev-1))
          return prev-1
        })
      },1000)

      return ()=>clearInterval(timerInterval)
    },[otpSend])

    
    const email:string = location?.state?.email
    console.log(email)
    if(!email) return <Navigate to="/"/>

    const handleOtpSubmit=async()=>{
        verifyOtpMutation({email,otp})
    }

    const handleResendOtp=()=>{
        resendOtpMutaion(email)
    }
    
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="bg-white  flex flex-col gap-10 pt-10 px-20 pb-10">
            <h1 className="text-center text-3xl">Enter  OTP</h1>
          <div>

          <InputOTP value={otp} maxLength={6} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div>{timer>0?`OTP will expires in ${timer}s`:<span onClick={()=>handleResendOtp()} className="underline text-sm text-muted-foreground">Resend</span>}</div>
          </div>
          <Button disabled={verifyOtpLoading} onClick={handleOtpSubmit}>VERIFY</Button>
        </div>
    </div>

  );
};

export default Otp;
