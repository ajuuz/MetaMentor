import { IUserController } from "entities/controllerInterfaces/user/userController.interface";
import { IGetSpecificUserUsecase } from "entities/usecaseInterfaces/user/getSpecificUserUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { UserDetailsResponseDTO } from "shared/dto/userDTO";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserController implements IUserController{

    constructor(
        @inject('IGetSpecificUserUsecase')
        private _getSpecificUserUsecase:IGetSpecificUserUsecase
    ){}

    async getDetails(req:Request,res:Response,next:NextFunction):Promise<void>{
        const userId =  (req as ModifiedRequest).user.id;
        const user:UserDetailsResponseDTO=await this._getSpecificUserUsecase.execute(userId);
        res.status(200).json({success:true,message:"user details fetched successfully",data:user})
    }
}