import { IBaseRepository } from "./baseRepository.interface";
import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";
import { IRescheduleReviewModel } from "infrastructure/database/models/rescheduleReview.model";

export interface IRescheduleReviewRepository
  extends IBaseRepository<IRescheduleReviewEntity, IRescheduleReviewModel> {}
