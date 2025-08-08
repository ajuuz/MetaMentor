import { IUserCommunityController } from "entities/controllerInterfaces/user/communityController.interface";
import { IGetEnrolledCommunitiesUsecase } from "entities/usecaseInterfaces/community/getEnrolledCommunitiesUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserCommunityController implements IUserCommunityController{

    constructor(
        @inject('IGetEnrolledCommunitiesUsecase')
        private _getEnrolledCommunitiesUsecase:IGetEnrolledCommunitiesUsecase
    ){}

    async getAllCommunities(req:Request,res:Response,next:NextFunction):Promise<void>{
         const userId = (req as ModifiedRequest).user.id;
        const currentPage = typeof req.query.currentPage==='string'?parseInt(req.query.currentPage):1;
        const limit = typeof req.query.limit==='string'?parseInt(req.query.limit):10;

        const data=await this._getEnrolledCommunitiesUsecase.execute(userId,currentPage,limit)
        res.status(HTTP_STATUS.OK).json(data)
    }
}