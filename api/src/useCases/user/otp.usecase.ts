import { inject, injectable } from "tsyringe";
import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IOtpRepository } from "entities/repositoryInterfaces/user/otp-repository.interface";
import { IOtpUsecase } from "entities/usecaseInterfaces/user/otp-usecase.interface";



export class OtpUsecase implements IOtpUsecase{

    constructor(
        @inject("IOtpRepository")
        private _createOtpRepository: IOtpRepository
    ){}

    async handle(data:Partial<IUserEntity>):Promise<void>{

        if(!data.name || !data.email || !data.password) {

             
        }

        await this._createOtpRepository.save(data);

        

    }
}