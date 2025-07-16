import mongoose, { Schema } from "mongoose";
import { IReviewModel } from "../models/bookedSlot.model";
import { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "shared/constants";

export const reviewSchema:Schema<IReviewModel>=new mongoose.Schema<IReviewModel>({
    studentId:{
       type:mongoose.Schema.ObjectId,
       ref:'students',
       required:true
    },
    mentorId:{
       type:mongoose.Schema.ObjectId,
       ref:'users',
       required:true
    },
    domainId:{
       type:mongoose.Schema.ObjectId,
       ref:'domains',
       required:true
    },
    levelId:{
       type:mongoose.Schema.ObjectId,
       ref:'levels',
       required:true
    },
    mentorEarning:{
        type:Number,
        required:true,
    },
    commissionAmount:{
        type:Number,
        required:true,
    },
    slot:{
        type:{
            day:String,
            start:String,
            end:String
        }
    },
    feedBack:{
        type:String,
    },
    payment:{
        type:{
            method:{type:String,enum:PAYMENT_METHOD},
            status:{type:String,enum:PAYMENT_STATUS}
        }
    },
    status:{
        type:String,
        enum:REVIEW_STATUS
    }
},{timestamps:true})