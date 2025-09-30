import { IReviewEntity } from "domain/entities/reviewModel.entity";
import { IReviewModel } from "infrastructure/database/models/bookedSlot.model";
import { BookReviewReqDTO } from "application/dto/requset/payment.dto";


export interface IBookReviewUsecase {
  create(
    studentId: string,
    reviewDetails: BookReviewReqDTO
  ): Promise<string>;
  save(review: IReviewModel): Promise<void>;
}
