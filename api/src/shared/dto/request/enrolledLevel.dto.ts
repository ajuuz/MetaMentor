import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";


export class SaveAssignmentReqDTO {
  @IsString()
  @IsNotEmpty()
  enrolledLevelId!: string;

 @IsArray()
  @ArrayNotEmpty({ message: "Assignments array cannot be empty" })
  @IsString({ each: true, message: "Each assignment must be a string" })
  @IsNotEmpty({ each: true, message: "Assignment cannot be empty" })
  assignments!: string[];
}