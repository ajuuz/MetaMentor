import { ITransactionEntity } from "entities/modelEntities/transactionModel.entity";
import { ITransactionRepository } from "entities/repositoryInterfaces/transactionRepository.interface";
import { transactionModel } from "frameworks/database/models/transaction.model";
import { injectable } from "tsyringe";


@injectable()
export class TransactionRepository implements ITransactionRepository{

    async createTransaction(transactionDetails:Omit<ITransactionEntity,'_id'|'createdAt'>):Promise<void>{
        const newTransaction = new transactionModel(transactionDetails);
        await newTransaction.save()
    }
}