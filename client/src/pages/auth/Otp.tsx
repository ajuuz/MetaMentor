import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "@/services/authService.ts/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Otp = () => {
    const [otp,setOtp]=useState<string>("")
    const location = useLocation()
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn:verifyOtp,
        onSuccess:(response)=>{
            toast.success(response.message);
            navigate('/login');
        },
        onError:(error)=>{
            console.log(error.message)
        }
    })
    
    const {email} = location.state;

    const handleOtpSubmit=async()=>{
        mutation.mutate({email,otp})
    }
    
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="bg-white  flex flex-col gap-10 pt-10 px-20 pb-10">
            <h1 className="text-center text-3xl">Enter  OTP</h1>
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
          <Button disabled={mutation.isPending} onClick={handleOtpSubmit}>VERIFY</Button>
        </div>
    </div>

  );
};

export default Otp;
