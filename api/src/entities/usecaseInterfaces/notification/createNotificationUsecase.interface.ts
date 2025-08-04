import { NotificationReqDTO } from "shared/dto/notificationDTO";


export interface ICreateNotificationUsecase{
    execute(notificationData:NotificationReqDTO):Promise<void>
}