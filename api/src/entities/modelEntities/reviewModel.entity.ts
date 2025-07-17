import { ObjectId } from "mongoose";
import { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "shared/constants";


export interface IReviewEntity{
    _id:ObjectId,
    studentId:ObjectId,
    mentorId:ObjectId,
    domainId:ObjectId,
    levelId:ObjectId,
    mentorEarning:number,
    commissionAmount:number,
    payment:{
        method:PAYMENT_METHOD,
        status:PAYMENT_STATUS
    },
    status:REVIEW_STATUS
    slot:{
        day:string,
        start:string,
        end:string
    },
    feedBack:string,
    bookedAt:Date
}