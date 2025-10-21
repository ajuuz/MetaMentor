import { inject, injectable } from "tsyringe";
import { ICommentRepository, CommentTree } from "domain/repositoryInterfaces/commentRepository.interface";
import { ValidationError } from "domain/errors/validationError";
import { IGetPostCommentsUseCase } from "application/usecase/interfaces/communityPost/getPostCommentsUsecase.interface";

@injectable()
export class GetPostCommentsUseCase implements IGetPostCommentsUseCase {
  constructor(
    @inject('ICommentRepository')
    private readonly _commentRepository: ICommentRepository
  ) {}

  async execute(postId: string): Promise<CommentTree[]> {
    // Validate post ID
    if (!postId) throw new ValidationError('Post ID is required');

    // Get comments tree from repository
    const comments = await this._commentRepository.getByPostId(postId);
    return comments;
  }
}