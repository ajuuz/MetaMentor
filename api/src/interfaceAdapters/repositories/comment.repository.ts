import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { ICommentEntity } from "entities/modelEntities/commentModel.entity";
import { commentModel, ICommentModel } from "frameworks/database/models/comment.model";
import { ICommentRepository } from "entities/repositoryInterfaces/commentRepository.interface";


@injectable()
export class CommentRepository extends BaseRepository<ICommentEntity,ICommentModel> implements ICommentRepository{

    constructor(){
        super(commentModel)
    }

}