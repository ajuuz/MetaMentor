import { IWalletEntity } from "domain/entities/walletModel.entity";
import { IWalletRepository } from "domain/repositoryInterfaces/walletRepository.inteface";

import {
  IWalletModel,
  walletModel,
} from "infrastructure/database/models/wallet.model";

import { BaseRepository } from "./base.repository";

export class WalletRepository
  extends BaseRepository<IWalletEntity, IWalletModel>
  implements IWalletRepository
{
  constructor() {
    super(walletModel);
  }

  async creditAmount(userId: string, amount: number): Promise<void> {
    console.log("credit", userId, amount);
    const wallet = await walletModel.findOne({ userId });
    console.log("credit", wallet);
    await walletModel.updateOne({ userId }, { $inc: { balance: amount } });
    const walletAfter = await walletModel.findOne({ userId });
    console.log("credit", walletAfter);
  }

  async debitAmount(userId: string, amount: number): Promise<void> {
    console.log("debit", userId, amount);
    const wallet = await walletModel.findOne({ userId });
    console.log("credit", wallet);
    await walletModel.updateOne({ userId }, { $inc: { balance: -amount } });
  }

  async getBalance(userId: string): Promise<number | null> {
    const wallet = await walletModel.findOne({ userId });
    return wallet ? wallet.balance : null;
  }
}
