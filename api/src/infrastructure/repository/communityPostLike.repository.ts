import { ICommunityPostLikeRepository } from "domain/repositoryInterfaces/communityPostLikeRepository.interface";

import { communityPostLikeModel } from "infrastructure/database/models/communityPostLike.model";

export class CommunityPostLikeRepository
  implements ICommunityPostLikeRepository
{
  async like(postId: string, likedBy: string): Promise<void> {
    await communityPostLikeModel.insertOne({ postId, likedBy });
  }
  async unLike(postId: string, likedBy: string): Promise<void> {
    await communityPostLikeModel.deleteOne({ postId, likedBy });
  }
  async getLikes(postId: string, likedBy: string): Promise<{noOfLikes:number,doILiked:boolean}> {
    
    const noOfLikes=await communityPostLikeModel.countDocuments({postId})
    const doILiked=await communityPostLikeModel.findOne({likedBy})

    return {noOfLikes,doILiked:doILiked?true:false}
  }
}
