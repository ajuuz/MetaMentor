import { ITransactionEntity } from "entities/modelEntities/transactionModel.entity";



export interface ITransactionRepository{

    createTransaction(transactionDetails:Omit<ITransactionEntity,'_id'|'createdAt'>):Promise<void>
}