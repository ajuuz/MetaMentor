import { IWalletEntity } from "entities/modelEntities/walletModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { IWalletModel } from "frameworks/database/models/wallet.model";


export interface IWalletRepository extends IBaseRepository<IWalletEntity,IWalletModel>{
    creditAmount(userId:string,amount:number):Promise<void>
}