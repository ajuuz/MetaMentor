import { IBaseRepository } from "./baseRepository.interface";
import { ICommunityPostEntity } from "entities/modelEntities/communityPostModel.entity";
import { ICommunityPostModel } from "frameworks/database/models/communityPost.model";


export interface ICommunityPostRepository extends IBaseRepository<ICommunityPostEntity,ICommunityPostModel>{

}