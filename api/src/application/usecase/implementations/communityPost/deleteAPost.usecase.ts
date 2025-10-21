import { inject, injectable } from "tsyringe";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";
import { ValidationError } from "domain/errors/validationError";
import { NotFoundError } from "domain/errors/notFounError";
import { IDeletePostUseCase } from "application/usecase/interfaces/communityPost/deleteAPostUsecase.interface";

@injectable()
export class DeletePostUseCase implements IDeletePostUseCase {
  constructor(
    @inject('ICommunityPostRepository')
    private readonly _communityPostRepository: ICommunityPostRepository
  ) {}

  async execute(postId: string, studentId: string): Promise<void> {
    // Validate inputs
    if (!postId) throw new ValidationError('Post ID is required');
    if (!studentId) throw new ValidationError('Student ID is required');

    // Try to delete the post
    const wasDeleted = await this._communityPostRepository.deletePost(postId, studentId);
    
    if (!wasDeleted) {
      throw new NotFoundError('Post not found or not authorized to delete');
    }
  }
}