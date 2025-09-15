import { INotificationEntity } from "domain/entities/notificationModel.entity";

export interface IGetNotificationUsecase {
  execute(
    userId: string,
    filter: "all" | "unRead"
  ): Promise<INotificationEntity[]>;
}
