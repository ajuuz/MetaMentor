import { IFcmTokenEntity } from "entities/modelEntities/fcmTokenModel.entity";
import { IFcmTokenRepository } from "entities/repositoryInterfaces/fcmTokenRepository.interface";
import { fcmTokenModel, IFcmTokenModel } from "frameworks/database/models/fcmToken.model";

import { BaseRepository } from "./base.repository";



export class FcmTokenRepository extends BaseRepository<IFcmTokenEntity,IFcmTokenModel> implements IFcmTokenRepository{

    constructor(){
        super(fcmTokenModel)
    }

}
