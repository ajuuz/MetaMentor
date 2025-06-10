import { ObjectId } from "mongoose"
import { ROLES } from "shared/constants"


export namespace UserUpdateDTO{
   export type filter={
        _id:string
        name:string,
        email:string,
    }

   export type update={
        name:string,
        country:string,
        gender:string,
        mobileNumber:string,
        email:string,
        password:string,
        role:ROLES,
        isVerified:boolean
    }
}