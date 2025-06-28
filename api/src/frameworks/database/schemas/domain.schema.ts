import mongoose from "mongoose";
import { IDomainModel } from "../models/domain.model";

export const domainSchema = new mongoose.Schema<IDomainModel>({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    motive:{
        type:String,
        required:true
    }
})