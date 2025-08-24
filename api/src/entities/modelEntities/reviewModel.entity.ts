import { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "shared/constants";


export interface IReviewEntity{
    _id:string,
    studentId:string,
    mentorId:string,
    domainId:string,
    levelId:string,
    mentorEarning:number,
    commissionAmount:number,
    payment:{
        method:PAYMENT_METHOD,
        status:PAYMENT_STATUS
    },
    status:REVIEW_STATUS
    slot:{
        isoStartTime:Date,
        isoEndTime:Date,
        day:string,
        start:number,
        end:number
    },
    feedBack:string,
    bookedAt:Date
}