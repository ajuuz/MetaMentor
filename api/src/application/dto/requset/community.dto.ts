import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { FilterReqDTO } from "./pagination.dto";

//admin
export class GetCommunitiesForAdminReqDTO extends FilterReqDTO {}

export class UpdateCommunityStatusDTO {
    @IsString()
    @IsNotEmpty()
    communityId!: string;
    
    @IsBoolean()
    status!: boolean;
}


//student
export class GetCommunitiesForStudReqDTO extends FilterReqDTO {}