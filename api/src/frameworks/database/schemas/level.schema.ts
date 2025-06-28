import mongoose from "mongoose";
import { ILevelModel } from "../models/level.model";

export const levelSchema = new mongoose.Schema<ILevelModel>({
    domainId:{
        type:mongoose.Schema.ObjectId,
        ref:'domains',
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    taskFile:{
        type:String,
        required:true
    }
})