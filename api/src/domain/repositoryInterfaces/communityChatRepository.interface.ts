import { ICommunityChatEnitity, IGetCommunityChat } from "domain/entities/communityChat.entity";
import { IBaseRepository } from "./baseRepository.interface";
import { ICommunityChatModel } from "infrastructure/database/models/communityChat.model";

export interface ICommunityChatRepository
  extends IBaseRepository<ICommunityChatEnitity, ICommunityChatModel> {
  saveMessage(message:Partial<ICommunityChatEnitity>): Promise<IGetCommunityChat>;
  getAllMessages(communityId: string,limit:number): Promise<IGetCommunityChat[]>
}
