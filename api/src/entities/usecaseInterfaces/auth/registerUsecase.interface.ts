import { SignupRequestDto } from "shared/dto/authDTO";
import { ISuccessResponseHandler} from "shared/utils/successResponseHandler";



export interface IRegisterUserUsecase {
    execute(formData:SignupRequestDto):Promise<ISuccessResponseHandler>;
}