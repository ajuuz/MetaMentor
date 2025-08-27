import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FilterReqDTO } from "./pagination.dto";
import { Transform } from "class-transformer";


export class GetAllStudentReqDTO extends FilterReqDTO{
      @IsOptional()
      @Transform(({obj})=>obj.isPremium==='true'?true:false)
      @IsBoolean()
      isPremium?:boolean
}

export class UpdateStudentStatusReqDTO {
      @IsString()
      @IsNotEmpty()
      userId!: string;

      @IsBoolean()
      status!:boolean;
}