import { createTransactionDTO } from "shared/dto/transactionDTO";



export interface ICreateTransactionUsecase{
    execute(transactionDetails:createTransactionDTO):Promise<void>
}