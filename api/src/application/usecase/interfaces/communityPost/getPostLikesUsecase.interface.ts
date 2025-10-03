export interface IGetPostLikesUsecase {
  execute(postId: string, likedBy: string): Promise<{noOfLikes:number,doILiked:boolean}>;
}
