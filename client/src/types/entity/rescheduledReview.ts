import type { ROLES } from "@/utils/constants"

export interface IRescheduleReviewEntity{
    _id:string,
    initiativeBy:ROLES
    reviewId:string,
    studentId:string,
    mentorId:string,
    studentText:string
    mentorText:string
    slot:{start:string,end:string}
    createdAt:string
    updatedAt:string
}