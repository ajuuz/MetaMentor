import { ITransactionRepository } from "entities/repositoryInterfaces/transactionRepository.interface";
import { transactionModel } from "frameworks/database/models/transaction.model";
import { createTransactionDTO } from "shared/dto/transactionDTO";
import { injectable } from "tsyringe";


@injectable()
export class TransactionRepository implements ITransactionRepository{

    async createTransaction(transactionDetails:createTransactionDTO):Promise<void>{
        const newTransaction = new transactionModel(transactionDetails);
        await newTransaction.save()
    }
}