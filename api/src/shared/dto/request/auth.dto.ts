import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { GENDER } from "shared/constants";


export class UserRegisterDTO{

    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]{3,20}$/, {message: 'Name must be 3-20 characters, letters and spaces only'})
    name!:string;

    @IsEmail()
    email!:string;

    @IsString()
    @Transform(({ value }) => {
    const str = String(value).trim();
    const regex = /^\d{10}$/;
    if (!regex.test(str)) {
      throw new Error('Mobile number must be exactly 10 digits');
    }
    return Number(str);
    })
    @IsNumber({}, { message: 'Mobile number must be numeric' })
    mobileNumber!: number;

    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must be at least 8 characters long and contain at least one letter and one number'
    })
    password!:string;

    @IsString()
    @IsNotEmpty()
    country!:string;

    @IsString()
    @IsNotEmpty()
    gender!:GENDER;
}


// export class LoginReqDTO{

//     email
// }
