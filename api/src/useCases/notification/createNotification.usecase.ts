import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";
import { ICreateNotificationUsecase } from "entities/usecaseInterfaces/notification/createNotificationUsecase.interface";
import { NotificationReqDTO } from "shared/dto/notificationDTO";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateNotificationUsecase implements ICreateNotificationUsecase{

    constructor(
        @inject('INotificationRepository')
        private _notificationRepository:INotificationRepository
    ){}
    async execute(notificationData:NotificationReqDTO):Promise<void>{
        await this._notificationRepository.insertOne(notificationData)
    }
}