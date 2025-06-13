
import bcrypt from 'bcrypt'

export const hashPassword=async(password:string):Promise<string>=>{
    const saltRound = 10;
    const hashedPassword =await bcrypt.hash(password,saltRound);
    return hashedPassword
}

export const comparePassword=async(password:string,userPassword:string):Promise<boolean>=>{
    return await bcrypt.compare(password,userPassword)
}