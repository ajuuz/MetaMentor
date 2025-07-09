import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { BaseRepository } from "./base.repository";
import { communityModel, ICommunityModel } from "frameworks/database/models/community.model";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";



export class CommunityRepository extends BaseRepository<ICommunityEntity,ICommunityModel> implements ICommunityRepository{

    constructor(){
        super(communityModel)
    }
    
    async updateStatus(id:string,status:boolean):Promise<void>{
        await this.model.updateOne({_id:id},{isBlocked:status})
    }
}