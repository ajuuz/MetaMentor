import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { PaginationReqDTO } from "./pagination.dto";

//admin
export class GetAllCommunityForAdminReqDTO extends PaginationReqDTO {}

export class UpdateCommunityStatusDTO {
    @IsString()
    @IsNotEmpty()
    communityId!: string;
    
    @IsBoolean()
    status!: boolean;
}


//student
export class GetAllCommunityForStudReqDTO extends PaginationReqDTO {}