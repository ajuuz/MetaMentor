import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";
import { INotificationModel } from "frameworks/database/models/notification.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface INotificationRepository
  extends IBaseRepository<INotificationEntity, INotificationModel> {
  updateMany(userId: string): Promise<void>;
}
