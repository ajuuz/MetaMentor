import { TRANSACTION_TYPE } from "shared/constants"


export type createTransactionDTO={
    walletId:string,
    reviewId:string,
    type:TRANSACTION_TYPE,
    amount:number,
    description:string,
}