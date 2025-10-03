import { ICommentEntity } from "domain/entities/commentModel.entity";
import { ICommentRepository } from "domain/repositoryInterfaces/commentRepository.interface";

import {
  commentModel,
  ICommentModel,
} from "infrastructure/database/models/comment.model";
import { injectable } from "tsyringe";

import { BaseRepository } from "./base.repository";


@injectable()
export class CommentRepository
  extends BaseRepository<ICommentEntity, ICommentModel>
  implements ICommentRepository
{
  constructor() {
    super(commentModel);
  }
}
