import mongoose from "mongoose";
import { ICommentModel } from "../models/comment.model";

export const commentSchema = new mongoose.Schema<ICommentModel>({
    postId:{
        type:mongoose.Schema.ObjectId,
        ref:'CommunityPost',
        required:true
    },
    commenterId:{
        type:mongoose.Schema.ObjectId,
        ref:'students',
        required:true
    },
    comment:{
        type:String
    },
    commentedAt:{
        type:Date,
        default:Date.now
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})