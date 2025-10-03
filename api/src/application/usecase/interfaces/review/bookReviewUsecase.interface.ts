import { BookReviewReqDTO } from "application/dto/requset/payment.dto";
import { IReviewModel } from "infrastructure/database/models/bookedSlot.model";


export interface IBookReviewUsecase {
  create(
    studentId: string,
    reviewDetails: BookReviewReqDTO
  ): Promise<string>;
  save(review: IReviewModel): Promise<void>;
}
