import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { UserDetailsResponseDTO } from "shared/dto/userDTO";

export interface IGetSpecificUserUsecase{

    execute(userId:string):Promise<UserDetailsResponseDTO>
}