import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";
import { IGetNotificationUsecase } from "entities/usecaseInterfaces/notification/getNotificationUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetNotificationUsecase implements IGetNotificationUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {}
  async execute(
    userId: string,
    filter: "all" | "unRead"
  ): Promise<INotificationEntity[]> {
    let findFilter: Partial<INotificationEntity> = { userId };
    if (filter === "unRead") findFilter.isRead = false;
    const notifications = await this._notificationRepository.findWhole(
      findFilter
    );

    return notifications;
  }
}
