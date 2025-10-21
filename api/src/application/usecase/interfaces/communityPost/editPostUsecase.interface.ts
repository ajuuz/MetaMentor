import { EditPostDTO } from "../../implementations/communityPost/editPost.usecase";

export interface IEditPostUseCase {
  execute(postId: string, studentId: string, updates: EditPostDTO): Promise<void>;
}