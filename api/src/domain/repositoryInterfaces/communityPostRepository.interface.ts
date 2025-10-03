import { IBaseRepository } from "./baseRepository.interface";
import { ICommunityPostEntity, IGetCommunityPost } from "domain/entities/communityPostModel.entity";
import { ICommunityPostModel } from "infrastructure/database/models/communityPost.model";

export interface ICommunityPostRepository
  extends IBaseRepository<ICommunityPostEntity, ICommunityPostModel> {
  createAPost(post: Partial<ICommunityPostEntity>): Promise<void>;
  getAllPosts(communityId: string): Promise<IGetCommunityPost[]>;
}
