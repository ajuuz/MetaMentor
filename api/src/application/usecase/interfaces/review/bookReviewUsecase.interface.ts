import { IReviewEntity } from "domain/entities/reviewModel.entity";
import { IReviewModel } from "infrastructure/database/models/bookedSlot.model";
import { BookReviewReqDTO } from "application/dto/requset/payment.dto";

type ReviewDetails = Omit<IReviewEntity, "">;

export interface IBookReviewUsecase {
  create(
    studentId: string,
    reviewDetails: BookReviewReqDTO
  ): Promise<IReviewModel>;
  save(review: IReviewModel): Promise<void>;
}
