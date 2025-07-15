import type { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "@/utils/constants"


export type ReviewEntity={
    _id:string,
    studentId:string,
    mentorId:string,
    domainId:string,
    levelId:string,
    slot:{
        day:string,
        start:string,
        end:string
    },
    feedBack:string,
    payment:{
        method:PAYMENT_METHOD,
        status:PAYMENT_STATUS
    },
    status:REVIEW_STATUS
}

export type ReviewCardData={
    mentorName:string,
    level:{
        name:string,
        taskFile:string,
    },
    status:REVIEW_STATUS,
    payment:{
        method:string,
        status:PAYMENT_STATUS
    },
    feedBack:string,
    slot:{
        day:string,
        start:string,
        end:string
    }
}