import { IUserReviewController } from "entities/controllerInterfaces/user/userReviewController.interface";
import { IGetStudentReviewsUsecase } from "entities/usecaseInterfaces/review/getStudentReviewsUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserReviewController implements IUserReviewController{

    constructor(
        @inject('IGetStudentReviewsUsecase')
        private _getStudentReviewsUsecase:IGetStudentReviewsUsecase
    ){}

    async getReviews(req:Request,res:Response,next:NextFunction):Promise<void>{
        const type = req.query.type as 'upcoming'|'completed'
        const studentId = (req as ModifiedRequest).user.id;
        const reviews=await this._getStudentReviewsUsecase.execute(studentId,type)
        res.status(200).json(reviews)
    }
}