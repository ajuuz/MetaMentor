import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { DAYS } from "shared/constants";

//students
export class GetDomainSlotsForStudReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}

export class GetSlotsForStudReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsEnum(DAYS)
  day!:DAYS
}

export class SlotValidityCheckReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsISO8601()
  date!: string;

  @IsString()
  @IsNotEmpty()
  slotId!: string;
}

//mentors
export class GetSlotsOfADayForMentReqDTO {
  @IsEnum(DAYS)
  day!:DAYS
}

export class SlotValidityCheckForMentReqDTO {
  @IsISO8601()
  date!: string;

  @IsString()
  @IsNotEmpty()
  slotId!: string;
}

export class SlotTimeDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  _id?: string;
  
  @IsInt()
  @Min(0)
  start!: number;
  
  @IsInt()
  @Min(0)
  end!: number;
  
  @IsBoolean()
  enabled!: boolean;
}

export class UpdateSlotReqDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Monday!: SlotTimeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Tuesday!: SlotTimeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Wednesday!: SlotTimeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Thursday!: SlotTimeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Friday!: SlotTimeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Saturday!: SlotTimeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotTimeDTO)
  Sunday!: SlotTimeDTO[];
}

export class UpdateSlotStatusReqDTO {

  @IsString()
  @IsNotEmpty()
  slotId!:string

  @IsEnum(DAYS)
  day!:DAYS

  @IsBoolean()
  slotStatus!:boolean
}
