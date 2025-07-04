import { ROLES } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";


export interface IGetAllDomainsUsecase{
    execute(role:ROLES,currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>
}