import { inject, injectable } from "tsyringe";
import { ICommunityPostLikeRepository } from "domain/repositoryInterfaces/communityPostLikeRepository.interface";
import { IGetPostLikesUsecase } from "application/usecase/interfaces/communityPost/getPostLikesUsecase.interface";

@injectable()
export class GetPostLikesUsecase implements IGetPostLikesUsecase {
  constructor(
    @inject("ICommunityPostLikeRepository")
    private _communityPostLikeRepository: ICommunityPostLikeRepository
  ) {}

  async execute(
    postId: string,
    likedBy: string
  ): Promise<{ noOfLikes: number; doILiked: boolean }> {
    const data = await this._communityPostLikeRepository.getLikes(
      postId,
      likedBy
    );

    return data;
  }
}
