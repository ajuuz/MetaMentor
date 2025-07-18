import type { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "@/utils/constants"


export type ReviewEntity={
    _id:string,
    studentId:string,
    mentorId:string,
    domainId:string,
    levelId:string,
    slot:{
        day:string,
        start:number,
        end:number
    },
    feedBack:string,
    payment:{
        method:PAYMENT_METHOD,
        status:PAYMENT_STATUS
    },
    status:REVIEW_STATUS
}

export type BookReviewDTO=Pick<ReviewEntity,'mentorId'|'domainId'|'levelId'|'slot'>

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
        start:number,
        end:number
    }
}

export type GetStudentReviewResponseDTO={
    mentorName:string,
    domainName:string
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
        start:number,
        end:number
    }
}