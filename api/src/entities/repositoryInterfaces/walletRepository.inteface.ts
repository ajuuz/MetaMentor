import { IWalletEntity } from "entities/modelEntities/walletModel.entity";
import { IWalletModel } from "frameworks/database/models/wallet.model";

import { IBaseRepository } from "./baseRepository.interface";


export interface IWalletRepository extends IBaseRepository<IWalletEntity,IWalletModel>{
    creditAmount(userId:string,amount:number):Promise<void>
}