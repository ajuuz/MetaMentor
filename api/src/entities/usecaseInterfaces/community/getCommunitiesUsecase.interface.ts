import { GetAllCommunitiesResponseDTO } from "shared/dto/communityDTO";



export interface IGetCommunitiesUsecase{

    execute(currentPage:number,limit:number):Promise<Omit<GetAllCommunitiesResponseDTO,'totalDocuments'>>
}