import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetNotVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getNotVerifiedMentorsUsecase.interface";
import { GetAllMentorResponseDTO, MentorFindFilterDTO } from "shared/dto/mentorDTO";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetNotVerifiedMentorsUsecase implements IGetNotVerifiedMentorsUsecase{

    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository
    ){}
    async execute(currentPage:number,limit:number){
        const skip:number = (currentPage-1)*limit
        const filter:Pick<MentorFindFilterDTO,"isVerified"|"isRejected">={isVerified:false,isRejected:false}
        
        const {mentors,totalDocuments}:Omit<GetAllMentorResponseDTO,"totalPages">=await this._mentorRepository.find(filter,skip,limit);
        const totalPages:number = Math.ceil(totalDocuments/limit)
        return {mentors,totalPages}
    }
}