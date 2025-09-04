import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  ArrayMinSize,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";
import { LevelReqDTO } from "./level.dto";
import { FilterReqDTO } from "./pagination.dto";

export class CreateDomainReqDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15, { message: "Name must be at most 15 characters long" })
  name!: string;

  @IsArray()
  @ArrayNotEmpty({ message: "Images array should not be empty" })
  @IsString({ each: true, message: "Each image must be a string" })
  @IsNotEmpty({ each: true, message: "Each image should not be empty" })
  images!: string[];

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

export class GetAllDomainsForAdminReqDTO extends FilterReqDTO {}

export class UpdateDomainStatusDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;

  @IsBoolean()
  status!: boolean;
}

//students
export class GetAllDomainsForStudReqDTO extends FilterReqDTO {}

export class GetSpecificDomainForStudReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}

export class EnrollDomainReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}

export class GetDomainDashboardForStudReqDTO extends FilterReqDTO {}

export class GetDomainInsightReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}
