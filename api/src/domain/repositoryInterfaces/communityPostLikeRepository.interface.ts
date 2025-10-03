export interface ICommunityPostLikeRepository {
  like(postId: string, likedBy: string): Promise<void>;
  unLike(postId: string, likedBy: string): Promise<void>;
  getLikes(
    postId: string,
    likedBy: string
  ): Promise<{ noOfLikes: number; doILiked: boolean }>;
}
