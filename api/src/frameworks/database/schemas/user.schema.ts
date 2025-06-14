import mongoose from "mongoose";
import { IUserModel } from "../models/user.model";
import { GENDER, ROLES } from "shared/constants";

export const userSchema = new mongoose.Schema<IUserModel>({
    name:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    country:{
        type:String
    },
    gender:{
        type:String,
        enum:Object.values(GENDER)
    },
    mobileNumber:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:Object.values(ROLES),
        default:ROLES.USER
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})