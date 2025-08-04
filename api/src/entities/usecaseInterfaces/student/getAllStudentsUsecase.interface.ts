import { GetAllStudentResponseDTO } from "shared/dto/studentDTO";


export interface IGetAllStudentsUsecase{
    execute(currentPage:number,limit:number):Promise<Omit<GetAllStudentResponseDTO,'totalDocuments'>>
}