import { loginResponseDTO } from "shared/dto/authDTO";



export interface IGoogleAuthUsecase{
    execute(idToken:string,fcmToken:string|null):Promise<loginResponseDTO>
}