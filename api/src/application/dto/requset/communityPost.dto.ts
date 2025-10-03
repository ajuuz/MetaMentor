import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateCommunityPostReqDTO {
  @IsString()
  @IsNotEmpty()
  communityId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40, { message: "Name must be at most 40 characters long" })
  title!: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: "Images array should not be empty" })
  @IsString({ each: true, message: "Each image must be a string" })
  @IsNotEmpty({ each: true, message: "Each image should not be empty" })
  images?: string[];

  @IsString()
  @IsNotEmpty()
  description!: string;
}
