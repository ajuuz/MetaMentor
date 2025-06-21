import { SignupRequestDto } from "shared/dto/authDTO";
import { ISuccessResponseHandler} from "shared/utils/successResponseHandler";



export interface IRegisterUserUsecase {
    execute(formData:Omit<SignupRequestDto,"googleId"|"isVerified"|"profileImage">):Promise<ISuccessResponseHandler>;
}