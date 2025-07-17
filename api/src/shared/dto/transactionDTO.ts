import { ObjectId } from "mongoose"
import { TRANSACTION_TYPE } from "shared/constants"


export type createTransactionDTO={
    walletId:string,
    reviewId:ObjectId,
    type:TRANSACTION_TYPE,
    amount:number,
    description:string,
}