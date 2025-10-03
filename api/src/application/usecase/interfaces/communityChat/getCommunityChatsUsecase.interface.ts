import { IGetCommunityChat } from "domain/entities/communityChat.entity";

export interface IGetCommunityChatsUsecase {
  execute(communityId: string, limit: number): Promise<IGetCommunityChat[]>;
}
