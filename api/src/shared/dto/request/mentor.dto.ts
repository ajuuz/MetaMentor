import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from "class-validator";
import { PaginationReqDTO } from "./pagination.dto";
import { MENTOR_APPLICATION_STATUS } from "shared/constants";
import { Transform } from "class-transformer";

export class GetAllMentorsReqDTO extends PaginationReqDTO {
  @Transform(({ value }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    throw new Error("isVerified must be true or false");
  })
  @IsBoolean()
  isVerified!: boolean;
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
