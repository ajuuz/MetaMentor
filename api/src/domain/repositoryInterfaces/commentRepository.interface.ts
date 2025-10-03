import { ICommentEntity } from "domain/entities/commentModel.entity";

import { ICommentModel } from "infrastructure/database/models/comment.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface ICommentRepository
  extends IBaseRepository<ICommentEntity, ICommentModel> {}
