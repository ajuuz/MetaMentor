import mongoose, { Schema } from "mongoose";
import { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "shared/constants";

import { IReviewModel } from "../models/bookedSlot.model";

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
            isoTime:Date,
            day:String,
            start:String,
            end:String
        }
    },
    feedBack:{
        type:String,
        default:''
    },
    payment:{
        type:{
            method:{type:String,enum:PAYMENT_METHOD,default:PAYMENT_METHOD.UPI},
            status:{type:String,enum:PAYMENT_STATUS,default:PAYMENT_STATUS.FAILED}
        }
    },
    status:{
        type:String,
        enum:REVIEW_STATUS,
        default:REVIEW_STATUS.PENDING
    },
    bookedAt:{
        type:Date,
        default:new Date()
    }
})