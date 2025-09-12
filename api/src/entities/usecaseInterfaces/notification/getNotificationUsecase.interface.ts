import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";

export interface IGetNotificationUsecase {
  execute(userId:string,filter: "all" | "unRead"): Promise<INotificationEntity[]>;
}
