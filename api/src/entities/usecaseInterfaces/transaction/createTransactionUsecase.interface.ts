import { ITransactionEntity } from "entities/modelEntities/transactionModel.entity";



export interface ICreateTransactionUsecase{
    execute(transactionDetails:Omit<ITransactionEntity,'_id'|'createdAt'>):Promise<void>
}