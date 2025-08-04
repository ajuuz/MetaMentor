import mongoose from "mongoose";
import { IFcmTokenModel } from "../models/fcmToken.model";

export const fcmTokenSchema = new mongoose.Schema<IFcmTokenModel>({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
    },
    fcmToken:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*60*24*7
    }
})