import { IFcmTokenEntity } from "domain/entities/fcmTokenModel.entity";
import { IFcmTokenRepository } from "domain/repositoryInterfaces/fcmTokenRepository.interface";
import {
  fcmTokenModel,
  IFcmTokenModel,
} from "infrastructure/database/models/fcmToken.model";

import { BaseRepository } from "./base.repository";
import { injectable } from "tsyringe";

@injectable()
export class FcmTokenRepository
  extends BaseRepository<IFcmTokenEntity, IFcmTokenModel>
  implements IFcmTokenRepository
{
  constructor() {
    super(fcmTokenModel);
  }

  async createFcmToken(userId: string, fcmToken: string): Promise<void> {
    //  const newFcmToken=new this.model({userId,fcmToken});
    //  await newFcmToken.save()
    await this.model.updateOne(
      { userId },
      { $set: { fcmToken } },
      { upsert: true }
    );
  }

  async delete(userId: string): Promise<void> {
    await fcmTokenModel.deleteOne({ userId });
  }
}
