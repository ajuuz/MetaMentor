import type { PAYMENT_METHOD, PAYMENT_STATUS, REVIEW_STATUS } from "@/utils/constants"

export type ReviewSlot={
        day:string,
        start:number,
        end:number
}

export type ReviewEntity={
    _id:string,
    studentId:string,
    mentorId:string,
    domainId:string,
    levelId:string,
    slot:ReviewSlot,
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

export type GetDomainReviewSlotResponseDTO={
    mentorId:string,
    slots:ReviewSlot[]
}