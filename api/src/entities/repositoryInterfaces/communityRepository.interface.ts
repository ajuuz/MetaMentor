import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { ICommunityModel } from "frameworks/database/models/community.model";


export interface ICommunityRepository extends IBaseRepository<ICommunityEntity,ICommunityModel>{
    updateStatus(id:string,status:boolean):Promise<void>
}