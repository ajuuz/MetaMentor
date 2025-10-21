import {
  ICommunityPostEntity,
  IGetCommunityPost,
} from "domain/entities/communityPostModel.entity";

import { ICommunityPostModel } from "infrastructure/database/models/communityPost.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface ICommunityPostRepository
  extends IBaseRepository<ICommunityPostEntity, ICommunityPostModel> {
  createAPost(post: Partial<ICommunityPostEntity>): Promise<void>;
  getAllPosts(communityId: string): Promise<IGetCommunityPost[]>;
  editPost(
    postId: string,
    studentId: string,
    updates: Partial<
      Pick<ICommunityPostEntity, "title" | "description" | "image">
    >
  ): Promise<void>;
  deletePost(postId: string, studentId: string): Promise<boolean>
}
