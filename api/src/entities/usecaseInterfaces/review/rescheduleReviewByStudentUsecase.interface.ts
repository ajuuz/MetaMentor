import { RescheduleReviewByStudReqDTO } from "shared/dto/request/review.dto";


export interface IRescheduleReviewByStudentUsecase{
    execute(studentId:string,rescheduleDetails:RescheduleReviewByStudReqDTO):Promise<void>
}