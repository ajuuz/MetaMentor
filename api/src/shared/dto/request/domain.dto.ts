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
import { FilterReqDTO } from "./pagination.dto";

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