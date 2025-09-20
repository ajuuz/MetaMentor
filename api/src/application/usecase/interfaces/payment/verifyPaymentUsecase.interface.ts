import { VerifyPaymentReqDTO } from "application/dto/requset/payment.dto";

export interface IVerifyPaymentUsecase {
  execute(
    studentId: string,
    paymentAndReviewDetails: VerifyPaymentReqDTO
  ): Promise<void>;
}
