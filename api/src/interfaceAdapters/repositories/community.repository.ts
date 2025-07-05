import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { BaseRepository } from "./base.repository";
import { communityModel, ICommunityModel } from "frameworks/database/models/community.model";



export class CommunityRepository extends BaseRepository<ICommunityEntity,ICommunityModel>{

    constructor(){
        super(communityModel)
    }
    
}