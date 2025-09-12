import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";
import { IMarkAsReadUsecase } from "entities/usecaseInterfaces/notification/markAsReadUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class MarkAsReadUsecase implements IMarkAsReadUsecase {
  constructor(
    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {}
  async execute(userId: string): Promise<void> {
    await this._notificationRepository.updateMany(userId);
  }
}
