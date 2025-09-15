import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

// export class PaginationReqDTO {
//   @Type(() => Number)
//   @IsInt()
//   limit!: number;

//   @Type(() => Number)
//   @IsInt()
//   currentPage!: number;
// }

export class FilterReqDTO {
  @IsOptional()
  @IsString()
  searchTerm!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sortBy!: string;

  @Type(() => Number)
  @IsInt()
  limit!: number;

  @Type(() => Number)
  @IsInt()
  currentPage!: number;
}
