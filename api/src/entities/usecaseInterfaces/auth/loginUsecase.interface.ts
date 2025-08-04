import { loginResponseDTO } from "shared/dto/authDTO";

export interface ILoginUsecase{
    execute(email:string,password:string,fcmToken:string|null):Promise<loginResponseDTO>;
}