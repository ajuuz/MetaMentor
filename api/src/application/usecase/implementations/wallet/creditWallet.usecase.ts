import { IWalletRepository } from "domain/repositoryInterfaces/walletRepository.inteface";
import { ICreditWalletUsecase } from "application/usecase/interfaces/wallet/creditWalletUsecase.inteface";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreditWalletUsecase implements ICreditWalletUsecase {
  constructor(
    @inject("IWalletRepository")
    private _walletRepository: IWalletRepository
  ) {}

  async execute(userId: string, amount: number): Promise<void> {
    await this._walletRepository.creditAmount(userId, amount);
  }
}
