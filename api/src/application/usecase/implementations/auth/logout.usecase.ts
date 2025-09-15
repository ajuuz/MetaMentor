import { IFcmTokenRepository } from "domain/repositoryInterfaces/fcmTokenRepository.interface";
import { ILogoutUsecase } from "application/usecase/interfaces/auth/logoutUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class LogoutUsecase implements ILogoutUsecase {
  constructor(
    @inject("IFcmTokenRepository")
    private _fcmTokenRepository: IFcmTokenRepository
  ) {}

  async execute(userId: string): Promise<void> {
    await this._fcmTokenRepository.delete(userId);
  }
}
