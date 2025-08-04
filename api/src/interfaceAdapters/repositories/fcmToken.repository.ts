import { IFcmTokenEntity } from "entities/modelEntities/fcmTokenModel.entity";
import { BaseRepository } from "./base.repository";
import { fcmTokenModel, IFcmTokenModel } from "frameworks/database/models/fcmToken.model";
import { IFcmTokenRepository } from "entities/repositoryInterfaces/fcmTokenRepository.interface";


export class FcmTokenRepository extends BaseRepository<IFcmTokenEntity,IFcmTokenModel> implements IFcmTokenRepository{

    constructor(){
        super(fcmTokenModel)
    }

}
