import { NextFunction, Request, Response } from "express";



export interface IUserReviewController{
    getStudentReviews(req:Request,res:Response,next:NextFunction):Promise<void>
    getDomainReviews(req:Request,res:Response,next:NextFunction):Promise<void>
    getAllReviews(req:Request,res:Response,next:NextFunction):Promise<void>
}