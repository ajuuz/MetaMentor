import { IFcmTokenRepository } from "domain/repositoryInterfaces/fcmTokenRepository.interface";
import { IIDeleteFcmTokenUsecase } from "application/usecase/interfaces/fcmToken/deleteFcmTokenUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteFcmTokenUsecase implements IIDeleteFcmTokenUsecase {
  constructor(
    @inject("IFcmTokenRepository")
    private _fcmTokenRepository: IFcmTokenRepository
  ) {}

  async execute(userId: string, fcmToken: string): Promise<void> {}
}
