import { ICommunityEntity } from "entities/modelEntities/communityModel.entity"


export type GetAllCommunitiesResponseDTO={
   communities:ICommunityEntity[],
   totalDocuments:number,
   totalPages:number
}
