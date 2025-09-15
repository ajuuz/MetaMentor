import { GetDomainsForStudResDTO } from "shared/dto/response/domain.dto";



export interface IGetUnblockedDomainsUsecase{

    execute(currentPage:number,limit:number,sortBy:string,searchTerm:string):Promise<{domains:GetDomainsForStudResDTO[],totalPages:number}>
}