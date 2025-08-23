import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from "class-validator";
import { GENDER } from "shared/constants";
import { ValidationError } from "shared/utils/error/validationError";

export class UpdateUserDetailsReqDTO {
  @ValidateIf((o) => o.name !== undefined)
  @IsString()
  @Transform(({ value }) => value?.trim())
  @Matches(/^[A-Za-z\s]{3,20}$/, {
    message: "Name must be 3-20 characters, letters and spaces only",
  })
  name?: string;

  @ValidateIf((o) => o.country !== undefined)
  @IsString()
  @IsNotEmpty()
  country?: string;

  @ValidateIf((o) => o.gender !== undefined)
  @IsEnum(GENDER)
  gender?: GENDER;

  @ValidateIf((o) => o.mobileNumber !== undefined)
  @Transform(({ value }) => {
    const str = String(value).trim();
    console.log(str);
    const regex = /^\d{10}$/;
    if (!regex.test(str)) {
      throw new ValidationError("Mobile number must be exactly 10 digits");
    }
    return Number(str);
  })
  mobileNumber?: number;

  @ValidateIf((o) => o.profileImage !== undefined)
  @IsString()
  @IsNotEmpty()
  profileImage?: string;
}
