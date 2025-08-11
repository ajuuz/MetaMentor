import { IFcmTokenEntity } from "entities/modelEntities/fcmTokenModel.entity";
import { IFcmTokenModel } from "frameworks/database/models/fcmToken.model";

import { IBaseRepository } from "./baseRepository.interface";



export interface IFcmTokenRepository extends IBaseRepository<IFcmTokenEntity,IFcmTokenModel>{
    createFcmToken(userId:string,fcmToken:string):Promise<void>
    delete(userId:string):Promise<void>
}