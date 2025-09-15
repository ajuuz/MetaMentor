import { UpdateUserDetailsReqDTO } from "application/dto/requset/user.dto";

export interface IUpdateUserUsecase {
  execute(userId: string, updatedData: UpdateUserDetailsReqDTO): Promise<void>;
}
