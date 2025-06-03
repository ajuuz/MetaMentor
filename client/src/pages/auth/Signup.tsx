//components
import SelectComponent from '@/components/common/SelectComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

//api services
import { signup } from '@/services/authService.ts/authApi';

//types
import type { AuthFormErrorsType, AuthFormType } from '@/types/auth/authTypes';

//hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';


//utils
import { toast } from 'sonner';
import countries from 'world-countries';
import { signupValidation } from '@/utils/validations/signupValidation';


const Signup = () => {

  const countryNames = countries.map(c => c.name.common);
  const [formData, setFormData] = useState<AuthFormType>({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPwd: '',
    country: '',
    gender:''
  })

  const [errors, setErrors] = useState<AuthFormErrorsType>({})
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn:signup,
    onSuccess:(data)=>{
      toast.success(data.message);
      navigate('/otp',{state:{email:formData.email}})
    },
    onError:(error)=>{
      toast.error(error?.message || "Login failed. Please try again.");
    }
  })

  const handleSelectChange=(placeHolder:string,value:string)=>{
    setFormData((prevData) => ({
      ...prevData,
      [placeHolder]: value
    }));
  }

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async() => {

      const {country,gender,...rest} = formData;
      const validationErrors = signupValidation(rest);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
          setTimeout(()=>{
            setErrors({});
          },2000)
          return;
      }

      const {confirmPwd,...userData} = formData;
      mutation.mutate(userData)
  }
  

  return (
    <div className='flex items-center justify-center h-screen'>

        <div className='p-8 rounded-lg flex flex-col gap-10 '>
          <h1 className='text-3xl font-semibold text-center text-[#E63946]'>Signup</h1>
          <form  className='flex flex-col gap-3'>

            <div className=''>
              <div className='flex flex-col'>
                <Label htmlFor="name">Full Name</Label>
                <Input onChange={handleChange} className='w-full' name='name'/>
              </div>
            <p className='text-red-400 text-xs'>{errors.name}</p>
            </div>

            <div className='flex flex-col gap-2'>
            <Label htmlFor="email">Email</Label>
            <Input onChange={handleChange} type="email"  className='w-full' name='email'/>
            <p className='text-red-400 text-xs'>{errors.email}</p>
            </div>

            <div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input onChange={handleChange} type="text"  className='w-full' name='mobileNumber'/>
              </div>
              <p className='text-red-400 text-xs'>{errors.mobileNumber}</p>
            </div>

            <div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="password">Password</Label>
                <Input onChange={handleChange} type="password"  className='w-full' name='password'/>
              </div>
              <p className='text-red-400 text-xs'>{errors.password}</p>
            </div>


            <div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="confirmPwd">Confirm Password</Label>
                <Input onChange={handleChange}  type="password"  className='w-full' name='confirmPwd'/>
              </div>
            <p className='text-red-400 text-xs'>{errors.confirmPwd}</p>
            </div>


            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="country">Country</Label>
                <SelectComponent placeHolder='country' handleSelectChange={handleSelectChange} content={countryNames}/>
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="gender">Gender</Label>
                <SelectComponent placeHolder='gender' handleSelectChange={handleSelectChange} content={["male","female","other"]} />
              </div>
            </div>
          </form>
          
          <Button disabled={mutation.isPending} onClick={handleSubmit} className='signupButton bg-[#E63946] text-white py-2 rounded-lg hover:bg-[#dc2f3c] transition-colors'>{mutation.isPending?<span className="loader"></span>:"Signup"}</Button>
          <p className='text-center text-sm'>Already have an account? <a href="/login" className='text-[#E63946] hover:underline'>Login</a></p>
        </div>
    </div>
  )
}

export default Signup
