import { AddCommentDTO } from "../../implementations/communityPost/addComment.usecase";
import { ICommentEntity } from "domain/entities/commentModel.entity";

export interface IAddCommentUseCase {
  execute(data: AddCommentDTO): Promise<ICommentEntity>;
}