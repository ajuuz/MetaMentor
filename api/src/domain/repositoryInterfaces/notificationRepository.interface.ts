import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { INotificationModel } from "infrastructure/database/models/notification.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface INotificationRepository
  extends IBaseRepository<INotificationEntity, INotificationModel> {
  updateMany(userId: string): Promise<void>;
}
