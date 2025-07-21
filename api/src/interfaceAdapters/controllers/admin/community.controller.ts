import { IAdminCommunityController } from "entities/controllerInterfaces/admin/communityController.interface";
import { IGetCommunitiesUsecase } from "entities/usecaseInterfaces/community/getCommunitiesUsecase.interface";
import { IUpdateCommunityStatusUsecase } from "entities/usecaseInterfaces/community/updateCommunityUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class AdminCommunityController implements IAdminCommunityController{

    constructor(
        @inject('IGetCommunitiesUsecase')
        private _getCommunitiesUsecase:IGetCommunitiesUsecase,

        @inject('IUpdateCommunityStatusUsecase')
        private _updateCommunityStatusUsecase:IUpdateCommunityStatusUsecase,
    ){}

    async getAllCommunities(req:Request,res:Response,next:NextFunction):Promise<void>{
        const currentPage = typeof req.query.currentPage==='string'?parseInt(req.query.currentPage):1;
        const limit = typeof req.query.limit==='string'?parseInt(req.query.limit):10;

        const data = await this._getCommunitiesUsecase.execute(currentPage,limit)
        res.status(HTTP_STATUS.OK).json(data)
    }

    async updateCommunityStatus(req:Request,res:Response,next:NextFunction):Promise<void>{
            const communityId=req.params.communityId
            const status:boolean=req.body.status;
            await this._updateCommunityStatusUsecase.execute(communityId,status);
            res.status(200).json({success:true,message:SUCCESS_MESSAGE.COMMUNITY.UPDATE_STATUS})
        }
}