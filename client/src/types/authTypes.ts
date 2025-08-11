export type AuthFormType = {
    name: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPwd: string;
    country: string;
    gender: string;
};




export type AuthFormErrorsType = {
    name?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPwd?: string;
    country?:string,
    gender?:string
};