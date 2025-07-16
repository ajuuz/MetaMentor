import mongoose from "mongoose";
import { IWalletModel } from "../models/wallet.model";


export const walletSchema =new mongoose.Schema<IWalletModel>({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
        unique:true,
    },
    balance:{
        type:Number,
        default:0
    }
},{_id:false})