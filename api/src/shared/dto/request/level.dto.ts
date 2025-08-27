import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class LevelReqDTO {

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: "Name must be at most 10 characters long" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  taskFile!: string;
}