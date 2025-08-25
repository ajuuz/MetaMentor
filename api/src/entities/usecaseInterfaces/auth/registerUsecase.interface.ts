import { UserRegisterDTO } from "shared/dto/request/auth.dto";
import { ISuccessResponseHandler} from "shared/utils/successResponseHandler";



export interface IRegisterUserUsecase {
    execute(formData:UserRegisterDTO):Promise<ISuccessResponseHandler>;
}