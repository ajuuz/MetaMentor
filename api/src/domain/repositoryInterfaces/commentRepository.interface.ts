import { ICommentEntity } from "domain/entities/commentModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { ICommentModel } from "infrastructure/database/models/comment.model";

export interface ICommentRepository
  extends IBaseRepository<ICommentEntity, ICommentModel> {}
