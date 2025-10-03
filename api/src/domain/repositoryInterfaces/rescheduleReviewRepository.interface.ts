import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";

import { IRescheduleReviewModel } from "infrastructure/database/models/rescheduleReview.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface IRescheduleReviewRepository
  extends IBaseRepository<IRescheduleReviewEntity, IRescheduleReviewModel> {}
