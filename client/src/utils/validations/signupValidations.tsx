import type { AuthFormType,AuthFormErrorsType } from "@/types/authTypes";


export const signupValidation = (formData:Omit<AuthFormType,'country'|'gender'>):AuthFormErrorsType => {

    const errors:AuthFormErrorsType={}
    for(const i in formData) {
        const key = i as keyof typeof formData;
        const value = formData[key];

        if (key==='name' && (value==="" || value===null)) {
                errors[key] = `${key} is required`
        } else if(key==='name' && /^[A-Za-z\s]{3,20}$/.test(value)===false){
                errors[key] = "Name must contain only letters and at least 2 characters. format"
        }

        if (key==='email' && (value==="" || value===null)) {
               errors[key] =  `${key} is required`
        } else if(key==='email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)===false){
               errors[key] =  "Email must be a valid email address"
        }
       
        if (key==='mobileNumber' && (value==="" || value===null)) {
               errors[key] =  `${key} is required`
        } else if(key==='mobileNumber' && /^\d{10}$/.test(value)===false){
               errors[key] =  "Mobile number must be a valid 10-digit number"
        }

        if (key==='password' && (value==="" || value===null)) {
               errors[key] =  `${key} is required`
        } else if(key==='password' && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)===false){
              errors[key] =  "Password must be at least 8 characters long and contain at least one letter and one number"
        }

        if (key==='confirmPwd' && (value==="" || value===null)) {
              errors[key] =  `${key} is required`
        } else if(key==='confirmPwd' && value !== formData.password){
              errors[key] =  "Confirm password must match the password"
        }
    }

    return errors;
}