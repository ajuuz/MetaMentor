import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "shared/constants";

type ReviewSlot={
    day:string,
    start:number,
    end:number
}

export type BookReviewDTO={
    studentId:string,
    mentorId:string,
    domainId:string,
    levelId:string,
    amount:number,
    mentorEarning:number,
    commissionAmount:number,
    payment:{
        method:PAYMENT_METHOD,
        status:PAYMENT_STATUS
    },
    slot:{
        day:string,
        start:string,
        end:string
    },
}

export type GetDomainReviewResponseDTO={
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
    slot:ReviewSlot
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
    slot:ReviewSlot
}

