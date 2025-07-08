import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IGetEnrolledDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainDashboardUsecase.interface";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetEnrolledDomainsUsecase implements IGetEnrolledDomainsUsecase{

    constructor(
        @inject('IStudentRepository')
        private _studentRepository:IStudentRepository,

        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,
    ){}

    async execute(userId:string):Promise<IDomainEntity[]>{
        const filter={userId}
        console.log("dlkfjd;slf")
        const student = await this._studentRepository.findOne(filter)
        if(!student) throw new NotFoundError('User not found');
        console.log(student)
        const domainIds=student.domains.map(domain=>domain.domainId);
        const domains = await this._domainRepository.findUsingIn('_id',domainIds)
        
        return domains
    }
}