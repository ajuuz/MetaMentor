import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IOtpUsecase } from "entities/usecaseInterfaces/user/otp-usecase.interface";
import { inject } from "tsyringe";



export class OtpController {

    constructor(
        @inject("IOtpUsecase")
        private _createUserUsecase:IOtpUsecase
    ){}
    
    async createUser(req:Request,res:Response):Promise<void>{
        const data = req.body;
        try{
            // const response = await this._createUserUsecase.handle(data)
        }
        catch(error){

        }
    }
}