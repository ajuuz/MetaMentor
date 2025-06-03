import { IloginDTO, ISignupRequestDto } from "shared/dto/authDto";
import { ISuccessResponseHandler} from "shared/utils/successResponseHandler";



export interface IAuthUsecase {
    register(formData:ISignupRequestDto):Promise<ISuccessResponseHandler>;
    verifyOtp(email:string,otp:string):Promise<void>;
    login(email:string,password:string):Promise<IloginDTO>;
}