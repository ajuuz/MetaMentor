import { ITransactionRepository } from "entities/repositoryInterfaces/transactionRepository.interface";
import { ICreateTransactionUsecase } from "entities/usecaseInterfaces/transaction/createTransactionUsecase.interface";
import { createTransactionDTO } from "shared/dto/transactionDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateTransactionUsecase implements ICreateTransactionUsecase{

    constructor(
        @inject('ITransactionRepository')
        private _transactionRepository:ITransactionRepository
    ){}
    async execute(transactionDetails:createTransactionDTO):Promise<void>{
        await this._transactionRepository.createTransaction(transactionDetails)
    }
}