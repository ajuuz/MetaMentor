import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { PaginationReqDTO } from "./pagination.dto";

export class GetAllCommunityForAdminReqDTO extends PaginationReqDTO {}

export class UpdateCommunityStatusDTO {
  @IsString()
  @IsNotEmpty()
  communityId!: string;

  @IsBoolean()
  status!: boolean;
}
