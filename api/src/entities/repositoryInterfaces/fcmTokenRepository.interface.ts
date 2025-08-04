import { IFcmTokenEntity } from "entities/modelEntities/fcmTokenModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { IFcmTokenModel } from "frameworks/database/models/fcmToken.model";



export interface IFcmTokenRepository extends IBaseRepository<IFcmTokenEntity,IFcmTokenModel>{

}