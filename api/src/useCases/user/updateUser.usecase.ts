import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUpdateUserUsecase } from "entities/usecaseInterfaces/user/updateUserUsecase.interface";
import { UpdateUserDetailsReqDTO } from "shared/dto/request/user.dto";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUsecase implements IUpdateUserUsecase{

    constructor(
        @inject('IUserRepository')
        private _userRepository:IUserRespository
    ){}
   async execute(userId:string,updatedData:UpdateUserDetailsReqDTO):Promise<void>{
        if(!userId) throw new ValidationError("user id is required");
        const filter:Pick<IUserEntity,'_id'>={_id:userId}
        const update=updatedData
        await this._userRepository.updateOne(filter,update)
   }
}