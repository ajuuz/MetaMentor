import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { FilterReqDTO } from "./pagination.dto";

//admin
export class GetAllCommunityForAdminReqDTO extends FilterReqDTO {}

export class UpdateCommunityStatusDTO {
    @IsString()
    @IsNotEmpty()
    communityId!: string;
    
    @IsBoolean()
    status!: boolean;
}


//student
export class GetAllCommunityForStudReqDTO extends FilterReqDTO {}