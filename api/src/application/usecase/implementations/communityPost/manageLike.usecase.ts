import { ICommunityPostLikeRepository } from "domain/repositoryInterfaces/communityPostLikeRepository.interface";

import { IManageLikeUsecase } from "application/usecase/interfaces/communityPost/manageLikeUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class ManageLikeUsecase implements IManageLikeUsecase {
  constructor(
    @inject("ICommunityPostLikeRepository")
    private _communityPostLikeRepository: ICommunityPostLikeRepository
  ) {}

  async execute(postId: string, likedBy: string, status: string): Promise<void> {
    if (status === "like") {
      await this._communityPostLikeRepository.like(postId, likedBy);
    } else {
      await this._communityPostLikeRepository.unLike(postId, likedBy);
    }
  }
}
