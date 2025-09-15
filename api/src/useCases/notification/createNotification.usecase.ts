import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";
import { ICreateNotificationUsecase } from "entities/usecaseInterfaces/notification/createNotificationUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateNotificationUsecase implements ICreateNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {}
  async execute(
    notificationData: Omit<
      INotificationEntity,
      "isRead" | "createdAt" | "updatedAt"
    >
  ): Promise<void> {
    await this._notificationRepository.insertOne(notificationData);
  }
}
