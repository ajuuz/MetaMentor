import { BaseRepository } from "./base.repository";
import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";
import {
  IRescheduleReviewModel,
  RescheduleReviewModel,
} from "frameworks/database/models/rescheduleReview.model";
import { IRescheduleReviewRepository } from "domain/repositoryInterfaces/rescheduleReviewRepository.interface";

export class RescheduleReviewRepository
  extends BaseRepository<IRescheduleReviewEntity, IRescheduleReviewModel>
  implements IRescheduleReviewRepository
{
  constructor() {
    super(RescheduleReviewModel);
  }
}
