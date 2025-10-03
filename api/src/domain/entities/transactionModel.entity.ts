import { Date } from "mongoose";
import { TRANSACTION_TYPE } from "shared/constants";


export interface ITransactionEntity{
    _id:string,
    walletId:string,
    reviewId:string,
    type:TRANSACTION_TYPE,
    amount:number,
    description:string,
    createdAt:Date
}