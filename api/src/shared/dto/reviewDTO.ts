import { PAYMENT_STATUS, REVIEW_STATUS } from "shared/constants";


export type GetReviewResponseDTO={
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