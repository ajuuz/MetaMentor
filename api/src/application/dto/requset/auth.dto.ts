import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";
import { IUserEntity } from "domain/entities/user-model.entity";
import { GENDER } from "shared/constants";
import { ValidationError } from "domain/errors/validationError";

export interface IuserRegisterData
  extends Partial<
    Omit<IUserEntity, "createdAt" | "role" | "isBlocked" | "isVerified">
  > {}

//register
export class UserRegisterDTO {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]{3,20}$/, {
    message: "Name must be 3-20 characters, letters and spaces only",
  })
  name!: string;

  @IsEmail()
  email!: string;

  @Transform(({ value }) => {
    const str = String(value).trim();
    console.log(str);
    const regex = /^\d{10}$/;
    if (!regex.test(str)) {
      throw new ValidationError("Mobile number must be exactly 10 digits");
    }
    return Number(str);
  })
  @IsNumber({}, { message: "Mobile number must be numeric" })
  mobileNumber!: number;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "Password must be at least 8 characters long and contain at least one letter and one number",
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsEnum(GENDER)
  gender!: GENDER;
}
export class GoogleRegisterDTO {
  @IsString()
  idToken!: string;
}
export interface IGoogleRegisterData
  extends Pick<
    IUserEntity,
    "name" | "googleId" | "email" | "profileImage" | "isVerified"
  > {}

//login
export class LoginReqDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "Password must be at least 8 characters long and contain at least one letter and one number",
  })
  password!: string;
}

//otp
export class OtpReqDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^\d{6}$/, { message: "OTP must be exactly 6 digits" })
  otp!: string;
}

export class ResendOtpReqDTO {
  @IsEmail()
  email!: string;
}

export class ForgotPasswordSendMailReqDTO extends ResendOtpReqDTO {}

export class ForgotPasswordResetReqDTO {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "Password must be at least 8 characters long and contain at least one letter and one number",
  })
  password!: string;

  @IsString()
  token!: string;
}
