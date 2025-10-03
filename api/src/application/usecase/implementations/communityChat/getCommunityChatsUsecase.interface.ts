import { inject, injectable } from "tsyringe";
import { IGetCommunityChat } from "domain/entities/communityChat.entity";
import { IGetCommunityChatsUsecase } from "application/usecase/interfaces/communityChat/getCommunityChatsUsecase.interface";
import { ICommunityChatRepository } from "domain/repositoryInterfaces/communityChatRepository.interface";

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
