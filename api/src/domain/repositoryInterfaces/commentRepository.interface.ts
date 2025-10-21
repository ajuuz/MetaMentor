import { ICommentEntity } from "domain/entities/commentModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { ICommentModel } from "infrastructure/database/models/comment.model";

export type CommentTree = ICommentEntity & { replies?: CommentTree[] };

export interface ICommentRepository extends IBaseRepository<ICommentEntity,ICommentModel>{
  createComment(comment: Partial<ICommentEntity>): Promise<ICommentEntity>;
  getByPostId(postId: string): Promise<CommentTree[]>;
  getParentCommentsCount(postId: string): Promise<number>;
  deleteComment(commentId: string): Promise<void>;
}
