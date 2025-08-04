import mongoose, { Schema } from "mongoose";
import { TRANSACTION_TYPE } from "shared/constants";

import { ITransactionModel } from "../models/transaction.model";


export const transactionSchema:Schema<ITransactionModel> = new mongoose.Schema<ITransactionModel>({
    walletId:{
        type:mongoose.Schema.ObjectId,
        ref:'wallets',
        required:true,
    },
    reviewId:{
        type:mongoose.Schema.ObjectId,
        ref:'reviews',
        required:true,
    },
    type:{
        type:String,
        enum:TRANSACTION_TYPE,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:new Date()
    }
})