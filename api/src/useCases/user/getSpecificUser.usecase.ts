import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IGetSpecificUserUsecase } from "entities/usecaseInterfaces/user/getSpecificUserUsecase.interface";
import { UserDetailsResponseDTO, UserFindFilterDTO } from "shared/dto/userDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetSpecificUserUsecase implements IGetSpecificUserUsecase{

    constructor(
        @inject('IUserRepository')
        private _userRepository:IUserRespository
    ){}

    async execute(userId:string):Promise<UserDetailsResponseDTO>{
        if(!userId) throw new ValidationError("invalid credentials")

        const filter:Pick<UserFindFilterDTO,"_id">={_id:userId}
        const user:UserDetailsResponseDTO|null=await this._userRepository.findOne(filter)
        if(!user) throw new NotFoundError("user not found");
        return user
    }
}