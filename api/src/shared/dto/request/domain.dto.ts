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
  IsOptional,
} from "class-validator";
import { EditLevelReqDTO, LevelReqDTO } from "./level.dto";
import { FilterReqDTO } from "./pagination.dto";

//==============Admin===================//
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

export class EditDomainReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15, { message: "Name must be at most 15 characters long" })
  name?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  motive?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EditLevelReqDTO)
  editRequiredLevels?: EditLevelReqDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LevelReqDTO)
  newLevels?: LevelReqDTO[];
}

export class GetAllDomainsForAdminReqDTO extends FilterReqDTO {}

export class GetDomainForAdminReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}

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

  @IsBoolean()
  fullCourse!: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  selectedLevelsId?: string[];
}

export class GetDomainDashboardForStudReqDTO extends FilterReqDTO {}

export class GetDomainInsightReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}
