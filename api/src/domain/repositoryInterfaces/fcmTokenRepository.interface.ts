import { IFcmTokenEntity } from "domain/entities/fcmTokenModel.entity";

import { IFcmTokenModel } from "infrastructure/database/models/fcmToken.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface IFcmTokenRepository
  extends IBaseRepository<IFcmTokenEntity, IFcmTokenModel> {
  createFcmToken(userId: string, fcmToken: string): Promise<void>;
  delete(userId: string): Promise<void>;
}
