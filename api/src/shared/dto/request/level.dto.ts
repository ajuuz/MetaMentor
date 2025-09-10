import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { LEVEL_TASK_TYPE } from "shared/constants";

export class TaskReqDTO {
  @IsEnum(LEVEL_TASK_TYPE, {
    message: "Task type must be either 'link' or 'text'",
  })
  type!: LEVEL_TASK_TYPE;

  @IsString()
  @IsNotEmpty({ message: "Task content must not be empty" })
  content!: string;
}

export class EditTaskReqDTO {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsEnum(LEVEL_TASK_TYPE, {
    message: "Task type must be either 'link' or 'text'",
  })
  type!: LEVEL_TASK_TYPE;

  @IsString()
  @IsNotEmpty({ message: "Task content must not be empty" })
  content!: string;
}

export class LevelReqDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: "Name must be at most 20 characters long" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  taskFile!: string;

  @ValidateNested({ each: true })
  @Type(() => TaskReqDTO)
  tasks!: TaskReqDTO[];
}

export class EditLevelReqDTO {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: "Name must be at most 20 characters long" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  taskFile!: string;

  @ValidateNested({ each: true })
  @Type(() => TaskReqDTO)
  tasks!: EditTaskReqDTO[];

  @IsBoolean()
  isBlocked!: boolean;
}


export class UpdateLevelStatusDTO {
  @IsString()
  @IsNotEmpty()
  levelId!: string;

  @IsBoolean()
  status!: boolean;
}