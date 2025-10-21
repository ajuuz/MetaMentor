import { inject, injectable } from "tsyringe";
import { ICommentRepository } from "domain/repositoryInterfaces/commentRepository.interface";
import { ValidationError } from "domain/errors/validationError";
import { NotFoundError } from "domain/errors/notFounError";
import { IDeleteCommentUseCase } from "application/usecase/interfaces/communityPost/deleteCommentUsecase.interface";

@injectable()
export class DeleteCommentUseCase implements IDeleteCommentUseCase {
  constructor(
    @inject('ICommentRepository')
    private readonly _commentRepository: ICommentRepository
  ) {}

  async execute(commentId: string, userId: string): Promise<void> {
    // Validate inputs
    if (!commentId) throw new ValidationError('Comment ID is required');
    if (!userId) throw new ValidationError('User ID is required');

    // Get the comment to check ownership
    const comment = await this._commentRepository.findOne({ _id: commentId,commenterId:userId });
    if (!comment) throw new NotFoundError('Comment not found');

    // Verify the user owns the comment
    if (comment.commenterId.toString() !== userId) {
      throw new ValidationError('Not authorized to delete this comment');
    }

    // Delete the comment and its replies
    await this._commentRepository.deleteComment(commentId);
  }
}