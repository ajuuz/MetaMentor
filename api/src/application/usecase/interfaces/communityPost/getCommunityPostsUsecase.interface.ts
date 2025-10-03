import { IGetCommunityPost } from "domain/entities/communityPostModel.entity";

export interface IGetCommunityPostsUsecase {
  execute(communityId: string): Promise<IGetCommunityPost[]>;
}
