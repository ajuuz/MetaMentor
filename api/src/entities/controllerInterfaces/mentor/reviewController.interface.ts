import { NextFunction, Request, Response } from "express";

export interface IMentorReviewController{
    getAllReviews(req:Request,res:Response,next:NextFunction):Promise<void>
    getReview(req:Request,res:Response,next:NextFunction):Promise<void>
    updateReviewStatus(req:Request,res:Response,next:NextFunction):Promise<void>
}