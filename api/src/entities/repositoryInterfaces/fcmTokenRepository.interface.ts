import { IFcmTokenEntity } from "entities/modelEntities/fcmTokenModel.entity";
import { IFcmTokenModel } from "frameworks/database/models/fcmToken.model";

import { IBaseRepository } from "./baseRepository.interface";



export interface IFcmTokenRepository extends IBaseRepository<IFcmTokenEntity,IFcmTokenModel>{
    delete(userId:string):Promise<void>
}