import { GetAllStudentReqDTO } from "shared/dto/request/student.dto";
import { GetStudentsForAdminResDTO } from "shared/dto/response/student.dto";

export interface IGetAllStudentsUsecase {
  execute(
    fetchDetails:GetAllStudentReqDTO
  ): Promise<{ students: GetStudentsForAdminResDTO[]; totalPages: number }>;
}
