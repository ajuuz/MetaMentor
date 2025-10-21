import { inject, injectable } from "tsyringe";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";
import { ICommunityPostEntity } from "domain/entities/communityPostModel.entity";
import { ValidationError } from "domain/errors/validationError";
import { NotFoundError } from "domain/errors/notFounError";
import { IEditPostUseCase } from "application/usecase/interfaces/communityPost/editPostUsecase.interface";

export interface EditPostDTO {
  title?: string;
  description?: string;
  image?: string;
}

@injectable()
export class EditPostUseCase implements IEditPostUseCase {
  constructor(
    @inject("ICommunityPostRepository")
    private readonly _communityPostRepository: ICommunityPostRepository
  ) {}

  async execute(
    postId: string,
    studentId: string,
    updates: EditPostDTO
  ): Promise<void> {
    // Validate inputs
    if (!postId) throw new ValidationError("Post ID is required");
    if (!studentId) throw new ValidationError("Student ID is required");
    if (!updates || Object.keys(updates).length === 0) {
      throw new ValidationError("No updates provided");
    }

    // Validate update fields
    if (updates.title && updates.title.trim().length === 0) {
      throw new ValidationError("Title cannot be empty");
    }
    if (updates.description && updates.description.trim().length === 0) {
      throw new ValidationError("Description cannot be empty");
    }

    // Clean up updates object - only include valid fields
    const validUpdates: Partial<
      Pick<ICommunityPostEntity, "title" | "description" | "image">
    > = {};
    if (updates.title) validUpdates.title = updates.title.trim();
    if (updates.description)
      validUpdates.description = updates.description.trim();
    if (updates.image) validUpdates.image = updates.image;

    // Try to update the post
    const result = await this._communityPostRepository.findOne({
      _id: postId,
      studentId,
    });
    if (result === null) {
      throw new NotFoundError("Post not found or not authorized to edit");
    }
    await this._communityPostRepository.editPost(
      postId,
      studentId,
      validUpdates
    );
  }
}
