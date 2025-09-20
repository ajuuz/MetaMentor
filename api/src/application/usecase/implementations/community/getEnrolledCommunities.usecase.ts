import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { IStudentRepository } from "domain/repositoryInterfaces/student-repository.interface";
import { IGetEnrolledCommunitiesUsecase } from "application/usecase/interfaces/community/getEnrolledCommunitiesUsecase.interface";
import { NotFoundError } from "domain/errors/notFounError";
import { inject, injectable } from "tsyringe";
import { IDomainEntity } from "domain/entities/domainModel.entity";

@injectable()
export class GetEnrolledCommunitiesUsecase
  implements IGetEnrolledCommunitiesUsecase
{
  constructor(
    @inject("IStudentRepository")
    private _studentRepository: IStudentRepository,

    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository
  ) {}

  async execute(
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<{
    domains: IDomainEntity[];
    totalPages: number;
  }> {
    const filter = { userId };
    const student = await this._studentRepository.findOne(filter);
    if (!student) throw new NotFoundError("User not found");

    const skip = currentPage * limit;
    const domainIds = student.domains.map((domain) => domain.domainId);
    const { documents: domains, totalDocuments } =
      await this._domainRepository.findUsingIn("_id", domainIds, skip, limit);
    const totalPages = Math.ceil(totalDocuments / limit);
    return { domains, totalPages };
  }
}
