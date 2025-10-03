import { ICommunityChatEnitity, IGetCommunityChat } from "domain/entities/communityChat.entity";

import { ICommunityChatModel } from "infrastructure/database/models/communityChat.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface ICommunityChatRepository
  extends IBaseRepository<ICommunityChatEnitity, ICommunityChatModel> {
  saveMessage(message:Partial<ICommunityChatEnitity>): Promise<IGetCommunityChat>;
  getAllMessages(communityId: string,limit:number): Promise<IGetCommunityChat[]>
}
