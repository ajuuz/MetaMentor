import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";


export interface ICreateNotificationUsecase{
    execute(notificationData:Omit<
          INotificationEntity,
          "isRead" | "createdAt" | "updatedAt"
        >):Promise<void>
}