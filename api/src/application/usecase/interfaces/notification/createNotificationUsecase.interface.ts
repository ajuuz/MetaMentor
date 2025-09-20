import { INotificationEntity } from "domain/entities/notificationModel.entity";

export interface ICreateNotificationUsecase {
  execute(
    notificationData: Omit<
      INotificationEntity,
      "isRead" | "createdAt" | "updatedAt"
    >
  ): Promise<void>;
}
