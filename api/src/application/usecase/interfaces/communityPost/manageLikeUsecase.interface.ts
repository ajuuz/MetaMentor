export interface IManageLikeUsecase {
  execute(postId: string, likedBy: string, status: string): Promise<void>;
}
