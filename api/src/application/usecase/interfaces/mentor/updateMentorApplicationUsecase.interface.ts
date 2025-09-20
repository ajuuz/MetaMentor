import { UpdateMentorApplicationReqDTO } from "application/dto/requset/mentor.dto";

export interface IUpdateMentorApplicationUsecase {
  execute(
    userId: string,
    mentorDetails: UpdateMentorApplicationReqDTO
  ): Promise<void>;
}
