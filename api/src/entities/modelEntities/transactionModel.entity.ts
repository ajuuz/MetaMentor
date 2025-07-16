import { Date, ObjectId } from "mongoose";
import { TRANSACTION_TYPE } from "shared/constants";


export interface ITransactionEntity{
    _id:ObjectId,
    walletId:ObjectId,
    reviewId:ObjectId,
    type:TRANSACTION_TYPE,
    amount:number,
    description:string,
    date:Date
}