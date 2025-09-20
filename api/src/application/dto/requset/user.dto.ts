import {
  IsString,
  Matches,
  IsEnum,
  IsOptional,
  Length,
  IsNotEmpty,
  IsArray,
} from "class-validator";
import { Transform } from "class-transformer";
import { GENDER } from "shared/constants";

export class UpdateUserDetailsReqDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @Matches(/^[A-Za-z\s]{3,20}$/, {
    message: "Name must be 3-20 characters, letters and spaces only",
  })
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  country?: string;

  @IsOptional()
  @IsEnum(GENDER, { message: "Gender must be male, female, or other" })
  gender?: GENDER;

  @IsOptional()
  @Transform(({ value }) => value?.toString().trim())
  @Matches(/^\d{10}$/, { message: "Mobile number must be exactly 10 digits" })
  mobileNumber?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: "Each image must be a string" })
  @IsNotEmpty({ each: true, message: "Each image should not be empty" })
  images?: string[];
}
