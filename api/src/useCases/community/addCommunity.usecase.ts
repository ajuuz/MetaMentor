import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IAddCommunityUsecase } from "entities/usecaseInterfaces/community/addCommunityUsecase.interface";
import { ObjectId } from "mongoose";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddCommunityUsecase implements IAddCommunityUsecase{

    constructor(
        @inject('ICommunityRepository')
        private _communityRepository:ICommunityRepository
    ){}

   async execute(domainId:ObjectId,name:string):Promise<void>{
        if(!domainId || !name) throw new ValidationError("Required field for community creation is not recieved")

        const domainDetails:Omit<ICommunityEntity,'_id'|'isBlocked'>={communityId:domainId,name}
        this._communityRepository.insertOne(domainDetails)
    }
}