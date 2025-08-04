import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { communityModel, ICommunityModel } from "frameworks/database/models/community.model";

import { BaseRepository } from "./base.repository";




export class CommunityRepository extends BaseRepository<ICommunityEntity,ICommunityModel> implements ICommunityRepository{

    constructor(){
        super(communityModel)
    }
    
    async updateStatus(id:string,status:boolean):Promise<void>{
        await this.model.updateOne({_id:id},{isBlocked:status})
    }
}