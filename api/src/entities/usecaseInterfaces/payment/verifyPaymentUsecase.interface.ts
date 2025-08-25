import { VerifyPaymentReqDTO } from "shared/dto/request/payment.dto";

export interface IVerifyPaymentUsecase{
    execute(studentId:string,paymentAndReviewDetails:VerifyPaymentReqDTO):Promise<void>
}