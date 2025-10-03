import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";
import { IRescheduleReviewRepository } from "domain/repositoryInterfaces/rescheduleReviewRepository.interface";

import {
  IRescheduleReviewModel,
  RescheduleReviewModel,
} from "infrastructure/database/models/rescheduleReview.model";

import { BaseRepository } from "./base.repository";

export class RescheduleReviewRepository
  extends BaseRepository<IRescheduleReviewEntity, IRescheduleReviewModel>
  implements IRescheduleReviewRepository
{
  constructor() {
    super(RescheduleReviewModel);
  }
}
