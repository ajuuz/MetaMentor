import { loginResponseDTO } from "shared/dto/authDTO";

export interface ILoginUsecase{
    execute(email:string,password:string):Promise<loginResponseDTO>;
}