import mongoose from "mongoose";
import { INotificationModel } from "../models/notification.model";
import { NOTIFICATION_TYPE } from "shared/constants";



export const notificationSchema = new mongoose.Schema<INotificationModel>({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:NOTIFICATION_TYPE
    },
    title:{
        type:String,
    },
    body:{
        type:String,
        required:true,
    },
    isRead:{
        type:Boolean,
        defualt:false
    }
},{timestamps:true})