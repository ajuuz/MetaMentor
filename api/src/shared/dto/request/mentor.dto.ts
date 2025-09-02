import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from "class-validator";
import { FilterReqDTO } from "./pagination.dto";
import { MENTOR_APPLICATION_STATUS } from "shared/constants";
import { Transform, Type } from "class-transformer";

///------------------Admin---------------------------///
export class GetAllMentorsReqDTO extends FilterReqDTO {
  @Transform(({ value }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    throw new Error("isVerified must be true or false");
  })
  @IsBoolean()
  isVerified!: boolean;

  @IsString()
  selectedDomains!:string
}

export class GetSpecificMentorReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;
}

export class MentorApplicationVerificationReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsEnum(MENTOR_APPLICATION_STATUS)
  applicationStatus!: MENTOR_APPLICATION_STATUS;

  @IsEmail()
  email!: string;

  @ValidateIf((o) => o.applicationStatus === MENTOR_APPLICATION_STATUS.REJECTED)
  @IsString()
  @IsNotEmpty()
  reason?: string;
}

export class UpdateMentorStatusReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsBoolean()
  status!: boolean;
}
///------------------Admin---------------------------///


///------------------Mentor---------------------------///
export class ApplyForMentorReqDTO {
  @IsString()
  @IsNotEmpty()
  about!: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1, { message: "At least one domain you must know" })
  domains!: string[];

  @IsString()
  @IsNotEmpty()
  cv!: string;

  @IsString()
  @IsNotEmpty()
  experienceCirtificate!: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1, { message: "At least one worked place you have to mention" })
  workedAt!: string[];
  
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1, { message: "At least one skills you must know" })
  skills!: string[];

  @Type(() => Number)
  @IsNumber({}, { message: "Fee must be a number" })
  @Min(100, { message: "Fee must be at least 100" })
  @Max(700, { message: "Fee must not exceed 700" })
  fee!: number;
}
///------------------Mentor---------------------------///


///------------------Student---------------------------///
export class GetMentorsForStudReqDTO extends FilterReqDTO {
  @IsString()
  selectedDomains!:string
}

