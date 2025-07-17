import { IWalletEntity } from "entities/modelEntities/walletModel.entity";
import { BaseRepository } from "./base.repository";
import { IWalletModel, walletModel } from "frameworks/database/models/wallet.model";
import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";



export class WalletRepository extends BaseRepository<IWalletEntity,IWalletModel> implements IWalletRepository{

    constructor(){
        super(walletModel)
    }
    
    async creditAmount(userId:string,amount:number):Promise<void>{
        await walletModel.updateOne({userId},{$inc:{balance:amount}})
    }
}