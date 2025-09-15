import { IFcmTokenRepository } from "domain/repositoryInterfaces/fcmTokenRepository.interface";
import { ISaveFcmTokenUsecase } from "entities/usecaseInterfaces/fcmToken/saveFcmTokenUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class SaveFcmTokenUsecase implements ISaveFcmTokenUsecase {
  constructor(
    @inject("IFcmTokenRepository")
    private _fcmTokenRepository: IFcmTokenRepository
  ) {}

  async execute(userId: string, fcmToken: string): Promise<void> {
    await this._fcmTokenRepository.createFcmToken(userId, fcmToken);
  }
}
