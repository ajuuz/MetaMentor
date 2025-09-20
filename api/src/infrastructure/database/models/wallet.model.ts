import mongoose, { Document } from "mongoose";

import { walletSchema } from "../schemas/wallet.schema";
import { IWalletEntity } from "domain/entities/walletModel.entity";

export interface IWalletModel extends IWalletEntity, Document {}

export const walletModel = mongoose.model<IWalletModel>(
  "wallets",
  walletSchema
);
