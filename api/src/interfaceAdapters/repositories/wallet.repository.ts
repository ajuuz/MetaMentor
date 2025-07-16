import { IWalletEntity } from "entities/modelEntities/walletModel.entity";
import { BaseRepository } from "./base.repository";
import { IWalletModel, walletModel } from "frameworks/database/models/wallet.model";



export class WalletRepository extends BaseRepository<IWalletEntity,IWalletModel>{

    constructor(){
        super(walletModel)
    }
    
}