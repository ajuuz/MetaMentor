import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { PaginationReqDTO } from "./pagination.dto";



export class GetAllStudentReqDTO extends PaginationReqDTO{}

export class UpdateStudentStatusReqDTO {
      @IsString()
      @IsNotEmpty()
      userId!: string;

      @IsBoolean()
      status!:boolean;
}