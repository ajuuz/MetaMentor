import { IWalletEntity } from "domain/entities/walletModel.entity";
import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";
import {
  IWalletModel,
  walletModel,
} from "frameworks/database/models/wallet.model";

import { BaseRepository } from "./base.repository";

export class WalletRepository
  extends BaseRepository<IWalletEntity, IWalletModel>
  implements IWalletRepository
{
  constructor() {
    super(walletModel);
  }

  async creditAmount(userId: string, amount: number): Promise<void> {
    await walletModel.updateOne({ userId }, { $inc: { balance: amount } });
  }

  async debitAmount(userId: string, amount: number): Promise<void> {
    await walletModel.updateOne({ userId }, { $inc: { balance: -amount } });
  }

  async getBalance(userId: string): Promise<number | null> {
    const wallet = await walletModel.findOne({ userId });
    return wallet ? wallet.balance : null;
  }
}
