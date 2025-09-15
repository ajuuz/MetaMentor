import { ObjectId } from "mongoose";


export interface IWalletEntity{
    userId:ObjectId,
    balance:number,
}