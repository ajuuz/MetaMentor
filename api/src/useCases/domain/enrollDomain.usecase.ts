import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IEnrollDomainUsecase } from "entities/usecaseInterfaces/domain/enrollDomainUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollDomainUsecase implements IEnrollDomainUsecase{

    constructor(
        @inject('IStudentRepository')
        private _studentRepository:IStudentRepository
    ){}

   async execute(userId:string,domainId:string):Promise<void>{
        await this._studentRepository.pushDomain(userId,domainId)
    }
}