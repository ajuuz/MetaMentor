import { ICommentEntity } from "entities/modelEntities/commentModel.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { ICommentModel } from "frameworks/database/models/comment.model";


export interface ICommentRepository extends IBaseRepository<ICommentEntity,ICommentModel>{

}