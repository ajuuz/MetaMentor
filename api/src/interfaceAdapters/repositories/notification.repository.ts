import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";
import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";
import {
  INotificationModel,
  notificationModel,
} from "frameworks/database/models/notification.model";

import { BaseRepository } from "./base.repository";

export class NotificationRepository
  extends BaseRepository<INotificationEntity, INotificationModel>
  implements INotificationRepository
{
  constructor() {
    super(notificationModel);
  }

  async updateMany(userId:string):Promise<void>{
     await notificationModel.updateMany({userId,isRead:false},{isRead:true})
  }
}
