import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICommunityModel } from "frameworks/database/models/community.model";

import { IBaseRepository } from "./baseRepository.interface";


export interface ICommunityRepository extends IBaseRepository<ICommunityEntity,ICommunityModel>{
    updateStatus(id:string,status:boolean):Promise<void>
}