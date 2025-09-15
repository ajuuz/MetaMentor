import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";
import {
  communityPostModel,
  ICommunityPostModel,
} from "infrastructure/database/models/communityPost.model";
import { ICommunityPostEntity } from "domain/entities/communityPostModel.entity";

@injectable()
export class CommunityPostRepository
  extends BaseRepository<ICommunityPostEntity, ICommunityPostModel>
  implements ICommunityPostRepository
{
  constructor() {
    super(communityPostModel);
  }
}
