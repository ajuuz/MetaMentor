import mongoose from "mongoose";
import { ICommunityModel } from "../models/community.model";


export const communitySchema = new mongoose.Schema<ICommunityModel>({

    communityId:{
        type:mongoose.Schema.ObjectId,
        ref:'domains',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})