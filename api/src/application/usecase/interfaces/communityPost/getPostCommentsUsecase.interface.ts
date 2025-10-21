import { CommentTree } from "domain/repositoryInterfaces/commentRepository.interface";

export interface IGetPostCommentsUseCase {
  execute(postId: string): Promise<CommentTree[]>;
}