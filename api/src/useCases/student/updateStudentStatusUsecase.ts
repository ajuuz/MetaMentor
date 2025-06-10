import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IUpdateStudentStatusUsecase } from "entities/usecaseInterfaces/student/updateStudentStatusUsecase.interface";
import { ObjectId } from "mongoose";
import { CustomError } from "shared/utils/error/customError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateStudentStatusUsecase implements IUpdateStudentStatusUsecase{

    constructor(
        @inject('IStudentRepository')
        private _studentRepository:IStudentRepository
    ){}
    async execute(userId: string,status:boolean): Promise<void> {
        if(!userId || ![true,false].includes(status)) throw new ValidationError("insufficient data for updating status");
        const updateResult:number=await this._studentRepository.updateStatus(userId,status);
        if(updateResult===0) throw new CustomError(400,"No updation performed");
    }
}