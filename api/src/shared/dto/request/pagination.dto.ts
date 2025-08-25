import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class PaginationReqDTO {
  @Type(() => Number)
  @IsInt()
  limit!: number;

  @Type(() => Number)
  @IsInt()
  currentPage!: number;
}
