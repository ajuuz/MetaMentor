import { IGetCommunityChat } from "domain/entities/communityChat.entity";
import { ICommunityChatRepository } from "domain/repositoryInterfaces/communityChatRepository.interface";

import { IGetCommunityChatsUsecase } from "application/usecase/interfaces/communityChat/getCommunityChatsUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCommunityChatsUsecase implements IGetCommunityChatsUsecase {
  constructor(
    @inject("ICommunityChatRepository")
    private _communityChatRepository: ICommunityChatRepository
  ) {}

  async execute(
    communityId: string,
    limit: number
  ): Promise<IGetCommunityChat[]> {
    const chats = await this._communityChatRepository.getAllMessages(
      communityId,
      limit
    );

    return chats;
  }
}
