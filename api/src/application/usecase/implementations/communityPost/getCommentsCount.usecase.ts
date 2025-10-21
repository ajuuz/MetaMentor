import { inject, injectable } from "tsyringe";
import { ICommentRepository } from "domain/repositoryInterfaces/commentRepository.interface";
import { ValidationError } from "domain/errors/validationError";
import { IGetCommentsCountUseCase } from "application/usecase/interfaces/communityPost/getCommentsCountUsecase.interface";

@injectable()
export class GetCommentsCountUseCase implements IGetCommentsCountUseCase {
  constructor(
    @inject('ICommentRepository')
    private readonly _commentRepository: ICommentRepository
  ) {}

  async execute(postId: string): Promise<number> {
    // Validate post ID
    if (!postId) throw new ValidationError('Post ID is required');

    // Get parent comments count from repository
    const count = await this._commentRepository.getParentCommentsCount(postId);
    return count;
  }
}