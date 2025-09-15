import { CreateMentorApplicationReqDTO } from "application/dto/requset/mentor.dto";

export interface ICreateMentorApplicationUsecase {
  execute(
    userId: string,
    mentorDetails: CreateMentorApplicationReqDTO
  ): Promise<void>;
}
