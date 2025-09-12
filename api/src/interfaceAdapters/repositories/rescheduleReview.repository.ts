import { BaseRepository } from "./base.repository";
import { IRescheduleReviewEntity } from "entities/modelEntities/rescheduleReviewModel.entity";
import { IRescheduleReviewModel, RescheduleReviewModel } from "frameworks/database/models/rescheduleReview.model";
import { IRescheduleReviewRepository } from "entities/repositoryInterfaces/rescheduleReviewRepository.interface";

export class RescheduleReviewRepository
  extends BaseRepository<IRescheduleReviewEntity, IRescheduleReviewModel>
  implements IRescheduleReviewRepository
{
  constructor() {
    super(RescheduleReviewModel);
  }
}
