import { loginResponseDTO } from "shared/dto/authDTO";



export interface IGoogleAuthUsecase{
    execute(idToken:string):Promise<loginResponseDTO>
}