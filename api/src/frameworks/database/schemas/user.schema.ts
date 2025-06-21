import mongoose from "mongoose";
import { IUserModel } from "../models/user.model";
import { GENDER, ROLES } from "shared/constants";

export const userSchema = new mongoose.Schema<IUserModel>({
    name:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null,
    },
    gender:{
        type:String,
        enum:Object.values(GENDER),
        default:null,
    },
    mobileNumber:{
        type:Number,
        default:null
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        default:null
    },
    googleId:{
        type:String,
        default:null
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