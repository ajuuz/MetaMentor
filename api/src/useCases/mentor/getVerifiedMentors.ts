import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getVerifiedMentors.interface";
import { GetAllMentorResponseDTO, MentorReadFilterDTO } from "shared/dto/mentorDTO";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVerifiedMentorsUsecase implements IGetVerifiedMentorsUsecase{

    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository
    ){}
    async execute(currentPage:number,limit:number):Promise<Omit<Omit<GetAllMentorResponseDTO,"cv"|"experienceCirtificate">,"totalDocuments">>{
        const skip:number = (currentPage-1)*limit
        const filter:Pick<MentorReadFilterDTO,"isVerified">={isVerified:true}
        
        const {mentors,totalDocuments}:Omit<GetAllMentorResponseDTO,'totalPages'>=await this._mentorRepository.find(filter,skip,limit);
        const totalPages:number = Math.ceil(totalDocuments/limit)
        return {mentors,totalPages}
    }
}