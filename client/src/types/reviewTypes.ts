import type { PAYMENT_METHOD, PAYMENT_STATUS, ReviewStatus } from "@/utils/constants"

export type ReviewSlot={
        _id:string,
        isoStartTime:string,
        isoEndTime:string,
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
    status:ReviewStatus
}

export type BookReviewDTO=Pick<ReviewEntity,'mentorId'|'domainId'|'levelId'|'slot'>

export type StudentReviewCard={
    _id:string,
    mentorName:string,
    commissionAmount:number,
    mentorEarning:number,
    level:{
        name:string,
        taskFile:string,
    },
    status:ReviewStatus,
    payment:{
        method:string,
        status:PAYMENT_STATUS
    },
    feedBack:string,
    slot:ReviewSlot
}

export type MentorReviewCard={
    _id:string,
    student:{
        name:string,
        profileImage:string
    },
    domainName:string,
    level:{
        name:string,
        taskFile:string,
    },
    status:ReviewStatus,
    payment:{
        method:string,
        status:PAYMENT_STATUS
    },
    feedBack:string,
    slot:ReviewSlot  & {isoStartTime:Date,isoEndTime:Date}
}

export type GetReviewsForMentorResponse={
    reviews:MentorReviewCard[],
    totalPages:number
}




export type GetStudentReviewResponseDTO={
    _id:string,
    mentor:{
        name:string,
        profileImage:string,
    },
    domainName:string
    level:{
        name:string,
        taskFile:string,
    },
    status:ReviewStatus,
    payment:{
        method:string,
        status:PAYMENT_STATUS
    },
    feedBack:string,
    slot:ReviewSlot & {isoStartTime:Date,isoEndTime:Date}
}

export type GetReviewsForStudentResponse={
    reviews:GetStudentReviewResponseDTO[],
    totalPages:number
}

export type GetDomainReviewSlotResponseDTO={
    mentorId:string,
    slots:ReviewSlot[]
}