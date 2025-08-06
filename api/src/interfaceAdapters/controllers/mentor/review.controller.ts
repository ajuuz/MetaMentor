import { IMentorReviewController } from "entities/controllerInterfaces/mentor/reviewController.interface";
import { IGetMentorReviewsUsecase } from "entities/usecaseInterfaces/review/getMentorReviewsUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "shared/constants";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


@injectable()
export class MentorReviewController implements IMentorReviewController{

    constructor(
        @inject('IGetMentorReviewsUsecase')
        private _getMentorReviewsUsecase:IGetMentorReviewsUsecase
    ){}

    async getAllReviews(req:Request,res:Response,next:NextFunction):Promise<void>{
         const mentorId = (req as ModifiedRequest).user.id;
         const status=req.query.status as REVIEW_FILTER_STATUS;
         const pendingReviewState=req.query.pendingReviewState as (PENDING_REVIEW_STATE | undefined);
         const dateRange = req.query.dateRange as string;
         const currentPage:number=Number(req.query.currentPage ?? "1");
         const limit:number=Number(req.query.limit ?? '10')
         
        const data=await this._getMentorReviewsUsecase.execute(mentorId,status,dateRange,currentPage,limit,pendingReviewState)
        res.status(200).json(data)
    }
}