import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";
import { BaseRepository } from "./base.repository";
import { INotificationModel, notificationModel } from "frameworks/database/models/notification.model";
import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";



export class NotificationRepository extends BaseRepository<INotificationEntity,INotificationModel> implements INotificationRepository{
    constructor(){
        super(notificationModel)
    }
}