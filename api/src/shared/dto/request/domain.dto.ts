import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  ArrayMinSize,
  IsBoolean,
} from "class-validator";
import { LevelReqDTO } from "./level.dto";
import { PaginationReqDTO } from "./pagination.dto";

export class CreateDomainReqDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15, { message: "Name must be at most 15 characters long" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  motive!: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(3, { message: "At least three level must be provided" })
  @Type(() => LevelReqDTO)
  levels!: LevelReqDTO[];
}

export class GetAllDomainForAdminReqDTO extends PaginationReqDTO {}

export class UpdateDomainStatusDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;

  @IsBoolean()
  status!: boolean;
}
