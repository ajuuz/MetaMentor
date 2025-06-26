import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUpdateUserUsecase } from "entities/usecaseInterfaces/user/updateUserUsecase.interface";
import { UserUpdateDTO } from "shared/dto/userDTO";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUsecase implements IUpdateUserUsecase{

    constructor(
        @inject('IUserRepository')
        private _userRepository:IUserRespository
    ){}
   async execute(userId:string,updatedData:Partial<Pick<UserUpdateDTO.update,"name"|"country"|"gender"|"mobileNumber"|"profileImage">>):Promise<void>{
        if(!userId) throw new ValidationError("user id is required");
        const filter:Pick<UserUpdateDTO.filter,"_id">={_id:userId}
        const update=updatedData
        console.log(filter,update)
        await this._userRepository.updateOne(filter,update)
   }
}