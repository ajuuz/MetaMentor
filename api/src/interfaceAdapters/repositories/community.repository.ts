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

    // async findUsingIn(field:keyof T,items:any[],skip:number,limit:number):Promise<{documents:T[],totalDocuments:number}>{
    //         const filter={[field]:{$in:items}} as FilterQuery<T>
    //         const [documents,totalDocuments]=await Promise.all([
    //             this.model.find(filter).skip(skip).limit(limit).lean() as Promise<T[]>,
    //             this.model.countDocuments(filter)
    //         ])
    
    //         return {documents,totalDocuments}
    // }
}