import { plainToInstance } from "class-transformer";
import { IStudentEntity } from "entities/modelEntities/student-model.entity";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface";
import { SORT_ORDER } from "shared/constants";
import { GetAllStudentReqDTO } from "shared/dto/request/student.dto";
import { GetStudentsForAdminResDTO } from "shared/dto/response/student.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllStudentsUsecase implements IGetAllStudentsUsecase {
  constructor(
    @inject("IStudentRepository")
    private _studentRepository: IStudentRepository
  ) {}

  async execute(
    fetchDetails: GetAllStudentReqDTO
  ): Promise<{ students: GetStudentsForAdminResDTO[]; totalPages: number }> {
    const { currentPage, limit, sortBy, searchTerm, isPremium } = fetchDetails;
    const skip: number = (currentPage - 1) * limit;
    //filter
    const filter: Record<string, string|boolean> = {};
    if(searchTerm) filter.searchTerm=searchTerm;
    if(isPremium) filter.isPremium=isPremium;

    //sort
    const [field, order] = sortBy!.split("-");
    const sort = { field, order: order as SORT_ORDER };

    const { data, totalDocuments } = await this._studentRepository.findStudentsWithFilterAndPagination(
      filter,
      skip,
      limit,
      sort
    );
    const students = plainToInstance(GetStudentsForAdminResDTO, data, {
      excludeExtraneousValues: true,
    });
    const totalPages: number = Math.ceil(totalDocuments / limit);
    return { students, totalPages };
  }
}
