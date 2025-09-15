import { IWalletRepository } from "domain/repositoryInterfaces/walletRepository.inteface";
import { IDebitWalletUsecase } from "entities/usecaseInterfaces/wallet/debitWalletUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class DebitWalletUsecase implements IDebitWalletUsecase {
  constructor(
    @inject("IWalletRepository")
    private _walletRepository: IWalletRepository
  ) {}

  async execute(userId: string, amount: number): Promise<void> {
    await this._walletRepository.debitAmount(userId, amount);
  }
}
