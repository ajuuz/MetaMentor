import { GetDomainsForStudResDTO } from "shared/dto/response/domain.dto";



export interface IGetUnblockedDomainsUsecase{

    execute(currentPage:number,limit:number):Promise<{domains:GetDomainsForStudResDTO[],totalPages:number}>
}