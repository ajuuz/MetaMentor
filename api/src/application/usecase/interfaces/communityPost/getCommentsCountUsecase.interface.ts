export interface IGetCommentsCountUseCase {
  execute(postId: string): Promise<number>;
}