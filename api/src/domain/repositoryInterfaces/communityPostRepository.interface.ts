import { IBaseRepository } from "./baseRepository.interface";
import { ICommunityPostEntity } from "domain/entities/communityPostModel.entity";
import { ICommunityPostModel } from "infrastructure/database/models/communityPost.model";

export interface ICommunityPostRepository
  extends IBaseRepository<ICommunityPostEntity, ICommunityPostModel> {}
