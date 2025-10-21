export interface IDeletePostUseCase {
  execute(postId: string, studentId: string): Promise<void>;
}