import { GetAllStudentReqDTO } from "application/dto/requset/student.dto";
import { GetStudentsForAdminResDTO } from "application/dto/response/student.dto";

export interface IGetAllStudentsUsecase {
  execute(
    fetchDetails: GetAllStudentReqDTO
  ): Promise<{ students: GetStudentsForAdminResDTO[]; totalPages: number }>;
}
