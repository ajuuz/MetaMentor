import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";
import { ICreditToAdminWalletUsecase } from "entities/usecaseInterfaces/wallet/creditToAdminWalletUsecase.inteface";
import { config } from "shared/config";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreditToAdminWalletUsecase implements ICreditToAdminWalletUsecase{

    private _adminId
    constructor(
         @inject('IWalletRepository')
         private _walletRepository:IWalletRepository
    ){
         this._adminId=config.ADMIN_ID!
    }

    async execute(amount:number):Promise<void>{
        await this._walletRepository.creditAmount(this._adminId,amount)
    }
}