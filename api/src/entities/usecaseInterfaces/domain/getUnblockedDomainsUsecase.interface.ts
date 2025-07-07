import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";



export interface IGetUnblockedDomainsUsecase{

    execute(currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>
}