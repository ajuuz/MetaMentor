import { IUserController } from "entities/controllerInterfaces/user/userController.interface";
import { IGetSpecificUserUsecase } from "entities/usecaseInterfaces/user/getSpecificUserUsecase.interface";
import { IUpdateUserUsecase } from "entities/usecaseInterfaces/user/updateUserUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { UserDetailsResponseDTO, UserUpdateDTO } from "shared/dto/userDTO";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserController implements IUserController{

    constructor(
        @inject('IGetSpecificUserUsecase')
        private _getSpecificUserUsecase:IGetSpecificUserUsecase,

        @inject('IUpdateUserUsecase')
        private _updateUserUsecase:IUpdateUserUsecase
    ){}

    async getDetails(req:Request,res:Response,next:NextFunction):Promise<void>{
        const userId =  (req as ModifiedRequest).user.id;
        console.log('body',req.body,req.params,req.query)
        const user:UserDetailsResponseDTO=await this._getSpecificUserUsecase.execute(userId);
        res.status(HTTP_STATUS.OK).json(user)
    }

    async updateUser(req:Request,res:Response,next:NextFunction):Promise<void>{
        const userId:string = (req as ModifiedRequest).user.id;
        const updateData:Partial<Pick<UserUpdateDTO.update,"name"|"country"|"gender"|"mobileNumber"|"profileImage">>=req.body.updatedData
        await this._updateUserUsecase.execute(userId,updateData)
        res.status(HTTP_STATUS.OK).json({success:true,message:"profile updated successfully"})
    }
}

