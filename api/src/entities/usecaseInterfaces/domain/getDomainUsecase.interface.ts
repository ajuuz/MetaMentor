import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";


export interface IGetAllDomainsUsecase{
    execute(currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>
}