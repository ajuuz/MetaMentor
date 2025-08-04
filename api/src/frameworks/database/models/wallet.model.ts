import { IWalletEntity } from "entities/modelEntities/walletModel.entity";
import mongoose, { Document } from "mongoose";

import { walletSchema } from "../schemas/wallet.schema";


export interface IWalletModel extends IWalletEntity,Document{}

export const walletModel = mongoose.model<IWalletModel>('wallets',walletSchema)

