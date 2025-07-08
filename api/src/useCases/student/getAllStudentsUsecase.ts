import { IStudentEntity } from "entities/modelEntities/student-model.entity";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface"
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface"
import { GetAllStudentResponseDTO } from "shared/dto/studentDTO";
import { inject, injectable } from "tsyringe"

@injectable()
export class GetAllStudentsUsecase implements IGetAllStudentsUsecase{

    constructor(
    @inject('IStudentRepository')
    private _studentRepository:IStudentRepository
    ){}

    async execute(currentPage:number,limit:number): Promise<Omit<GetAllStudentResponseDTO,'totalDocuments'>>{
        const skip:number = (currentPage-1)*limit
        const {students,totalDocuments} = await this._studentRepository.findStudents({},skip,limit);
        const totalPages:number = Math.ceil(totalDocuments/limit)
        return {students,totalPages}
    }
}