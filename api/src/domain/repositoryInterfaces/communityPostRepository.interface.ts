import { ICommunityPostEntity, IGetCommunityPost } from "domain/entities/communityPostModel.entity";

import { ICommunityPostModel } from "infrastructure/database/models/communityPost.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface ICommunityPostRepository
  extends IBaseRepository<ICommunityPostEntity, ICommunityPostModel> {
  createAPost(post: Partial<ICommunityPostEntity>): Promise<void>;
  getAllPosts(communityId: string): Promise<IGetCommunityPost[]>;
}
