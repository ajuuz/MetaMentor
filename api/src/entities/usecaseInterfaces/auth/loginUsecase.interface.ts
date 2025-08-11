import { LoginDTO } from "shared/dto/response/auth.dto";

export interface ILoginUsecase{
    execute(email:string,password:string):Promise<{userData:LoginDTO,accessToken:string,refreshToken:string}>;
}