import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IGetCommunitiesUsecase } from "entities/usecaseInterfaces/community/getCommunitiesUsecase.interface";
import { GetAllCommunitiesResponseDTO } from "shared/dto/communityDTO";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetCommunitiesUsecase implements IGetCommunitiesUsecase{

    constructor(
        @inject('ICommunityRepository')
        private _communityRepository:ICommunityRepository
    ){}

    async execute(currentPage:number,limit:number):Promise<Omit<GetAllCommunitiesResponseDTO,'totalDocuments'>>{
        const skip = (currentPage-1)*limit;
        const filter={}
        const sort={createdAt:1}
        const {items:communities,totalDocuments} = await this._communityRepository.find(filter,skip,limit,sort);
        const totalPages = Math.ceil(totalDocuments/limit);
        return {communities,totalPages}
    }
}