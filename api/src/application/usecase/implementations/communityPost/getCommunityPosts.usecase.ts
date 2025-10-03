import { inject, injectable } from "tsyringe";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";
import { IGetCommunityPostsUsecase } from "application/usecase/interfaces/communityPost/getCommunityPostsUsecase.interface";
import { IGetCommunityPost } from "domain/entities/communityPostModel.entity";

@injectable()
export class GetCommunityPostsUsecase implements IGetCommunityPostsUsecase {
  constructor(
    @inject("ICommunityPostRepository")
    private _communityPostRepository: ICommunityPostRepository
  ) {}

  async execute(communityId: string): Promise<IGetCommunityPost[]> {
    const posts = await this._communityPostRepository.getAllPosts(communityId);

    return posts
  }
}
