import { NextFunction, Request, Response } from "express";



export interface IUserReviewController{
    getReviews(req:Request,res:Response,next:NextFunction):Promise<void>
}