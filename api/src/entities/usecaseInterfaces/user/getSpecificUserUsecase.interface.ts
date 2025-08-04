import { UserDetailsResponseDTO } from "shared/dto/userDTO";

export interface IGetSpecificUserUsecase{

    execute(userId:string):Promise<UserDetailsResponseDTO>
}