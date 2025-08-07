import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider, requestForToken } from '@/config/firebaseConfig/firebaseConfig'
import { useMutation } from "@tanstack/react-query";
import { googleAuth } from "@/services/authService.ts/authApi";
import { toast } from "sonner";
import { useUserStore } from "@/zustand/userStore";

const FirebaseAuthComponent = () => {

    const {login} = useUserStore()

    const mutation = useMutation({
        mutationFn:googleAuth,
        onSuccess:(response)=>{
            toast.success(response.message)
            login(response.data)
        },
        onError:(error)=>{
           toast.error(error.message)
        }
    })

    const handleGoogleLogin=async()=>{
    try{
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const idToken = await user.getIdToken()
      const fcmToken = await requestForToken()
      console.log(fcmToken)
      mutation.mutate({idToken,fcmToken})
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className='shadow-lg p-2 rounded-lg flex justify-center'>
        <FcGoogle onClick={handleGoogleLogin} className="text-xl"/>
    </div>
  )
}

export default FirebaseAuthComponent
