import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IUpdateCommunityStatusUsecase } from "entities/usecaseInterfaces/community/updateCommunityUsecase.interface";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";



@injectable()
export class UpdateCommunityStatusUsecase implements IUpdateCommunityStatusUsecase{

    constructor(
        @inject('ICommunityRepository')
        private _communityRepository:ICommunityRepository
    ){}

    async execute(communityId:string,status:boolean):Promise<void>{
         if(!communityId || (status!==false && !status)) throw new ValidationError('Required fields are not recieved');
        await this._communityRepository.updateStatus(communityId,status)
    }
}