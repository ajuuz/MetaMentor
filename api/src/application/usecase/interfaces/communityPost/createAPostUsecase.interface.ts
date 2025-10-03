import { CreateCommunityPostReqDTO } from "application/dto/requset/communityPost.dto";

export interface ICreateAPostUsecase {
  execute(userId: string, post: CreateCommunityPostReqDTO): Promise<void>;
}
