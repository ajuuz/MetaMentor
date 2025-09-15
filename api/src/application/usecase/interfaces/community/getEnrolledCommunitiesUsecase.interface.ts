import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";

export interface IGetEnrolledCommunitiesUsecase{

    execute(userId:string,currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>
}