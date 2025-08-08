import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IGetEnrolledCommunitiesUsecase } from "entities/usecaseInterfaces/community/getEnrolledCommunitiesUsecase.interface";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetEnrolledCommunitiesUsecase implements IGetEnrolledCommunitiesUsecase{

    constructor(
        @inject('IStudentRepository')
        private _studentRepository:IStudentRepository,

        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,
    ){}

    async execute(userId:string,currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>{
        const filter={userId}
        const student = await this._studentRepository.findOne(filter)
        if(!student) throw new NotFoundError('User not found');

        const skip = currentPage*limit;
        const domainIds=student.domains.map(domain=>domain.domainId);
        const {documents:domains,totalDocuments} = await this._domainRepository.findUsingIn('_id',domainIds,skip,limit);
        const totalPages = Math.ceil(totalDocuments/limit)
        return {domains,totalPages}
    }
}