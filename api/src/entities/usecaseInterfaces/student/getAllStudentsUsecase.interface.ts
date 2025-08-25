import { GetStudentsForAdminResDTO } from "shared/dto/response/student.dto";


export interface IGetAllStudentsUsecase{
    execute(currentPage:number,limit:number):Promise<{students:GetStudentsForAdminResDTO[],totalPages:number}>
}