import { GetUserDetailsResDTO } from "application/dto/response/user.dto";

export interface IGetSpecificUserUsecase {
  execute(userId: string): Promise<GetUserDetailsResDTO>;
}
