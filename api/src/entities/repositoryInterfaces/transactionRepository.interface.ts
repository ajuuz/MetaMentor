import { createTransactionDTO } from "shared/dto/transactionDTO";



export interface ITransactionRepository{

    createTransaction(transactionDetails:createTransactionDTO):Promise<void>
}