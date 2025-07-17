import { VerifyPaymentDTO } from "shared/dto/paymentDTO";

export interface IVerifyPaymentUsecase{
    execute(studentId:string,{razorPayDetails,reviewDetails}:VerifyPaymentDTO):Promise<void>
}