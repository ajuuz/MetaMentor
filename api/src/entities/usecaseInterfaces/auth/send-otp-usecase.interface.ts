import { ISignupDto } from "shared/dto/authDto/signupDto";
import { IResponseSpecifier } from "shared/responseSpecifiers";



export interface IAuthUsecase {
    register(formData:ISignupDto):Promise<IResponseSpecifier>;
    verifyOtp(email:string,otp:string):Promise<void>;
}