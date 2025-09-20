import { ROLES } from "shared/constants"


export interface IRescheduleReviewEntity{
    _id:string,
    initiativeBy:ROLES.USER|ROLES.MENTOR
    reviewId:string,
    studentId:string,
    mentorId:string,
    studentText:string
    mentorText:string
    slot:{start:Date,end:Date}
    createdAt:string
    updatedAt:string
}