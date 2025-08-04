import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { INotificationModel } from "frameworks/database/models/notification.model";



export interface INotificationRepository extends IBaseRepository<INotificationEntity,INotificationModel>{
    
}