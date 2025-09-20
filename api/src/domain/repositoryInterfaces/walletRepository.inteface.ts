import { IWalletModel } from "infrastructure/database/models/wallet.model";

import { IWalletEntity } from "domain/entities/walletModel.entity";
import { IBaseRepository } from "./baseRepository.interface";

export interface IWalletRepository
  extends IBaseRepository<IWalletEntity, IWalletModel> {
  creditAmount(userId: string, amount: number): Promise<void>;
  debitAmount(userId: string, amount: number): Promise<void>;
  getBalance(userId: string): Promise<number | null>;
}
