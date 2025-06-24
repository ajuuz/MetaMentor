import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUpdateStudentStatusUsecase } from "entities/usecaseInterfaces/student/updateStudentStatusUsecase.interface";
import { ObjectId } from "mongoose";
import { CustomError } from "shared/utils/error/customError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateStudentStatusUsecase implements IUpdateStudentStatusUsecase{

    constructor(
        @inject('IStudentRepository')
        private _studentRepository:IStudentRepository,

        @inject('IUserRepository')
        private _userRepository:IUserRespository
    ){}
    async execute(userId: string,status:boolean): Promise<void> {
        if(!userId || ![true,false].includes(status)) throw new ValidationError("insufficient data for updating status");
        let asyncOperations=[];
        let filter = {_id:userId};
        let update = {isBlocked:status}
        asyncOperations.push(this._userRepository.updateOne(filter,update))
        asyncOperations.push(this._studentRepository.updateStatus(userId,status));
        await Promise.all(asyncOperations)
    }
}