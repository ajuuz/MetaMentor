import { inject, injectable } from "tsyringe";
import { ICommentRepository } from "domain/repositoryInterfaces/commentRepository.interface";
import { ValidationError } from "domain/errors/validationError";
import { IAddCommentUseCase } from "application/usecase/interfaces/communityPost/addCommentUseCase.interface";

export interface AddCommentDTO {
  postId: string;
  text: string;
  commenterId: string;
  parentCommentId?: string | null;
}

@injectable()
export class AddCommentUseCase implements IAddCommentUseCase {
  constructor(
    @inject('ICommentRepository')
    private readonly _commentRepository: ICommentRepository
  ) {}

  async execute(data: AddCommentDTO) {
    // Validate required fields
    if (!data.postId) throw new ValidationError('Post ID is required');
    if (!data.text?.trim()) throw new ValidationError('Comment text is required');
    if (!data.commenterId) throw new ValidationError('Commenter ID is required');

    // Create comment entity
    const comment = {
      postId: data.postId,
      text: data.text.trim(),
      commenterId: data.commenterId,
      parentCommentId: data.parentCommentId || null,
      commentedAt: new Date(),
      isBlocked: false
    };

    // Save and return the created comment
    const created = await this._commentRepository.createComment(comment);
    return created;
  }
}