import { plainToInstance } from "class-transformer";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface"
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface"
import { GetStudentsForAdminResDTO } from "shared/dto/response/student.dto";
import { inject, injectable } from "tsyringe"

@injectable()
export class GetAllStudentsUsecase implements IGetAllStudentsUsecase{

    constructor(
    @inject('IStudentRepository')
    private _studentRepository:IStudentRepository
    ){}

    async execute(currentPage:number,limit:number): Promise<{students:GetStudentsForAdminResDTO[],totalPages:number}>{
        const skip:number = (currentPage-1)*limit
        const {data,totalDocuments} = await this._studentRepository.findStudents({},skip,limit);
        const students = plainToInstance(GetStudentsForAdminResDTO,data,{
            excludeExtraneousValues:true
        })
        const totalPages:number = Math.ceil(totalDocuments/limit)
        return {students,totalPages}
    }
}