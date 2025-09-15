import { UserRegisterDTO } from "application/dto/requset/auth.dto";
import { ISuccessResponseHandler } from "shared/utils/successResponseHandler";

export interface IRegisterUserUsecase {
  execute(formData: UserRegisterDTO): Promise<ISuccessResponseHandler>;
}
