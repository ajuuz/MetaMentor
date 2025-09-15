import { plainToInstance } from "class-transformer";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { IStudentRepository } from "domain/repositoryInterfaces/student-repository.interface";
import { IGetEnrolledDomainsUsecase } from "application/usecase/interfaces/domain/getDomainDashboardUsecase.interface";
import { GetEnrolledDomainsResDTO } from "application/dto/response/domain.dto";
import { NotFoundError } from "domain/errors/notFounError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetEnrolledDomainsUsecase implements IGetEnrolledDomainsUsecase {
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
  ): Promise<{ domains: GetEnrolledDomainsResDTO[]; totalPages: number }> {
    const filter = { userId };
    const student = await this._studentRepository.findOne(filter);
    if (!student) throw new NotFoundError("User not found");

    const skip = currentPage * limit;
    const domainIds = student.domains.map((domain) => domain.domainId);
    const { documents, totalDocuments } =
      await this._domainRepository.findUsingIn("_id", domainIds, skip, limit);
    const domains = plainToInstance(GetEnrolledDomainsResDTO, documents, {
      excludeExtraneousValues: true,
    });
    const totalPages = Math.ceil(totalDocuments / limit);
    return { domains, totalPages };
  }
}
